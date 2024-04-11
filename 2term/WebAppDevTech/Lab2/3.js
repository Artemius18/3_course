const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    fs.readFile('3.html', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});

app.get('/calculate', (req, res) => {
    fs.readFile('1.html', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});

app.post('/calculate', (req, res) => {
    setTimeout(() => {
        const x = parseInt(req.get('X-Value-x'));
        const y = parseInt(req.get('X-Value-y'));
        const z = x + y;
        res.set('X-Value-z', z.toString());
        res.send();
    }, 10000); // 10 seconds delay
});

app.get('/generate', (req, res) => {
    fs.readFile('2.html', (err, data) => {
        if (err) {
            res.status(500).send('Error reading file');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
});

app.post('/generate', (req, res) => {
    setTimeout(() => {
        const n = parseInt(req.get('X-Rand-N'));
        const count = Math.floor(Math.random() * 6) + 5;
        const numbers = Array.from({length: count}, () => Math.floor(Math.random() * (2 * n + 1)) - n);
        res.json(numbers);
    }, 1000); // 1 second delay
});

app.listen(3000, () => console.log('Server started on port 3000'));
