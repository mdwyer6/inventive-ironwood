import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getLoansByType, changeLoanStatus, deleteLoan } from '../lib/ajax.js';
import { ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.updateLoanHandler = this.updateLoanHandler.bind(this);
    this.deleteLoanHandler = this.deleteLoanHandler.bind(this);
  }

  updateLoanHandler(e) {
    e.preventDefault();
    changeLoanStatus(this.props.loan._pivot_id, this.props.loan._pivot_status, (data) => console.log('changeLoanSuccess'));
  }

  deleteLoanHandler(e) {
    e.preventDefault();
    deleteLoan(this.props.loan._pivot_id, this.props.loan._pivot_status, (data) => console.log('Delete loan success'));
  }

  render() {
    return (
      <div>
        <ButtonToolbar>
          <Button onClick={this.updateLoanHandler} bsStyle="primary" bsSize="xsmall">Confirm</Button>
          <Button onClick={this.deleteLoanHandler} bsSize="xsmall">Delete Request</Button>
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
  }

  getLoans(e) {
    e.preventDefault();
    this.props.getLoans(e.target.name);
  }

  statusFormatter(cell, row) {
    if (this.props.type === 'toCollect' && cell === 'borrowerConfirm' || this.props.type === 'toPayback' && cell === 'lenderConfirm') {
      return (
        <em>Pending approval</em>
      );
    } else if (this.props.type === 'toCollect' && cell === 'lenderConfirm' || this.props.type === 'toPayback' && cell === 'borrowerConfirm') {
      return (
        <ConfirmDelete loan={row} />
      );
    } else if (cell === 'active') {
      return (
        <span>Active</span>
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

        <BootstrapTable data={this.props.loans} striped hover condensed>
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