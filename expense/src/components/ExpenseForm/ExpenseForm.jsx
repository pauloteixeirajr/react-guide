import { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = ({ onSaveExpenseData }) => {
  const [userInput, setUserInput] = useState({
    title: '',
    amount: 0,
    date: '',
  });

  const titleChangeHandler = event => {
    setUserInput(prevState => {
      return {
        ...prevState,
        title: event.target.value,
      };
    });
  };

  const amountChangeHandler = event => {
    setUserInput(prevState => {
      return {
        ...prevState,
        amount: +event.target.value,
      };
    });
  };

  const dateChangeHandler = event => {
    setUserInput(prevState => {
      return {
        ...prevState,
        date: event.target.value,
      };
    });
  };

  const submitHandler = event => {
    event.preventDefault();

    const expenseData = {
      ...userInput,
      date: new Date(userInput.date),
    };

    onSaveExpenseData(expenseData);

    // Reset Form
    setUserInput({
      title: '',
      amount: 0,
      date: '',
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.title}
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.amount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            value={userInput.date}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
