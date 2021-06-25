import useInput from '../hooks/use-input';

const SimpleInput = () => {
  const [
    name,
    nameInputIsInvalid,
    nameInputChangeHandler,
    nameInputBlurHandler,
    resetName,
  ] = useInput(value => value.trim() !== '');

  const [
    email,
    emailInputIsInvalid,
    emailInputChangeHandler,
    emailInputBlurHandler,
    resetEmail,
  ] = useInput(value => value.trim() !== '' && value.includes('@'));

  const formIsValid = !nameInputIsInvalid && !emailInputIsInvalid;

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (nameInputIsInvalid || emailInputIsInvalid) return;

    console.log(name, email);

    resetName();
    resetEmail();
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
