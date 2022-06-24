import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import getByFilter from '../../../api/foodsApi';
import { useCategories } from '../../../context/foodContext';

function List({ typeUrl }) {
  const [categorySelected, setCategorySelected] = useCategories();
  const [clicked, setClicked] = useState(true);
  const [recipeList, setRecipeList] = useState([]);
  const [visible, setVisible] = useState(true);
  const MAX_RECIPES = 5;

  const fetchRecipeList = useCallback(async () => {
    const endpoint = `https://www.${typeUrl}.com/api/json/v1/1/list.php?c=list`;
    const myCategories = await getByFilter(endpoint);
    const categories = Object.values(myCategories)[0];
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
            <div key={ id }>
              <button
                type="button"
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => {
                  if (clicked || strCategory !== categorySelected) {
                    setCategorySelected(strCategory);
                  } else if (strCategory === categorySelected) setCategorySelected('');
                  setClicked(!clicked);
                } }
              >
                {strCategory}
              </button>
            </div>
          ))}
          <div>
            <button
              data-testid="All-category-filter"
              type="button"
              onClick={ () => setCategorySelected('') }
            >
              All
            </button>
          </div>
        </ul>
      </section>
    </div>
  );
}

export default List;

List.propTypes = {
  typeUrl: PropTypes.string.isRequired,
};
