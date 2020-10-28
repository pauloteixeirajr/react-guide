import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    // ...
    dispatch(authStart());
    const apiKey = '[API_KEY]';
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey;
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
        apiKey;
    }
    axios
      .post(url, {
        email,
        password,
        returnSecureToken: true,
      })
      .then((response) => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        console.log(err);
        dispatch(authFail(err.response.data.error));
      });
  };
};
