import React, { useEffect, useState, useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import getByFilter from '../../api/foodsApi';

export default function ExploreRecipes() {
  const location = useLocation().pathname.split('/')[2];
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const types = {
    foods: { apiUrl: 'themealdb', id: 'idMeal' },
    drinks: { apiUrl: 'thecocktaildb', id: 'idDrink' },
  };

  const type = types[location];

  const getRecipeApi = useCallback(async () => {
    const url = `https://www.${type.apiUrl}.com/api/json/v1/1/random.php`;
    const response = await getByFilter(url);
    console.log(response);
    setRecipe(Object.values(response)[0][0]);
  }, [type.apiUrl]);

  useEffect(() => {
    getRecipeApi();
  }, [getRecipeApi]);
  console.log(recipe);
  return (
    <div>
      <button
        onClick={ () => history.push(`/explore/${location}/ingredients`) }
        type="button"
        data-testid="explore-by-ingredient"
      >
        By Ingredient
      </button>
      {
        location.includes('foods') && (
          <button
            onClick={ () => history.push('/explore/foods/nationalities') }
            type="button"
            data-testid="explore-by-nationality"
          >
            By Nationality
          </button>
        )
      }
      <button
        onClick={ () => history.push(`/${location}/${recipe[type.id]}`) }
        type="button"
        data-testid="explore-surprise"
      >
        Surprise me!
      </button>
    </div>
  );
}
