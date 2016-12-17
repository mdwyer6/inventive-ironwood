import React from 'react';
import auth from '../auth.js';
import { Link, browserHistory } from 'react-router';
import {signup} from '../lib/ajax.js';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormState = this.updateFormState.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.state = {
      username: null,
      password: null,
      firstName: null,
      lastName: null,
      email: null,
      address1: null,
      address2: null,
      city: null,
      state: null,
      zip: null,
      dob: null,
      ssn: null,
      error: false
    };
  }

  handleSignup(e) {
    e.preventDefault();
    auth.login(this.state.username, this.state.password, (loggedIn) => {
      if (!loggedIn) {
        return this.setState({error: true});
      }
      browserHistory.push('/signin');
    });
    signup(this.state.firstname, this.state.lastname, this.state.email, this.state.address1, this.state.address2, this.state.city, this.state.state, this.state.zip, this.state.dob, this.state.ssn);
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
              <h3>Sign Up</h3>
            </div>
            <div className="form-top-right">
              <i className="fa fa-lock"></i>
            </div>
          </div>

          <div className="form-bottom">
            <form onSubmit={this.handleSignup} className="login-form">

              <div className="form-group">
                <label className="sr-only">Username</label>
                <input type="text" onChange={this.updateFormState} name="username" placeholder="Username" className="form-username form-control" id="form-username" />
              </div>

              <div className="form-group">
                <label className="sr-only">Password</label>
                <input type="password" onChange={this.updateFormState} name="password" placeholder="Password" className=" form-control" id="" />
              </div>
              <br/>
              <div className="form-group">
                <label className="sr-only">First Name</label>
                <input type="text" onChange={this.updateFormState} name="firstName" placeholder="First Name" className="form-control" />
              </div>
              <div className="form-group">
                <label className="sr-only">Last Name</label>
                <input type="text" onChange={this.updateFormState} name="lastName" placeholder="Last Name" className="form-control" />
              </div>
              <div className="form-group">
                <label className="sr-only">Email</label>
                <input type="text" onChange={this.updateFormState} name="email" placeholder="Email" className=" form-control" />
              </div>
              <div className="form-group">
                <label className="sr-only">Address 1</label>
                <input type="text" onChange={this.updateFormState} name="address1" placeholder="Address Line 1" className=" form-control" />
              </div>
              <div className="form-group">
                <label className="sr-only">Address 2</label>
                <input type="text" onChange={this.updateFormState} name="address2" placeholder="Address Line 2" className=" form-control"  />
              </div>
              <div className="form-group">
                <label className="sr-only">City</label>
                <input type="text" onChange={this.updateFormState} name="city" placeholder="City" className=" form-control"  />
              </div>
              <div className="form-group">
                <label className="sr-only">State</label>
                <input type="text" onChange={this.updateFormState} name="state" placeholder="State" className=" form-control" maxLength="2"/>
              </div>
              <div className="form-group">
                <label className="sr-only">ZIP</label>
                <input type="text" onChange={this.updateFormState} name="zip" placeholder="ZIP" className=" form-control"  maxLength="5"/>
              </div>
              <div className="form-group">
                <label className="sr-only">Date</label>
                <input type="date" onChange={this.updateFormState} name="dob" placeholder="State" className=" form-control"  />
              </div>
              <div className="form-group">
                <label className="sr-only">SSN</label>
                <input type="password" onChange={this.updateFormState} name="ssn" placeholder="SSN" className=" form-control" maxLength="4"/>
              </div>
              <button className="btn">Sign in!</button><br/>
              {this.state.error && (<p>Signup Failed, please try again</p>)}
            </form>
          </div>
          <p>Already have an account? <Link to='/signin'>Sign in</Link></p>
        </div>

      </div>
    );
  }
}

module.exports = Signup;