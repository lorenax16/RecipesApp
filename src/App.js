import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FoodsProvider from './context/foodContext';
import { Login, FoodsPage, DrinksPage } from './pages';
import Profile from './pages/Profile';
// import { NewHome } from './pages/Home/foodIndex';
import { DefaultTemplate, RecipeDetails } from './pages/components';

function App() {
  return (
    <BrowserRouter>
      <FoodsProvider>
        <Switch>
          <Route exact path="/" component={ Login } />

          <Route exact path="/foods/:id" component={ RecipeDetails } />
          <Route exact path="/drinks/:id" component={ RecipeDetails } />

          <Route exact path="/foods/:id/in-progress" component={ RecipeDetails } />
          <Route exact path="/drinks/:id/in-progress" component={ RecipeDetails } />

          <DefaultTemplate>
            <Route exact path="/foods" component={ FoodsPage } />
            <Route exact path="/drinks" component={ DrinksPage } />

            <Route exact path="/explore/foods" component={ RecipeDetails } />
            <Route exact path="/explore/drinks" component={ RecipeDetails } />

            <Route path="/explore/foods/nationalities" component={ RecipeDetails } />

            <Route exact path="/explore/foods/ingredients" component={ RecipeDetails } />
            <Route exact path="/explore/drinks/ingredients" component={ RecipeDetails } />

            <Route exact path="/profile" component={ Profile } />

            <Route exact path="/drinks/:id" component={ RecipeDetails } />

          </DefaultTemplate>
        </Switch>
      </FoodsProvider>
    </BrowserRouter>
  );
}

export default App;
