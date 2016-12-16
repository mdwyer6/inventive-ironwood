import React from 'react';
import TransactionForm from './transactionForm.jsx';
import TransactionListEntry from './transactionListEntry.jsx';
import { getTransactions } from '../lib/ajax.js';

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    transactions: null
  }

  componentDidMount() {
    console.log('hit');
    getTransactions((data) => {
      console.log(data);
      this.setState({
        transactions: data
      })
    });
  }

  render() {
    if (this.transactions) {
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
          {this.transactions.map(owes => <TransactionListEntry entry={owes} />)}
          </tbody>
        </table>
        <TransactionForm submit={props.submit}/>
      </div>
      );
    }

    return (
      <div>Loading... </div>
    )
  }
}

TransactionList.prototypes = {
  list: React.PropTypes.array.isRequired
};

module.exports = TransactionList;