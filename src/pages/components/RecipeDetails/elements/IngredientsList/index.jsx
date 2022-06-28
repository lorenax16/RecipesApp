import React from 'react';
import PropTypes from 'prop-types';
import IngredientLine from '../IngredientLine';

export default function IngredientsList({ ingredients, measures }) {
  return ingredients !== undefined && (
    <div>
      <h2>Ingredientes</h2>
      <ul>
        {ingredients.map((item, index) => (
          <IngredientLine
            id={ index }
            measure={ measures[index] }
            item={ item }
            key={ index }
          />
        ))}
      </ul>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  measures: PropTypes.arrayOf(PropTypes.string).isRequired,
};
