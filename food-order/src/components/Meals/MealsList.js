import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './MealsList.module.css';

const url =
  'https://udemy-courses-4072a-default-rtdb.firebaseio.com/meals.json';

const MealsList = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error('Something went wrong');

        const data = await response.json();
        const loadedMeals = [];

        for (const [id, meal] of Object.entries(data)) {
          loadedMeals.push({
            id,
            ...meal,
          });
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };
    fetchMeals();
  }, []);

  if (isLoading) {
    return <section className={classes['meals-loading']}>Loading...</section>;
  }

  if (error) {
    return <section className={classes['meals-error']}>{error}</section>;
  }

  const mealItems = meals.map(meal => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealItems}</ul>
      </Card>
    </section>
  );
};

export default MealsList;
