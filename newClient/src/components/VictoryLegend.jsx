import React from 'react';
import ReactDOM from 'react-dom';
import VictoryLegendItem from './VictoryLegendItem.jsx';

var VictoryLegend = (props) => {
  return (
    <div className='pieLegend'>
    {props.data.map( (transaction, index) => {
      return <VictoryLegendItem transaction={transaction} index={index}/>
    } )}
    </div>
  )
}

module.exports = VictoryLegend;
