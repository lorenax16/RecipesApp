const USER = 'user';
const MEALS_TOKEN = 'mealsToken';
const COCKTAILS_TOKEN = 'cocktailsToken';
const DONE_RECIPES = 'doneRecipes';
const FAVORITE_RECIPES = 'favoriteRecipes';
const IN_PROGRESS_RECIPES = 'inProgressRecipes';
const TEMPLATE_PROP = [];

// read
const readEmail = () => JSON.parse(localStorage.getItem(USER));

export const getEmail = () => {
  const email = readEmail();
  return email;
};

// write
const saveToLocalStorage = (value) => localStorage
  .setItem(TEMPLATE_PROP, JSON.stringify(value));

export const addToLocalStorage = (key, value) => {
  if (key || value) {
    TEMPLATE_PROP.splice(0, 1, key);
    saveToLocalStorage(value);
  }
};

// remove
export const clearLocalStorage = () => {
  localStorage.removeItem(USER);
  localStorage.removeItem(MEALS_TOKEN);
  localStorage.removeItem(COCKTAILS_TOKEN);
  localStorage.removeItem(DONE_RECIPES);
  localStorage.removeItem(FAVORITE_RECIPES);
  localStorage.removeItem(IN_PROGRESS_RECIPES);
};
