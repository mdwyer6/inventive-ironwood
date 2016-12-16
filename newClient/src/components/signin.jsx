import React from 'react';
import auth from '../auth.js';
import { Link, browserHistory } from 'react-router';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormState = this.updateFormState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      username: null,
      password: null,
      error: false
    };
  }

  handleLogin(e) {
    e.preventDefault();
    auth.login(this.state.username, this.state.password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      }
      browserHistory.push('/home');
    });
  }

  updateFormState(e) {
    e.preventDefault();
    var field = e.target.name;
    var state = {};
    state[field] = e.target.value;
    this.setState(state);
  }

  render() {
    return (
      <div className="row">

        <div className="col-sm-6 col-sm-offset-3 form-box">
          <div className="form-top">
            <div className="form-top-left">
              <h3>Login</h3>
            </div>
            <div className="form-top-right">
              <i className="fa fa-lock"></i>
            </div>
          </div>

          <div className="form-bottom">
            <form onSubmit={this.handleLogin} className="login-form">

              <div className="form-group">
                <label className="sr-only">Username</label>
                <input type="text" onChange={this.updateFormState} name="username" placeholder="Username" className="form-username form-control" id="form-username" />
              </div>

              <div className="form-group">
                <label className="sr-only">Password</label>
                <input type="password" onChange={this.updateFormState} name="password" placeholder="Password" className="form-password form-control" id="form-password" />
              </div>

              <button className="btn">Sign in!</button><br/>
              {this.state.error && (<p>Login Failed, please try again</p>)}
            </form>
          </div>
          <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
        </div>

      </div>
    );
  }
}

module.exports = Signin;