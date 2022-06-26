import React from 'react';
import PropTypes from 'prop-types';

export default function Btn({ name, id }) {
  return (
    <div>
      <button
        type="button"
        data-testid={ id }
      >
        {name}
      </button>
    </div>
  );
}

Btn.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
