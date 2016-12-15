import $ from 'jquery';

export function filterUsers (userStr, cb) {
  $.ajax({
    url: '/users/' + userStr,
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
    url: '/loans',
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