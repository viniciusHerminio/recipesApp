import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { drinksAPI, drinksCategoryAPI } from '../services/drinksAPI';
import Header from './Header';

function Recipes() {
  const [drinks, setDrinks] = useState();
  const [drinksCategory, setDrinksCategory] = useState();
  const history = useHistory();

  const getInitialDrinks = async () => {
    const data = await drinksAPI();
    return data.drinks;
  };

  const getDrinksCategory = async () => {
    const data = await drinksCategoryAPI();
    return data.drinks;
  };

  useEffect(() => {
    getInitialDrinks().then((data) => {
      const limit = 12;
      const initialDrinks = data.filter((_drinks, index) => index < limit);
      setDrinks(initialDrinks);
    });
    getDrinksCategory().then((data) => {
      const limit = 5;
      const categories = data.filter((_category, index) => index < limit);
      setDrinksCategory(categories);
    });
  }, []);

  const handleClick = (id) => {
    history.push(`/drinks/${id}`);
  };

  return (
    <div>
      <Header profileUser search>Drinks</Header>
      { typeof drinksCategory === typeof [] && drinksCategory.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item.strCategory}-category-filter` }
        >
          {item.strCategory}
        </button>
      )) }

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
