  const express = require('express');
  const passport = require('passport');
  const BasicStrategy = require('passport-http').BasicStrategy;

  const users = require('./users.json');

  passport.use(new BasicStrategy(
      (username, password, done) => {
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      }
    ));
    
  const app = express();

  app.get('/login',
    passport.authenticate('basic', { session: false, successRedirect: '/resource' })
  );

  app.get('/logout',
    (req, _res, next) => { delete req.headers['authorization']; next(); },
    passport.authenticate('basic', { session: false }),
  );

  app.get('/resource',
    passport.authenticate('basic', { session: false, failureRedirect: '/login' }),
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
