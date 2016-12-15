import React from 'react';
import moment from 'moment';
import Requests from '../requests.js'

var SpendingListEntry = (props) => return {
  return (
  <tr>
    <td><img height='40' src={Requests.pickCategories(props.entry.category)}></img></td>
    <td>{props.entry.title}</td>
    <td>{props.entry.amount}</td>
    <td>{moment(props.entry.created_at).fromNow()}</td>
    <td><button className='btn btn-danger' onClick={props.}>Remove</button></td>
  </tr>
  );
} 

SpendingListEntry.protoTypes = {
  entry: React.PropTypes.object.isRequired
};

module.exports = SpendingListEntry;