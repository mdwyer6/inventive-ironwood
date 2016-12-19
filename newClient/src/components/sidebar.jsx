import React from 'react';
import { Link } from 'react-router';

var Sidebar = (props) => {
  return (
    <ul className="sidebar-nav">
      <li className="sidebar-brand">
        <a href="#">Money.io</a>
      </li>
      <li>
      <img className='profilepic' src='https://dyn0.media.forbiddenplanet.com/products/102701.jpg.square-true_maxheight-285_size-285.jpg'></img>
      </li>
      <li>
       <p className='username'>{props.username}</p>
      </li>
      <li>
        <Link to='/transactions'>Expenses</Link>
      </li>
      <li>
        <Link to='/budget'>Budget</Link>
      </li>
      <li>
        <Link to='/loans'>Loans</Link>
      </li>
      <li>
        <Link to='/transfer'>Transfer Funds</Link>
      </li>
      <li>
        <Link to='/addbankaccount'>Add Bank Account</Link>
      </li>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <li>
        <Link to='/signin'>Sign In</Link>
      </li>
    </ul>
  );
};

module.exports = Sidebar;