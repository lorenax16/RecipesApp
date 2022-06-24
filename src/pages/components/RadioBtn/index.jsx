import React from 'react';
import PropTypes from 'prop-types';

export default function RadioBtn({ id, label, func }) {
  return (
    <div>
      <label htmlFor={ id }>
        {label}
        <input
          type="radio"
          name="Teste"
          id={ id }
          data-testid={ id }
          onChange={ () => func(label) }
        />
      </label>
    </div>
  );
}

RadioBtn.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  // name: PropTypes.string.isRequired,
};
