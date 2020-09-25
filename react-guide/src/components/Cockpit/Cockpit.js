import React, { useEffect } from 'react';
import classes from './Cockpit.css';

const cockpit = (props) => {
  useEffect(
    () => setTimeout(() => alert('Saved data to the cloud'), 1000),
    // Leave the array empty to trigger only when the component loads
    [props.persons]
  );

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
    </div>
  );
};

export default cockpit;
