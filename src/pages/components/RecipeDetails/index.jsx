import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import getByFilter from '../../../api/foodsApi';
import { IN_PROGRESS_RECIPES } from '../../../localStorage';
import { Btn, IngredientsList, RecCard } from './elements';
import styles from './styles.module.css';

const MAX_REC = 6;

export default function RecipeDetails() {
  const { id } = useParams();
  const url = useLocation().pathname.slice(1).split('/')[0];
  const [choosedRecipe, setChoosedRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [inProgressRecipes, setInProgressRecipes] = useState(() => {
    const initialState = { cocktails: {}, meals: {} };
    const saved = JSON.parse(localStorage.getItem(IN_PROGRESS_RECIPES));
    return saved || initialState;
  });

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
      if (typeof myRecipes !== 'string') {
        const myRecipesArray = Object.values(myRecipes)[0];
        setRecommendations(myRecipesArray);
      }
    }
  }, [choosedRecipe, recipeType.apiUrlRec]);

  const startRecipe = () => {
    const objRecipe = {
      ...inProgressRecipes,
      [recipeType.type]: { [id]: ingredients },
    };
    setInProgressRecipes(objRecipe);
  };

  useEffect(() => {
    const allIngredients = Object.keys(choosedRecipe)
      .filter((key) => key.includes('Ingredient'))
      .map((key) => choosedRecipe[key])
      .filter((ingredient) => (ingredient && ingredient !== '') && ingredient);
    setIngredients(allIngredients);

    const allMeasures = Object.keys(choosedRecipe)
      .filter((key) => key.includes('Measure'))
      .map((key) => choosedRecipe[key])
      .filter((measure) => (measure && measure !== '') && measure);
    setMeasures(allMeasures);
  }, [choosedRecipe]);

  useEffect(() => {
    fetchMyRecipe();
  }, [fetchMyRecipe]);

  useEffect(() => {
    getCarousel();
  }, [getCarousel]);

  useEffect(() => {
    localStorage.setItem(IN_PROGRESS_RECIPES, JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

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
      <h2>Ingredientes</h2>
      <div>
        <ul>
          {
            ingredients.map((item, index) => (
              <IngredientsList
                id={ index }
                measure={ measures[index] }
                item={ item }
                key={ index }
              />
            ))
          }
        </ul>
      </div>
      <div>
        <Btn name="Compartilhar" id="share-btn" func={ () => console.log('share') } />
        <Btn name="Favoritar" id="favorite-btn" func={ () => console.log('favorite') } />
      </div>
      <h3 data-testid="recipe-category">
        {`${choosedRecipe[recipeType.category]}`}
      </h3>
      <p data-testid="instructions">
        {`${choosedRecipe.strInstructions}`}
      </p>
      {
        url === 'foods' && (
          <p data-testid="video">
            Aqui fica o vídeo
          </p>
        )
      }
      <h3>Recommendations:</h3>
      <div className={ styles.rec }>
        {
          recommendations.length !== 0
          && recommendations.map((rec, index) => index < MAX_REC && (
            <RecCard
              title={ rec[recipeType.titleRec] }
              image={ rec[recipeType.imageRec] }
              index={ index }
              key={ index }
            />
          ))
        }
      </div>
      {
        Object.keys(inProgressRecipes[recipeType.type]).some((key) => key !== id)
          ? <Btn name="Start Recipe" id="start-recipe-btn" func={ startRecipe } />
          : (
            <Btn
              name="Continue Recipe"
              id="start-recipe-btn"
              func={ () => console.log('continue') }
            />
          )
      }
    </div>
  );
}
