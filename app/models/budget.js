var db = require('../config');

var Budget = db.Model.extend({

  tableName: 'budgets',

  initialize: function() {}
});

module.exports = Budget;