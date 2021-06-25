import useInput from '../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => isNotEmpty(value) && value.includes('@');

const BasicForm = () => {
  const [
    firstName,
    firstNameIsValid,
    firstNameIsInvalid,
    firstNameChangeHandler,
    firstNameBlurHandler,
    resetFirstName,
  ] = useInput(isNotEmpty);

  const [
    lastName,
    lastNameIsValid,
    lastNameIsInvalid,
    lastNameChangeHandler,
    lastNameBlurHandler,
    resetLastName,
  ] = useInput(isNotEmpty);

  const [
    email,
    emailIsValid,
    emailIsInvalid,
    emailChangeHandler,
    emailBlurHandler,
    resetEmail,
  ] = useInput(isEmail);

  const isValidForm = firstNameIsValid && lastNameIsValid && emailIsValid;

  const formSubmitHandler = event => {
    event.preventDefault();

    if (!isValidForm) return;

    console.log(firstName, lastName, email);

    resetFirstName();
    resetLastName();
    resetEmail();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={`form-control${firstNameIsInvalid ? ' invalid' : ''}`}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler}
          />
          {firstNameIsInvalid && (
            <p className="error-text">First Name must not be empty</p>
          )}
        </div>
        <div className={`form-control${lastNameIsInvalid ? ' invalid' : ''}`}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastName}
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
          />
          {lastNameIsInvalid && (
            <p className="error-text">Last Name must not be empty</p>
          )}
        </div>
      </div>
      <div className={`form-control${emailIsInvalid ? ' invalid' : ''}`}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
        />
        {emailIsInvalid && <p className="error-text">Enter a valid email</p>}
      </div>
      <div className="form-actions">
        <button disabled={!isValidForm}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
