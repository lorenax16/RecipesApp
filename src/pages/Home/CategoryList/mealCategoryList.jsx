import React, { useEffect, useState } from 'react';
import getByFilter from '../../../api/foodsApi';

function MealCategoryList() {
  const [mealList, setMealList] = useState([]);
  const [visible, setVisible] = useState(true);

  const fetchMealList = async () => {
    const MAX_MEAL = 5;
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const myCategorys = await getByFilter(endpoint);
    const only5 = await myCategorys.meals.slice(0, MAX_MEAL);
    console.log(only5);
    setMealList(only5);
  };

  useEffect(() => {
    fetchMealList();
  }, []);

  const handleVisible = () => {
    if (visible === true) {
      return setVisible(false);
    }
    return setVisible(true);
  };

  return (
    <div>
      {
        visible === true
          ? (
            <section>
              <input
                type="text"
                onClick={ handleVisible }
                value="X"
              />
              <ul>
                { mealList.map(({ strCategory }, id) => (
                  <li key={ id } data-testid={ `${strCategory}-category-filter` }>
                    {strCategory}
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <input
              type="text"
              onClick={ handleVisible }
              value="X"
            />
          )
      }
    </div>
  );
}

export default MealCategoryList;
