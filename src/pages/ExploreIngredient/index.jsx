import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import getByFilter from '../../api/foodsApi';
import { FoodsContext } from '../../context/foodContext';

export default function ExploreIngredient() {
  const [ingredient, setIngredient] = useState([]);
  const location = useLocation().pathname.split('/')[2];
  const history = useHistory();
  const { setFilterIngredient } = useContext(FoodsContext);

  const types = {
    foods: { apiUrl: 'themealdb', id: 'idMeal', title: 'strIngredient' },
    drinks: { apiUrl: 'thecocktaildb', id: 'idDrink', title: 'strIngredient1' },
  };

  const type = types[location];
  // const [img, setImg] = useState('');

  useEffect(() => {
    async function fetchData() {
      const url = `https://www.${type.apiUrl}.com/api/json/v1/1/list.php?i=list`;
      const response = await getByFilter(url);
      setIngredient(Object.values(response)[0]);
      // console.log(response);
    }
    fetchData();
  }, [type.apiUrl]);
  // console.log(ingredient);
  const number = 12;

  const getImage = (name) => {
    const url = `https://www.${type.apiUrl}.com/images/ingredients/${name}-Small.png`;
    return url;
  };

  const handleButton = (name) => {
    setFilterIngredient(name);
    history.push(`/${location}`);
  };

  return ingredient.length !== 0 && (
    <div>
      {ingredient.map((item, index) => index < number
      && (
        <div
          aria-hidden="true"
          onClick={ () => handleButton(item[type.title]) }
          key={ index }
          data-testid={ `${index}-ingredient-card` }
        >
          <div>
            <img
              src={ getImage(item[type.title]) }
              alt={ item.strIngredient }
              data-testid={ `${index}-card-img` }
            />
          </div>

          <p
            data-testid={ `${index}-card-name` }
          >
            {item[type.title]}
          </p>
        </div>
      ))}
    </div>
  );
}
