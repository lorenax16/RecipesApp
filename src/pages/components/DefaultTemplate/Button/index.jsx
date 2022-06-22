import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ type, id, alt, func, img }) {
  return (
    <div>
      <img
        role={ type }
        data-testid={ id }
        onClick={ func }
        src={ img }
        alt={ alt }
      />
    </div>
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
