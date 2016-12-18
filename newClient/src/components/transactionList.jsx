import React from 'react';
import TransactionForm from './transactionForm.jsx';
import TransactionListEntry from './transactionListEntry.jsx';
import TransactionChart from './transactionChart.jsx';
import { getTransactions, postTransactions } from '../lib/ajax.js';

class TransactionList extends React.Component {
  constructor(props) {
    super(props);
    this.pickCategories= this.pickCategories.bind(this);
    this.changeAmountToNumbers= this.changeAmountToNumbers.bind(this);
    this.reformatData = this.reformatData.bind(this);
    this.state = {
      transactions: null,
      pieData: null,
      isData: false
    };
  }

  changeAmountToNumbers(data) {
    console.log('data in changeAmountToNumbers is: ', data);
    for (var i = 0; i < data.length; i++) {
      this.setState({
        isData: true
      })
      if (typeof data[i].amount === 'string') {
        data[i].amount = Number(data[i].amount.slice(1));
      }
    }
    return data;
  }

  reformatData(data) {
    var storeDataHere = {}
    console.log('data in reformatData is: ', data);
    for (var i = 0; i < data.length; i++) {
      console.log('data[i].category is: ', data[i].category)
      console.log('data[i].amount is: ', data[i].amount)
      storeDataHere[data[i].category] = (storeDataHere[data[i].category] || 0) + data[i].amount
    }
    var resultData = [];
    console.log('storeDataHere is: ', storeDataHere);
    for (var key in storeDataHere) {
      resultData.push(
        {
          category: key,
          amount: storeDataHere[key]
      })
    }
    console.log('resultData is: ', resultData);
    return resultData;
  }

  componentWillMount() {
    getTransactions((data) => {
      console.log('data coming in from ajax call is: ', data)
      this.changeAmountToNumbers(data.transaction)
      this.setState({
        transactions: data.transaction,
        pieData: this.reformatData(this.changeAmountToNumbers(data.transaction))
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
        <TransactionChart isData={this.state.isData} data={this.state.pieData} />
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
      <div></div>
    )
  }
}

TransactionList.prototypes = {
  list: React.PropTypes.array.isRequired
};

module.exports = TransactionList;