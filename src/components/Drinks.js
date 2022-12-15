import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  drinksAPI, drinksCategoryAPI, fetchDrinksByCategory,
} from '../services/drinksAPI';
import Header from './Header';
import SearchBar from './SearchBar';
import '../styles/Recipes.css';
import allCat from '../images/All.png';
import Beef from '../images/beef.png';
import Breakfast from '../images/breakfast.png';
import Chicken from '../images/chicken.png';
import Dessert from '../images/dessert.png';
import Goat from '../images/goat.png';

const arrImages = [
  Beef, Breakfast, Chicken, Dessert, Goat,
];

function Recipes() {
  const { drinks, setDrinks } = useContext(RecipesAppContext);
  const [drinksCategory, setDrinksCategory] = useState();
  const [nameCategory, setNameCategory] = useState('');
  const [cont, setCont] = useState(0);
  const history = useHistory();

  const getInitialDrinks = async () => {
    const data = await drinksAPI();
    return data.drinks;
  };

  const withoutFilter = () => {
    getInitialDrinks().then((data) => {
      const limit = 12;
      const initialDrinks = data.filter((_food, index) => index < limit);
      setDrinks(initialDrinks);
    });
  };

  const getDrinksCategory = async () => {
    const data = await drinksCategoryAPI();
    return data.drinks;
  };

  useEffect(() => {
    withoutFilter();
    getDrinksCategory().then((data) => {
      const limit = 5;
      const categories = data.filter((_category, index) => index < limit);
      setDrinksCategory(categories);
    });
  }, []);

  const handleClick = (id) => {
    history.push(`/drinks/${id}`);
  };

  const handleFilterCat = async (cat) => {
    const limit = 12;
    const d = await fetchDrinksByCategory(cat);
    if (nameCategory === cat && cont >= 1) {
      setCont(0);
      setDrinks(d.filter((_food, index) => index < limit));
    }
    if (nameCategory === cat && cont < 1) {
      withoutFilter();
      setCont(cont + 1);
    } else setCont(0);
    if (d.length > limit) {
      setDrinks(d.filter((_food, index) => index < limit));
    } else {
      setDrinks(d);
    }
    setNameCategory(cat);
  };

  return (
    <div>
      <Header profileUser search>Drinks</Header>
      <SearchBar />

      <div className="category-cards">
        <button
          className="category-btn"
          type="button"
          data-testid="All-category-filter"
          onClick={ () => withoutFilter() }
        >
          <img src={ allCat } alt="all categories" />
        </button>
        { typeof drinksCategory === typeof [] && drinksCategory.map((item, index) => (
          <button
            className="category-btn"
            type="button"
            key={ index }
            data-testid={ `${item.strCategory}-category-filter` }
            onClick={ () => handleFilterCat(item.strCategory) }
          >
            {/* {item.strCategory} */}
            <img src={ arrImages[index] } alt="category" />
          </button>
        )) }
      </div>

      <div className="cards">
        { typeof drinks === typeof [] && drinks.map((item, index) => (
          <button
            className="recipe-card"
            data-testid={ `${index}-recipe-card` }
            key={ index }
            onClick={ () => handleClick(item.idDrink) }
            type="button"
          >
            <img
              src={ item.strDrinkThumb }
              alt="imagem da receita"
              width="50"
              data-testid={ `${index}-card-img` }
            />
            <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
          </button>
        )) }
      </div>
    </div>
  );
}

export default Recipes;
