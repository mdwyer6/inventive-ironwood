var request = require('request');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Spendings = require('./app/collections/transactions');
var Spending = require('./app/models/transaction');
var Debts = require('./app/collections/debts');
var Debt = require('./app/models/debt');

exports.currency = function(req, res) {
  request.get({url: 'http://api.fixer.io/latest?base=USD'}, function(error, response, body) {
    if (!error) {
      res.send(JSON.parse(body));
    } else {
      console.log('error');
    }
  });
};

exports.signin = function(req, res, next) {
  console.log('Req is: ', req.body);
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username }).fetch().then(function(user) {
    if (!user) {
      console.log('invalid username');
      res.redirect('/signin');
    } else {
      if (user.attributes.password === password) {
        req.session.regenerate(function() {
          req.session.user = user;
          res.location('/');
          res.redirect('/');
          next();
        });
      } else {
        console.log('incorrect password');
        res.redirect('/signin');
      }
    }
  });
};

exports.signup = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username}).fetch().then(function(found) {
    if (found) {
      res.send('sorry, username taken');
    } else {
      Users.create({
        username: username,
        password: password
      }).then(function(newUser) {
        req.session.regenerate(function() {
          req.session.user = newUser;
          res.redirect('/');
        });
      });
    }
  });
};

exports.check = function(req, res, next) {
  console.log('Session user is: ', req.session.user);
  if (!req.session.user) {
    res.redirect('/signin');
  } else {
    next();
  }
};
exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/signin');
    console.log('logout');
  });
};

exports.transactions = function(req, res) {
  var category = req.body.category;
  var title = req.body.title;
  var amount = req.body.amount;
  // var userID = req.session.user.id;
  console.log('id', req.session.user.id);
  Spendings.create({category: category, title: title, amount: amount, user_id: req.session.user.id})
  .then(function() {
    res.send('done');
  });
};

exports.getDebts = function(req, res) {
  var param = {};
  console.log('id', req.session.user.id);
  new Debt().query({where: {user_id: req.session.user.id}}).fetchAll().then(function(debt) {
    if (debt) {
      param.debt = debt.models;
      console.log(param.debt);
    }
  }).then(function() {
    res.send(param);
  });
};

exports.getTransactions = function(req, res) {
  var param = {};
  console.log('id', req.session.user.id);
  new Spending().query({where: {user_id: req.session.user.id}}).fetchAll().then(function(transaction) {
    if (transaction) {
      param.transaction = transaction.models;
      console.log(param.transaction);
    }
  }).then(function() {
    res.send(param);
  });
};

exports.debts = function(req, res) {
  var type = req.body.type;
  var person = req.body.person;
  var amount = req.body.amount;
  // var userID = req.session.user.id;
  console.log('id', req.session.user.id);
  var personID;
  Debts.create({type: type, amount: amount, person: person, user_id: req.session.user.id})
    .then(function() {
      res.send('Done');
    });
};

// exports.removeTransaction = function(req, res) {
//   var person = req.body.person;
//   var user_id = req.session.user.id;
//   var title = req.body.title;


//   new Spending({person: person, user_id: user_id, title: title}).destroy();
// }

exports.filterUsers = function(req, res) {
  var userStr = req.params.userStr.toLowerCase();
  new User().query('where', 'username', 'like', userStr + '%')
    .fetchAll()
    .then(function(users) {
      res.json(users);
    });
};

exports.createLoan = function(req, res) {
  console.log('loanAmount', req.body.loanAmount);
  if (req.body.type === 'loan') {
    var lender = req.session.user.username;
    var borrower = req.body.otherUser;
    var status = 'borrowerConfirm';
  } else {
    var lender = req.body.otherUser;
    var borrower = req.session.user.username;
    var status = 'lenderConfirm';

  }
  new User({username: lender}).fetch().then(function(lender) {
    new User({username: borrower}).fetch().then(function(borrower) {
      lender.loansToCollect()
        .attach({borrowerId: borrower.id, status: req.body.status, loanAmount: req.body.loanAmount, memo: req.body.memo})
        .then(function(collection) {
          res.end();
        });
    });
  });
};

