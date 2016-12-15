import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import auth from './auth.js';

import App from './components/app.jsx';
import CreateLoanForm from './components/createLoanForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import NotFound from './components/NotFound.jsx';
import Budget from './components/budgetForm.jsx';
import Transactions from './components/transactionList.jsx';
import Signin from './components/signin.jsx';
import Signup from './components/signup.jsx';


function requireAuth(nextState, replace) {
  console.log('loggedIn?', auth.loggedIn());
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
<<<<<<< HEAD
      <Route path='/signin' component={Signin} />
      <Route path='/signup' component={Signup} />
      <Route path='/home' component={Dashboard}>
        <IndexRoute component={CreateLoanForm} />
=======
      <Route path="/home" component={Dashboard}>
        <IndexRoute component={NotFound} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/debts" component={Budget} />
        <Route path="/budget" component={Budget} />
>>>>>>> Add working router links to sidebar
      </Route>
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>, document.getElementById('app'));

