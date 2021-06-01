import { useState } from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';

import classes from './AddUser.module.css';

const AddUser = () => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');

  const addUserHandler = event => {
    event.preventDefault();
    console.log(userName, userAge);
  };

  const usernameChangeHandler = ({ target: { value } }) => {
    setUserName(value);
  };

  const userageChangeHandler = ({ target: { value } }) => {
    setUserAge(value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" onChange={usernameChangeHandler} />

        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" onChange={userageChangeHandler} />

        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
