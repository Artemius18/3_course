const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const users = require('./users.json');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    let user = users.find((user) => user.username === username);
    if (user === undefined || user.password !== password) {
      return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  let user = users.find((user) => user.username === username);
  done(null, user);
});

app.get('/login', (req, res) => {
  res.send('<form action="/login" method="post"><div><label>Username:</label><input type="text" name="username"/></div><div><label>Password:</label><input type="password" name="password"/></div><div><input type="submit" value="Log In"/></div></form>');
});

app.post('/login', passport.authenticate('local', { successRedirect: '/resource', failureRedirect: '/login' }));

app.get('/resource', (req, res) => {
    if(req.isAuthenticated()){
      let userWithoutPassword = Object.assign({}, req.user);
      delete userWithoutPassword.password;
  
      res.send(`RESOURCE: Authenticated user info - ${JSON.stringify(userWithoutPassword)}
        <form action="/logout" method="get">
          <input type="submit" value="Logout"/>
        </form>`);
    } else {
      res.status(401).send('Error: Unauthorized access');
    }
  });
  
  app.get('/logout', (req, res) => {
    req.logout(() => {});
    res.redirect('/login');
  });
  

app.use((req, res) => {
  res.status(404).send('Error: Resource not found');
});

app.listen(3000, () => {
  console.log('App is listening on port 3000');
});
    