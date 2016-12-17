import React from 'react';
import TransactionForm from './transactionForm.jsx';
import TransactionListEntry from './transactionListEntry.jsx';
import TransactionChart from './transactionChart.jsx';
import { getTransactions, postTransactions } from '../lib/ajax.js';

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.pickCategories= this.pickCategories.bind(this);
    this.state = {
      transactions: null
    };
  }

  componentWillMount() {
    getTransactions((data) => {
      this.setState({
        transactions: data.transaction
      })
      console.log('this.state.transactions is: ', this.state.transactions)
    });
  }

  pickCategories(category) {
    if (category === 'Restaurant') {
      return 'http://plainicon.com/dboard/userprod/2805_fce53/prod_thumb/plainicon.com-44037-512px.png';
    } else if (category === 'Shopping') {
      return 'https://d30y9cdsu7xlg0.cloudfront.net/png/17663-200.png';
    } else if (category === 'Transportation') {
      return 'http://image.flaticon.com/icons/png/128/67/67994.png';
    } else if (category === 'Groceries') {
      return 'http://image.flaticon.com/icons/png/512/2/2772.png';
    } else if (category === 'Utilities') {
      return 'http://www.iconsdb.com/icons/preview/black/house-xxl.png';
    } else if (category === 'Nightlife') {
      return 'http://www.clker.com/cliparts/I/n/S/M/8/z/cocktail-md.png';
    } else if (category === 'Other') {
      return 'https://d30y9cdsu7xlg0.cloudfront.net/png/203819-200.png';
    }
  }

  render() {
    if (this.state.transactions) {
      return (
      <div className="spending">
        <h2>Transactions</h2>
        <TransactionChart data={this.state.transactions} />
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
          {this.state.transactions.map(owes => <TransactionListEntry getImage={this.pickCategories} entry={owes} />)}
          </tbody>
        </table>
        <TransactionForm submit={postTransactions}/>
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