import React from 'react';
import { postBudget } from '../lib/ajax.js';
import BudgetChart from './budgetChart.jsx';


class BudgetForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Percent to Budget</h1>
        <BudgetChart />
        <form className="form-inline" onSubmit={postBudget}>
          <h3>Create a Monthly Budget</h3>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Restaurant"/>
          </div>
          <div id="descBox" className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Groceries"/>
          </div>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Transportation" />
          </div>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Shopping" />
          </div>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Utilities" />
          </div>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Nightlife" />
          </div>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Cash" />
          </div>
          <div className="input-group">
            <div className="input-group-addon">$</div>
            <input type="text" className="form-control" placeholder="Other" />
          </div>
          <br />
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>
    )
  }
}
  


module.exports = BudgetForm;