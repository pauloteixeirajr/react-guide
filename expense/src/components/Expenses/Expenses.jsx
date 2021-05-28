import { useState } from 'react';

import ExpensesFilter from '../ExpensesFilter/ExpensesFilter';
import ExpensesList from '../ExpensesList/ExpensesList';

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
      <ExpensesList items={filteredExpenses} />
    </div>
  );
};

export default Expenses;
