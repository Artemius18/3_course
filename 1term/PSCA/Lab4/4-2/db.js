const EventEmitter = require('events');
const querystring = require('querystring');
const url = require('url');


const db = [
  {
    "id": 1,
    "name": "Artyom",
    "bday": "2003-10-11"
  },
  {
    "id": 2,
    "name": "Elena",
    "bday": "1990-05-15"
  },
  {
    "id": 3,
    "name": "Alexey",
    "bday": "1987-12-03"
  },
  {
    "id": 4,
    "name": "Natalia",
    "bday": "1995-08-22"
  },
  {
    "id": 5,
    "name": "Ivan",
    "bday": "1982-06-30"
  }
];

class DB extends EventEmitter {
  constructor() {
    super();

    this.on('get', (response) => {
      process.nextTick(() => {
        this.getAllRows(response);
      });
    });

    this.on('post', (request, response) => {
      process.nextTick(() => {
        this.addRow(request, response);
      });
    });

    this.on('put', (request, response) => {
      process.nextTick(() => {
        this.updateRow(request, response);
      });
    });

    this.on('delete', (request, response) => {
      process.nextTick(() => { 
        this.deleteRow(request, response);
      });
    });
  }

  getAllRows(response) {
    process.nextTick(() => {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(db));
    });
  }

  addRow(request, response) {
    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', async () => {
      const newRow = JSON.parse(body);
      const id = Number(newRow.id);

      if (isNaN(id)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        console.log(JSON.stringify({ error: 'ID should be a number' }));
        return;
      }

      const existingRow = db.find((row) => row.id === id);

      if (existingRow) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        console.log(JSON.stringify({ error: 'Row with the same ID already exists' }));
      } else {
        db.push({ id, name: newRow.name, bday: newRow.bday });
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ id, name: newRow.name, bday: newRow.bday }));
      }
    });
  }

  updateRow(request, response) {
    const id = Number(querystring.parse(url.parse(request.url).query).id);

    if (isNaN(id)) {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      console.log(JSON.stringify({ error: 'ID should be a number' }));
      return;
    }

    let body = '';

    request.on('data', (chunk) => {
      body += chunk;
    });

    request.on('end', async () => {
      const updatedRow = JSON.parse(body);

      const existingRow = db.find((row) => row.id === id);

      if (existingRow) {
        existingRow.name = updatedRow.name;
        existingRow.bday = updatedRow.bday;

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(existingRow));
      } else {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        console.log(JSON.stringify({ error: 'Row not found' }));
      }
    });
  }

  deleteRow(request, response) {
    const id = Number(querystring.parse(url.parse(request.url).query).id);

    const index = db.findIndex((row) => row.id === id);

    if (index !== -1) {
      const deletedRow = db.splice(index, 1);
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(deletedRow[0]));
    } else {
      response.writeHead(404, { 'Content-Type': 'application/json' });
      console.log(JSON.stringify({ error: 'Row not found' }));
    }
  }
}

module.exports = new DB();