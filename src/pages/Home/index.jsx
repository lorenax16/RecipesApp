import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useRecipes } from '../../context/foodContext';
import getByFilter from '../../api/foodsApi';
import { SearchBar } from '../components';
import RecipeCard from '../components/RecipeCard';

const MAX_RECIPES = 12;

export default function Home() {
  const [recipes, setRecipes] = useRecipes();
  const [locationState, setLocationState] = useState('');
  const location = useLocation().pathname.slice(1);
  const history = useHistory();
  const [visibled, setVisibled] = useState(false);
  const [getByUrl] = useState({ foods: ['meals', 'idMeal'],
    drinks: ['drinks', 'idDrink'] });

  const name = getByUrl[location][0];

  const getOneRecipe = useCallback(() => {
    if (recipes.length === 1) {
      const id = getByUrl[location][1];
      const recipeUrl = `/${location}/${recipes[name][0][id]}`;
      history.push(recipeUrl);
    }
  }, [getByUrl, location, recipes, name, history]);

  const getRecipesApi = useCallback(async () => {
    let endpoint = '';
    if (locationState.includes('foods')) {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else if (locationState.includes('drinks')) {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?s=';
    }

    const response = await getByFilter(endpoint);
    console.log(response);
    if (typeof response === 'object') setRecipes(Object.values(response)[0]);
  }, [locationState, setRecipes]);

  useEffect(() => {
    setLocationState(location);
    if (recipes.length !== 0 && recipes !== undefined) {
      getOneRecipe();
      setVisibled(true);
    } else if (recipes.length === 0) getRecipesApi();
  }, [getOneRecipe, getRecipesApi, location, name, recipes]);

  return (
    <div>
      <SearchBar />
      {
        visibled && recipes
          .map((rec, id) => id < MAX_RECIPES
          && <RecipeCard
            id={ id }
            { ...rec }
            key={ id }
            url={ location }
          />)
      }
    </div>
  );
}
