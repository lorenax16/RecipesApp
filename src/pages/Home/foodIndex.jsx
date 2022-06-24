import React, { useContext, useEffect, useState } from 'react';
import { FoodsContext } from '../../context/foodContext';
import getByFilter from '../../api/foodsApi';
import { SearchBar } from '../components';
import MealCategoryList from './CategoryList/mealCategoryList';

export default function FoodHome() {
  const { recipes } = useContext(FoodsContext);
  const [meals, setMeals] = useState([]);

  const recipeFind = async () => {
    const MAX_RECIPES = 12;
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const seeFoods = await getByFilter(endpoint);
    const only12 = await seeFoods.meals.slice(0, MAX_RECIPES);
    // const only12 = await seeFoods.meals.slice();
    console.log(only12);
    setMeals(only12);
    // setMeals(seeFoods);
  };

  useEffect(() => {
    recipeFind();
    // console.log(recipes.length);
  }, []);

  return (
    <main>
      <SearchBar />
      <MealCategoryList />
      {
        recipes.length === 0 && meals.map(({ strMealThumb, strMeal }, id) => (
          <div key={ strMeal } data-testid={ `${id}-recipe-card` }>
            <img
              src={ strMealThumb }
              alt={ strMeal }
              data-testid={ `${id}-card-img` }
            />
            <p
              data-testid={ `${id}-card-name` }
            >
              { strMeal }
            </p>
          </div>
        // meals.map((a, b) => console.log(a, b))
        ))
      }
    </main>
  );
}

// export default NewHome;
