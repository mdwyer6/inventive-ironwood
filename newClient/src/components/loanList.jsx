import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getLoansByType } from '../lib/ajax.js';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

class LoanList extends React.Component {
  constructor(props) {
    super(props);
    this.getLoans = this.getLoans.bind(this);
    this.state = {
      loans: [],
      type: 'toCollect'
    };
  }

  componentDidMount() {
    getLoansByType('toCollect', (loans) => this.setState({loans: loans}));
  }

  getLoans(e) {
    e.preventDefault();
    getLoansByType(e.target.name, (loans) => this.setState({loans: loans}));
  }


  render() {
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.getLoans} name="toCollect" bsStyle="success">To Collect</Button>
            <Button onClick={this.getLoans} name="toPayback" bsStyle="danger">To Pay</Button>
          </ButtonGroup>
        </ButtonToolbar><br/>

        <BootstrapTable data={this.state.loans} striped hover condensed>
          <TableHeaderColumn dataField='_pivot_date' isKey dataSort>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='username' dataSort>Who</TableHeaderColumn>
          <TableHeaderColumn dataField='_pivot_memo' dataSort>Memo</TableHeaderColumn>
          <TableHeaderColumn dataField='_pivot_loanAmount' dataSort>Total</TableHeaderColumn>
          {/* <TableHeaderColumn dataField='username' isKey>Balance Due</TableHeaderColumn> */}
        </BootstrapTable>
      </div>
    );
  }
}

module.exports = LoanList;