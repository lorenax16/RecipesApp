import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

export const FoodsContext = createContext();

export default function FoodsProvider({ children }) {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const [filterIngredient, setFilterIngredient] = useState('');

  return (
    <FoodsContext.Provider
      value={ {
        filter,
        setFilter,
        search,
        setSearch,
        recipes,
        setRecipes,
        categorySelected,
        setCategorySelected,
        filterIngredient,
        setFilterIngredient,
      } }
    >
      {children}
    </FoodsContext.Provider>
  );
}

export const useFilter = () => {
  const { filter, setFilter } = useContext(FoodsContext);
  return [filter, setFilter];
};

export const useSearch = () => {
  const { search, setSearch } = useContext(FoodsContext);
  return [search, setSearch];
};

export const useRecipes = () => {
  const { recipes, setRecipes } = useContext(FoodsContext);
  return [recipes, setRecipes];
};

export const useCategories = () => {
  const { categorySelected, setCategorySelected } = useContext(FoodsContext);
  return [categorySelected, setCategorySelected];
};

FoodsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
