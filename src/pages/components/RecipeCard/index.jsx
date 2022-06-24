import React from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard({ id, img, name }) {
  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img src={ img } alt={ name } data-testid={ `${id}-card-img` } />
      <p data-testid={ `${id}-card-name` }>{name}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
