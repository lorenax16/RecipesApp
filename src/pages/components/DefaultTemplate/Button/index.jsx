import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ id, alt, func, img }) {
  return (
    <div>
      <img
        aria-hidden="true"
        data-testid={ id }
        onClick={ func }
        src={ img }
        alt={ alt }
      />
    </div>
  );
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
};
