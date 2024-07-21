const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/users', (req, res) => {
    const userId = parseInt(req.query.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'invalid user ID' });
    }
    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'internal server error' });
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    });
});

app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ error: 'invalid user ID' });
    }

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'internal server error' });
        }
        const users = JSON.parse(data);
        const user = users.find(u => u.id === userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'user not found' });
        }
    });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});

