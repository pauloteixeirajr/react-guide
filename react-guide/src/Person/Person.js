import React from 'react';

const person = (props) => {
  // props.children outputs everything between the opening/closing tags
  return (
    <div>
      <p>
        I'm a {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
    </div>
  );
};

export default person;
