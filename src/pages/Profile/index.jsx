import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getEmail, clearLocalStorage } from '../../localStorage';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getEmailLocalStorage = getEmail();
    setEmail([getEmailLocalStorage]);
  }, []);

  const toGoFavoriteRecipes = () => history.push('/favorite-recipes');
  const toGoDoneRecipes = () => history.push('/done-recipes');
  const toGoLogin = () => {
    clearLocalStorage();
    history.push('/');
  };

  return (
    <div>
      {email.length !== 0
      && (
        <h2 data-testid="profile-email">
          {email.map((user) => user.email)}
        </h2>
      )}

      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ toGoDoneRecipes }
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ toGoFavoriteRecipes }
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ toGoLogin }
      >
        Logout
      </button>
    </div>
  );
}
