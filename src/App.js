import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={ () => <Login /> }
      />
      <Route
        path="/profile"
        render={ () => <Profile /> }
      />

      <Route path="/meals" render={ () => <Recipes type="meals" /> } />
      <Route path="/drinks" render={ () => <Recipes type="drinks" /> } />

    </Switch>
  );
}

export default App;
