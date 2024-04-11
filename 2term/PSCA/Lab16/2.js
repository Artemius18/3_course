const express = require('express');
const passport = require('passport');
const DigestStrategy = require('passport-http').DigestStrategy;

const users = require('./users.json');

passport.use(new DigestStrategy(
  { qop: 'auth' },
  (username, done) => {
    const user = users.find(u => u.username === username);
    if (!user) {
      return done(null, false);
    }
    return done(null, user, user.password);
  }
));

const app = express();

app.get('/login',
  passport.authenticate('digest', { session: false, successRedirect: '/resource' })
);

app.get('/logout',
  (req, _res, next) => { delete req.headers['authorization']; next(); },
  passport.authenticate('digest', { session: false }),
);

app.get('/resource',
  passport.authenticate('digest', { session: false, failureRedirect: '/login' }),
  (_req, res) => { 
    res.send(`
      <h1>RESOURCE</h1>
      <form action="/logout" method="GET">
        <button type="submit">Logout</button>
      </form>
    `); 
  }
);

app.all('*', (req, res) => {
  res.status(404).send('Страница не найдена');
}); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
