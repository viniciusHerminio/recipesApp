import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';

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
      <Route
        exact
        path="/meals"
        render={ () => <Recipes type="meals" /> }
      />
      <Route
        exact
        path="/drinks"
        render={ () => <Recipes type="drinks" /> }
      />
      <Route
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } type="meals" /> }
      />
      <Route
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } type="drinks" /> }
      />
    </Switch>
  );
}

export default App;
