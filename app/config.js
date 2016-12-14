var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/moneyio.sqlite')
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 255);
      user.string('password', 255);
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});
 
db.knex.schema.hasTable('spendings').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('spendings', function (entry) {
      entry.string('category', 255);
      entry.string('title', 255);
      entry.float('amount');
      entry.timestamps('date');
      entry.integer('user_id').references('users.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('debts').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('debts', function (entry) {
      entry.string('type', 255);
      entry.string('person');
      entry.float('amount');
      entry.timestamps('date');
      entry.integer('user_id').references('users.id');
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('loans').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('loans', function (table) {
      table.increments('id').primary();
      table.integer('lenderId').references('users.id');
      table.integer('borrowerId').references('users.id');
      table.string('status');
      table.float('loanAmount');
      table.float('balanceDue');
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('loanPayments').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('loanPayments', function (table) {
      table.increments('id').primary();
      table.integer('loanId').references('loans.id');
      table.string('status');
      table.float('paymentAmount');
      table.dateTime('paymentDate');
      table.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;