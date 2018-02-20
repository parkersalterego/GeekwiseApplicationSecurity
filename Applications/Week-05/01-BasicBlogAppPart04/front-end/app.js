const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const csrf = require('csurf');

const index = require('./routes/index');
const users = require('./routes/users');
const post = require('./routes/post');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(csrf());
app.use(express.static(path.join(__dirname, 'public')));

// check user cookie
app.use(function(req, res, next) {
    console.log('cookie', req.path, req.cookies);
    const user = req.cookies['user'] ? JSON.parse(req.cookies['user']) : null;
    if (true) { // set to true to use server-side redirect
        if (!user && (req.path != '/users/login' && req.path != '/users/register')) {
            res.redirect('/users/login');
        } else {
            req.user = user;
            next();
        }
    } else {
        next();
    }
});

app.use('/', index);
app.use('/users', users);
app.use('/post', post);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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