import React, { useState, useEffect } from 'react';
import drinksAPI from '../services/drinksAPI';

function Recipes() {
  const [drinks, setDrinks] = useState();

  const getInitialDrinks = async () => {
    const data = await drinksAPI();
    return data.drinks;
  };

  useEffect(() => {
    getInitialDrinks().then((data) => {
      const limit = 12;
      const initialDrinks = data.filter((_drinks, index) => index < limit);
      setDrinks(initialDrinks);
    });
  }, []);

  return (
    <div>
      Drinks
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
