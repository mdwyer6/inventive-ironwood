import $ from 'jquery';

export function filterUsers (userStr, cb) {
  $.ajax({
    url: '/api/users/' + userStr,
    method: 'GET',
    contentType: 'application/json',
    success: (data) => {
      cb(data);
    },
    error: (err) => {
      console.log('AJAX error filtering users', err);
    }
  });
}

export function createLoan (otherUser, memo, amount, type, cb) {
  console.log(amount);
  $.ajax({
    url: '/api/loans',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      otherUser: otherUser,
      memo: memo,
      loanAmount: amount,
      type: type
    }),
    success: (data) => cb(data),
    error: (err) => console.log('AJAX error creating loan', err)
  });
}


export function getTransactions(cb) {
  console.log('heyyyyy');
  $.ajax({
    url: '/api/transactions',
    method: 'GET',
    contentType: 'application/json',
    success: (data) => {
      cb(data);
    },
    error: (err) => {
      console.log('Error getting transactions');
    }
  });
}

export function getLoansByType (type, cb) {
  $.ajax({
    url: '/api/loans/' + type,
    method: 'GET',
    contentType: 'application/json',
    success: (data) => {
      cb(data);
    },
    error: (err) => {
      console.log('AJAX error filtering users', err);
    }
  });
}

export function postTransactions(e) {
  $.ajax({
    url: '/api/transactions',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      category: e.target.children[1].children[0].children[e.target.children[1].children[0].selectedIndex].value,
      title: e.target.children[2].children[0].value,
      amount: '$' + e.target.children[3].children[1].value,
    }),
    success: (data) => {
      console.log('transaction was logged!');
    },
    error: (err) => {
      console.log('Error getting transactions');
    }
  });
}

export function getBudget(cb) {
  //e.preventDefault();
  $.ajax({
    url: '/api/budget',
    method: 'GET',
    contentType: 'application/json',
    success: (data) => {
      console.log('data is', data);
      cb(data);
    },
    error: (err) => {
      console.log('Error getting transactions');
    }
  });
}

export function postBudget(e) {
  $.ajax({
    url: '/api/budget',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      restaurant: e.target.children[1].children[1].value,
      groceries:  e.target.children[2].children[1].value,
      transportation: e.target.children[3].children[1].value,
      shopping: e.target.children[4].children[1].value,
      utilities: e.target.children[5].children[1].value,
      nightlife: e.target.children[6].children[1].value,
      cash: e.target.children[7].children[1].value,
      other: e.target.children[8].children[1].value
    }),
    success: (data) => {
      console.log('Budget was logged!');
    },
    error: (err) => {
      console.log('Error getting transactions');
    }
  });
}

export function transferFunds (username, memo, amount, cb) {
  console.log(amount);
  $.ajax({
    url: '/api/transfer',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      username: username,
      memo: memo,
      amount: amount
    }),
    success: (data) => cb(data),
    error: (err) => console.log('AJAX error creating transfer', err)
  });
}