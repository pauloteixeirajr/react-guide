import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props) => (props.show ? 'red' : 'green')};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  border-radius: 3px;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props) => (props.show ? 'salmon' : 'lightgreen')};
    color: black;
  },
`;

class App extends Component {
  state = {
    persons: [
      { id: '123', name: 'Max', age: 28 },
      { id: '456', name: 'Manu', age: 29, hobbies: 'Racing' },
      { id: '789', name: 'Stephanie', age: 26 },
    ],
    showPersons: false,
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(
      (person) => person.id === id
    );
    const person = {
      ...this.state.persons[personIndex],
      name: event.target.value,
    };
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons });
  };

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons,
    });
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons });
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={this.deletePersonHandler.bind(this, index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
    }

    const classes = [];

    if (this.state.persons.length < 3) {
      classes.push('red');
    }
    if (this.state.persons.length < 2) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>Click the button to toggle persons</p>
        <StyledButton
          show={this.state.showPersons}
          onClick={this.togglePersonsHandler}
        >
          Toggle Persons
        </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;
