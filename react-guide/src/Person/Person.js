import React from 'react';
import './Person.css';
import Radium from 'radium';

const person = (props) => {
  // props.children outputs everything between the opening/closing tags
  return (
    <div className="Person">
      <p onClick={props.click}>
        I'm a {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  );
};

export default Radium(person);
