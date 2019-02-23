const AWS = require("aws-sdk");
const responder = require("./common/responder");

async function listPhotos(event, context, callback) {
  try {
    const s3 = new AWS.S3();
    const s3ListParams = {
        Bucket: process.env.S3_BUCKET,
        Prefix: 'SR_AWS_N'
    }
    const photos = await s3.listObjectsV2(s3ListParams).promise()
        .then(listObjects => listObjects.Contents.map(obj => obj.Key));
    console.log('Success', s3ListParams, photos);
    return callback(null, responder.success(photos));
  } catch (err) {
    console.error('Failure', err);
    return callback(null, responder.failure(err));
  }
}

module.exports = {
    listPhotos
}