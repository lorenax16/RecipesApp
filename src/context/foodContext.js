import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export default function PlanetsProvider({ children }) {
  const [foods, setFoods] = useState([]);

  return (
    <PlanetsContext.Provider value={ { foods, setFoods,} } >
      {children}
    </PlanetsContext.Provider>
  );
}

export const usePlanets = () => {
  const { foods, setFoods } = useContext(FoodsContext);
  return [foods, setFoods];
};

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};