var db = require('../config');

var User = db.Model.extend({

  tableName: 'users',
  loansToCollect: function() {
    return this.belongsToMany(User, 'loans', 'lenderId', 'borrowerId').withPivot(['status', 'loanAmount', 'balanceDue', 'memo']);
  },
  loansToPayback: function() {
    return this.belongsToMany(User, 'loans', 'borrowerId', 'lenderId').withPivot(['status', 'loanAmount', 'balanceDue', 'memo']);
  }
});

module.exports = User;