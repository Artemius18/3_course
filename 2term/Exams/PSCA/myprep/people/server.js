const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
    const name = req.body.name;
    const age = req.body.age;

    if (!name || !age) {
        return res.status(400).send('Name and age are required');
    }

    const data = { name, age };

    fs.writeFile('people.json', JSON.stringify(data), (err) => {
        if (err) {
            return res.status(500).send('Error writing to file');
        }
        console.log('Data saved successfully');
    });    
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

