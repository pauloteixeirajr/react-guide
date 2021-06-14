import React from 'react';

import classes from './Input.module.css';

const Input = ({
  isValid,
  id,
  label,
  type,
  value,
  changeHandler,
  blurHandler,
}) => {
  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    </div>
  );
};

export default Input;
