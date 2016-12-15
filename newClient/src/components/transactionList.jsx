import React from 'react';
import TransactionForm from './transactionForm.jsx';
import TransactionListEntry from './transactionListEntry.jsx';

var TransactionList = (props) => {
  return (
  <div className="spending">
    <h2>Transactions</h2>
    <table className="table">
      <thead id="spending-head">
        <tr>
          <th>Category</th>
          <th>Title</th>
          <th>Amount</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
      {props.list.map(owes => <TransactionListEntry entry={owes} />)}
      </tbody>
    </table>
    <TransactionForm submit={props.submit}/>
  </div>
  );
}

TransactionList.prototypes = {
  list: React.PropTypes.array.isRequired
};

module.exports = TransactionList;