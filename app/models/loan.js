var db = require('../config');
var User = require('./user.js');

var Loan = db.Model.extend({

  tableName: 'loans',

  lender: function() {
    return this.belongsTo(User, 'lenderId');
  },

  borrower: function() {
    return this.belongsTo(User, 'borrowerId');
  }


});

module.exports = Loan;