const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

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
    const n = parseInt(req.get('X-Rand-N'));
    const count = Math.floor(Math.random() * 6) + 5;
    const numbers = Array.from({length: count}, () => Math.floor(Math.random() * (2 * n + 1)) - n);
    res.json(numbers);
});

app.listen(3000, () => console.log('Server started on port 3000'));


