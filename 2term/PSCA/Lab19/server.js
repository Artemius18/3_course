const express = require('express');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const asyncHandler = require('express-async-handler');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views/pages'));

app.use(asyncHandler(require('./middleware/authenticate')));
app.use(require('./middleware/authorize'));

app.use('/', require('./routes/root'));

Promise.all([
  require('./database/client').$connect().then(() => {
    console.log('Database connection established');
  }).catch(err => {
    console.error('Database connection error:', err);
    throw err;
  }),
  require('./services/redisService').connect().then(() => {
    console.log('Redis connection established');
  }).catch(err => {
    console.error('Redis connection error:', err);
    throw err;
  })
]).then(() => {
  app.listen(+process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
}).catch(() => {
  console.log(`Server didn't start due to errors`);
});