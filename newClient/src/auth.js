import $ from 'jquery';

module.exports = {
  login: function(email, password, reportAuthCB) {
    if (!!localStorage.authenticated) {
      reportAuthCB(true);
      return;
    }
    loginAjax(email, password, function(res) {
      if (res.authenticated) {
        localStorage.setItem('authenticated', true);
        reportAuthCB(true);
      } else {
        reportAuthCB(false);
      }
    });
  },
  loggedIn: function() {
    return !!localStorage.authenticated;
  }
};

















function loginAjax(email, password, cb) {
  $.ajax({
    url: '/login',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({email: email, password: password}),
    success: function(data) {
      console.log('login success', data);
      cb({authenticated: true});
    },
    error: function(data) {
      console.log('loginFail', data);
      cb({authenticated: false});
    }
  });
};