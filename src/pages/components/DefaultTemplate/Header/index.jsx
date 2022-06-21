import React, { useCallback, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import profileIcon from '../../../../images/profileIcon.svg';
import exploreIcon from '../../../../images/exploreIcon.svg';
import SearchBar from '../SearchBar';

export default function Header() {
  const location = useLocation().pathname.slice(1);
  const [disbaled, setDisabled] = useState(false);

  const capitalize = (name) => name
    .charAt(0).toUpperCase() + name.slice(1);
  // referencia: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript

  const titleFormated = () => {
    if (location.includes('ingredients') || location.includes('nationalities')) {
      return location.split('/').filter((name) => name !== 'drinks' && name !== 'foods')
        .reduce((name, acc) => `${capitalize(name)} ${capitalize(acc)}`);
    }

    return location.split(/[/"-]/)
      .reduce((name, acc) => `${capitalize(name)} ${capitalize(acc)}`, '');
  };

  const disabledImg = useCallback(() => {
    const urls = ['profile', 'favorite-recipes',
      'done-recipes', 'explore'];
    setDisabled(urls.some((url) => location.includes(url)));
  }, [location]);

  useEffect(() => {
    disabledImg();
  }, [disabledImg]);

  return (
    <section className="header">
      <Link to="/profile">
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
      </Link>
      <h1 data-testid="page-title">{ titleFormated() }</h1>
      {
        disbaled && !location.includes('nationalities')
          ? <img src={ exploreIcon } alt="explore" />
          : <SearchBar />
      }
    </section>
  );
}

// Header.propTypes = {
//   location: PropTypes.string.isRequired,
// };
