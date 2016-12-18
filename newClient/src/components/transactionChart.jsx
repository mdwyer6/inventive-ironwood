import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryPortal, VictoryLabel} from 'victory';
import VictoryLegend from './VictoryLegend.jsx';

//datum.category + '\n' +
//labelComponent={<VictoryLegend  />}
//datum.category + '\n' + 

class TransactionChart extends React.Component {
  constructor(props) {
    super(props);
    console.log('this.props.data is: ', this.props.data);
    this.calculateSpending = this.calculateSpending.bind(this);
    this.state = {
      realData: [
        {category: 'restaurant', amount: 0},
        {category: 'groceries', amount: 0},
        {category: 'transportation', amount: 0},
        {category: 'utilities', amount: 0},
        {category: 'nightlife', amount: 0},
        {category: 'shopping', amount: 0},
        {category: 'cash', amount: 0},
        {category: 'other', amount: 0}
      ],
      totalSpent: null,
      colorScale: ['#67b7dc', '#fdd400', '#84b761', '#cc4748', '#cd82ad', '#b7b83f', '#ff9900', '#990099'],
      data2: [
        {category: 'restaurant', spent: 100},
        {category: 'groceries', spent: 324},
        {category: 'transportation', spent: 98},
        {category: 'utilities', spent: 70},
        {category: 'nightlife', spent: 400},
        {category: 'shopping', spent: 145},
        {category: 'cash', spent: 450},
        {category: 'other', spent: 10}
      ]
    }
  }

  calculateSpending(dataObj) {
    var total = 0
    for (var prop in dataObj) {
      total += dataObj[prop].amount;
    }
    return total;
  }

  // transferData(dataObj) {
  //   var categories = ['restaurant', 'groceries', 'transportation', 'utilities', 'nightlife', 'shopping', 'cash', 'other']
  //   var result = [
  //       {category: 'restaurant', amount: 0},
  //       {category: 'groceries', amount: 0},
  //       {category: 'transportation', amount: 0},
  //       {category: 'utilities', amount: 0},
  //       {category: 'nightlife', amount: 0},
  //       {category: 'shopping', amount: 0},
  //       {category: 'cash', amount: 0},
  //       {category: 'other', amount: 0}
  //     ]
  //   for (var i = 0; i < dataObj.length; i++) {
  //     result[]
  //     if (dataObj[i].category.toLowerCase())
  //   }
  // }

  componentWillMount() {
    this.setState({
      totalSpent: this.calculateSpending(this.props.data)
    })
  }

  render() {
    if (this.props.isData) {  
    return (
        <div className='containPieAndLegend'>
          <div className='containPie'>
            <VictoryPie data={this.props.data}
            x="category"
            y="amount"
            height={250}
            padding={0}
            labels={function (datum){
              console.log('datum is: ', datum)
              console.log('totalSpent is: ', this.state.totalSpent)
              var theAmount = datum.y;
              if (Math.round(theAmount/this.state.totalSpent * 100) > 4) {
                return Math.round(theAmount/this.state.totalSpent * 100) + '%';
                }
              }.bind(this)
            }
            style={{
              labels: {
                padding: -70
              },
              width: 20
            }} 
            colorScale={this.state.colorScale}
            />
        </div>
        <div className='containLegend'>
          <VictoryLegend data={this.props.data} colors={this.state.colorScale}/>
        </div>
      </div>
      )
    } else {
      return <div></div>
    }
  }   
}

module.exports = TransactionChart;