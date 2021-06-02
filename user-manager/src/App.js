import { useState } from 'react';
import AddUser from './components/Users/AddUser/AddUser';
import UsersList from './components/Users/UsersList/UsersList';
import Wrapper from './components/Helpers/Wrapper';

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
    <Wrapper>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={users} />
    </Wrapper>
  );
}

export default App;
