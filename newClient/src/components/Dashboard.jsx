import React from 'react';
import $ from 'jquery';

import Sidebar from './sidebar.jsx';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.getProposals();
  }

  // getProposals() {
  //   $.ajax({
  //     url: '/proposals',
  //     method: 'GET',
  //     contentType: 'application/json',
  //     success: (data) => {
  //       this.setState({proposals: data});
  //     }
  //   });
  // }

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