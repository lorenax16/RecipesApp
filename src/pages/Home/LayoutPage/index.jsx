import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import getByFilter from '../../../api/foodsApi';
import { RecipeCard, SearchBar } from '../../components';
import List from '../List';
import { FoodsContext } from '../../../context/foodContext';

export default function LayoutPage({ typeUrl, typePage }) {
  const history = useHistory();
  const { recipes, setRecipes, categorySelected } = useContext(FoodsContext);
  const [error, setError] = useState('');
  const types = {
    meals: ['strMealThumb', 'strMeal', 'foods', 'idMeal'],
    drinks: ['strDrinkThumb', 'strDrink', 'drinks', 'idDrink'],
  };
  const MAX_RECIPES = 12;

  const type = types[typePage];

  const recipeFind = useCallback(async () => {
    let endpoint = '';
    if (categorySelected !== '') endpoint = `https://www.${typeUrl}.com/api/json/v1/1/filter.php?c=${categorySelected}`;
    else endpoint = `https://www.${typeUrl}.com/api/json/v1/1/search.php?s=`;
    const recipesApi = await getByFilter(endpoint);

    if (typeof recipesApi === 'string') setError(recipesApi);
    else {
      const recipesApiSliced = Object.values(recipesApi)[0];
      setRecipes(recipesApiSliced);
    }
  }, [categorySelected, setRecipes, typeUrl]);

  useEffect(() => {
    recipeFind();
  }, [recipeFind]);

  return (
    <main>
      <SearchBar />
      <List typeUrl={ typeUrl } />
      {
        (recipes.length === 1 && categorySelected === ''
          && history.push(`/${type[2]}/${recipes[0][type[3]]}`))
        || (recipes.length !== 0
        && recipes.map((recipe, id) => id < MAX_RECIPES && (
          <RecipeCard
            key={ id }
            id={ id }
            img={ recipe[type[0]] }
            name={ recipe[type[1]] }
            type={ type[2] }
            idRecipe={ recipe[type[3]] }
          />
        )))
      }
      {
        error.length !== 0 && <p>{error}</p>
      }
    </main>
  );
}

LayoutPage.propTypes = {
  typeUrl: PropTypes.string.isRequired,
  typePage: PropTypes.string.isRequired,
};
