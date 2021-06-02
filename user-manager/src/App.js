import React from 'react';
import { useState } from 'react';
import AddUser from './components/Users/AddUser/AddUser';
import UsersList from './components/Users/UsersList/UsersList';

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = (name, age) => {
    const user = {
      name,
      age,
      id: Math.random().toString(),
    };

    setUsers(prevState => {
      return [...prevState, user];
    });
  };

  return (
    // <> -> Is also a valid Fragment
    <React.Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={users} />
    </React.Fragment>
    // </>
  );
}

export default App;
