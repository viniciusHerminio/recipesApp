import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import { fetchDrinksById, drinksAPI } from '../services/drinksAPI';
import { fetchFoodById, foodsAPI } from '../services/foodsAPI';

function RecipeDetails({ type, match }) {
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [video, setvideo] = useState('');
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const test = async () => {
      const thisRecipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      const allRecipes = await type === 'meals'
        ? await foodsAPI() : await drinksAPI();
      setRecipe(thisRecipe[0]);
      setRecipes(allRecipes);
      // console.log(thisRecipe[0  ]);
      const ytVideo = thisRecipe[0].strYoutube;
      const a = ytVideo.replace('watch?v=', 'embed/');
      setvideo(a);
    };
    test();
  }, [id]);

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
          <h3>
            Informations
          </h3>
          <p
            data-testid="recipe-category"
          >
            Category:
            {' '}
            { recipe.strCategory}
          </p>
          <iframe
            title={ recipe.strMeal }
            src={ video }
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
