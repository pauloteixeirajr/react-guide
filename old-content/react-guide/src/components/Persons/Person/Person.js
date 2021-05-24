import React from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';

const person = (props) => {
  // props.children outputs everything between the opening/closing tags
  return (
    <div>
      <AuthContext.Consumer>
        {(context) =>
          context.authenticated ? <p>Authenticated!</p> : <p>Please Log In</p>
        }
      </AuthContext.Consumer>
      <p onClick={props.click}>
        I'm a {props.name} and I am {props.age} years old!
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
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
