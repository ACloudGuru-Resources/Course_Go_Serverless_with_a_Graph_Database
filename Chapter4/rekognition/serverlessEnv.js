const dotEnv = require('dotenv');
const fs = require('fs')
const { promisify } = require('util')
const path = require('path');
const shortUuid = require('short-uuid');

const translator = shortUuid('abcdefghijklmnopqrstuvwxyz0123456789');
const envPath = path.resolve(__dirname, '../../.env');

dotEnv.config({ path: envPath});

const updateBucketNameInEnvFile = (bucketName) => {
    return updateDotenv({
        S3_BUCKET: bucketName
    });
}

const generateBucketName = () => {
    const newBucketName = `mbudmrekphotos-${translator.new()}`
    return updateBucketNameInEnvFile(newBucketName)
        .then((newEnv) => newEnv.S3_BUCKET);
}

function escapeNewlines (str) {
  return str.replace(/\n/g, '\\n')
}

function format (key, value) {
  return `${key}=${escapeNewlines(value)}`
}

async function updateDotenv (env) {
  const filename = envPath

  // Merge with existing values
  try {
    const existing = dotEnv.parse(await promisify(fs.readFile)(filename, 'utf-8'))
    env = Object.assign(existing, env)
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }

  const contents = Object.keys(env).map(key => format(key, env[key])).join('\n')
  await promisify(fs.writeFile)(filename, contents)

  // Update current env with new values
  Object.assign(process.env, env)

  return env
}

const bucketName = process.env.S3_BUCKET || generateBucketName();

module.exports.config = () => ({
    S3_BUCKET: bucketName,
})