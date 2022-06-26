import React, { useState, useEffect } from 'react';
import getByFilter from '../../../api/foodsApi';
import { SearchBar } from '..';

export default function DrinkDetails() {
  const recipeId = window.location.href.split('/').pop();
  const [choosedRecipe, setChoosedRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recomendations, setRecomendations] = useState([]);

  const url = window.location.href;
  let pageName = '';
  // if (url.includes('/meals')) pageName = 'meals';
  // else if (url.includes('/drinks')) pageName = 'drinks';

  const nameIt = () => {
    // const url = window.location.href;
    // let pageName = '';
    if (url.includes('drinks')) {
      pageName = 'Drinks';
    } else {
      pageName = 'Foods';
    }
    return pageName;
  };

  const fetchMyRecipe = async () => {
    let endpoint = '';
    if (pageName === 'Drinks') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const myRecipe = await getByFilter(endpoint);
      const myDrink = Object.values(myRecipe.drinks)[0];
      // setChoosedRecipe(Object.values(myRecipe.drinks)[0]);
      setChoosedRecipe(myDrink);
    } else {
      endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const myRecipe = await getByFilter(endpoint);
      const myFood = Object.values(myRecipe.meals)[0];
      setChoosedRecipe(myFood);
      // setChoosedRecipe(Object.values(myRecipe.meals)[0]);
    }
    console.log(choosedRecipe);
  };

  useEffect(() => {
    const allIngredients = [];
    setIngredients(allIngredients);
    Object.entries(choosedRecipe).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        allIngredients.push(value);
      }
    });
  }, [choosedRecipe]);

  useEffect(() => {
    const allMeasures = [];
    setMeasures(allMeasures);
    Object.entries(choosedRecipe).forEach(([key, value]) => {
      if (key.includes('strMeasure') && value !== '' && value !== null) {
        allMeasures.push(value);
        console.log(allMeasures);
      }
    });
  }, [choosedRecipe]);

  const myImg = () => {
    if (pageName === 'Drinks') {
      return choosedRecipe.strDrinkThumb;
    }
    return choosedRecipe.strMealThumb;
  };

  const pageTitle = () => {
    if (pageName === 'Drinks') {
      return choosedRecipe.strDrink;
    }
    return choosedRecipe.strMeal;
  };

  const getCarousel = async () => {
    let endpoint = '';
    // const MAX_RECIPES = 5;
    if (pageName === 'Drinks') {
      endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const myRecipe = await getByFilter(endpoint);
      const myDrinks = Object.values(myRecipe.drinks);
      setRecomendations(myDrinks);
    } else {
      endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const myRecipe = await getByFilter(endpoint);
      const myFoods = Object.values(myRecipe.meals);
      setRecomendations(myFoods);
    }
  };

  useEffect(() => {
    fetchMyRecipe();
    console.log(measures);
    getCarousel();
    console.log(recomendations);
  }, []);

  return (
    <div>
      <SearchBar />
      <h1>{`${nameIt()} Detail`}</h1>
      <img
        // src={ choosedRecipe.strDrinkThumb }
        src={ myImg() }
        alt="foto drink"
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">
        { pageTitle() }
      </h2>
      <h2>Ingredientes</h2>
      {
        ingredients.map((ingitem, ingindex) => (
          <p
            key={ ingindex }
            data-testid={ `${ingindex}-ingredient-name-and-measure` }
          >
            {`-${ingitem}: ${measures[ingindex]}`}
          </p>
        ))
      }
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
          `${choosedRecipe.strCategory}`
        }
      </h3>
      {
        <p data-testid="instructions">
          {`${choosedRecipe.strInstructions}`}
        </p>
      }
      {
        <p data-testid="video">
          Aqui fica o vídeo
        </p>
      }
      {
        <button
          type="button"
          data-testid="start-recipe-btn"
          label="Start!"
        >
          Start!
        </button>
      }
    </div>
  );
}
