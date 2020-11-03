import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';

import './App.css';
import Modal from './components/Modal/Modal';
import Backdrop from './components/Backdrop/Backdrop';
import List from './components/List/List';

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  toggleBlock = () => {
    this.setState((prevState) => {
      return { showBlock: !prevState.showBlock };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button className="Button" onClick={this.toggleBlock}>
          Toggle
        </button>
        <br />
        <Transition
          mountOnEnter
          unmountOnExit
          in={this.state.showBlock}
          timeout={1000}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: 'red',
                width: 100,
                height: 100,
                margin: 'auto',
                transition: 'all 1s ease-out',
                opacity: state === 'exiting' ? 0 : 1,
              }}
            ></div>
          )}
        </Transition>
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <Backdrop show={this.state.modalIsOpen} />
        <button onClick={this.showModal} className="Button">
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
