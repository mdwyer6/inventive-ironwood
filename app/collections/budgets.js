var db = require('../config');
var Budget = require('../models/budget');

var Budgets = new db.Collection();

Budgets.model = Budget;

module.exports = Budgets;