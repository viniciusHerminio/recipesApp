import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import Slider from '../components/Slider';
import { fetchDrinksById, drinksAPI } from '../services/drinksAPI';
import { fetchFoodById, foodsAPI } from '../services/foodsAPI';
import { getFavs, saveFav, getInProgress } from '../services/localStorage';
import '../styles/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails({ type, match, history }) {
  const { id } = match.params;
  const [recipe, setRecipe] = useState([]);
  const [video, setvideo] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const [statusProgress, setStatusProgress] = useState('Start');

  useEffect(() => {
    const test = async () => {
      const thisRecipe = await type === 'meals'
        ? await fetchFoodById(id) : await fetchDrinksById(id);
      const allRecipes = await type === 'meals'
        ? await drinksAPI().then((items) => items.drinks)
        : await foodsAPI().then((items) => items.meals);
      setRecipe(thisRecipe[0]);
      setRecipes(allRecipes);
      if (type === 'meals') {
        const ytVideo = thisRecipe[0].strYoutube;
        const a = ytVideo.replace('watch?v=', 'embed/');
        setvideo(a);
      }
    };
    test();
    if (getFavs()) {
      const favorites = JSON.parse(getFavs());
      const isFovorite = favorites.some((item) => item.id === id);
      if (isFovorite) {
        setFavorited(true);
      }
    }
    if (getInProgress()) {
      const recipesInProgress = JSON.parse(getInProgress());
      const recipeKeys = Object.keys(JSON.parse(getInProgress()));
      const inProgressRecipesKeys = Object.keys(recipesInProgress[recipeKeys[0]]);
      // console.log(inProgressRecipesKeys);
      if (inProgressRecipesKeys.includes(id)) {
        setStatusProgress('Continue');
      }
    }
  }, [id]);

  useEffect(() => {
    const arrIng = []; const arrMeasure = []; const fifth = 15;
    const getIngredients = async () => {
      for (let i = 1; i <= fifth; i += 1) {
        arrIng.push(recipe[`strIngredient${i}`]);
        arrMeasure.push(recipe[`strMeasure${i}`]);
      }
      setIngredients(arrIng);
      setMeasure(arrMeasure);
    };
    getIngredients();
  }, [recipe]);

  const title = type === 'meals' ? recipe.strMeal : recipe.strDrink;
  const thumb = type === 'meals' ? recipe.strMealThumb : recipe.strDrinkThumb;
  const cat = type === 'meals' ? recipe.strCategory : recipe.strAlcoholic;

  const startRecipeClick = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  const shareClick = () => {
    copy(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };

  const favoriteClick = () => {
    const favorite = {
      id,
      type: type.substring(0, type.length - 1),
      nationality: recipe.strArea,
      category: recipe.strCategory,
      name: title,
      image: thumb,
      alcoholicOrNot: '',
    };
    if (type === 'drinks') {
      favorite.alcoholicOrNot = recipe.strAlcoholic;
      favorite.nationality = '';
    }
    if (!favorited) {
      if (getFavs()) {
        const favs = JSON.parse(getFavs());
        favs.push(favorite);
        saveFav(JSON.stringify(favs));
      } else {
        const favs = [favorite];
        saveFav(JSON.stringify(favs));
      }
    } else {
      const favs = JSON.parse(getFavs());
      const newFavs = favs.filter((item) => item.id !== id);
      saveFav(JSON.stringify(newFavs));
    }
    setFavorited(!favorited);
  };

  return (
    <main className="recipe">
      {/* <section className="recipe-item"> */}
      <div className="div-recipe-img">
        <header>
          <TbArrowNarrowLeft
            color="#FE4900"
            fontSize="40px"
            onClick={ () => history.goBack() }
          />
        </header>
        <img
          data-testid="recipe-photo"
          src={ thumb }
          alt={ title }
        />
      </div>
      <div className="recipe-content">
        <div className="div-flat-bar">
          <div className="flat-bar" />
          <button
            className="fav-btn"
            type="button"
            onClick={ favoriteClick }
          >
            <img
              data-testid="favorite-btn"
              src={ favorited ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Icon"
            />
          </button>
        </div>
        <div className="a">
          <h2
            data-testid="recipe-title"
          >
            { title }
          </h2>
          <button
            className="share-btn"
            type="button"
            data-testid="share-btn"
            onClick={ shareClick }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
        </div>
        <p
          className="recipe-category"
          data-testid="recipe-category"
        >
          { cat }
        </p>
        { copied && <span>Link copied!</span> }
        <h3> Ingredients </h3>
        <ul>
          {ingredients.map((ing, index) => {
            if (type === 'meals') {
              return ing !== '' ? (
                <li
                  key={ `${index}-ingredient-name-and-measure` }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${ing} ${measure[index]}` }
                </li>) : null;
            }
            return ing !== null ? (
              <li
                key={ `${index}-ingredient-name-and-measure` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { `${ing} ${measure[index]}` }
              </li>) : null;
          })}
        </ul>
        <h3>
          Instructions
        </h3>
        <p data-testid="instructions" className="instructions">
          { recipe.strInstructions }
        </p>
        {
          type === 'meals' ? <iframe
            title={ title }
            src={ video }
            data-testid="video"
            allow="autoplay; encrypted-media"
            allowFullScreen
          /> : null
        }
        <Slider recipes={ recipes } type={ type } />
      </div>
      <footer
        className="position-fixed fixed-bottom footer-recipe"
        data-testid="footer"
      >
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipeClick }
        >
          {`${statusProgress} Recipe`}
        </button>
      </footer>
    </main>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  type: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    goBack: PropTypes.func,
  }).isRequired,
};

export default RecipeDetails;
