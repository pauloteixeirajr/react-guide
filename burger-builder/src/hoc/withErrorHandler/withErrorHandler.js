import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';

export default (WrappedComponent, axios) => {
  const ErrorComponent = (props) => {
    const [error, errorConfirmedHandler] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal modalClosed={errorConfirmedHandler} show={error}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };

  return ErrorComponent;
};
