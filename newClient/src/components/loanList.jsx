import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getLoansByType } from '../lib/ajax.js';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e) {
    e.preventDefault();
    //Have access to loan id here... need ajax to confirm loan
    console.log(this.props.loan.id);
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button onClick={this.clickHandler} bsStyle="primary" bsSize="xsmall">Confirm</Button>
          <Button onClick={this.clickHandler} bsSize="xsmall">Delete Request</Button>
        </ButtonToolbar>
      </div>
    );
  }
}

function currencyFormatter(cell, row) {
  return `<i class='glyphicon glyphicon-usd'></i> ${cell}`;
}

class LoanList extends React.Component {
  constructor(props) {
    super(props);
    this.getLoans = this.getLoans.bind(this);
    this.statusFormatter = this.statusFormatter.bind(this);
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
    var type = e.target.name;
    getLoansByType(e.target.name, (loans) => this.setState({loans: loans, type: type}));
  }

  statusFormatter(cell, row) {
    if (this.state.type === 'toCollect' && cell === 'borrowerConfirm' || this.state.type === 'toPayback' && cell === 'lenderConfirm') {
      return (
        <em>Pending approval</em>
      );
    } else if (this.state.type === 'toCollect' && cell === 'lenderConfirm' || this.state.type === 'toPayback' && cell === 'borrowerConfirm') {
      return (
        <ConfirmDelete loan={row} />
      );
    }
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <ButtonGroup>
            <Button onClick={this.getLoans} name="toCollect" bsStyle="success">To Collect</Button>
            <Button onClick={this.getLoans} name="toPayback" bsStyle="danger">To Pay</Button>
          </ButtonGroup>
        </ButtonToolbar>

        <BootstrapTable data={this.state.loans} striped hover condensed>
          <TableHeaderColumn dataField='_pivot_date' isKey dataSort>Date</TableHeaderColumn>
          <TableHeaderColumn dataField='username' dataSort>Who</TableHeaderColumn>
          <TableHeaderColumn dataField='_pivot_memo' dataSort>Memo</TableHeaderColumn>
          <TableHeaderColumn dataField='_pivot_loanAmount' dataFormat={currencyFormatter} dataSort>Total</TableHeaderColumn>
          <TableHeaderColumn dataField='_pivot_status' dataFormat={ this.statusFormatter } dataSort>Status</TableHeaderColumn>
          {/* <TableHeaderColumn dataField='username' isKey>Balance Due</TableHeaderColumn> */}
        </BootstrapTable>
      </div>
    );
  }
}

module.exports = LoanList;