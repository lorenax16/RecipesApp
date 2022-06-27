import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import getByFilter from '../../api/foodsApi';
import { IN_PROGRESS_RECIPES } from '../../localStorage';

export default function RecipeInProgress() {
  const location = useLocation().pathname.split('/')[1];
  const { id } = useParams();
  const types = {
    foods: {
      idKey: 'food',
      apiUrl: 'themealdb',
      image: 'strMealThumb',
      title: 'strMeal',
      category: 'strCategory',
      apiUrlRec: 'thecocktaildb',
      titleRec: 'strDrink',
      imageRec: 'strDrinkThumb',
      type: 'meals',
    },
    drinks: {
      idKey: 'drink',
      apiUrl: 'thecocktaildb',
      image: 'strDrinkThumb',
      title: 'strDrink',
      category: 'strAlcoholic',
      apiUrlRec: 'themealdb',
      titleRec: 'strMeal',
      imageRec: 'strMealThumb',
      type: 'cocktails',
    },
  };
  const recipeType = types[location];
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState(() => {
    const defaultValue = [];
    const saved = JSON.parse(localStorage
      .getItem(IN_PROGRESS_RECIPES));
    return saved ? saved[recipeType.type][id] : defaultValue;
  });

  const getRecipeByApi = useCallback(async () => {
    const endpoint = `https://www.${recipeType.apiUrl}.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await getByFilter(endpoint);
    setRecipe(Object.values(response)[0][0]);
  }, [id, recipeType.apiUrl]);

  useEffect(() => {
    getRecipeByApi();
  }, [getRecipeByApi]);

  const getIngredients = useCallback(() => {
    console.log(ingredients);
    if (ingredients.length === 0) {
      const ingredientsApi = Object.keys(recipe)
        .filter((key) => key.includes('Ingredient'))
        .map((key) => recipe[key])
        .filter((items) => (items && items !== '') && items);
      setIngredients(ingredientsApi);
    }
  }, [ingredients, recipe]);

  useEffect(() => {
    getIngredients();
    console.log('aaaaaaa');
  }, [getIngredients]);

  return recipe.length !== 0 && (
    <div>
      <img
        src={ recipe[recipeType.image] }
        alt={ recipe[recipeType.title] }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe[recipeType.title]}</h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        Compatilhar
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favoritar
      </button>
      <p data-testid="recipe-category">{recipe[recipeType.category]}</p>
      <div>
        <ul>
          {
            ingredients.map((ing, index) => (
              <div key={ index }>
                <label htmlFor={ `${index}-ingredient-step` }>
                  <input
                    type="checkbox"
                    data-testid={ `${index}-ingredient-step` }
                    id={ `${index}-ingredient-step` }
                  />
                  {ing}
                </label>
              </div>
            ))
          }
        </ul>
        <div>
          <p data-testid="instructions">{recipe.strInstructions}</p>
        </div>
        <div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
