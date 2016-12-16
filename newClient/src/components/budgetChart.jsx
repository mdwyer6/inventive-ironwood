import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryContainer, VictoryPortal, VictoryLabel} from 'victory';

class Main extends React.Component {
  constructor(props) {
  	super(props);
    this.generateValues = this.generateValues.bind(this);
  	this.state = {
  	  data: [
			  {category: 'restaurant', percent: 5, fill: '#67b7dc'},
			  {category: 'groceries', percent: 22, fill: '#fdd400'},
			  {category: 'transportation', percent: 45, fill: '#84b761'},
			  {category: 'utilities', percent: 7, fill: '#cc4748'},
			  {category: 'nightlife', percent: 15, fill: '#cd82ad'},
			  {category: 'cash', percent: 45, fill: '#b7b83f'},
			  {category: 'other', percent: 14, fill: '#ff9900'},
			],
      tickValues: null
  	}
  }

  generateValues(dataObj) {
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

  componentWillMount() {
    this.setState({
      tickValues: this.generateValues(this.state.data)
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
            tickValues={["restaurant", "groceries", "transportation", "utilities", "nightlife", "cash", "other"]}
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

module.exports = Main;
