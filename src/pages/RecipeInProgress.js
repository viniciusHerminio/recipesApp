import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import CheckBox from '../components/CheckBox';
import { fetchDrinksById } from '../services/drinksAPI';
import { fetchFoodById } from '../services/foodsAPI';
import '../styles/RecipeInProgress.css';
import FavBtn from '../components/FavBtn';
import RecipesAppContext from '../context/RecipesAppContext';

function RecipeInProgress({ type }) {
  const history = useHistory();
  const { isDisabled, setDisabled } = useContext(RecipesAppContext);
  const [thisRecipe, setThisRecipe] = useState({});
  const [measure, setMeasure] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [ingredientsProgress, setIngredientsProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const title = type === 'meals' ? thisRecipe.strMeal : thisRecipe.strDrink;
  const thumb = type === 'meals' ? thisRecipe.strMealThumb : thisRecipe.strDrinkThumb;
  const cat = type === 'meals' ? thisRecipe.strCategory : thisRecipe.strAlcoholic;

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getIbyPath = async () => {
      const address = history.location.pathname;
      const id = address.match(/\d+/)[0];
      const recipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      setThisRecipe(recipe[0]);
    };
    getIbyPath();
  }, []);

  useEffect(() => {
    const fifth = 15;
    const getIngredients = async () => {
      const arrIng = [];
      const arrMeasure = [];
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(thisRecipe[`strIngredient${i}`]);
        arrMeasure.push(thisRecipe[`strMeasure${i}`]);
      }
      setIngredient(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
    setLoading(false);
    const recipesInProg = async () => {
      if (JSON.parse(localStorage.getItem('inProgressRecipes'))) {
        const a = JSON.parse(localStorage.getItem('inProgressRecipes'))[title];
        if (a) {
          setIngredientsProgress(a);
          const ings = [];
          for (let i = 1; i <= fifth; i += 1) {
            ings.push(thisRecipe[`strIngredient${i}`]);
          }
          setDisabled((ings
            .filter((az) => az !== '' && az !== null).length !== a
            .filter((az) => az === true).length));
        }
      }
    };
    recipesInProg();
  }, [thisRecipe]);

  const handleFinish = () => {
    const drinkOrMeal = type === 'meals' ? 'meal' : 'drink';
    const alcoholicOrNot = type === 'meals' ? '' : thisRecipe.strAlcoholic;
    const nationality = type === 'meals' ? thisRecipe.strArea : '';
    const local = JSON.parse(localStorage.getItem('doneRecipes'));
    const findId = type === 'meals' ? 'idMeal' : 'idDrink';
    const tags = type !== 'meals' || thisRecipe.strTags === null ? []
      : thisRecipe.strTags.split(',');
    const date = new Date();
    const obj = {
      id: thisRecipe[findId],
      type: drinkOrMeal,
      nationality,
      category: thisRecipe.strCategory,
      alcoholicOrNot,
      name: title,
      image: thumb,
      doneDate: date,
      tags,
    };
    if (local) {
      if (!local.some((el) => el[findId] === thisRecipe[findId])) {
        local.push(obj);
        localStorage.setItem('doneRecipes', JSON.stringify(local));
      }
    } else {
      const arr = [];
      arr.push(obj);
      localStorage.setItem('doneRecipes', JSON.stringify(arr));
    }
    history.push('/done-recipes');
  };

  const copyLink = () => {
    const time = 3000;
    const allUrl = window.location.href;
    const recipeUrl = allUrl.replace('/in-progress', '');
    navigator.clipboard.writeText(recipeUrl);
    setCopied('Link copied!');
    setTimeout(() => setCopied(false), time);
  };

  return (
    <main id="recipe-in-progress">
      {loading || title === undefined ? <p>LOADING...</p> : (
        <>
          <h2 data-testid="recipe-title">
            { title }
          </h2>
          <FavBtn
            type={ type }
            thisRecipe={ thisRecipe }
            title={ title }
            thumb={ thumb }
          />
          <button
            data-testid="share-btn"
            type="button"
            onClick={ copyLink }
          >
            SHARE
          </button>
          { copied && <p>Link copied!</p> }
          <img
            src={ thumb }
            alt={ title }
            data-testid="recipe-photo"
          />
          <p
            data-testid="recipe-category"
          >
            { cat }
          </p>
          <p
            data-testid="instructions"
          >
            { thisRecipe.strInstructions }
          </p>
          { measure === undefined ? <h2>Loading...</h2> : (
            <ul>
              Ingredients
              {ingredient.map((ing, index) => {
                if (type === 'meals') {
                  return ing !== '' ? (
                    <CheckBox
                      ing={ ing }
                      measure={ measure[index] }
                      key={ `${index}-ingredient-step` }
                      index={ index }
                      setIngredientsProgress={ setIngredientsProgress }
                      title={ title }
                      ingredientsProgress={ ingredientsProgress[index] === true }
                      allIngs={ ingredientsProgress }
                      ings={ ingredient }
                    />) : null;
                }
                return ing !== '' && ing !== null ? (
                  <CheckBox
                    ing={ ing }
                    measure={ measure[index] }
                    key={ `${index}-ingredient-step` }
                    index={ index }
                    setIngredientsProgress={ setIngredientsProgress }
                    title={ title }
                    ingredientsProgress={ ingredientsProgress[index] === true }
                    allIngs={ ingredientsProgress }
                    ings={ ingredient }
                  />) : null;
              })}
            </ul>)}
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ () => handleFinish() }
            disabled={ isDisabled }
          >
            FINISH
          </button>
        </>)}
    </main>
  );
}

RecipeInProgress.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeInProgress;
