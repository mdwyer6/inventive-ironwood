import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import auth from './auth.js';

import App from './components/app.jsx';
import CreateLoanForm from './components/createLoanForm.jsx';
import Dashboard from './components/Dashboard.jsx';
import LoanList from './components/LoanList.jsx';
import Signin from './components/Signin.jsx';
import Signup from './components/Signup.jsx';
import NotFound from './components/NotFound.jsx';
import Budget from './components/budgetForm.jsx';
import Transactions from './components/transactionList.jsx';
import Loans from './components/loans.jsx';
import TransferFunds from './components/transferFunds.jsx';


function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/signin',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path='/home' component={Dashboard} onEnter={requireAuth}>
        <IndexRoute component={Transactions} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/budget" component={Budget} />
        <Route path='/loans' component={Loans} />
        <Route path='/transfer' component={TransferFunds} />
      </Route>
      <IndexRoute component={Signin} />
      <Route path='/signin' component={Signin} />
      <Route path="/signup" component={Signup} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>, document.getElementById('app'));

