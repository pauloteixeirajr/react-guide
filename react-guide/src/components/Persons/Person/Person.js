import React from 'react';
import PropTypes from 'prop-types';

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
      <input
        ref={(inputEl) => {
          inputEl.focus();
        }}
        type="text"
        onChange={props.changed}
        value={props.name}
      />
    </div>
  );
};

person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(person, classes.Person);
