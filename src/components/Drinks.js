import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  drinksAPI, drinksCategoryAPI, fetchDrinksByCategory,
} from '../services/drinksAPI';
import Header from './Header';
import SearchBar from './SearchBar';

function Recipes() {
  const { drinks, setDrinks } = useContext(RecipesAppContext);
  const [drinksCategory, setDrinksCategory] = useState();
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
    if (d.length > limit) {
      setDrinks(d.filter((_food, index) => index < limit));
    } else {
      setDrinks(d);
    }
  };

  return (
    <div>
      <Header profileUser search>Drinks</Header>
      <SearchBar />
      { typeof drinksCategory === typeof [] && drinksCategory.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item.strCategory}-category-filter` }
          onClick={ () => handleFilterCat(item.strCategory) }
        >
          {item.strCategory}
        </button>
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => withoutFilter() }
      >
        All
      </button>

      { typeof drinks === typeof [] && drinks.map((item, index) => (
        <button
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
  );
}

export default Recipes;
