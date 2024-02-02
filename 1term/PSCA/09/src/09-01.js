const WebSocket = require('ws');
const fs = require('fs');
const server = new WebSocket.Server({ port: 4000 });

server.on('connection', ws => {
  ws.on('message', message => {
    fs.writeFile(`./upload/file.txt`, message, err => {
      if (err) {
        console.log('Ошибка записи файла:', err);
      } else {
        console.log('Файл успешно записан');
      }
    });
  });
});

console.log('Сервер запущен на порту 4000');
