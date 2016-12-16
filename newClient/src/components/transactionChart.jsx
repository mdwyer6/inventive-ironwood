import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryPortal, VictoryLabel} from 'victory';


class TransactionChart extends React.Component {
  constructor(props) {
    super(props);
    this.calculateSpending = this.calculateSpending.bind(this);
    this.state = {
      totalSpent: null,
      data2: [
        {category: 'restaurant', spent: 1},
        {category: 'groceries', spent: 324},
        {category: 'transportation', spent: 98},
        {category: 'utilities', spent: 70},
        {category: 'nightlife', spent: 400},
        {category: 'cash', spent: 450},
        {category: 'other', spent: 10}
      ]
    }
  }

  calculateSpending(dataObj) {
    var total = 0
    for (var prop in dataObj) {
      total += dataObj[prop].spent;
    }
    return total;
  }

  componentWillMount() {
    this.setState({
      totalSpent: this.calculateSpending(this.state.data2)
    })
  }

  render() {
    return (
      <VictoryPie data={this.state.data2}
      x="category"
      y="spent"
      height={250}
      padding={0}
      labels={function (datum, nextarg){
        if (Math.round(datum.y/this.state.totalSpent * 100) > 4) {
          return datum.category + '\n' + Math.round(datum.y/this.state.totalSpent * 100) + '%';
          }
        }.bind(this)
      }
      style={{
        labels: {
        padding: -70
        }
      }} 
      colorScale={['#67b7dc', '#fdd400', '#84b761', '#cc4748', '#cd82ad', '#b7b83f', '#ff9900', '#990099']}
      />
    );
  }
}

module.exports = TransactionChart;