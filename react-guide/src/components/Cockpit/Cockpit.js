import React from 'react';
import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {
  const assignedClasses = [];
  let btnClass = '';

  if (props.showPersons) btnClass = classes.Red;

  if (props.persons.length < 3) {
    assignedClasses.push(classes.red);
  }
  if (props.persons.length < 2) {
    assignedClasses.push(classes.bold);
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>
        Click the button to toggle persons
      </p>
      <button className={btnClass} onClick={props.clicked}>
        Toggle Persons
      </button>
      <AuthContext.Consumer>
        {(context) => <button onClick={context.login}>Log In</button>}
      </AuthContext.Consumer>
    </div>
  );
};

export default cockpit;
