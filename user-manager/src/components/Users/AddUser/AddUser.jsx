import { useState, useRef } from 'react';

import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Wrapper from '../../Helpers/Wrapper';
import ErrorModal from '../../UI/ErrorModal/ErrorModal';

import classes from './AddUser.module.css';

const AddUser = ({ onAddUser }) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = event => {
    event.preventDefault();

    const inputName = nameInputRef.current.value;
    const inputAge = ageInputRef.current.value;

    if (!inputName.trim().length || !inputAge.trim().length) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age',
      });
      return;
    }
    if (+inputAge < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (> 0)',
      });
      return;
    }
    onAddUser(inputName, inputAge);
    // Reset Form
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
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
            ref={nameInputRef}
          />

          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            placeholder="Enter user age..."
            type="number"
            ref={ageInputRef}
          />

          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
