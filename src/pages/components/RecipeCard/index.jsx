import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function RecipeCard({ id, img, name, type, idRecipe }) {
  const history = useHistory();
  return (
    <div
      aria-hidden="true"
      data-testid={ `${id}-recipe-card` }
      onClick={ () => history.push(`/${type}/${idRecipe}`) }
    >
      <img src={ img } alt={ name } data-testid={ `${id}-card-img` } />
      <p data-testid={ `${id}-card-name` }>{name}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  idRecipe: PropTypes.string.isRequired,
};
