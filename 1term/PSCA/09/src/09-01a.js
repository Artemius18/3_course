const WebSocket = require('ws');
const fs = require('fs');

const ws = new WebSocket('ws://localhost:4000');

ws.on('open', () => {
  const stream = fs.createReadStream('./file.txt');
  stream.on('data', chunk => ws.send(chunk));
  stream.on('end', () => ws.close());
});
