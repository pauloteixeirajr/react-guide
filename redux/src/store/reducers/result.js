import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return updateObject(state, {
        results: state.results.concat({
          value: action.results,
          id: Date.now(),
        }),
      });
    case actionTypes.DELETE_RESULT:
      return updateObject(state, {
        results: state.results.filter(
          (result) => result.id !== action.resultId
        ),
      });
    default:
      return state;
  }
};

export default reducer;
