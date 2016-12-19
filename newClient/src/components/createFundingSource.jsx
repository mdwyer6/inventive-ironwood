import React from 'react';
import {getIavToken} from '../lib/ajax.js';

class CreateFundingSource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    var component = this;
    getIavToken((token) => {
      dwolla.configure('uat');
      dwolla.iav.start(token, {container: 'iavContainer', microDeposts: false, fallbackToMicrodeposits: true}, (err, res) => {
        console.log('Error: ' + JSON.stringify(err) + ' -- Response: ' + JSON.stringify(res));
      });
      component.setState({loading: false});
    });
  }


  render() {
    return (
      <div>
        <h1>Add Bank Account</h1>
        {this.state.loading && <h3>Loading..</h3>}
        <div id='iavContainer'>
        </div>
      </div>
    );
  }

}

module.exports = CreateFundingSource;