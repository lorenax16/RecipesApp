const USER = 'user';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES = 'doneRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';

const readEmail = () => JSON.parse(localStorage.getItem(USER));

// read
export const getEmail = () => {
  const email = readEmail();
  return email;
};

// remove
export const clearEmail = () => {
  localStorage.removeItem(USER);
  localStorage.removeItem(MEALS_TOKEN);
  localStorage.removeItem(COCKTAILS_TOKEN);
  localStorage.removeItem(DONE_RECIPES);
  localStorage.removeItem(FAVORITE_RECIPES);
  localStorage.removeItem(IN_PROGRESS_RECIPES);
};
