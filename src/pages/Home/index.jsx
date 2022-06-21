import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecipes } from '../../context/foodContext';
import { SearchBar } from '../components';
import RecipeCard from '../components/RecipeCard';

const MAX_RECIPES = 12;

export default function Home() {
  const [recipes] = useRecipes();
  const location = useLocation().pathname.slice(1);
  const history = useHistory();

  const [visibled, setVisibled] = useState(false);
  const [getByUrl] = useState({ foods: ['meals', 'idMeal'],
    drinks: ['drinks', 'idDrink'] });

  const name = getByUrl[location][0];

  const getOneRecipe = useCallback(() => {
    const id = getByUrl[location][1];
    const recipeUrl = `/${location}/${recipes[name][0][id]}`;
    if (recipes[name].length === 1) history.push(recipeUrl);
  }, [getByUrl, location, recipes, name, history]);

  useEffect(() => {
    if (recipes.length !== 0) {
      getOneRecipe();
      setVisibled(true);
    }
  }, [getOneRecipe, recipes]);

  console.log(recipes);

  return (
    <div>
      <SearchBar />
      {
        visibled && recipes[name]
          .map((rec, id) => id < MAX_RECIPES
          && <RecipeCard id={ id } { ...rec } key={ id } url={ location } />)
      }
    </div>
  );
}
