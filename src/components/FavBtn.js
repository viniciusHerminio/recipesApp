import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavBtn({ thisRecipe, type, title, thumb }) {
  const [itsFav, setItsFav] = useState(false);
  const drinkOrMeal = type === 'meals' ? 'meal' : 'drink';
  const id = type === 'meals' ? thisRecipe.idMeal : thisRecipe.idDrink;
  const alcool = type === 'meals' ? '' : thisRecipe.strAlcoholic;
  const nationality = type === 'meals' ? thisRecipe.strArea : '';

  const recipesFavs = async () => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const r = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const b = r.some((item) => item.id === id);
      if (b) {
        const w = (r.filter((a) => a.id !== id));
        localStorage.setItem('favoriteRecipes', JSON.stringify(w));
        setItsFav(false);
      } else {
        r.push({
          id,
          type: drinkOrMeal,
          nationality,
          category: thisRecipe.strCategory,
          alcoholicOrNot: alcool,
          name: title,
          image: thumb,
        });
        localStorage.setItem('favoriteRecipes', JSON.stringify(r));
        setItsFav(true);
        // console.log(r);
      }
    } else {
      setItsFav(true);
      const favObj = [{
        id,
        type: drinkOrMeal,
        nationality,
        category: thisRecipe.strCategory,
        alcoholicOrNot: alcool,
        name: title,
        image: thumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favObj));
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      const r = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const b = r.some((item) => item.id === id);
      setItsFav(b);
    }
  }, []);

  return (
    <button
      data-testid="favorite-btn"
      type="button"
      onClick={ recipesFavs }
      src={ itsFav ? blackHeartIcon : whiteHeartIcon }
    >
      <img
        src={ itsFav ? blackHeartIcon : whiteHeartIcon }
        alt="btn-favorite"
        data-testid={ id }
      />
    </button>
  );
}

FavBtn.propTypes = {
  thisRecipe: PropTypes.shape({
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
};

export default FavBtn;
