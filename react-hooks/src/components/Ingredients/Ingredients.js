import React, { useReducer, useCallback, useMemo } from 'react';
import { API, BASE, ENTITY } from '../../.next/api';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const ingredientReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...state, action.ingredient];
    case 'DELETE':
      return state.filter((ing) => ing.id !== action.id);
    default:
      throw new Error('Should not reach');
  }
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...state, loading: false };
    case 'ERROR':
      return { loading: false, error: action.error };
    case 'CLEAR':
      return { ...state, error: null };
    default:
      throw new Error('Should not reach');
  }
};

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null,
  });

  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatch({ type: 'SET', ingredients });
  }, []);

  const addIngredientHandler = useCallback((ingredient) => {
    dispatchHttp({ type: 'SEND' });
    fetch(API, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        dispatchHttp({ type: 'RESPONSE' });
        dispatch({ type: 'ADD', ingredient: { id: data.name, ...ingredient } });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err.message });
      });
  }, []);

  const removeIngredientHandler = useCallback((ingredientId) => {
    dispatchHttp({ type: 'SEND' });
    fetch(`${BASE}${ENTITY}/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then(() => {
        dispatchHttp({ type: 'RESPONSE' });
        dispatch({ type: 'DELETE', id: ingredientId });
      })
      .catch((err) => {
        dispatchHttp({ type: 'ERROR', error: err.message });
      });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({ type: 'CLEAR' });
  }, []);

  const ingredientsList = useMemo(() => {
    return (
      <IngredientList
        ingredients={ingredients}
        onRemoveItem={removeIngredientHandler}
      />
    );
  }, [ingredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && (
        <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>
      )}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={httpState.loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
};

export default Ingredients;
