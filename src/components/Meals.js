import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  foodsAPI, foodsCategoryAPI, fetchFoodByCategory,
} from '../services/foodsAPI';
import Header from './Header';
import SearchBar from './SearchBar';

function Recipes() {
  const [foods, setFoods] = useState();
  const [foodsCategory, setFoodsCategory] = useState();
  const history = useHistory();

  const getInitialFoods = async () => {
    const data = await foodsAPI();
    return data.meals;
  };

  const withoutFilter = () => {
    getInitialFoods().then((data) => {
      const limit = 12;
      const initialMeals = data.filter((_food, index) => index < limit);
      setFoods(initialMeals);
    });
  };

  const getFoodsCategory = async () => {
    const data = await foodsCategoryAPI();
    return data.meals;
  };

  useEffect(() => {
    withoutFilter();
    getFoodsCategory().then((data) => {
      const limit = 5;
      const categories = data.filter((_category, index) => index < limit);
      setFoodsCategory(categories);
    });
  }, []);

  const handleClick = (id) => {
    history.push(`/meals/${id}`);
  };

  const handleFilterCat = async (cat) => {
    const limit = 12;
    const f = await fetchFoodByCategory(cat);
    if (f.length > limit) {
      setFoods(f.filter((_food, index) => index < limit));
    } else {
      setFoods(f);
    }
  };

  return (
    <div>
      <Header profileUser search>Meals</Header>
      <SearchBar />
      Foods
      { typeof foodsCategory === typeof [] && foodsCategory.map((item, index) => (
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
      )) }
    </div>
  );
}

export default Recipes;
