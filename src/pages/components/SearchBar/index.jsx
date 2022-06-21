import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import getByFilter from '../../../api/foodsApi';
import { FoodsContext } from '../../../context/foodContext';
import RadioBtn from '../RadioBtn';

export default function SearchBar() {
  const { filter, setFilter, search, setRecipes } = useContext(FoodsContext);
  const location = useLocation().pathname;

  const radios = [
    { label: 'Ingredient', id: 'ingredient-search-radio' },
    { label: 'Name', id: 'name-search-radio' },
    { label: 'First letter', id: 'first-letter-search-radio' },
  ];

  const handleClick = async () => {
    let apiName = '';
    const message = 'Sorry, we haven\'t found any recipes for these filters.';
    if (location === '/foods') apiName = 'themealdb';
    else if (location === '/drinks') apiName = 'thecocktaildb';

    if (filter === radios[0].label) {
      const filterByIngredient = await getByFilter(`https://www.${apiName}.com/api/json/v1/1/filter.php?i=${search}`);
      if (Object.values(filterByIngredient)[0] === null) {
        global.alert(message);
        return setRecipes([]);
      }
      setRecipes(filterByIngredient);
    }

    if (filter === radios[1].label) {
      const filterByName = await getByFilter(`https://www.${apiName}.com/api/json/v1/1/search.php?s=${search}`);
      if (Object.values(filterByName)[0] === null) {
        global.alert(message);
        return setRecipes([]);
      }
      setRecipes(filterByName);
    }

    if (filter === radios[2].label) {
      if (search.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }

      const filterByFirstLetter = await getByFilter(`https://www.${apiName}.com/api/json/v1/1/search.php?f=${search}`);
      if (Object.values(filterByFirstLetter)[0] === null) {
        global.alert(message);
        return setRecipes([]);
      }
      setRecipes(filterByFirstLetter);
    }
  };

  return (
    <div>
      { radios
        .map((radio) => <RadioBtn key={ radio.id } { ...radio } func={ setFilter } />) }
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Search
        </button>
      </div>
    </div>
  );
}
