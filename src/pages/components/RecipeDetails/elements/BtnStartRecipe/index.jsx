import React from 'react';
import PropTypes from 'prop-types';
import Btn from '../Btn';

export default function BtnStartRecipe(
  { inProgressRecipes, recipeType, startRecipe, id },
) {
  return (
    Object.keys(inProgressRecipes[recipeType.type]).some((key) => key === id)
      ? (
        <Btn
          name="Continue Recipe"
          id="start-recipe-btn"
          func={ () => console.log('continue') }
        />
      )
      : <Btn name="Start Recipe" id="start-recipe-btn" func={ startRecipe } />
  );
}

BtnStartRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  inProgressRecipes: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipeType: PropTypes.objectOf(PropTypes.shape).isRequired,
  startRecipe: PropTypes.func.isRequired,
};
