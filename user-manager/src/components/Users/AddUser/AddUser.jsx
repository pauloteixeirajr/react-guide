import { useState } from 'react';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Wrapper from '../../Helpers/Wrapper';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

import classes from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [error, setError] = useState();

  const addUserHandler = event => {
    event.preventDefault();
    if (!userName.trim().length || !userAge.trim().length) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age',
      });
      return;
    }
    if (+userAge < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (> 0)',
      });
      return;
    }
    onAddUser(userName, userAge);
    // Reset Form
    setUserName('');
    setUserAge('');
  };

  const usernameChangeHandler = ({ target: { value } }) => {
    setUserName(value);
  };

  const userageChangeHandler = ({ target: { value } }) => {
    setUserAge(value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onClose={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter a username..."
            value={userName}
            onChange={usernameChangeHandler}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            placeholder="Enter user age..."
            type="number"
            value={userAge}
            onChange={userageChangeHandler}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
