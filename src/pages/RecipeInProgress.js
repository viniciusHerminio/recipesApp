import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchDrinksById } from '../services/drinksAPI';
import { fetchFoodById } from '../services/foodsAPI';

function RecipeInProgress({ type }) {
  const history = useHistory();
  const [thisRecipe, setThisRecipe] = useState({});
  const [measure, setMeasure] = useState([]);
  const [ingredient, setIngredient] = useState([]);

  useEffect(() => {
    const test = async () => {
      const address = history.location.pathname;
      const id = address.match(/\d+/)[0];
      const recipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      setThisRecipe(recipe[0]);
    };
    test();
  }, []);

  useEffect(() => {
    const arrIng = [];
    const arrMeasure = [];
    const fifth = 15;
    const getIngredients = async () => {
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(thisRecipe[`strIngredient${i}`]);
        arrMeasure.push(thisRecipe[`strMeasure${i}`]);
      }
      setIngredient(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
  }, [thisRecipe]);

  const title = type === 'meals' ? thisRecipe.strMeal : thisRecipe.strDrink;
  const thumb = type === 'meals' ? thisRecipe.strMealThumb : thisRecipe.strDrinkThumb;
  const cat = type === 'meals' ? thisRecipe.strCategory : thisRecipe.strAlcoholic;
  return (
    <main>
      <h2 data-testid="recipe-title">
        { title }
      </h2>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        FAV
      </button>
      <button
        data-testid="share-btn"
        type="button"
      >
        SHARE
      </button>
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
      <ul>
        Ingredients
        {ingredient.map((ing, index) => (
          ing === null || ing === '' ? null : (
            <li key={ `${index}-ingredient-step` }>
              <label
                data-testid={ `${index}-ingredient-step` }
                htmlFor={ ing }
              >
                <input
                  type="checkbox"
                  id={ ing }
                />
                { ing }
                {' '}
                { measure[index] }
              </label>
            </li>)
        ))}
      </ul>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        FINISH
      </button>
      {console.log(thisRecipe)}
    </main>
  );
}

export default RecipeInProgress;
