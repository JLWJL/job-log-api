'use strict';
const config = require('./config');

const express = require('express');
const bodyPaser = require('body-parser');

const jobRoutes = require('../api/routes/jobRoutes');
const userRoutes = require('../api/routes/userRoutes');

module.exports = function () {
  const app = express();

  //
  // Middlewares
  //

  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers',
      'Content-Type, X-Authentication');
    next();
  });

  app.use(bodyPaser.urlencoded({extended: true}));
  app.use(bodyPaser.json());

  //
  // Routes
  //
  app.use('/api/v1/job', jobRoutes);
  app.use('/api/v1/user', userRoutes);

  //
  // Error handling
  //
  app.use((err, req, res, next) => {
    console.log('Error handled: ', err);
    res.status(err.status || 400).send(err.message);
  });

  //Handle invalid url
  app.use((req, res, next) => {
    console.log('Invalid api uri');
    res.send('Invalid api call');
  });

  return app;
};