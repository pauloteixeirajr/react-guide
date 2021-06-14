import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef(
  ({ isValid, id, label, type, value, changeHandler, blurHandler }, ref) => {
    const inputRef = useRef();

    const activate = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => ({
      focus: activate,
    }));

    return (
      <div
        className={`${classes.control} ${
          isValid === false ? classes.invalid : ''
        }`}
      >
        <label htmlFor={id}>{label}</label>
        <input
          ref={inputRef}
          type={type}
          id={id}
          value={value}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </div>
    );
  }
);

export default Input;
