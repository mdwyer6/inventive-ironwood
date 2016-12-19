import React from 'react';
import auth from '../auth.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.loggedIn = auth.loggedIn();

  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}






module.exports = App;