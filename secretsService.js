const AWS = require('aws-sdk');
const secretsManager = new AWS.SecretsManager();

async function getSecretValue(secretName){
    const params = {
        SecretId: secretName
    };
    try{
        const secretData =  await secretsManager.getSecretValue(params).promise();
        const API_KEY = JSON.parse(secretData.SecretString).API_KEY;
        return API_KEY;
    } catch (err){
        console.log(err);
    }
}


module.exports = { getSecretValue };