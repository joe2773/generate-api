const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();


const secretsManager = new AWS.SecretsManager();



app.post('/generate-image', async (req, res) => {
    const { prompt, imageSize } = req.body;
        const params = {
    SecretId: 'open-ai-api-key'
    };

    const secretData =  await secretsManager.getSecretValue(params).promise();
    const API_KEY = JSON.parse(secretData.SecretString).API_KEY;

    console.log(API_KEY);


    const response = await axios.post(
        'https://api.openai.com/v1/images/generations',
        {
            prompt,
            imageSize,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`,
            },
        }
    );
    res.json(response.data);
   

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
