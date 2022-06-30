import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../../../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../../../../images/blackHeartIcon.svg';

export default function BtnFavorite(
  { id, favorite, saveFavorite },
) {
  return (
    <div>
      <img
        src={ favorite.some((fav) => fav.id === id) ? blackHeartIcon : whiteHeartIcon }
        alt="favorite"
        aria-hidden="true"
        data-testid="favorite-btn"
        onClick={ () => saveFavorite(favorite.some((fav) => fav.id === id)) }
      />
    </div>
  );
}

BtnFavorite.propTypes = {
  id: PropTypes.string.isRequired,
  favorite: PropTypes.arrayOf(PropTypes.shape).isRequired,
  saveFavorite: PropTypes.func.isRequired,
};
