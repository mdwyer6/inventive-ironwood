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