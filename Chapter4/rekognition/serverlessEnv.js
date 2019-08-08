const dotEnv = require('dotenv');
const updateDotenv = require('update-dotenv')
const shortUuid = require("short-uuid")

const translator = shortUuid("abcdefghijklmnopqrstuvwxyz0123456789");

dotEnv.config();

const updateBucketNameInEnvFile = (bucketName) => {
    return updateDotenv({
        S3_BUCKET: bucketName
    });
}

const generateBucketName = () => {
    const newBucketName = `acg-rekognition-photos-${translator.new()}`
    return updateBucketNameInEnvFile(newBucketName)
        .then((newEnv) => newEnv.S3_BUCKET);
}

const bucketName = process.env.S3_BUCKET || generateBucketName();

module.exports.config = () => ({
    S3_BUCKET: bucketName,
})