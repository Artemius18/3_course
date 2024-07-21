const express = require('express')
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser');

const app = express()
const port = 3000

app.use(bodyParser.json()); // для JSON
app.use(bodyParser.text({ type: 'text/html' }));    
app.use(cookieParser);

app.get('/query', (req, res) => {
  query = req.query;  
  host = req.get("host");
  console.log(query);
  console.log(host);
})

app.post('/cookies', (req, res) => {
    const bodyData = req.body;
    
    const cookies = req.cookies;

    console.log('Тело запроса (body):', bodyData);
    console.log('Cookies:', cookies);

    res.send('Данные успешно получены');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.use((req, res) => {
  res.status(500).send('Something broke!');
});

