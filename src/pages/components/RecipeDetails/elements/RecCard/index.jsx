import React from 'react';
import PropTypes from 'prop-types';

export default function RecCard({ index, title, image }) {
  return (
    <div key={ index }>
      <p
        data-testid={ `${index}-recomendation-title` }
      >
        {title}
      </p>
      <img
        src={ image }
        alt={ title }
        data-testid={ `${index}-recomendation-card` }
      />
    </div>
  );
}

RecCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
