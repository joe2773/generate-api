const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();
const API_KEY = process.env.API_KEY;

app.post('/generate-image', async (req, res) => {
  const { prompt, imageSize } = req.body;


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
