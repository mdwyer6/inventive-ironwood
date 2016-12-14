import React from 'react';
import $ from 'jquery';

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
      <div>
        {this.props.children && React.cloneElement.call(this, this.props.children)}
      </div>
    );
  }

}

module.exports = Dashboard;