import { useState } from 'react';

import './NewExpense.css';

import ExpenseForm from '../ExpenseForm/ExpenseForm';

const NewExpense = ({ onAddExpense }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const saveExpenseDataHandler = data => {
    const expenseData = {
      ...data,
      id: Math.random().toString(),
    };

    onAddExpense(expenseData);
    setIsFormVisible(false);
  };

  const cancelNewExpenseHandler = () => {
    setIsFormVisible(false);
  };

  return (
    <div className="new-expense">
      {isFormVisible ? (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancelNewExpense={cancelNewExpenseHandler}
        />
      ) : (
        <button onClick={() => setIsFormVisible(true)}>Add Expense</button>
      )}
    </div>
  );
};

export default NewExpense;
