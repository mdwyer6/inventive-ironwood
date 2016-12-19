import React from 'react';
import TransactionForm from './transactionForm.jsx';
import TransactionListEntry from './transactionListEntry.jsx';
import TransactionChart from './transactionChart.jsx';
import TransactionList from './transactionList.jsx';
import { getTransactions, postTransactions } from '../lib/ajax.js';
import { ButtonToolbar, ButtonGroup, Button, Nav, NavItem, Tab, Tabs, Row, Col } from 'react-bootstrap';

class TransactionView extends React.Component {
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
    for (var i = 0; i < data.length; i++) {
      storeDataHere[data[i].category] = (storeDataHere[data[i].category] || 0) + data[i].amount
    }
    var resultData = [];
    for (var key in storeDataHere) {
      resultData.push(
        {
          category: key,
          amount: storeDataHere[key]
      })
    }
    return resultData;
  }

  componentWillMount() {
    getTransactions((data) => {
      this.changeAmountToNumbers(data.transaction)
      this.setState({
        transactions: data.transaction,
        pieData: this.reformatData(this.changeAmountToNumbers(data.transaction))
      })
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
      return 'https://openclipart.org/image/2400px/svg_to_png/217511/1429747035.png';
    } else if (category === 'Nightlife') {
      return 'http://www.clker.com/cliparts/I/n/S/M/8/z/cocktail-md.png';
    } else if (category === 'Other') {
      return 'https://d30y9cdsu7xlg0.cloudfront.net/png/203819-200.png';
    }
  }

  render() {
    if (!this.state.transactions) {
      return (
        <div></div>
      )
    }
    return (
      <div className="spending">
        <h2>Expenses</h2>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Table">
            <TransactionForm submit={postTransactions}/>
            <TransactionList getImage={this.pickCategories} transactions={this.state.transactions} />
          </Tab>
          <Tab eventKey={2} title="Chart">
            <TransactionChart isData={this.state.isData} data={this.state.pieData} />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

TransactionView.prototypes = {
  list: React.PropTypes.array.isRequired
};

module.exports = TransactionView;