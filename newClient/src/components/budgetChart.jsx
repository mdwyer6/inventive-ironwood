import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryPortal, VictoryLabel} from 'victory';
import { getBudget, getTransactions } from '../lib/ajax.js';

class BudgetChart extends React.Component {
  constructor(props) {
  	super(props);
    this.generateValues = this.generateValues.bind(this);
    this.buildArray = this.buildArray.bind(this);
    this.computeTotals = this.computeTotals.bind(this);
  	this.state = {
  	  data: null,
      tickValues: null
  	}
  }

  generateValues(dataObj) {
    var max = 0;
    for (var key in dataObj) {
      if (dataObj[key].percent > max) {
        max = dataObj[key].percent;
      }
    }
    if (max < 100) {
      return [20,40,60,80,100]
    } else {
      max = 50 * Math.round(max/50);
      var arr = [];
      var muliplyBy = 0.2
      for (var i = 5; i > 0; i--) {
        arr.push(Math.round(max * muliplyBy));
        muliplyBy += 0.2;
      }
    }
    return arr;
  }

  computeTotals(data) {
    var totals = {};
    for (var i = 0; i < data.transaction.length; i++) {
      if (!totals[data.transaction[i].category]) {
        totals[data.transaction[i].category] = Number(data.transaction[i].amount.replace(/\$/g, ''));
      } else {
        totals[data.transaction[i].category] += Number(data.transaction[i].amount.replace(/\$/g, ''));
      }
    }

    return totals;
  }

  buildArray(budget, transactions) {
    var arr = [];
    var categories = ['Restaurant', 'Groceries', 'Transportation', 'Shopping', 'Utilities', 'Nightlife', 'Cash', 'Other'];
    var colors = ['#67b7dc', '#fdd400', '#84b761', '#cc4748', '#cd82ad', '#b7b83f', '#ff9900', '#990099'];
    for (var i = 0; i < categories.length; i++) {
      if (transactions[categories[i]]) {
        arr.push({category: categories[i],
          percent: Math.floor( (transactions[categories[i]] / budget[categories[i].toLowerCase()]) * 100),
          fill: colors[i]
        })
      }
    }

    return arr;
  }

  componentWillMount() {
    getBudget((data) => {
      var budget = data;
      getTransactions((data) => {
        var transactions = this.computeTotals(data);
        this.setState({
          data: this.buildArray(budget, transactions),
          tickValues: this.generateValues(this.buildArray(budget, transactions))
        });
      });
    });
  }

  render() {
    if (this.state.data && this.state.tickValues) {
      if (this.state.data.length > 0) {
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
    return (
      <div></div>
    )
  }
}

module.exports = BudgetChart;
