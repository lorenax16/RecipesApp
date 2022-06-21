import React, { useState } from 'react';
import searchIcon from '../../../../images/searchIcon.svg';

function SearchBar() {
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    if (visible === true) {
      return setVisible(false);
    }
    return setVisible(true);
  };

  return (
    <section>
      {
        visible === true ? (
          <section>
            <input
              type="text"
              data-testid="search-input"
            />
            <input
              type="image"
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="SearchBar"
              onClick={ handleVisibility }
            />
          </section>

        ) : (
          <input
            type="image"
            data-testid="search-top-btn"
            onClick={ handleVisibility }
            src={ searchIcon }
            alt="SearchBar"
          />
        )
      }
    </section>
  );
}

export default SearchBar;
