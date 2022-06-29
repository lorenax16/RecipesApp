import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FoodsProvider from './context/foodContext';
import { Login, FoodsPage, DrinksPage, RecipeInProgress, ExploreRecipes,
  Explore, FavoriteRecipes } from './pages';
import Profile from './pages/Profile';
import { DefaultTemplate, RecipeDetails } from './pages/components';
import ExploreIngredient from './pages/ExploreIngredient';

function App() {
  return (
    <BrowserRouter>
      <FoodsProvider>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/foods/:id" component={ RecipeDetails } />
          <Route path="/drinks/:id" component={ RecipeDetails } />
          <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
          <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />

          <DefaultTemplate>
            <Route path="/foods" component={ FoodsPage } />
            <Route path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route path="/drinks" component={ DrinksPage } />

            <Route path="/explore" component={ Explore } />
            <Route path="/explore/foods" component={ ExploreRecipes } />
            <Route path="/explore/drinks" component={ ExploreRecipes } />

            <Route path="/explore/foods/nationalities" component={ ExploreRecipes } />

            <Route
              path="/explore/foods/ingredients"
              component={ ExploreIngredient }
            />
            <Route
              path="/explore/drinks/ingredients"
              component={ ExploreIngredient }
            />

            <Route path="/profile" component={ Profile } />

            <Route path="/drinks/:id" component={ RecipeDetails } />

          </DefaultTemplate>
        </Switch>
      </FoodsProvider>
    </BrowserRouter>
  );
}

export default App;
