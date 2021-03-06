import React from 'react';
import ReactDOM from 'react-dom';

var VictoryLegend = (props) => {
  return (
    <div className='pieLegend'>
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel1'></div>
        <p className='pieCategory'>{props.data[0].category}</p>
      </div>
      {'\n'}
      <div className='pieComponent'></div>
        <div className='pieLabel' id='pieLabel2'></div>
        <p className='pieCategory'>{props.data[1].category}</p>
      {'\n'}
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel3'></div>
        <p className='pieCategory'>{props.data[2].category}</p>
      </div>
      {'\n'}
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel4'></div>
        <p className='pieCategory'>{props.data[3].category}</p>
      </div>
      {'\n'}
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel5'></div>
        <p className='pieCategory'>{props.data[4].category}</p>
      </div>
      {'\n'}
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel6'></div>
        <p className='pieCategory'>{props.data[5].category}</p>
      </div>
      {'\n'}
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel7'></div>
        <p className='pieCategory'>{props.data[6].category}</p>
      </div>
      <div className='pieComponent'>
        <div className='pieLabel' id='pieLabel8'></div>
        <p className='pieCategory'>{props.data[7].category}</p>
      </div>
    </div>
  )
}

module.exports = VictoryLegend;
