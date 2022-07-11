require('dotenv').config();
require('../config/database').connect();
const express = require('express');
const cors = require('cors');
const path = require('path');

const auth = require('../middleware/auth');

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(require('./cart.route'));
app.use(require('./ingredient.route'));
app.use(require('./product.route'));
app.use(require('./user.route'));
app.use(express.json({ limit: '50mb' }));


app.get('/welcome', auth, (req, res) => {
  res.status(200).send('Welcome 🙌 ');
});

// This should be the last route else any after it won't work
app.use('*', (req, res) => {
  res.status(404).json({
    success: 'false',
    message: 'Page not found',
    error: {
      statusCode: 404,
      message: 'You reached a route that is not defined on this server',
    },
  });
});

module.exports = app;
