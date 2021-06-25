import { useState } from 'react';

const SimpleInput = () => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);

  const nameInputChangeHandler = event => {
    setName(event.target.value);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (name.trim() === '') {
      setIsNameValid(false);
      return;
    }
    setIsNameValid(true);
    console.log(name);

    setName('');
  };

  const formControlClasses = `form-control${!isNameValid ? ' invalid' : ''}`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={formControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          value={name}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
        />
        {!isNameValid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
