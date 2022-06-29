import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import getByFilter from '../../api/foodsApi';
import { FAVORITE_RECIPES, IN_PROGRESS_RECIPES } from '../../localStorage';
import { BtnFavorite } from '../components/RecipeDetails/elements';

export default function RecipeInProgress() {
  const location = useLocation().pathname.split('/')[1];
  const history = useHistory();
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
    return saved ? Object.values(saved[recipeType.type][id]
      .map((item) => item[0])) : defaultValue;
  });
  const [checked, setChecked] = useState(() => {
    const defaultValue = [];
    const saved = JSON.parse(localStorage
      .getItem(IN_PROGRESS_RECIPES));
    return saved ? Object.values(saved[recipeType.type][id]
      .map((item) => item[1])) : defaultValue;
  });
  const [copySucess, setCopySuccess] = useState('');
  const [favorite, setFavorite] = useState(() => {
    const initialState = [];
    const saved = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
    return saved || initialState;
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
    if (ingredients.length === 0) {
      const ingredientsApi = Object.keys(recipe)
        .filter((key) => key.includes('Ingredient'))
        .map((key) => recipe[key])
        .filter((items) => (items && items !== '') && items);
      setIngredients(ingredientsApi);
    }
    if (checked.length === 0) setChecked(ingredients.map(() => false));
  }, [checked.length, ingredients, recipe]);

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href.split('/in-progress')[0]);
    const TIME_MENSSAGE = 5000;
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), TIME_MENSSAGE);
  };

  useEffect(() => {
    setIngredients(ingredients);
  }, [ingredients]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
    const newObj = {
      ...saved,
      [recipeType.type]: { [id]: ingredients
        .map((ing, index) => [ing, checked[index]]) },
    };
    localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(newObj));
  }, [checked, id, ingredients, recipeType.type]);

  const saveStep = (index) => {
    const arrayTeste = checked.map((elem, ind) => (ind === index ? !elem : elem));
    setChecked(arrayTeste);
  };

  const saveFavorite = (condition) => {
    if (!condition) {
      const objRecipe = {
        id,
        type: recipeType.idKey,
        nationality: recipe.strArea ? recipe.strArea : '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
        name: recipe[recipeType.title],
        image: recipe[recipeType.image],
      };

      const favoriteRecipes = [
        ...favorite,
        objRecipe,
      ];

      setFavorite(favoriteRecipes);
      localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(favoriteRecipes));
    } else {
      const favToRemove = favorite.findIndex((fav) => fav.id === id);
      const removeItem = favorite.slice(favToRemove, favorite.length)[0];
      const favoritesUpdate = favorite.filter((fav) => fav.id !== removeItem.id);
      setFavorite(favoritesUpdate);
      localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(favoritesUpdate));
    }
  };

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
        onClick={ copyToClipboard }
      >
        Compatilhar
      </button>
      { copySucess !== '' && copySucess }
      <BtnFavorite id={ id } favorite={ favorite } saveFavorite={ saveFavorite } />
      <p data-testid="recipe-category">{recipe[recipeType.category]}</p>
      <div>
        <ul>
          {
            ingredients.map((name, index) => (
              <div key={ index } data-testid={ `${index}-ingredient-step` }>
                <label htmlFor={ `${index}-ingredient-step` }>
                  <input
                    type="checkbox"
                    checked={ checked[index] }
                    id={ `${index}-ingredient-step` }
                    onChange={ () => saveStep(index) }
                  />
                  {name}
                </label>
              </div>
            ))
          }
        </ul>
        <div>
          <h2>Instructions:</h2>
          <ol data-testid="instructions">
            {
              recipe.strInstructions.split('\n').map((paragraph, index) => (
                <li key={ index }>{paragraph}</li>
              ))
            }
          </ol>
        </div>
        <div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !checked.every((check) => check) }
            onClick={ () => history.push('/done-recipes') }
          >
            Finish Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
