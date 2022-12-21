var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongojs = require('mongojs')
const db = mongojs('mongodb://127.0.0.1:27017/footballdata', ['players'])

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, 'public')));


var indexRouter = require('./routes/index')
var addRouter = require('./routes/add')
var removeRouter = require('./routes/remove')
var editRouter = require('./routes/edit')
var playersRouter = require('./routes/players')
var registerRouter = require('./routes/register')
app.use('/', indexRouter)
app.use('/', addRouter)
app.use('/', removeRouter)
app.use('/', editRouter)
app.use('/', playersRouter)
app.use('/', registerRouter)

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
