import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import getByFilter from '../../../api/foodsApi';
import { RecipeCard } from '../../components';
import { FoodsContext } from '../../../context/foodContext';

export default function LayoutPageNationalities({
  typeUrl,
  typePage,
  selectedNationality,
  filterChanged,
}) {
  const history = useHistory();
  const { recipes, setRecipes } = useContext(FoodsContext);
  const [filteredReciped, setFilteredReciped] = useState(recipes);
  const [error, setError] = useState('');
  const types = {
    meals: ['strMealThumb', 'strMeal', 'foods', 'idMeal'],
  };
  const MAX_RECIPES = 12;

  const type = types[typePage];

  const recipeFind = useCallback(async () => {
    let endpoint = '';

    if (selectedNationality.nationality === 'All') {
      endpoint = `https://www.${typeUrl}.com/api/json/v1/1/search.php?s=`;
    } else endpoint = `https://www.${typeUrl}.com/api/json/v1/1/filter.php?a=${selectedNationality.nationality}`;
    const recipesApi = await getByFilter(endpoint);

    if (typeof recipesApi === 'string') setError(recipesApi);
    else {
      const recipesApiSliced = Object.values(recipesApi)[0];
      setRecipes(recipesApiSliced);
    }
  }, [selectedNationality.nationality, setRecipes, typeUrl]);

  useEffect(() => {
    recipeFind();
  }, [recipeFind]);

  useEffect(() => {
    setFilteredReciped(recipes);
  }, [filterChanged, selectedNationality, recipes]);

  return (
    <main>
      {filteredReciped.length > 0
        && (
          (recipes.length === 1
          && history.push(`/${type[2]}/${recipes[0][type[3]]}`))
        || (recipes.length !== 0
        && filteredReciped.map((recipe, id) => id < MAX_RECIPES && (
          <RecipeCard
            key={ id }
            id={ id }
            img={ recipe[type[0]] }
            name={ recipe[type[1]] }
            type={ type[2] }
            idRecipe={ recipe[type[3]] }
          />
        ))))}
      {
        error.length !== 0 && <p>{error}</p>
      }
    </main>
  );
}

LayoutPageNationalities.propTypes = {
  typeUrl: PropTypes.string,
  typePage: PropTypes.string,
}.isRequired;
