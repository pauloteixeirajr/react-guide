import * as actionTypes from './actionTypes';

export const saveResult = (results) => {
  return {
    type: actionTypes.STORE_RESULT,
    results,
  };
};

export const storeResult = (results) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(saveResult(results));
    }, 2000);
  };
};

export const deleteResult = (resultId) => {
  return {
    type: actionTypes.DELETE_RESULT,
    resultId,
  };
};
