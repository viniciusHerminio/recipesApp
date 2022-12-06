import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import All from '../images/All.svg';
import foods from '../images/foods.svg';
import drinks from '../images/drinks.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    const time = 3000;
    const allUrl = window.location.href;
    const recipeUrl = allUrl.replace('/in-progress', '');
    navigator.clipboard.writeText(recipeUrl);
    setCopied('Link copied!');
    setTimeout(() => setCopied(false), time);
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
        >
          <img src={ All } alt="filter-all" />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          <img src={ foods } alt="filter-foods" />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          <img src={ drinks } alt="filter-drink" />
        </button>
      </div>
      {favoriteRecipes === null || favoriteRecipes === undefined
        ? ''
        : favoriteRecipes.map((recipe, index) => {
          const { image, name, nationality, id, category } = recipe;
          return (
            <div key={ id } className="d-flex align-items-center mt-4">
              <img
                src={ image }
                alt={ name }
                className="w-25"
                data-testid={ `${index}-horizontal-image` }
              />
              <div className="ms-3">
                <h3
                  data-testid={ `${index}-horizontal-name` }
                >
                  { name }

                </h3>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  { nationality }
                  {' '}
                  -
                  {' '}
                  { category }
                </p>
                <button
                  data-testid={ `${index}-horizontal-share-btn` }
                  type="button"
                  onClick={ copyLink }
                >
                  Share
                </button>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                >
                  Disfavor
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
