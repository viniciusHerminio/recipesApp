import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Login /> } />
      <Route path="/profile" render={ () => <Profile /> } />
      <Route path="/meals" render={ () => <Recipes type="meals" /> } />
      <Route path="/drinks" render={ () => <Recipes type="drinks" /> } />
      <Route exact path="/done-recipes" render={ () => <DoneRecipes /> } />
      <Route exact path="/favorite-recipes" render={ () => <FavoriteRecipes /> } />
      <Route exact path="/meals/:id" render={ () => <RecipeDetails /> } />
      <Route exact path="/drinks/:id" render={ () => <RecipeDetails /> } />
      <Route exact path="/meals/:id/in-progress" render={ () => <RecipeInProgress /> } />
      <Route exact path="/drinks/:id/in-progress" render={ () => <RecipeInProgress /> } />
    </Switch>
  );
}

export default App;
