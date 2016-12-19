import React from 'react';
import moment from 'moment';

var TransactionListEntry = (props) => {
  return (
    <tr>
      <td><img height='40' src={props.getImage(props.entry.category)}></img></td>
      <td>{props.entry.title}</td>
      <td>{props.entry.amount}</td>
      <td>{moment(props.entry.created_at).fromNow()}</td>
      <td><button className='btn btn-danger'>Remove</button></td>
    </tr>
  );
} 

TransactionListEntry.protoTypes = {
  entry: React.PropTypes.object.isRequired
};

module.exports = TransactionListEntry;