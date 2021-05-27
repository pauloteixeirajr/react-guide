import { useState } from 'react';

import ExpenseItem from '../ExpenseItem/ExpenseItem';
import ExpensesFilter from '../ExpensesFilter/ExpensesFilter';

import './Expenses.css';

const Expenses = ({ expenses }) => {
  const [filteredYear, setFilteredYear] = useState('2021');

  const filterChangeHandler = year => {
    setFilteredYear(year);
  };

  return (
    <div className="expenses">
      <ExpensesFilter
        selectedYear={filteredYear}
        onFilterChange={filterChangeHandler}
      />
      {expenses.map(expense => (
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
