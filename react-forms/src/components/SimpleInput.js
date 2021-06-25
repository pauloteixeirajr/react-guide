import { useState } from 'react';

const SimpleInput = () => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  const nameInputChangeHandler = event => {
    setName(event.target.value);
    setNameTouched(true);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();
    setNameTouched(true);

    if (name.trim() === '') {
      setIsNameValid(false);
      return;
    }
    setIsNameValid(true);
    console.log(name);

    setName('');
    setNameTouched(false);
  };

  const nameInputIsInvalid = !isNameValid && nameTouched;

  const formControlClasses = `form-control${
    nameInputIsInvalid ? ' invalid' : ''
  }`;

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
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
