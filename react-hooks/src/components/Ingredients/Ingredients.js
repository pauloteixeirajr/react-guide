import React, { useReducer, useCallback, useMemo, useEffect } from 'react';
import { API, BASE, ENTITY } from '../../.next/api';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import { useHttp } from '../../hooks/http';

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

const Ingredients = () => {
  const [ingredients, dispatch] = useReducer(ingredientReducer, []);
  const { loading, error, data, sendRequest, extra, identifier } = useHttp();

  useEffect(() => {
    if (!loading && !error && identifier === 'DELETE') {
      dispatch({ type: 'DELETE', id: extra });
    } else if (!loading && !error && identifier === 'ADD') {
      dispatch({ type: 'ADD', ingredient: { id: data.name, ...extra } });
    }
  }, [loading, data, error, extra, identifier]);

  const filteredIngredientsHandler = useCallback((ingredients) => {
    dispatch({ type: 'SET', ingredients });
  }, []);

  const addIngredientHandler = useCallback(
    (ingredient) => {
      sendRequest(API, 'POST', JSON.stringify(ingredient), ingredient, 'ADD');
    },
    [sendRequest]
  );

  const removeIngredientHandler = useCallback(
    (ingredientId) => {
      sendRequest(
        `${BASE}${ENTITY}/${ingredientId}.json`,
        'DELETE',
        null,
        ingredientId,
        'DELETE'
      );
    },
    [sendRequest]
  );

  const clearError = useCallback(() => {
    // dispatchHttp({ type: 'CLEAR' });
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
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={loading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        {ingredientsList}
      </section>
    </div>
  );
};

export default Ingredients;
