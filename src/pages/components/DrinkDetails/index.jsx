import React, { useState, useEffect } from 'react';
import getByFilter from '../../../api/foodsApi';

export default function DrinkDetails() {
  const recipeId = window.location.href.split('/').pop();
  const [choosedRecipe, setChoosedRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const fetchMyRecipe = async () => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
    const myRecipe = await getByFilter(endpoint);
    const myOneDrink = Object.values(myRecipe.drinks)[0];
    console.log(myOneDrink);
    setChoosedRecipe(myOneDrink);
  };

  useEffect(() => {
    const allIngredients = [];
    setIngredients(allIngredients);
    Object.entries(choosedRecipe).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== '' && value !== null) {
        allIngredients.push(value);
        // console.log(allIngredients);
      }
    });
  }, [choosedRecipe]);

  useEffect(() => {
    fetchMyRecipe();
    console.log(ingredients);
  }, []);

  return (
    <div>
      <h1>Drink Details</h1>
      <img
        src={ choosedRecipe.strDrinkThumb }
        alt="foto drink"
        data-testid="recipe-photo"
      />
      <h2>Ingredientes</h2>
      {
        ingredients.map((item, index) => (
          <p key={ index }>
            {`-${item}`}
          </p>
        ))
      }
    </div>
  );
}
