import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [showRecipesInfo, setShowRecipesInfo] = useState([]);
  const [copyed, setCopyed] = useState(true);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(local);
    setShowRecipesInfo(local);
  }, []);

  const shareLink = (element) => {
    copy(`http://localhost:3000/${element.type}s/${element.id}`);
    setCopyed(false);
  };

  const all = () => {
    setDoneRecipes(showRecipesInfo);
  };

  const meals = () => {
    const filterMeal = doneRecipes.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(filterMeal);
  };

  const drinks = () => {
    const filterDrinks = doneRecipes.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(filterDrinks);
  };
  return (
    <>
      <Header profileUser>Done Recipes</Header>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ meals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ drinks }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ all }
      >
        All
      </button>
      {doneRecipes
      && doneRecipes.map((e, index) => (
        <div key={ e.id }>
          <Link to={ `/${e.type}s/${e.id}` }>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
              className="w-25"
            />
            <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
          </Link>

          <p data-testid={ `${index}-horizontal-done-date` }>
            {e.doneDate}
          </p>

          {e.type === 'meal' ? (
            <>
              <span data-testid={ `${index}-horizontal-top-text` }>
                {`${e.nationality} - ${e.category}`}
              </span>
              <p data-testid={ `${index}-${e.tags[0]}-horizontal-tag` }>
                {`${e.tags[0]}`}
              </p>

              <p data-testid={ `${index}-${e.tags[1]}-horizontal-tag` }>
                {`${e.tags[1]}`}
              </p>
            </>
          ) : (
            <span data-testid={ `${index}-horizontal-top-text` }>
              {e.alcoholicOrNot}
            </span>
          )}
          {copyed ? (
            <button type="button" onClick={ () => shareLink(e) }>
              <img
                src={ ShareIcon }
                alt="favorite Icon"
                data-testid={ `${index}-horizontal-share-btn` }
              />
            </button>
          ) : (
            <p>Link copied!</p>
          )}
        </div>
      ))}
    </>
  );
}

export default DoneRecipes;
