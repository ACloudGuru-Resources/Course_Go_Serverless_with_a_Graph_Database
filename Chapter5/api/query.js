const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

const clusterEndpoint = process.env.CLUSTER_ENDPOINT;

exports.query = (event, context, callback) => {

    const dcReader = new DriverRemoteConnection('wss://'+clusterEndpoint+':8182/gremlin', {});
    const graphReader = new Graph();
    const gR = graphReader.traversal().withRemote(dcReader);

    gR.V().limit(200).count().next()
        .then(data => {
            console.log(data);
            dcReader.close();
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "*",
                }
            });
        })
        .catch(error => {
            console.log('ERROR getting vectors', error);
            dcReader.close();
            callback(null, {
                statusCode: 500,
                body: JSON.stringify(error),
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "*",
                }
            });
        });

}