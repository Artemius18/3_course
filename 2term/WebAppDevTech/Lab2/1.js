const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

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
    const x = parseInt(req.get('X-Value-x'));
    const y = parseInt(req.get('X-Value-y'));
    const z = x + y;
    res.set('X-Value-z', z.toString());
    res.send();
});

app.listen(3000, () => console.log('Server started on port 3000'));


