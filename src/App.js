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
        path="/meals"
        render={ () => <Recipes /> }
      />
      <Route
        path="/drinks"
        render={ () => <Recipes /> }
      />
      <Route
        path="/profile"
        render={ () => <Profile /> }
      />
    </Switch>
  );
}

export default App;
