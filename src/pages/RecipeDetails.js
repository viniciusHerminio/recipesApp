import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import { fetchDrinksById } from '../services/drinksAPI';
import { fetchFoodById } from '../services/foodsAPI';

function RecipeDetails({ type, match }) {
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [video, setvideo] = useState('');
  // const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const test = async () => {
      const thisRecipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      // const allRecipes = await type === 'meals'
        // ? await foodsAPI() : await drinksAPI();
      setRecipe(thisRecipe[0]);
      // setRecipes(allRecipes);
      // console.log(thisRecipe[0  ]);
      if (type === 'meals') {
        const ytVideo = thisRecipe[0].strYoutube;
        const a = ytVideo.replace('watch?v=', 'embed/');
        setvideo(a);
      }
    };
    test();
  }, [id]);

  useEffect(() => {
    const arrIng = [];
    const arrMeasure = [];
    const fifth = 15;
    const getIngredients = async () => {
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(recipe[`strIngredient${i}`]);
        arrMeasure.push(recipe[`strMeasure${i}`]);
      }
      console.log(arrIng);
      setIngredients(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
  }, [recipe]);

  return (
    <div>
      { type === 'meals' ? (
        <>
          <h2
            data-testid="recipe-title"
          >
            { recipe.strMeal }
          </h2>
          <img
            data-testid="recipe-photo"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
          <p
            data-testid="recipe-category"
          >
            Category:
            {' '}
            { recipe.strCategory}
          </p>
          <ul>
            Ingredients
            {ingredients.map((ing, index) => (
              <li
                key={ `${index}-ingredient-name-and-measure` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ing }
                {' '}
                { measure[index] }
              </li>))}
          </ul>
          <h3>
            Instructions
          </h3>
          <p data-testid="instructions">
            { recipe.strInstructions }
          </p>
          <iframe
            title={ recipe.strMeal }
            src={ video }
            data-testid="video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </>)
        : (
          <>
            <h2
              data-testid="recipe-title"
            >
              { recipe.strDrink }
            </h2>
            <img
              data-testid="recipe-photo"
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
            />
            <p
              data-testid="recipe-category"
            >
              Category:
              {' '}
              { recipe.strCategory}
              {', '}
              { recipe.strAlcoholic }
            </p>
            <ul>
              Ingredients
              {ingredients.map((ing, index) => (
                ing !== null ? (
                  <li
                    key={ `${index}-ingredient-name-and-measure` }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { ing }
                    {' '}
                    { measure[index] }
                  </li>
                ) : null))}
            </ul>
            <h3>
              Instructions
            </h3>
            <p data-testid="instructions">
              { recipe.strInstructions }
            </p>
          </>
        )}
      <footer
        className="position-fixed fixed-bottom"
        data-testid="footer"
      >
        <Footer />
      </footer>
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeDetails;
