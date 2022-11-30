import React, { useState, useEffect } from 'react';
import { drinksAPI, drinksCategoryAPI } from '../services/drinksAPI';

function Recipes() {
  const [drinks, setDrinks] = useState();
  const [drinksCategory, setDrinksCategory] = useState();

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

  return (
    <div>
      Drinks
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
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ item.strDrinkThumb }
            alt="imagem da receita"
            width="50"
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` }>{item.strDrink}</span>
        </div>
      )) }
    </div>
  );
}

export default Recipes;
