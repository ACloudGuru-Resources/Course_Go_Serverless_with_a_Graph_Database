const fetch = require ('isomorphic-fetch');

const clusterEndpoint = process.env.CLUSTER_ENDPOINT;
const loaderS3Bucket = process.env.LOADER_S3_BUCKET;
const roleArn = process.env.ROLE_ARN;
const awsRegion = process.env.AWS_REGION

exports.load = (event, context, callback) => {
    const body = {
        source : `s3://${loaderS3Bucket}/data/`, 
        format : "csv",
        iamRoleArn : roleArn,
        region : awsRegion,
        failOnError : "FALSE"
    };
    const fetchUrl = `http://${clusterEndpoint}:8182/loader`;

    console.log('about to fetch', fetchUrl, body)
    try {
        fetch(fetchUrl, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        })
        .then(data => {
            console.log('Success', data);
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            });
        })
        .catch(error => {
            console.error('ERROR loading data', error);
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error),
                headers: {'Content-Type': 'application/json'}
            });
        });
    } catch(e) {
        console.error('ERROR in fetch?', e);
        callback(null, {
            statusCode: 500,
            body: JSON.stringify(e),
            headers: {'Content-Type': 'application/json'}
        });
    }
}