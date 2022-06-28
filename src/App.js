import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FoodsProvider from './context/foodContext';
import { Login, FoodsPage, DrinksPage, ExploreRecipes, Explore } from './pages';
import Profile from './pages/Profile';
// import { NewHome } from './pages/Home/foodIndex';
import { DefaultTemplate, Details } from './pages/components';
import ExploreIngredient from './pages/ExploreIngredient';

function App() {
  return (
    <BrowserRouter>
      <FoodsProvider>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route exact path="/foods/:id" component={ Details } />
          <Route exact path="/drinks/:id" component={ Details } />

          <Route exact path="/foods/:id/in-progress" component={ Details } />
          <Route exact path="/drinks/:id/in-progress" component={ Details } />

          <DefaultTemplate>
            <Route exact path="/foods" component={ FoodsPage } />
            <Route exact path="/drinks" component={ DrinksPage } />

            <Route exact path="/explore" component={ Explore } />
            <Route exact path="/explore/foods" component={ ExploreRecipes } />
            <Route exact path="/explore/drinks" component={ ExploreRecipes } />

            <Route exact path="/explore/foods/nationalities" component={ Details } />

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

          </DefaultTemplate>
        </Switch>
      </FoodsProvider>
    </BrowserRouter>
  );
}

export default App;
