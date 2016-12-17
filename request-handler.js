var request = require('request');
var Users = require('./app/collections/users');
var User = require('./app/models/user');
var Spendings = require('./app/collections/transactions');
var Spending = require('./app/models/transaction');
var Debts = require('./app/collections/debts');
var Debt = require('./app/models/debt');
var Budgets = require('./app/collections/budgets');
var Budget = require('./app/models/budget');
var dwolla = require('./dwolla/dwolla.js');
var Promise = require('bluebird');

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
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username }).fetch().then(function(user) {
    if (!user) {
      console.log('user not found');
      res.sendStatus(403);
    } else {
      if (user.attributes.password === password) {
        req.session.regenerate(function() {
          req.session.user = user;
          console.log(req.session.user);
          // res.location('/');
          res.json({authenticated: true});
        });
      } else {
        console.log('password not correct');
        res.sendStatus(403);
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
  console.log('are we even getting here');
  var param = {};
  //console.log('id', req.session.user.id);
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

exports.getBudget = function(req, res) {
  console.log
  new Budget({user_id: req.session.user.id}).fetch().then(function(budget) {
    res.json(budget);
  });
}

exports.createBudget = function(req, res) {
  var data = {
    restaurant: req.body.restaurant,
    groceries: req.body.groceries,
    transportation: req.body.transportation,
    shopping: req.body.shopping,
    utilities: req.body.utilities,
    nightlife: req.body.nightlife,
    cash: req.body.cash,
    other: req.body.other,
    person: req.body.person,
    user_id: req.session.user.id,
  };

  Budgets.create(data)
    .then(function() {
      console.log('budget added to db');
      res.send('done');
    });
}

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
  console.log('loanAmount', req.session.user.username);
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
        .attach({borrowerId: borrower.id, status: status, loanAmount: req.body.loanAmount, memo: req.body.memo})
        .then(function(collection) {
          res.end();
        });
    });
  });
};

exports.getLoansByType = function(req, res) {
  var whichLoans = req.params.which;
  if (whichLoans === 'toCollect') {
    var relatedStr = 'loansToCollect';
  } else if (whichLoans === 'toPayback') {
    var relatedStr = 'loansToPayback';
  }
  var userId = req.session.user.id;
  new User({id: userId})
    .fetch({withRelated: ['loansToCollect', 'loansToPayback']})
    .then(function(user) {
      res.json(user.related(relatedStr).toJSON());
    });
};

exports.transfer = function(req, res) {
  var sender = new User({username: req.session.user.username}).fetch();
  var payee = new User({username: req.body.username}).fetch();
  Promise.all([sender, payee])
  .spread(function(sender, payee) {
    var senderEmail = sender.attributes.email;
    var payeeEmail = payee.attributes.email;
    return [senderEmail, payeeEmail];
  })
  .spread(function(senderEmail, payeeEmail) {
    var senderId = dwolla.getUserId(senderEmail);
    var payeeId = dwolla.getUserId(payeeEmail);
    return Promise.all([senderId, payeeId]);
  })
  .spread(function(senderId, payeeId) {
    var senderFundId = dwolla.getUserFundingId(senderId);
    var payeeFundId = dwolla.getUserFundingId(payeeId);
    return Promise.all([senderFundId, payeeFundId]);
  })
  .spread(function(senderFundId, payeeFundId) {
    return dwolla.transferMoney(senderFundId, payeeFundId, req.body.amount);
  })
  .then(function(response) {
    console.log('Transfer success');
    res.json(response);
  })
  .catch(function(err) {
    console.log('Error transferring money:', err);
    res.sendStatus(500);
  });
};








