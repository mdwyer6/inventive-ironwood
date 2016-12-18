import React from 'react';
import CreateLoanForm from './CreateLoanForm.jsx';
import LoanList from './loanList.jsx';
import {getLoansByType } from '../lib/ajax.js';

class Loans extends React.Component {
  constructor(props) {
    super(props);
    this.getLoans = this.getLoans.bind(this);
    this.state = {
      loans: [],
      type: 'toCollect'
    };
  }

  componentDidMount() {
    this.getLoans();
  }

  getLoans(type) {
    var type = type || this.state.type;
    getLoansByType(type, (loans) => {
      this.setState({loans: loans, type: type});
    });
  }

  render() {
    return (
      <div>
        <h1>My Loans</h1>
        <br/>
        <CreateLoanForm getLoans={this.getLoans} />
        <br/>
        <LoanList loans={this.state.loans} type={this.state.type} getLoans={this.getLoans} />
      </div>
    );
  }
}

module.exports = Loans;