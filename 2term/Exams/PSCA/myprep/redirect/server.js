const express = require('express');
const app = express();
const port = 3000;

app.get('/home/:parm', (req, res) => {
    const parm = req.params.parm;
    if (parm === 'fit') {
        res.redirect('/fit');
    } else if (parm === 'bstu') {
        res.redirect('/bstu');
    } else {
        res.status(404).send('Page not found');
    }
});

app.get('/fit', (req, res) => {
    res.send('FIT');
});

app.get('/bstu', (req, res) => {
    res.send('BSTU');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
