const express = require('express');
const fetch =require('node-fetch');
const app = express();
const port = 3001;

const apiKey = 'ba5549217emsh62ddef385876822p1d17c9jsna7a7c65ed47e';

app.use(express.json());

app.post('/synthesize', async (req, res) => {
    try {
        const response = await fetch('https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize', {
            method:'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': 'ba5549217emsh62ddef385876822p1d17c9jsna7a7c65ed47e',
                'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com',
            },
            body: new URLSearchParams(req.body),

        });

        if(!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'server error'});
    }
}
);

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});