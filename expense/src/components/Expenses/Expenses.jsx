import { useState } from 'react';

import ExpenseItem from '../ExpenseItem/ExpenseItem';
import ExpensesFilter from '../ExpensesFilter/ExpensesFilter';

import './Expenses.css';

const Expenses = ({ expenses }) => {
  const [filteredYear, setFilteredYear] = useState('2021');

  const filterChangeHandler = year => {
    setFilteredYear(year);
  };

  const filteredExpenses = expenses.filter(expense => {
    return expense.date.getFullYear() === +filteredYear;
  });

  return (
    <div className="expenses">
      <ExpensesFilter
        selectedYear={filteredYear}
        onFilterChange={filterChangeHandler}
      />
      {filteredExpenses.length === 0 && <p>No expenses found</p>}
      {filteredExpenses.map(expense => (
        <ExpenseItem
          key={expense.id}
          date={expense.date}
          title={expense.title}
          amount={expense.amount}
        />
      ))}
    </div>
  );
};

export default Expenses;
