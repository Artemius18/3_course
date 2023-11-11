const http = require('http');
const url = require('url');
const { DB } = require('./db');

const port = 5000;

const server = http.createServer((req, res) => {
  const { method, url: requestUrl } = req;
  const parsedUrl = url.parse(requestUrl, true);

  if (method === 'GET' && parsedUrl.pathname === '/api/db') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(DB.select()));
  } else if (method === 'POST' && parsedUrl.pathname === '/api/db') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const newRow = JSON.parse(body);

      if (DB.select().some((row) => row.id === newRow.id)) {
        res.statusCode = 400;
        res.end('Duplicate ID');
      } else {
        const result = DB.insert(newRow);
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(result));
      }
    });
  } else if (method === 'PUT' && parsedUrl.pathname === '/api/db') {
    let body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      const updatedData = JSON.parse(body);
      const id = Number(parsedUrl.query.id);
      
      const existingRow = DB.select().find((row) => row.id === id);
      
      if (existingRow) {
        if (DB.select().some((row) => row.id === updatedData.id && updatedData.id !== id)) {
          res.statusCode = 400;
          res.end('Cannot update the object ID, an object with this ID already exists');
        } else {
          existingRow.name = updatedData.name;
          existingRow.birthdate = updatedData.birthdate;
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(existingRow));
        }
      } else {
        res.statusCode = 404;
        res.end('Row not found');
      }
    });
  } else if (method === 'DELETE' && parsedUrl.pathname === '/api/db') {
    const id = Number(parsedUrl.query.id);
    const result = DB.delete(id);
    if (result) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 404;
      res.end('Row not found');
    }
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
