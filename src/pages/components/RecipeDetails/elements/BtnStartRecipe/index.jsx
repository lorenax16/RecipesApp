import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Btn from '../Btn';

export default function BtnStartRecipe(
  { inProgressRecipes, recipeType, startRecipe, id },
) {
  const [nameBtn, setNameBtn] = useState('');

  const getNameBtn = useCallback(() => {
    setNameBtn(
      Object.keys(inProgressRecipes[recipeType.type]).some((key) => key === id)
        ? 'Continue Recipe' : 'Start Recipe',
    );
  }, [id, inProgressRecipes, recipeType.type]);

  useEffect(() => {
    getNameBtn();
  }, [getNameBtn]);

  return <Btn name={ nameBtn } id="start-recipe-btn" func={ startRecipe } />;
}

BtnStartRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  inProgressRecipes: PropTypes.objectOf(PropTypes.shape).isRequired,
  recipeType: PropTypes.objectOf(PropTypes.shape).isRequired,
  startRecipe: PropTypes.func.isRequired,
};
