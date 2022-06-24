import React from 'react';
import PropTypes from 'prop-types';

export default function RadioBtn({ id, label, func, name }) {
  return (
    <div>
      <label htmlFor={ id }>
        <input
          type="radio"
          name={ name }
          id={ id }
          data-testid={ id }
          onChange={ () => func(label) }
        />
        {label}
      </label>
    </div>
  );
}

RadioBtn.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
