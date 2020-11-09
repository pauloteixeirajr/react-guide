import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

export default (WrappedComponent, axios) => {
  const ErrorComponent = (props) => {
    const [error, setError] = useState(null);

    const reqIntercepter = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqIntercepter);
        axios.interceptors.response.eject(resInterceptor);
      };
    }, [reqIntercepter, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    };

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
