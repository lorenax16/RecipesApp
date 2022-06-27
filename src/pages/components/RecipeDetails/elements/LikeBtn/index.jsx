import React, { useState } from 'react';
import blackHeartIcon from '../../../../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../../../../images/whiteHeartIcon.svg';

export default function LikeBtns() {
  const [favoritesOnes, setFavoritesOnes] = useState('false');
  const [favorites, setFavorites] = useState([]);

  const favoritedRecipes = () => {
    if (favoritesOnes === 'false') {
      setFavoritesOnes('true');
      setFavorites([...favorites, 'true']);
      localStorage.setItem('favorites', favorites);
    } else {
      setFavoritesOnes('false');
      setFavorites([...favorites, 'false']);
    }
  };

  // const favoritedRecipes = (id) => {
  //   if (!favorites.includes(id)) {
  //     setFavoritesOnes('true');
  //     setFavorites([...favorites, id]);
  //   } else {
  //     setFavoritesOnes('false');
  //     const index = favorites.indexOf(id);
  //     favorites.splice(index, 1);
  //   }
  // };

  return (
    <button
      type="button"
      className="like-btn"
      onClick={ favoritedRecipes }
      data-testid="like-btn"
    >
      { favoritesOnes === 'false' ? (
        <img src={ whiteHeartIcon } alt="whiteHeartIcon" />
      ) : (
        <img src={ blackHeartIcon } alt="blackHeartIcon" />
      ) }
    </button>
  );
}
