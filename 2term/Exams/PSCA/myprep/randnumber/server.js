const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.text())
const port = 3000

const servNumb = Math.floor(Math.random() * 10)


app.post('/game', function(req, res, next) {
  console.log(servNumb);
  userNumb = req.body;
  if(isNaN(userNumb)) {
    const err = new Error("Not a number!");
    err.status = 400;
    next(err);
    return;
} else {
    if(userNumb == servNumb) {
        res.send("You win!")
    } else {
        const err = new Error("Try again!");
        err.status = 400;
        next(err);
    }
}});

app.use(function (err, req, res, next) {
  res.send(err.message);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))