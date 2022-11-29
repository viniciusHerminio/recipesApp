import React, { useState, useEffect } from 'react';
import foodsAPI from '../services/foodsAPI';

function Recipes() {
  const [foods, setFoods] = useState();

  const getInitialFoods = async () => {
    const data = await foodsAPI();
    return data.meals;
  };

  useEffect(() => {
    getInitialFoods().then((data) => {
      const limit = 12;
      const initialMeals = data.filter((_food, index) => index < limit);
      setFoods(initialMeals);
    });
  }, []);

  return (
    <div>
      Foods
      { typeof foods === typeof [] && foods.map((item, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ index }>
          <img
            src={ item.strMealThumb }
            alt="imagem da receita"
            width="50"
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
        </div>
      )) }
    </div>
  );
}

export default Recipes;
