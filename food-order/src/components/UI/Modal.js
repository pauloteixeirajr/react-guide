import React from 'react';
import { createPortal } from 'react-dom';

import classes from './Modal.module.css';

const Backdrop = () => {
  return <div className={classes.backdrop} />;
};

const ModalOverlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const Modal = ({ children }) => {
  const container = document.getElementById('overlays');
  return (
    <React.Fragment>
      {createPortal(<Backdrop />, container)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, container)}
    </React.Fragment>
  );
};

export default Modal;
