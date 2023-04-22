const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const secretsService = require('./secretsService');
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();


app.post('/generate-image', async (req, res) => {
    const { prompt, imageSize } = req.body;
    const API_KEY = await secretsService.getSecretValue('open-ai-api-key')

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
