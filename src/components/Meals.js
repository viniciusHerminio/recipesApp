import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { foodsAPI, foodsCategoryAPI } from '../services/foodsAPI';

function Recipes() {
  const [foods, setFoods] = useState();
  const [foodsCategory, setFoodsCategory] = useState();
  const history = useHistory();

  const getInitialFoods = async () => {
    const data = await foodsAPI();
    return data.meals;
  };

  const getFoodsCategory = async () => {
    const data = await foodsCategoryAPI();
    return data.meals;
  };

  useEffect(() => {
    getInitialFoods().then((data) => {
      const limit = 12;
      const initialMeals = data.filter((_food, index) => index < limit);
      setFoods(initialMeals);
    });
    getFoodsCategory().then((data) => {
      const limit = 5;
      const categories = data.filter((_category, index) => index < limit);
      setFoodsCategory(categories);
    });
  }, []);

  const handleClick = (id) => {
    history.push(`/meals/${id}`);
  };

  return (
    <div>
      Foods
      { typeof foodsCategory === typeof [] && foodsCategory.map((item, index) => (
        <button
          type="button"
          key={ index }
          data-testid={ `${item.strCategory}-category-filter` }
        >
          {item.strCategory}
        </button>
      )) }

      { typeof foods === typeof [] && foods.map((item, index) => (
        <button
          data-testid={ `${index}-recipe-card` }
          type="button"
          onClick={ () => handleClick(item.idMeal) }
          key={ index }
        >
          <img
            src={ item.strMealThumb }
            alt="imagem da receita"
            width="50"
            data-testid={ `${index}-card-img` }
          />
          <span data-testid={ `${index}-card-name` }>{item.strMeal}</span>
        </button>
        // </Link>
      )) }
    </div>
  );
}

export default Recipes;
