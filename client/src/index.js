import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
import Requests from './components/requests.js';
import Sidebar from './components/sidebar.jsx';
import Signin from './components/signIn.jsx';
import DuesForm from './components/owes/duesForm.jsx';
import LoansForm from './components/owes/LoansForm.jsx';
import OwesList from './components/owes/owesList.jsx';
import OwesListEntry from './components/owes/owesListEntry.jsx';

ReactDOM.render(<App postReq={Requests.postReq} getReq={Requests.getReq} data={[]} />, document.getElementById('app'));
