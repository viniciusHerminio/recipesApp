import React from 'react';
import { useHistory } from 'react-router-dom';
// import drinkIcon from '../images/drinkIcon.svg';
// import mealIcon from '../images/mealIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();

  const redirectPageDrink = () => {
    history.push('/drinks');
  };
  const redirectPageMeal = () => {
    history.push('/meals');
  };

  return (
    <div
      className="footer"
    >
      <button
        type="button"
        onClick={ redirectPageDrink }
        aria-label="button-drinks"
      >
        {/* <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="iconDink"
        /> */}
        <i
          className="fa-solid fa-martini-glass-citrus"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ redirectPageMeal }
        aria-label="button-meals"
      >
        {/* <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="iconDink"
        /> */}
        <i
          className="fa-solid fa-utensils"
          data-testid="meals-bottom-btn"
        />
      </button>
    </div>
  );
}

export default Footer;
