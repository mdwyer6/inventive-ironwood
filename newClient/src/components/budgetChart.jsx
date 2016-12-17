import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryPortal, VictoryLabel} from 'victory';
import { getBudget, getTransactions } from '../lib/ajax.js';

//tickValues={["restaurant", "groceries", "transportation", "shopping", "utilities", "nightlife", "cash", "other"]}

var counter = 0;

class BudgetChart extends React.Component {
  constructor(props) {
  	super(props);
    this.generateValues = this.generateValues.bind(this);
    this.calculatePercent = this.calculatePercent.bind(this);
    this.buildArray = this.buildArray.bind(this);
    this.computeTotals = this.computeTotals.bind(this);
  	this.state = {
  	  data: [{percent: 0}, {percent: 0}, {percent: 0}, {percent: 0}, {percent: 0}, {percent: 0}, {percent: 0}],
      tickValues: null
  	}
  }

  generateValues(dataObj) {
    console.log('dataObj is: ', dataObj);
    var max = 0;
    for (var key in dataObj) {
      // console.log(dataObj[key].percent);
      if (dataObj[key].percent > max) {
        max = dataObj[key].percent;
      }
    }
    if (max < 100) {
      return [20,40,60,80,100]
    } else {
      max = 50 * Math.round(max/50);
      // console.log('max is: ', max);
      var arr = [];
      var muliplyBy = 0.2
      for (var i = 5; i > 0; i--) {
        arr.push(Math.round(max * muliplyBy));
        muliplyBy += 0.2;
      }
    }
    return arr;
  }

  calculatePercent(budgetObj, transactionObj) {
    var sum = 0;
    var result= {};
    for (var prop in obj) {
      sum += obj.prop;
    }
    for (var i = 0; i < Object.keys(obj).length; i++) {
      //result[obj.prop] =
    }
  }

  computeTotals(data) {
    console.log('helpppp');
    var totals = {};
    console.log('what is here: ', data.transaction[0].amount);
    for (var i = 0; i < data.transaction.length; i++) {
      if (!totals[data.transaction[i].category]) {
        console.log(Number(data.transaction[i].amount.replace('$', '')));
        totals[data.transaction[i].category] = Number(data.transaction[i].amount.replace(/\$/g, ''));
      } else {
        totals[data.transaction[i].category] += Number(data.transaction[i].amount.replace(/\$/g, ''));
      }
    }
    console.log('wacky input: ', data.transaction);
    console.log('data', totals);

    return totals;
  }

  buildArray(budget, transactions) {
    console.log('budget is: ', budget, 'transactions is: ', transactions)
    var arr = [];
    var categories = ['Restaurant', 'Groceries', 'Transportation', 'Shopping', 'Utilities', 'Nightlife', 'Cash', 'Other'];
    var colors = ['#67b7dc', '#fdd400', '#84b761', '#cc4748', '#cd82ad', '#b7b83f', '#ff9900', '#990099'];
    for (var i = 0; i < categories.length; i++) {
      console.log('recording transaction', transactions[categories[i]], budget[categories[i].toLowerCase()]);
      if (transactions[categories[i]]) {
        arr.push({category: categories[i],
          percent: Math.floor( (transactions[categories[i]] / budget[categories[i].toLowerCase()]) * 100),
          fill: colors[i]
        })
      }
    }
    console.log('arrow hunt', arr);

    return arr;
  }

  componentWillMount() {
    getBudget((data) => {
      console.log('budget', data);
      var budget = data;
      getTransactions((data) => {
        console.log('transactions api call: ', data);
        var transactions = this.computeTotals(data);
        console.log('transactions', transactions);
        this.setState({
          data: this.buildArray(budget, transactions),
          tickValues: this.generateValues(this.buildArray(budget, transactions))
        });
        console.log('data after setState is: ', this.state.data);
        console.log('tickValues after setState is: ', this.state.tickValues);
      });
    });
  }

  render() {
    return (
      <div>
        <VictoryChart
          responsive={false}
          padding={{left:100, right: 100, top: 20, bottom: 60}}
          theme={VictoryTheme.grayscale}
          domainPadding={20}
        >
        <VictoryAxis
            dependentAxis
          />
          <VictoryAxis
              tickValues={this.state.tickValues}
              tickFormat={(x) => (`${x / 1}%`)}
              style={{
                axisLabel: { padding: 30 }
              }}
            />
          <VictoryBar        
            data={this.state.data}
            x={"category"}
            y={"percent"}
            horizontal={true}
            style={{
              data: {
                width: 25,
                padding: 1000
              }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

module.exports = BudgetChart;
