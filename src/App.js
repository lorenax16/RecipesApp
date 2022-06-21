import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Foods, Drinks } from './pages';
import { DefaultTemplate, DrinkDetails, FoodDetails } from './pages/components';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />

        <Route exact path="/foods/:id" component={ FoodDetails } />
        <Route exact path="/drinks/:id" component={ DrinkDetails } />

        <Route exact path="/foods/:id/in-progress" component={ FoodDetails } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkDetails } />

        <DefaultTemplate>
          <Route exact path="/foods" component={ Foods } />
          <Route exact path="/drinks" component={ Drinks } />

          <Route exact path="/explore/foods" component={ FoodDetails } />
          <Route exact path="/explore/drinks" component={ DrinkDetails } />

          <Route exact path="/explore/foods/nationalities" component={ FoodDetails } />

          <Route exact path="/explore/foods/ingredients" component={ FoodDetails } />
          <Route exact path="/explore/drinks/ingredients" component={ DrinkDetails } />
        </DefaultTemplate>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
