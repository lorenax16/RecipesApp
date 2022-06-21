import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function RecipeCard(props) {
  const { id, url } = props;
  const [img, setImg] = useState();
  const [name, setName] = useState();

  const setItems = useCallback(() => {
    if (url === 'foods') {
      const { strMealThumb, strMeal } = props;
      setImg(strMealThumb);
      setName(strMeal);
    } else if (url === 'drinks') {
      const { strDrinkThumb, strDrink } = props;
      setImg(strDrinkThumb);
      setName(strDrink);
    }
  }, [props, url]);

  useEffect(() => {
    setItems();
  }, [setItems]);

  return (
    <div data-testid={ `${id}-recipe-card` }>
      <img src={ img } alt={ name } data-testid={ `${id}-card-img` } />
      <p data-testid={ `${id}-card-name` }>{name}</p>
    </div>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
};
