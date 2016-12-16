var path = require('path');
var handler = require('./request-handler');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./app/config');
var session = require('express-session');
var morgan = require('morgan');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));

app.use(express.static(path.join(__dirname, './newClient')));

// app.get('/signin', express.static((path.join(__dirname, './client/signin/'))));
app.post('/api/signin', handler.signin);
// app.get('/signup', express.static((path.join(__dirname, './client/signup/'))));
// app.post('/signup', handler.signup);

//-----------------------------------------------------
//                SECURE ROUTES
//-----------------------------------------------------
// app.use(handler.check);

app.get('/logout', handler.logout);
app.get('/currency', handler.currency);
app.post('/transactions', handler.transactions);
app.get('/transactions', handler.getTransactions);
app.post('/debts', handler.debts);
app.get('/debts', handler.getDebts);


app.get('/users/:userStr', handler.filterUsers);
app.post('/loans', handler.createLoan);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/newClient/index.html'));
});

module.exports = app;
