import React from 'react';

var signIn = (props) => {
  return (
    <div className="row">
        <div className="col-sm-6 col-sm-offset-3 form-box">
          <div className="form-top">
            <div className="form-top-left">
              <h3>Login to our site</h3>
                <p>Enter your username and password to log on:</p>
            </div>
            <div className="form-top-right">
              <i className="fa fa-lock"></i>
            </div>
            </div>
            <div className="form-bottom">
          <form role="form" action="" method="post" className="login-form">
            <div className="form-group">
              <label className="sr-only">Username</label>
                <input type="text" name="form-username" placeholder="Username..." className="form-username form-control" id="form-username" />
              </div>
              <div className="form-group">
                <label className="sr-only">Password</label>
                <input type="password" name="form-password" placeholder="Password..." className="form-password form-control" id="form-password" />
              </div>
              <button type="submit" className="btn">Sign in!</button>
          </form>
        </div>
        </div>
    </div>
  ); 
}

module.exports = signIn;
