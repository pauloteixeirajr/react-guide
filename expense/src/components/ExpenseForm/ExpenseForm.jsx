import { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = () => {
  const [, setTitle] = useState('');
  const [, setAmount] = useState(0);
  const [, setDate] = useState(null);

  const titleChangeHandler = event => {
    setTitle(event.target.value);
  };

  const amountChangeHandler = event => {
    setAmount(+event.target.value);
  };

  const dateChangeHandler = event => {
    setDate(event.target.value);
  };

  return (
    <form>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input type="date" onChange={dateChangeHandler} />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
