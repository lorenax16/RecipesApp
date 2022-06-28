import React from 'react';
import PropTypes from 'prop-types';

export default function VideoCard({ url }) {
  return (
    <div>
      {
        url === 'foods' && (
          <p data-testid="video">
            Aqui fica o vídeo
          </p>
        )
      }
    </div>
  );
}

VideoCard.propTypes = {
  url: PropTypes.string.isRequired,
};
