const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const dbModule = require('./db');

const server = http.createServer((request, response) => {
  const { method } = request;
  const { pathname, query } = url.parse(request.url, true);
  if (pathname === '/api/db') {
    if (method === 'GET') {
      dbModule.emit('get', response);
    } else if (method === 'POST') {
      dbModule.emit('post', request, response);
    } else if (method === 'PUT') {
      dbModule.emit('put', request, response);
    } else if (method === 'DELETE') {
      dbModule.emit('delete', request, response);
    }
  } else if (pathname === '/') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
        return;
      }
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(data);
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ error: 'Not Found' }));
  }
});

const port = 5000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});