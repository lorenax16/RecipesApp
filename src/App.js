import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FoodsProvider from './context/foodContext';
import {
  Login,
  FoodsPage,
  DrinksPage,
  RecipeInProgress,
  ExploreRecipes,
  Explore,
  FavoriteRecipes,
  ExploreNationalities,
  Profile,
  NotFound,
} from './pages';

import { DefaultTemplate, Details, RecipeDetails } from './pages/components';
import ExploreIngredient from './pages/ExploreIngredient';

function App() {
  return (
    <BrowserRouter>
      <FoodsProvider>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route exact path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />

          <Route exact path="/foods/:id/in-progress" component={ RecipeInProgress } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />

          <DefaultTemplate>
            <Route exact path="/foods" component={ FoodsPage } />
            <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
            <Route exact path="/drinks" component={ DrinksPage } />

            <Route exact path="/explore" component={ Explore } />
            <Route exact path="/explore/foods" component={ ExploreRecipes } />
            <Route exact path="/explore/drinks" component={ ExploreRecipes } />

            <Route
              exact
              path="/explore/foods/nationalities"
              component={ ExploreNationalities }
            />
            <Route
              exact
              path="/explore/drinks/nationalities"
              component={ NotFound }
            />

            <Route
              exact
              path="/explore/foods/ingredients"
              component={ ExploreIngredient }
            />
            <Route
              exact
              path="/explore/drinks/ingredients"
              component={ ExploreIngredient }
            />

            <Route exact path="/profile" component={ Profile } />

            <Route exact path="/drinks/:id" component={ RecipeDetails } />

          </DefaultTemplate>
        </Switch>
      </FoodsProvider>
    </BrowserRouter>
  );
}

export default App;
