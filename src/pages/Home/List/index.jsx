import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getByFilter from '../../../api/foodsApi';

function List({ typeUrl }) {
  const [recipeList, setRecipeList] = useState([]);
  const [visible, setVisible] = useState(true);
  const MAX_RECIPES = 5;

  const fetchRecipeList = useCallback(async () => {
    const endpoint = `https://www.${typeUrl}.com/api/json/v1/1/list.php?c=list`;
    const myCategories = await getByFilter(endpoint);
    const categories = Object.values(myCategories)[0];
    console.log(categories);
    setRecipeList(categories);
  }, [typeUrl]);

  useEffect(() => {
    fetchRecipeList();
  }, [fetchRecipeList]);

  return (
    <div>
      <section>
        {
          visible && (
            <input
              type="text"
              onClick={ setVisible(!visible) }
              value="X"
            />
          )
        }
        <ul>
          { recipeList.map(({ strCategory }, id) => id < MAX_RECIPES && (
            <li key={ id } data-testid={ `${strCategory}-category-filter` }>
              {strCategory}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default List;

List.propTypes = {
  typeUrl: PropTypes.string.isRequired,
};
