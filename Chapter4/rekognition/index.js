const AWS = require('aws-sdk');
const converter = require('json-2-csv');
const responder = require("./common/responder");

const rekognitionClient = new AWS.Rekognition();
const s3 = new AWS.S3();
const MATCH_THRESHOLD = 60;

function getS3ObjectKeys(eventRecords){
  return eventRecords.map(record => record.s3.object.key);
}

function indexImage(imageKey){
  const params = {
    CollectionId: process.env.REKOGNITION_COLLECTION,
    DetectionAttributes: [],
    ExternalImageId: imageKey,
    Image: {
      S3Object: {
        Bucket: process.env.S3_BUCKET,
        Name: imageKey,
      },
    },
  };
  return rekognitionClient.indexFaces(params).promise()
}

function searchImageFaces(indexFacesResponse){
  return Promise.all(indexFacesResponse.FaceRecords.map(faceRecord => {
    const params = {
      CollectionId: process.env.REKOGNITION_COLLECTION,
      FaceId: faceRecord.Face.FaceId,
      FaceMatchThreshold: MATCH_THRESHOLD,
    };
    return rekognitionClient.searchFaces(params).promise()
      .then(searchFacesResponse => {
        return {
          imageId: faceRecord.Face.ExternalImageId,
          ...searchFacesResponse
        }
      })
  }));
}

function getFacesAsVertices(indexFacesResponses){
  return indexFacesResponses.reduce((accum, response) => {
    return accum.concat(response.FaceRecords.map(faceRecord => {
      return {
        "~id": faceRecord.Face.FaceId,
        "~label": "face",
        "imageId:String": faceRecord.Face.ExternalImageId
      }
    }));
  }, []);
}

function getFaceMatchesAsEdges(searchFacesResponses){
  return searchFacesResponses.reduce((accum, response) => {
    return accum.concat(response.reduce((acc, responseItem) => {
      return acc.concat(responseItem.FaceMatches.map(faceMatch => ({
        "~id": `${responseItem.SearchedFaceId}--${faceMatch.Face.FaceId}`,
        "~from": responseItem.SearchedFaceId,
        "~to": faceMatch.Face.FaceId,
        "~label": "similarity",
        "weight:Double": faceMatch.Similarity / 100
      })));
    }, []));
  }, []);
}

function putData(vertices, edges){
  const key = vertices[0]["imageId:String"]; // just use the first image in this batch as the filename
  const items = [{
    data: vertices,
    prefix: 'vertices',
    key
  }, {
    data: edges,
    prefix: 'edges',
    key
  }]
  return Promise.all(items.map(item => {
    return converter.json2csvAsync(item.data)
      .then(csv => {
        const s3PutParams = {
          Body: csv,
          Bucket: process.env.S3_BUCKET,
          ContentType: "application/vnd.ms-excel",
          Key: `data/${item.prefix}-${item.key}.csv`
        };
        return s3.putObject(s3PutParams).promise()
          .catch((e) => {
            const logitall = { e, item };
            throw new Error(JSON.stringify(logitall));
          });
      })
  }));
}

async function indexFaces(event, context, callback) {
  try {
    const imageKeysToIndex = getS3ObjectKeys(event.Records);
    const indexFacesResponses = await Promise.all(imageKeysToIndex.map(indexImage));
    const searchFacesResponses = await Promise.all(indexFacesResponses.map(searchImageFaces));
    const vertices = getFacesAsVertices(indexFacesResponses);
    const edges = getFaceMatchesAsEdges(searchFacesResponses);
    const putResponses = await putData(vertices, edges);
    console.log('Success', JSON.stringify({
      imageKeysToIndex,
      indexFacesResponses,
      searchFacesResponses,
      vertices,
      edges
    }, null, 2));
    return callback(null, responder.success({
      vertices,
      edges
    }));
  } catch (err) {
    console.error('Failure', err, s3);
    return callback(null, responder.failure(err));
  }
}

module.exports = {
  getFacesAsVertices,
  getFaceMatchesAsEdges,
  indexFaces
}
