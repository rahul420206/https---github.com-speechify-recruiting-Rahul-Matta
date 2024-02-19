const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT||3001;

app.use(express.json());

app.post('/synthesize', async(req, res) => {
    try {
        const { voice_code, text, speed, pitch } =req.body;

        const apiKey= 'ba5549217emsh62ddef385876822p1d17c9jsna7a7c65ed47e';

        const apiUrl = 'https://cloudlabs-text-to-speech.p.rapidapi.com/synthesize';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'cloudlabs-text-to-speech.p.rapidapi.com',
            },
            body:new URLSearchParams({
                voice_code,
                text,
                speed,
                pitch,
                output_type: 'audio_url',


            }),
        });

        const data = await response.json();
        res.join(data);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Server error'});

    }
}
);

app.listen(PORT, () => {
    console.log('Server is running in port ${PORT}');

});
