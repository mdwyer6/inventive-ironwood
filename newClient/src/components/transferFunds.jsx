import React from 'react';
import Autocomplete from 'react-autocomplete';
import { styles } from '../lib/autocompleteStyles.js';
import { filterUsers, transferFunds } from '../lib/ajax.js';

class TransferFunds extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormData = this.updateFormData.bind(this);
    this.transaction = this.transaction.bind(this);
    this.state = {
      userInput: '',
      userResults: [],
      loading: false,
      memo: '',
      amount: ''
    };
  }

  updateFormData(e) {
    e.preventDefault();
    var field = e.target.name;
    var state = {};
    state[field] = e.target.value;
    this.setState(state);
  }

  transaction(e) {
    e.preventDefault();
    transferFunds(this.state.userInput, this.state.memo, this.state.amount, (data) => {
      this.setState({userInput: '', memo: '', amount: ''});
    });
  }

  render() {
    return (
      <form className='form-inline'>
        <h3>Transfer Funds</h3>
        <div className="form-group">
          <Autocomplete
            inputProps={{placeholder: 'Who', className: 'form-control'}}
            ref="autocomplete"
            value={this.state.userInput}
            items={this.state.userResults}
            getItemValue={(item) => item.username}
            onSelect={(value, item) => {
              this.setState({ userInput: value, userResults: [ item ] });
            }}
            onChange={(event, value) => {
              this.setState({ userInput: value, loading: true });
              filterUsers(value, (items) => {
                console.log(items);
                this.setState({ userResults: items, loading: false });
              });
            }}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? styles.highlightedItem : styles.item}
                key={item.abbr}
                id={item.abbr}
              >{item.username}</div>
            )}
          />
        </div>
        <div className="form-group">
          <input type="text" name="memo" onChange={this.updateFormData} className="form-control" placeholder="Memo"/>
        </div>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" name="amount" onChange={this.updateFormData} className="form-control" placeholder="Amount" />
          </div>
        </div>
        <div className="form-group">
          <button onClick={this.transaction} name="borrow" type="submit" className="btn btn-success">Transfer</button>
        </div>

      </form>
    );
  }

}

module.exports = TransferFunds;