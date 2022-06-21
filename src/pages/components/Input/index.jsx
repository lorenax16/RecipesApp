import React from 'react';
import PropTypes from 'prop-types';

export default function Input({
  id,
  label,
  type,
  value,
  func,
}) {
  return (
    <div>
      <label htmlFor={ id }>
        {label}
        <input
          type={ type }
          data-testid={ id }
          value={ value }
          onChange={ ({ target }) => func(target.value) }
        />
      </label>
    </div>
  );
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
