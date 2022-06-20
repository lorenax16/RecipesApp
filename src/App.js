import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Recipes } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/foods" component={ Recipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
