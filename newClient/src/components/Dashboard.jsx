import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

import Sidebar from './sidebar.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }



  render() {
    return (
      <div id="wrapper" className="app">
      
        <div id='sidebar-wrapper'>
          <Sidebar />
        </div>

        <div>
          {this.props.children && React.cloneElement.call(this, this.props.children)}
        </div>

      </div>
    );
  }

}

module.exports = Dashboard;