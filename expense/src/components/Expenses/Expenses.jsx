import ExpenseItem from '../ExpenseItem/ExpenseItem';

import './Expenses.css';

const Expenses = ({ expenses }) => {
  return (
    <div className="expenses">
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
