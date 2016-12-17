import React from 'react';
import ReactDOM from 'react-dom';

/*
console.log('VictoryLegendItem props.transaction is: ', props.transaction);
  var counter = -1;
  counter++;
  var pieLabelCounter = 'pieLabel' + counter;
*/

class VictoryLegendItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      counter: -1
    }
  }

  componentWillMount() {
    this.setState({
      counter: ++this.state.counter
    })
  }

  render() {
    return (
      <div>
        <div className='pieComponent'>
            <div className='pieLabel' id={'pieLabel' + this.props.index}></div>
            <p className='pieCategory'>{this.props.transaction.category}</p>
        </div>
        {'\n'}
      </div>
    )
  } 
    
}

module.exports = VictoryLegendItem;