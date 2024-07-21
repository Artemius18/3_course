const express = require('express');
const http = require('http');
const WebSocket = require('ws');
var bodyParser = require('body-parser');


const app = express();
const port = 3000;
app.use(bodyParser.json());

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', (message) => {
        const messageText = message.toString('utf-8');
        console.log('Received:', messageText);

        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(messageText);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




