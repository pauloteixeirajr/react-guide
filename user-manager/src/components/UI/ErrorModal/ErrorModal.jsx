import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import Card from '../Card/Card';
import classes from './ErrorModal.module.css';

const Backdrop = ({ onClose }) => {
  return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay = ({ title, message, onClose }) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{title}</h2>
      </header>
      <div className={classes.content}>
        <p>{message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={onClose}>Okay</Button>
      </footer>
    </Card>
  );
};

const ErrorModal = ({ title, message, onClose }) => {
  return (
    <React.Fragment>
      {createPortal(
        <Backdrop onClose={onClose} />,
        document.getElementById('backdrop-root')
      )}
      {createPortal(
        <ModalOverlay title={title} message={message} onClose={onClose} />,
        document.getElementById('overlay-root')
      )}
    </React.Fragment>
  );
};

export default ErrorModal;
