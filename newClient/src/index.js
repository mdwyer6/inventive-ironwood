import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import auth from './auth.js';

import App from './components/app.jsx';
import Dashboard from './components/Dashboard.jsx';
import NotFound from './components/NotFound.jsx';


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
      <Route path='/home' component={Dashboard}>
        <IndexRoute component={NotFound} />
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  </Router>, document.getElementById('app'));

