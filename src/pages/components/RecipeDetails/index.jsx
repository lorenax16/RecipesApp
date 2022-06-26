import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import getByFilter from '../../../api/foodsApi';

// const MAX_REC = 12;

export default function RecipeDetails() {
  const { id } = useParams();
  const url = useLocation().pathname.slice(1).split('/')[0];
  const [choosedRecipe, setChoosedRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const types = {
    foods: {
      apiUrl: 'themealdb',
      image: 'strMealThumb',
      title: 'strMeal',
      area: 'strArea',
      typeRec: 'a',
      category: 'strCategory',
    },
    drinks: {
      apiUrl: 'thecocktaildb',
      image: 'strDrinkThumb',
      title: 'strDrink',
      area: 'strCategory',
      typeRec: 'c',
      category: 'strAlcoholic',
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
      const area = choosedRecipe[recipeType.area];
      const endpoint = `https://www.${recipeType.apiUrl}.com/api/json/v1/1/filter.php?${recipeType.typeRec}=${area}`;
      console.log(endpoint);
      console.log(choosedRecipe);
      const myRecipes = await getByFilter(endpoint);
      console.log(myRecipes);
      if (typeof myRecipes !== 'string') {
        const myRecipesArray = Object.values(myRecipes)[0];
        setRecommendations(myRecipesArray);
      }
    }
  }, [choosedRecipe, recipeType.apiUrl, recipeType.area, recipeType.typeRec]);

  useEffect(() => {
    const allIngredients = Object.keys(choosedRecipe)
      .filter((key) => key.includes('Ingredient'))
      .map((key) => choosedRecipe[key])
      .filter((ingredient) => (ingredient && ingredient !== '') && ingredient);
    setIngredients(allIngredients);
  }, [choosedRecipe]);

  useEffect(() => {
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

  console.log(recommendations);

  return choosedRecipe.length !== 0 && (
    <div>
      <h1>{`${choosedRecipe[recipeType.title]} Detail`}</h1>
      <img
        // src={ choosedRecipe.strDrinkThumb }
        src={ choosedRecipe[recipeType.image] }
        alt="foto drink"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { choosedRecipe[recipeType.title] }
      </h2>
      <h2>Ingredientes</h2>
      <ul>
        {
          ingredients.map((ingitem, ingindex) => (
            <li
              key={ ingindex }
              data-testid={ `${ingindex}-ingredient-name-and-measure` }
            >
              {
                measures[ingindex] === undefined
                  ? `${ingitem}`
                  : `${ingitem}: ${measures[ingindex]}`
              }
            </li>
          ))
        }
      </ul>
      <div>
        <button
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          Favoritar
        </button>
      </div>
      <h3 data-testid="recipe-category">
        {
          `${choosedRecipe[recipeType.category]}`
        }
      </h3>
      {
        <p data-testid="instructions">
          {`${choosedRecipe.strInstructions}`}
        </p>
      }
      {
        url === 'foods' && (
          <p data-testid="video">
            Aqui fica o vídeo
          </p>
        )
      }
      <h3>Recommendations:</h3>
      {
        recommendations.length !== 0
        && recommendations.map((rec, index) => (
          <div key={ index }>
            <p
              data-testid={ `${index}-recomendation-title` }
            >
              {rec[recipeType.title]}
            </p>
            <img
              src={ rec[recipeType.image] }
              alt={ rec[recipeType.title] }
              data-testid={ `${index}-recomendation-card` }
            />
          </div>
        ))
      }
      <button
        type="button"
        data-testid="start-recipe-btn"
        label="Start!"
      >
        Start!
      </button>
    </div>
  );
}
