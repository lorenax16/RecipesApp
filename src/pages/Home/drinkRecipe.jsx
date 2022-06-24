import React, { useContext, useEffect, useState } from 'react';
import { FoodsContext } from '../../context/foodContext';
import getByFilter from '../../api/foodsApi';
import { SearchBar } from '../components';
import DrinkCategoryList from './CategoryList/drinkCategoryList';

export default function DrinkHome() {
  const { recipes } = useContext(FoodsContext);
  const [drinks, setDrink] = useState([]);

  const recipeFind = async () => {
    const MAX_RECIPES = 12;
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const seeFoods = await getByFilter(endpoint);
    const only12 = await seeFoods.drinks.slice(0, MAX_RECIPES);
    // const only12 = await seeFoods.meals.slice();
    console.log(only12);
    setDrink(only12);
    // setMeals(seeFoods);
  };

  useEffect(() => {
    recipeFind();
    // console.log(recipes.length);
  }, []);

  return (
    <main>
      <SearchBar />
      <DrinkCategoryList />
      {
        recipes.length === 0 && drinks.map(({ strDrinkThumb, strDrink }, id) => (
          <div key={ strDrink } data-testid={ `${id}-recipe-card` }>
            <img
              src={ strDrinkThumb }
              alt={ strDrink }
              data-testid={ `${id}-card-img` }
            />
            <p
              data-testid={ `${id}-card-name` }
            >
              { strDrink }
            </p>
          </div>
        ))
        // drinks.map((a, b) => console.log(a, b))
      }
    </main>
  );
}

// export default NewHome;
