const express = require('express');
const path = require('path');
const winston = require('winston');

const index = require('./routes/index');
const galleryData = require('./routes/gallery-data');

const app = express();

/**
 * Initialize and attach logger
 */
const logger = new (winston.Logger)({
  level: process.env.LOG_LEVEL || 'error',
  transports: [
    new (winston.transports.File)({ filename: 'logs/error.log' }),
  ],
});
app.set('logger', logger);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/gallery-data', galleryData);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
