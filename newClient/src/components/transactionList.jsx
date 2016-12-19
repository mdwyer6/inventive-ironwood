import React from 'react';
import ReactDOM from 'react-dom';
import TransactionListEntry from './transactionListEntry.jsx';

var TransactionList = (props) => {

  return (
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
        {props.transactions.reverse().map(owes => <TransactionListEntry getImage={props.getImage} entry={owes} />)}
      </tbody>
    </table>
  )
}

module.exports = TransactionList;