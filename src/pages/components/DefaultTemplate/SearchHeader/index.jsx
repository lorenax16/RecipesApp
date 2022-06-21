import React, { useState } from 'react';
import { useSearch } from '../../../../context/foodContext';
import searchIcon from '../../../../images/searchIcon.svg';

export default function SearchHeader() {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useSearch();
  console.log(search);

  return (
    <section>
      { visible === true && (
        <input
          type="text"
          data-testid="search-input"
          value={ search }
          onChange={ ({ target }) => setSearch(target.value) }
        />
      ) }
      <input
        type="image"
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="SearchBar"
        onClick={ () => setVisible(!visible) }
      />
    </section>
  );
}
