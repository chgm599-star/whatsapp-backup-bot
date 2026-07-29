const express = require('express');
const { google } = require('googleapis');
const axios = require('axios');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'my_secret_token_123';

// Webhook Verification (Meta API)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token === VERIFY_TOKEN) {
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Receiving WhatsApp Messages
app.post('/webhook', async (req, res) => {
    res.sendStatus(200);
    console.log('Incoming Webhook Event:', JSON.stringify(req.body, null, 2));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
