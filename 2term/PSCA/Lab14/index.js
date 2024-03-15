const { PrismaClient } = require('@prisma/client');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/faculties', async (req, res) => {
    try {
        const faculties = await prisma.fACULTY.findMany();
        res.json(faculties);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/pulpits', async (req, res) => {
    try {
        const pulpits = await prisma.pULPIT.findMany();
        res.json(pulpits);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});

app.get('/api/subjects', async (req, res) => {
    try {
        const subjects = await prisma.sUBJECT.findMany();
        res.json(subjects);
    } catch (err) {
        console.error(err);
        res.status(500).send(err);
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
