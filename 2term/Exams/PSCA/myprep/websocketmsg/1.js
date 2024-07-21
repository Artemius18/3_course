const express = require('express')
const http = require('http')
const WebSocket = require('ws')
const app = express()
const port = 3000

const server = http.createServer(app)

const wss = new WebSocket.Server({server});

wss.on('connection', (ws) => {
    //cl connected
    ws.on('message', (msg) => {
        const message = msg.toString('utf-8');
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        })
    })
})
app.get('/', (req, res) => res.sendFile(__dirname + '/1.html'))
server.listen(port, () => console.log(`Example app listening on port ${port}!`))