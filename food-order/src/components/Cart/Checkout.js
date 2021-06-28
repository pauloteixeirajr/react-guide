import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length > 4;

const Checkout = ({ onCancel, onConfirm }) => {
  const nameInput = useRef();
  const addressInput = useRef();
  const postalInput = useRef();
  const cityInput = useRef();

  const [validity, setValidity] = useState({
    name: true,
    address: true,
    city: true,
    postal: true,
  });

  const onSubmitHandler = event => {
    event.preventDefault();

    const name = nameInput.current.value;
    const address = addressInput.current.value;
    const city = cityInput.current.value;
    const postal = postalInput.current.value;

    const nameIsValid = !isEmpty(name);
    const addressIsValid = !isEmpty(address);
    const cityIsValid = !isEmpty(city);
    const postalIsValid = isFiveChars(postal);

    setValidity({
      name: nameIsValid,
      address: addressIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    });

    const formIsValid =
      nameIsValid && addressIsValid && cityIsValid && postalIsValid;

    if (!formIsValid) return;

    onConfirm({
      name,
      address,
      city,
      postal,
    });
  };

  const nameClasses = `${classes.control} ${
    validity.name ? '' : classes.invalid
  }`;
  const addressClasses = `${classes.control} ${
    validity.address ? '' : classes.invalid
  }`;
  const postalClasses = `${classes.control} ${
    validity.postal ? '' : classes.invalid
  }`;
  const cityClasses = `${classes.control} ${
    validity.city ? '' : classes.invalid
  }`;

  return (
    <form onSubmit={onSubmitHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!validity.name && <p>Enter a valid name!</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInput} />
        {!validity.address && <p>Enter a valid address!</p>}
      </div>
      <div className={postalClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalInput} />
        {!validity.postal && <p>Enter a valid postal code!</p>}
      </div>
      <div className={cityClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!validity.city && <p>Enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
