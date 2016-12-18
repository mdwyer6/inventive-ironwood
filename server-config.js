var path = require('path');
var handler = require('./request-handler');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./app/config');
var session = require('express-session');
var morgan = require('morgan');

var app = express();

// Get IP of client in req.ip
app.enable('trust proxy');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({secret: 'keyboard cat', resave: false, saveUninitialized: true}));

app.use(express.static(path.join(__dirname, './newClient')));


app.post('/api/signin', handler.signin);
app.post('/api/signup', handler.signup);

//-----------------------------------------------------
//                SECURE ROUTES
//-----------------------------------------------------
// app.use(handler.check);

app.get('/logout', handler.logout);
app.get('/api/currency', handler.currency);
app.post('/api/transactions', handler.transactions);
app.get('/api/transactions', handler.getTransactions);
app.post('/api/debts', handler.debts);
app.get('/api/debts', handler.getDebts);
app.get('/api/budget', handler.getBudget);
app.post('/api/budget', handler.createBudget);
app.post('/api/transfer', handler.transfer);
app.get('/api/user', handler.getUser);


app.get('/api/users/:userStr', handler.filterUsers);
app.post('/api/loans', handler.createLoan);
app.get('/api/loans/:which', handler.getLoansByType);
app.put('/api/loans', handler.updateLoan);
app.delete('/api/loans', handler.deleteLoan);

app.post('/api/transfer', handler.transfer);

app.get('/api/iavtoken', handler.getIavToken);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname + '/newClient/index.html'));
});

module.exports = app;
