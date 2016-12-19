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
var Loan = require('./app/models/loan.js');

exports.currency = function(req, res) {
  request.get({url: 'http://api.fixer.io/latest?base=USD'}, function(error, response, body) {
    if (!error) {
      res.send(JSON.parse(body));
    } else {
      res.sendStatus(400);
    }
  });
};

exports.signin = function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username }).fetch().then(function(user) {
    if (!user) {
      res.sendStatus(403);
    } else {
      if (user.attributes.password === password) {
        req.session.regenerate(function() {
          req.session.user = user;
          res.json({authenticated: true});
        });
      } else {
        res.sendStatus(403);
      }
    }
  });
};

exports.signup = function(req, res) {
  dwolla.createVerifiedCustomer(req.body.firstName, req.body.lastName, req.body.email, req.ip, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, req.body.dob, req.body.ssn)
  .then(function() {
    new User({username: req.body.username}).fetch().then(function(found) {
      if (found) {
        res.status(409).send('username already exists');
      } else {
        Users.create({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        }).then(function(newUser) {
          req.session.regenerate(function() {
            req.session.user = newUser;
            res.end();
          });
        });
      }
    });
  })
  .catch(function(err) {
    res.status(500).send(err);
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
  });
};

exports.getUser = function(req, res) {
  new User({id: req.session.user.id}).fetch().then(function(user) {
    res.json(user.attributes.username);
  });
}

exports.transactions = function(req, res) {
  var category = req.body.category;
  var title = req.body.title;
  var amount = req.body.amount;
  Spendings.create({category: category, title: title, amount: amount, user_id: req.session.user.id})
  .then(function() {
    res.send('done');
  });
};

exports.getDebts = function(req, res) {
  var param = {};
  new Debt().query({where: {user_id: req.session.user.id}}).fetchAll().then(function(debt) {
    if (debt) {
      param.debt = debt.models;
    }
  }).then(function() {
    res.send(param);
  });
};

exports.getTransactions = function(req, res) {
  var param = {};
  new Spending().query({where: {user_id: req.session.user.id}}).fetchAll().then(function(transaction) {
    if (transaction) {
      param.transaction = transaction.models;
    }
  }).then(function() {
    res.send(param);
  });
};

exports.debts = function(req, res) {
  var type = req.body.type;
  var person = req.body.person;
  var amount = req.body.amount;
  var personID;
  Debts.create({type: type, amount: amount, person: person, user_id: req.session.user.id})
    .then(function() {
      res.send('Done');
    });
};

exports.getBudget = function(req, res) {
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
    var searchBy = 'lenderId';
    var withRelated = {withRelated: ['borrower']};
  } else if (whichLoans === 'toPayback') {
    var searchBy = 'borrowerId';
    var withRelated = {withRelated: ['lender']};
  }
  var userId = req.session.user.id;

  var query = {};
  console.log(searchBy, userId);
  query[searchBy] = userId;

  new Loan().where(query).fetchAll(withRelated)
  .then(function(loans) {
    res.json(loans);
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
    res.json(response);
  })
  .catch(function(err) {
    res.sendStatus(500);
  });
};

exports.updateLoan = function(req, res) {
  var userId = req.session.user.id;
  if (req.body.confirmLoan) {
    var id = req.body.confirmLoan.id;
    var status = req.body.confirmLoan.status;
    new Loan({id: id}).fetch()
    .then(function(loan) {
      if (!loan) {
        res.sendStatus(400);
      } else {
        if (status === 'lenderConfirm' && loan.get('lenderId') === userId || status === 'borrowerConfirm' && loan.get('borrowerId') === userId) {
          loan.set('status', 'active').save()
          .then(function(loan) {
            res.end();
          });
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(400);
  }
};

// Later refactor to look up status rather than getting from client for security reasons.
exports.deleteLoan = function(req, res) {
  var userId = req.session.user.id;
  var loanId = req.body.id;
  var status = req.body.status;
  new Loan({id: loanId}).fetch()
  .then(function(loan) {
    if (status === 'lenderConfirm' && loan.get('lenderId') === userId || status === 'borrowerConfirm' && loan.get('borrowerId') === userId) {
      loan.destroy()
      .then(function(destroyedLoan) {
        res.end();
      });
    } else {
      // Not authorized
      res.sendStatus(403);
    }
  });
};

exports.getIavToken = function(req, res) {
  var newUser = new User({username: req.session.user.username}).fetch();
  Promise.all([newUser])
  .then(function(user) {
    return dwolla.getUserId(user[0].attributes.email);
  })
  .then(function(userId) {
    return dwolla.createIavToken(userId);
  })
  .then(function(iavToken) {
    res.json(iavToken);
  }).catch(function(err) {
    res.status(500).send(err);
  });
  // dwolla.getUserId(req.session.user.email)
  // .then(function(userId) {
  //   console.log(userId);
  //   return createIavToken(userId);
  // })
  // .then(function(iavToken) {
  //   console.log(iavToken);
  //   res.json(iavToken);
  // })
  // .catch(function(err) {
  //   res.status(500).send(err);
  // });
};



