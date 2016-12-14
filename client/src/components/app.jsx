import React from 'react';
import SpendingList from './spending/spendingList.jsx';
import OwesList from './owes/owesList.jsx';
import Sidebar from './sidebar.jsx';
import Requests from './requests.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
    this.submit = this.submit.bind(this);
    this.submitOwesLoans = this.submitOwesLoans.bind(this);
    this.state = {
      signedIn: false,
      curr: (<SpendingList list={props.data} submit={this.submit}/>),
      data: this.props.data,
      transactions: [],
      debts: []
    };
  }

  loadTrans(data) {
    this.setState({
      transactions: data.transaction
    });

    this.setState({
      curr: (<SpendingList list={this.state.transactions} submit={this.submit} />)
    });
  }

  loadDebts(data) {
    this.setState({
      debts: data.debt
    });

    this.setState({
      curr: (<OwesList list={this.state.debts} submitOwesLoans={this.submitOwesLoans}/>)
    });
  }

  componentDidMount() {
    this.props.getReq({url: 'transactions'}, this.loadTrans.bind(this));
  }

  click(e) {
    if (e.target.innerHTML === 'Transactions') {
      this.setState({
        curr: (<SpendingList list={this.state.transactions} submit={this.submit} />)
      });
    } else if (e.target.innerHTML === 'Owes/Debts') {
      this.props.getReq({url: 'debts'}, this.loadDebts.bind(this));
    }
  }

  submit(e) {
    e.preventDefault();

    var spendingData = {
      category: e.target.children[1].children[0].children[e.target.children[1].children[0].selectedIndex].value,
      title: e.target.children[2].children[0].value,
      amount: '$' + e.target.children[3].children[1].value,
      url: 'transactions'
    };

    Requests.postReq(spendingData);

    this.props.getReq({url: 'transactions'}, this.loadTrans.bind(this));

    if (this.state.curr.type.name === 'SpendingList') {
      this.setState({
        curr: (<SpendingList list={this.state.transactions} submit={this.submit} />)
      });
    } else {
      this.setState({
        curr: (<OwesList list={this.state.debts} submitOwesLoans={this.submitOwesLoans}/>)
      });
    }
  }

  // deleteTransaction(e) {
  //   e.preventDefault();
    
  //   var data = {
  //     url: 'transactions',
  //     //don't know how this works
  //     title: e.target.children[2].children[0].value
  //   };
  //   postReq(data);
  //   this.props.getReq({url: 'transactions'}, this.loadTrans.bind(this));

  // }

  submitOwesLoans(e) {
    e.preventDefault();
    var owesLoansData = {
      person: e.target.children[1].children[0].value,
      type: e.target.children[2].children[0].value,
      amount: '$' + e.target.children[3].children[1].value,
      url: 'debts'
    };

    Requests.postReq(owesLoansData);

    this.props.getReq({url: 'debts'}, this.loadDebts.bind(this));
  }

  submitBudget(e) {
    console.log('hit');
    e.preventDefault();
    var data = {
      url: 'budget',
      restaurant: e.target.children[1].children[1].value,
      groceries:  e.target.children[2].children[1].value,
      transportation: e.target.children[3].children[1].value,
      shopping: e.target.children[4].children[1].value,
      utilities: e.target.children[5].children[1].value,
      nightlife: e.target.children[6].children[1].value,
      cash: e.target.children[7].children[1].value,
      other: e.target.children[8].children[1].value
    }

    postReq(data);
  }

  render() {
    return (
      <div id="wrapper" className="app">
        <div id='sidebar-wrapper'>
          <Sidebar click={this.click}/>
        </div>
        <div id='page-content-wrapper'>
          <h1 className='appTitle'><strong>Money</strong>.io</h1>
          {this.state.curr}
          <BudgetForm submitBudget={this.submitBudget} />
        </div>
      </div>
    );
  }

}
module.exports = App;