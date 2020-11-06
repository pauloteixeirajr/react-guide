import { useReducer, useCallback } from 'react';

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
        extra: null,
        identifier: action.identifier,
      };
    case 'RESPONSE':
      return {
        ...state,
        loading: false,
        data: action.data,
        extra: action.extra,
      };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'CLEAR':
      return { ...state, error: null };
    default:
      throw new Error('Should not reach');
  }
};

export const useHttp = () => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null,
  });

  const clear = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const sendRequest = useCallback((url, method, body, extra, identifier) => {
    dispatch({ type: 'SEND', identifier });
    fetch(url, {
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'RESPONSE', data, extra });
      })
      .catch((err) => {
        dispatch({ type: 'ERROR', error: err.message });
      });
  }, []);

  return { ...httpState, sendRequest, clear };
};
