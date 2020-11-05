import React, { useState, useCallback } from 'react';
import { API, BASE, ENTITY } from '../../.next/api';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const filteredIngredientsHandler = useCallback((ingredients) => {
    setIngredients(ingredients);
  }, []);

  const addIngredientHandler = (ingredient) => {
    setIsLoading(true);
    fetch(API, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setIngredients((prevIngredients) => [
          ...prevIngredients,
          // data.name comes from Firebase (as the UID)
          { id: data.name, ...ingredient },
        ]);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  const removeIngredientHandler = (ingredientId) => {
    setIsLoading(true);
    fetch(`${BASE}${ENTITY}/${ingredientId}.json`, {
      method: 'DELETE',
    })
      .then(() => {
        setIsLoading(false);
        setIngredients((prevIngredients) =>
          prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
        );
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  const clearError = () => {
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm
        onAddIngredient={addIngredientHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList
          ingredients={ingredients}
          onRemoveItem={removeIngredientHandler}
        />
      </section>
    </div>
  );
};

export default Ingredients;
