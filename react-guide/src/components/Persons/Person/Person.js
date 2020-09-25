import React from 'react';
import classes from './Person.css';
import withClass from '../../../hoc/withClass';

const person = (props) => {
  // props.children outputs everything between the opening/closing tags
  return (
    <div>
      <p onClick={props.click}>
        I'm a {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default withClass(person, classes.Person);
