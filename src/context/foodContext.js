import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export default function PlanetsProvider({ children }) {
  const [foods, setFoods] = useState([]);

  return (
    <FoodsContext.Provider value={ { foods, setFoods } } >
      {children}
    </FoodsContext.Provider>
  );
}

export const useFoods = () => {
  const { foods, setFoods } = useContext(FoodsContext);
  return [foods, setFoods];
};

FoodsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
