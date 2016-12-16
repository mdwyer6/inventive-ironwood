var db = require('../config');

var User = db.Model.extend({

  tableName: 'users',

  // https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility
  // Hide password on .toJSON for relational query
  hidden: ['password', 'email'],

  loansToCollect: function() {
    return this.belongsToMany(User, 'loans', 'lenderId', 'borrowerId').withPivot(['date', 'status', 'loanAmount', 'balanceDue', 'memo']);
  },
  loansToPayback: function() {
    return this.belongsToMany(User, 'loans', 'borrowerId', 'lenderId').withPivot(['date', 'status', 'loanAmount', 'balanceDue', 'memo']);
  }
});

module.exports = User;