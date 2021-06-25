import { useState } from 'react';

const SimpleInput = () => {
  const [name, setName] = useState('');
  const [nameTouched, setNameTouched] = useState(false);
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  const isNameValid = name.trim() !== '';
  const isEmailValid = email.trim() !== '' && email.includes('@');

  const nameInputIsInvalid = !isNameValid && nameTouched;
  const emailInputIsInvalid = !isEmailValid && emailTouched;

  const formIsValid = isNameValid && isEmailValid;

  const nameInputChangeHandler = event => {
    setName(event.target.value);
    setNameTouched(true);
  };

  const nameInputBlurHandler = event => {
    setNameTouched(true);
  };

  const emailInputChangeHandler = event => {
    setEmail(event.target.value);
    setEmailTouched(true);
  };

  const emailInputBlurHandler = event => {
    setEmailTouched(true);
  };

  const formSubmissionHandler = event => {
    event.preventDefault();
    setNameTouched(true);

    if (!isNameValid || !isEmailValid) return;

    console.log(name, email);

    setName('');
    setEmail('');
    setNameTouched(false);
    setEmailTouched(false);
  };

  const nameFormControlClasses = `form-control${
    nameInputIsInvalid ? ' invalid' : ''
  }`;

  const emailFormControlClasses = `form-control${
    emailInputIsInvalid ? ' invalid' : ''
  }`;

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameFormControlClasses}>
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
      <div className={emailFormControlClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          value={email}
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputIsInvalid && (
          <p className="error-text">Email must be valid</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
