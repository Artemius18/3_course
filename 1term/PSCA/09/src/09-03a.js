const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4000');

const duplex = WebSocket.createWebSocketStream(ws, {encoding:'utf-8'});

duplex.pipe(process.stdout); //вывод данных от сервера

process.stdin.pipe(duplex); //перенаправить ввод с клавы на сервер