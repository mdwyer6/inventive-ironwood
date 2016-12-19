import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getLoansByType, changeLoanStatus, deleteLoan } from '../lib/ajax.js';
import { ButtonToolbar, ButtonGroup, Button, Nav, NavItem, Tab, Row, Col } from 'react-bootstrap';

class ConfirmDelete extends React.Component {
  constructor(props) {
    super(props);
    this.updateLoanHandler = this.updateLoanHandler.bind(this);
    this.deleteLoanHandler = this.deleteLoanHandler.bind(this);
  }

  updateLoanHandler(e) {
    e.preventDefault();
    changeLoanStatus(this.props.loan.id, this.props.loan.status, (data) => {
      this.props.getLoans();
      console.log('changeLoanSuccess');
    });
  }

  deleteLoanHandler(e) {
    e.preventDefault();
    deleteLoan(this.props.loan.id, this.props.loan.status, (data) => {
      this.props.getLoans();
      console.log('deleteLoanSuccess');
    });
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
    this.nameFormatter = this.nameFormatter.bind(this);
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
        <ConfirmDelete getLoans={this.props.getLoans} loan={row} />
      );
    } else if (cell === 'active') {
      return (
        <span>Active</span>
      );
    }
  }

  nameFormatter(cell, row) {
    var name = cell.firstName + ' ' + cell.lastName;
    var capitalized = name.replace(/(^|\s)[a-z]/g, function(f){ return f.toUpperCase(); });
    return capitalized;
  }

  render() {
    if (this.props.type === 'toCollect') {
      var who = 'borrower';
    } else {
      var who = 'lender';
    }

    return (
      <div>
        <Tab.Container id="tabs-with-dropdown" defaultActiveKey={1}>
          <Row className="clearfix">

            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem name="toCollect" onClick={this.getLoans} eventKey={1}>Loans to Collect</NavItem>
                <NavItem name="toPayback" onClick={this.getLoans} eventKey={2}>Loans to Payback</NavItem>
              </Nav>
            </Col>

            <Col sm={12}>
              <BootstrapTable data={this.props.loans} striped hover condensed>
                <TableHeaderColumn dataField='date' isKey dataSort>Date</TableHeaderColumn>
                <TableHeaderColumn dataField={who} dataFormat={this.nameFormatter} dataSort>Who</TableHeaderColumn>
                <TableHeaderColumn dataField='memo' dataSort>Memo</TableHeaderColumn>
                <TableHeaderColumn dataField='loanAmount' dataFormat={currencyFormatter} dataSort>Total</TableHeaderColumn>
                <TableHeaderColumn dataField='status' dataFormat={ this.statusFormatter } dataSort>Status</TableHeaderColumn>
                {/* <TableHeaderColumn dataField='username' isKey>Balance Due</TableHeaderColumn> */}
              </BootstrapTable>
            </Col>

          </Row>
        </Tab.Container>

      </div>
    );
  }
}

module.exports = LoanList;