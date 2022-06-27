import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import getByFilter from '../../../api/foodsApi';
import { FAVORITE_RECIPES, IN_PROGRESS_RECIPES } from '../../../localStorage';
import { Btn, BtnFavorite, BtnStartRecipe, CopySucess, IngredientsList, RecList,
  VideoCard } from './elements';

const types = {
  foods: {
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

export default function RecipeDetails() {
  const MAX_REC = 6;
  const { id } = useParams();
  const url = useLocation().pathname.slice(1).split('/')[0];
  const history = useHistory();
  const [choosedRecipe, setChoosedRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(() => {
    const initialState = { cocktails: {}, meals: {} };
    const saved = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
    return saved || initialState;
  });
  const [copySuccess, setCopySuccess] = useState('');
  const [favorite, setFavorite] = useState(() => {
    const initialState = [];
    const saved = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
    return saved || initialState;
  });

  const recipeType = types[url];

  const fetchMyRecipe = useCallback(async () => {
    const endpoint = `https://www.${recipeType.apiUrl}.com/api/json/v1/1/lookup.php?i=${id}`;
    const myRecipe = await getByFilter(endpoint);
    const myRecipeValues = Object.values(myRecipe)[0];
    setChoosedRecipe(myRecipeValues[0]);
  }, [id, recipeType.apiUrl]);

  const getCarousel = useCallback(async () => {
    if (choosedRecipe.length !== 0) {
      const endpoint = `https://www.${recipeType.apiUrlRec}.com/api/json/v1/1/search.php?s=`;
      const myRecipes = await getByFilter(endpoint);
      const myRecipesArray = Object.values(myRecipes)[0];
      setRecommendations(myRecipesArray);
    }
  }, [choosedRecipe, recipeType.apiUrlRec]);

  const startRecipe = () => {
    const objRecipe = {
      ...inProgressRecipes,
      [recipeType.type]: { [id]: ingredients },
    };
    setInProgressRecipes(objRecipe);
    localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(objRecipe));
    history.push(`/${url}/${id}/in-progress`);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    const TIME_MENSSAGE = 5000;
    setCopySuccess('Link copied!');
    setTimeout(() => setCopySuccess(''), TIME_MENSSAGE);
  };

  const saveFavorite = (condition) => {
    if (!condition) {
      const objRecipe = {
        id,
        type: url,
        nationality: choosedRecipe.strNationality,
        category: choosedRecipe.strCategory,
        alcoholicOrNot: choosedRecipe.strAlcoholic ? choosedRecipe.strAlcoholic : '',
        name: choosedRecipe[recipeType.title],
        image: choosedRecipe[recipeType.image],
      };

      const favoriteRecipes = [
        ...favorite,
        objRecipe,
      ];

      setFavorite(favoriteRecipes);
      localStorage.setItem(FAVORITE_RECIPES, JSON.parse(favoriteRecipes));
    } else {
      const favToRemove = favorite.findIndex((fav) => fav.id === id);
      const newFavorites = favorite.slice(favToRemove, 1);
      setFavorite(newFavorites);
      localStorage.setItem(FAVORITE_RECIPES, favToRemove);
    }
  };

  const getItem = useCallback((keyItem) => {
    const functions = {
      Ingredient: (items) => setIngredients(items),
      Measure: (items) => setMeasures(items),
    };

    const allItems = Object.keys(choosedRecipe)
      .filter((key) => key.includes(keyItem))
      .map((key) => choosedRecipe[key])
      .filter((items) => (items && items !== '') && items);
    functions[keyItem](allItems);
  }, [choosedRecipe]);

  useEffect(() => {
    getItem('Ingredient');
    getItem('Measure');
  }, [getItem]);

  console.log(ingredients);
  useEffect(() => {
    fetchMyRecipe();
  }, [fetchMyRecipe]);

  useEffect(() => {
    getCarousel();
  }, [getCarousel]);

  return choosedRecipe.length !== 0 && (
    <div>
      <h1>{`${choosedRecipe[recipeType.title]} Detail`}</h1>
      <img
        src={ choosedRecipe[recipeType.image] }
        alt="foto drink"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { choosedRecipe[recipeType.title] }
      </h2>
      <IngredientsList ingredients={ ingredients } measures={ measures } />
      <div>
        <Btn name="Compartilhar" id="share-btn" func={ copyToClipboard } />
        <BtnFavorite
          favorite={ favorite }
          saveFavorite={ saveFavorite }
          id={ id }
        />
      </div>
      <h3 data-testid="recipe-category">
        {`${choosedRecipe[recipeType.category]}`}
      </h3>
      <p data-testid="instructions">
        {`${choosedRecipe.strInstructions}`}
      </p>
      <VideoCard url={ url } />
      <RecList
        recommendations={ recommendations }
        max={ MAX_REC }
        recipeType={ recipeType }
      />
      <CopySucess copy={ copySuccess } />
      <BtnStartRecipe
        inProgressRecipes={ inProgressRecipes }
        recipeType={ recipeType }
        startRecipe={ startRecipe }
        id={ id }
      />
    </div>
  );
}
