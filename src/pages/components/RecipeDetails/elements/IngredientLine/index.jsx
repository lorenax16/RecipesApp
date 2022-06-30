import React from 'react';
import PropTypes from 'prop-types';

export default function IngredientLine({ id, measure, item }) {
  return (
    <li
      key={ id }
      data-testid={ `${id}-ingredient-name-and-measure` }
    >
      {
        measure === undefined
          ? `${item}`
          : `${item}: ${measure}`
      }
    </li>
  );
}

IngredientLine.propTypes = {
  id: PropTypes.number.isRequired,
  measure: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
};
