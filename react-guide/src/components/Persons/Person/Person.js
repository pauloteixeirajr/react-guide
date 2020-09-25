import React from 'react';
import classes from './Person.css';
import WithClass from '../../../hoc/WithClass';

const person = (props) => {
  // props.children outputs everything between the opening/closing tags
  return (
    <WithClass classes={classes.Person}>
      <p onClick={props.click}>
        I'm a {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </WithClass>
  );
};

export default person;
