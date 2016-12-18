import React from 'react';
import Autocomplete from 'react-autocomplete';
import { styles } from '../lib/autocompleteStyles.js';
import { filterUsers, createLoan } from '../lib/ajax.js';
import { browserHistory } from 'react-router';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

class CreateLoanForm extends React.Component {
  constructor(props) {
    super(props);
    this.updateFormData = this.updateFormData.bind(this);
    this.transaction = this.transaction.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.state = {
      userInput: '',
      userResults: [],
      loading: false,
      memo: '',
      amount: '',
      activeMode: {text: 'Loan to:', class: 'btn btn-danger', transactionType: 'loan'},
      inactiveMode: {text: 'Borrow from:', class: 'btn btn-success', transactionType: 'borrow'}
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
    createLoan(this.state.userInput, this.state.memo, this.state.amount, this.state.activeMode.transactionType, (data) => {
      console.log('Go');
      this.props.getLoans();
    });
  }

  toggleMode(e) {
    e.preventDefault();
    var oldActiveMode = this.state.activeMode;
    var oldInactiveMode = this.state.inactiveMode;
    this.setState({activeMode: oldInactiveMode, inactiveMode: oldActiveMode});
  }

  render() {
    return (
      <form className='form-inline'>
        <h3>Create a Loan</h3>

        <ButtonToolbar className="form-group">
          <DropdownButton bsStyle={this.state.activeMode.class} title={this.state.activeMode.text}>
            <MenuItem onClick={this.toggleMode}>{this.state.inactiveMode.text}</MenuItem>
          </DropdownButton>
        </ButtonToolbar>

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
          <button onClick={this.transaction} type="submit" className="btn btn-primary">Submit</button>
        </div>

      </form>
    );
  }
}

module.exports = CreateLoanForm;