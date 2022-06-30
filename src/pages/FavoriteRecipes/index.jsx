import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FAVORITE_RECIPES } from '../../localStorage';
import shareBtn from '../../images/shareIcon.svg';
import favoriteBtn from '../../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState(() => {
    const defaultValue = [];
    const saved = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
    return saved || defaultValue;
  });
  const [filter, setFilter] = useState('');
  const [copySucess, setCopySucess] = useState('');
  const history = useHistory();

  const copyToClipboard = (type, id) => {
    navigator.clipboard.writeText(`${window.location.origin}/${type}s/${id}`);
    const TIME_MENSSAGE = 5000;
    setCopySucess('Link copied!');
    setTimeout(() => setCopySucess(''), TIME_MENSSAGE);
  };

  const removeToFavorites = (id) => {
    const favToRemove = favorites.filter((fav) => fav.id !== id);
    setFavorites(favToRemove);
    localStorage.setItem(FAVORITE_RECIPES, JSON.stringify(favToRemove));
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            setFilter('');
            const saved = JSON.parse(localStorage.getItem(FAVORITE_RECIPES));
            setFavorites(saved);
          } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
        >
          Drinks
        </button>
      </div>
      {
        favorites && favorites.length !== 0
        && favorites
          .filter(({ type }) => (filter !== '' ? filter === type : type))
          .map(({
            image,
            name,
            category,
            nationality,
            id,
            type,
            alcoholicOrNot,
          }, index) => (
            <div key={ index }>
              <input
                type="image"
                src={ image }
                alt={ name }
                data-testid={ `${index}-horizontal-image` }
                onClick={ () => history.push(`/${type}s/${id}`) }
                width="150"
                height="150"
              />
              <h2
                data-testid={ `${index}-horizontal-name` }
                aria-hidden="true"
                onClick={ () => history.push(`/${type}s/${id}`) }
              >
                {name}
              </h2>
              <h3 data-testid={ `${index}-horizontal-top-text` }>
                {`${nationality || alcoholicOrNot} - ${category}`}
              </h3>
              <img
                src={ favoriteBtn }
                alt="favorite"
                aria-hidden="true"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClick={ () => removeToFavorites(id) }
              />
              <img
                src={ shareBtn }
                alt="favorite"
                aria-hidden="true"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => copyToClipboard(type, id) }
              />
              { copySucess !== '' && copySucess }
            </div>
          ))
      }
    </div>
  );
}
