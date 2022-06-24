import React, { useEffect, useState } from 'react';
import getByFilter from '../../../api/foodsApi';

function DrinkCategoryList() {
  const [drinkList, setDrinkList] = useState([]);
  const [visible, setVisible] = useState(true);

  const fetchDrinkList = async () => {
    const MAX_DRINK = 5;
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const myCategorys = await getByFilter(endpoint);
    const only5 = await myCategorys.drinks.slice(0, MAX_DRINK);
    console.log(only5);
    setDrinkList(only5);
  };

  useEffect(() => {
    fetchDrinkList();
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
                { drinkList.map(({ strCategory }, id) => (
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

export default DrinkCategoryList;
