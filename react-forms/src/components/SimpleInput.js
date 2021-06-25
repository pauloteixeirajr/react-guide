import { useState } from 'react';

const SimpleInput = () => {
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);

  const isNameValid = name.trim() !== '';
  const nameInputIsInvalid = !isNameValid && nameTouched;
  const formIsValid = isNameValid;

  const nameInputChangeHandler = event => {
    setName(event.target.value);
    setNameTouched(true);
  };

  const nameInputBlurHandler = event => {
    setNameTouched(true);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();
    setNameTouched(true);

    if (!isNameValid) return;

    console.log(name);

    setName('');
    setNameTouched(false);
  };

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
          onBlur={nameInputBlurHandler}
        />
        {nameInputIsInvalid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
