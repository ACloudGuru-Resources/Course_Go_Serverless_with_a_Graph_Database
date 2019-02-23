const AWS = require("aws-sdk");
const responder = require("./common/responder");

async function createCollection(event, context, callback) {
  try {
    const rekognitionClient = new AWS.Rekognition();
    const params = {
      CollectionId: process.env.REKOGNITION_COLLECTION,
    };
    const rekResponse = await rekognitionClient.createCollection(params).promise();
    console.log('Success', params, rekResponse);
    return callback(null, responder.success(rekResponse));
  } catch (err) {
    console.error('Failure', err);
    return callback(null, responder.failure(err));
  }
}

async function deleteCollection(event, context, callback) {
  try {
    const rekognitionClient = new AWS.Rekognition();
    const params = {
      CollectionId: process.env.REKOGNITION_COLLECTION,
    };
    const rekResponse = await rekognitionClient.deleteCollection(params).promise();
    console.log('Success', params, rekResponse);
    return callback(null, responder.success(rekResponse));
  } catch (err) {
    console.error('Failure', err);
    return callback(null, responder.failure(err));
  }
}

module.exports = {
  createCollection,
  deleteCollection
}
