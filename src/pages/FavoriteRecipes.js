import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import All from '../images/All.svg';
import foods from '../images/foods.svg';
import drinks from '../images/drinks.svg';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FavoriteRecipes() {
  const favoriteRecipe = () => JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [copied, setCopied] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipe());
  const history = useHistory();

  const copyLink = (type, id) => {
    const time = 3000;
    const allUrl = window.location.origin;
    const recipeUrl = `${allUrl}/${type}s/${id}`;
    navigator.clipboard.writeText(recipeUrl);
    setCopied('Link copied!');
    setTimeout(() => setCopied(false), time);
  };

  const redirectPage = (type, id) => {
    console.log(type);
    console.log(id);
    history.push(`/${type}s/${id}`);
  };

  const disfavor = (id) => {
    const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeDisfavor = recipe.filter((rec) => rec.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeDisfavor));
    setFavoriteRecipes(recipeDisfavor);
  };

  const filtredFood = () => {
    const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeFood = recipe.filter((rec) => rec.type === 'meal');
    setFavoriteRecipes(recipeFood);
  };

  const filtredDrink = () => {
    const recipe = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const recipeDrink = recipe.filter((rec) => rec.type === 'drink');
    setFavoriteRecipes(recipeDrink);
  };

  const filtredAll = () => {
    setFavoriteRecipes(favoriteRecipe());
  };

  return (
    <div>
      <div>
        <Header profileUser>Favorite Recipes</Header>
      </div>
      <h1 data-testid="page-title">Favorites</h1>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filtredAll() }
        >
          <img src={ All } alt="filter-all" />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filtredFood() }
        >
          <img src={ foods } alt="filter-foods" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filtredDrink() }
        >
          <img src={ drinks } alt="filter-drink" />
        </button>
      </div>
      {(favoriteRecipes !== null)
       && favoriteRecipes.map((recipe, index) => {
         const { image, name, nationality, id, category, type, alcoholicOrNot } = recipe;
         if (type === 'drink') {
           return (
             <div key={ id } className="d-flex align-items-center mt-4">
               <button
                 type="button"
                 onClick={ () => redirectPage(type, id) }
                 name="drink"
                 data-testid="button-drink"
                 className="w-75"
               >
                 <img
                   src={ image }
                   alt={ name }
                   className="w-25"
                   data-testid={ `${index}-horizontal-image` }
                 />
               </button>
               <div className="ms-3">
                 <button
                   type="button"
                   onClick={ () => redirectPage(type, id) }
                   data-testid="button-name-drink"

                 >
                   <h3
                     data-testid={ `${index}-horizontal-name` }
                   >
                     { name }

                   </h3>
                 </button>
                 <p data-testid={ `${index}-horizontal-top-text` }>
                   { nationality }
                   {' '}
                   -
                   {' '}
                   { category }
                 </p>
                 <p data-testid={ `${index}-horizontal-top-text` }>
                   { alcoholicOrNot }
                 </p>
                 <button
                   type="button"
                   onClick={ () => copyLink(type, id) }
                 >
                   <img
                     src={ shareIcon }
                     alt="share icon"
                     data-testid={ `${index}-horizontal-share-btn` }
                   />
                 </button>
                 <button
                   type="button"
                   onClick={ () => disfavor(id) }
                 >
                   <img
                     src={ blackHeartIcon }
                     alt="black heart icon"
                     data-testid={ `${index}-horizontal-favorite-btn` }
                   />
                 </button>
                 { copied && <p>Link copied!</p> }
               </div>
             </div>
           );
         }
         return (
           <div key={ id } className="d-flex align-items-center mt-4">
             <button
               onClick={ () => redirectPage(type, id) }
               type="button"
               data-testid="button-food"
               className="w-75"
             >
               <img
                 src={ image }
                 alt={ name }
                 className="w-25"
                 data-testid={ `${index}-horizontal-image` }
               />
             </button>
             <div className="ms-3">
               <button
                 onClick={ () => redirectPage(type, id) }
                 type="button"
                 data-testid="button-name-food"
               >
                 <h3
                   data-testid={ `${index}-horizontal-name` }
                 >
                   { name }

                 </h3>
               </button>
               <p data-testid={ `${index}-horizontal-top-text` }>
                 { nationality }
                 {' '}
                 -
                 {' '}
                 { category }
               </p>
               <button
                 type="button"
                 onClick={ () => copyLink(type, id) }
               >
                 <img
                   src={ shareIcon }
                   alt="share icon"
                   data-testid={ `${index}-horizontal-share-btn` }
                 />
               </button>
               <button
                 type="button"
                 onClick={ () => disfavor(id) }
               >
                 <img
                   src={ blackHeartIcon }
                   alt="black heart icon"
                   data-testid={ `${index}-horizontal-favorite-btn` }
                 />
               </button>
               { copied && <p>Link copied!</p> }
             </div>
           </div>
         );
       })}
      <footer
        className="position-fixed fixed-bottom"
        data-testid="footer"
      >
        <Footer />
      </footer>
    </div>
  );
}
