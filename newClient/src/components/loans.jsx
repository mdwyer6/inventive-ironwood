import React from 'react';
import CreateLoanForm from './CreateLoanForm.jsx';
import LoanList from './loanList.jsx';

var Loans = (props) => {
  return (
    <div>
      <h1>My Loans</h1>
      <br/>
      <CreateLoanForm />
      <br/>
      <LoanList />
    </div>
  );
};

module.exports = Loans;