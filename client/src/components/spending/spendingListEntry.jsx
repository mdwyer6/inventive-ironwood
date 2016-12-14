var SpendingListEntry = (props) => (
  <tr>
    <td><img height='40' src={pickCategories(props.entry.category)}></img></td>
    <td>{props.entry.title}</td>
    <td>{props.entry.amount}</td>
    <td>{moment(props.entry.created_at).fromNow()}</td>
    <td><button className='btn btn-danger' onClick={props.}>Remove</button></td>
  </tr>
  );

SpendingListEntry.protoTypes = {
  entry: React.PropTypes.object.isRequired
};

window.SpendingListEntry = SpendingListEntry;