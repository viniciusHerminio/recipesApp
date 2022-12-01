import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ type }) {
  const history = useHistory();

  const redirectPageDrink = () => {
    history.push('/drinks');
  };
  const redirectPageMeal = () => {
    history.push('/meals');
  };

  return (
    <div
      className="recipe-header"
    >
      <button
        type="button"
        onClick={ type === 'meals' ? redirectPageMeal : redirectPageDrink }
        aria-label={ `button-${type}` }
      >
        <img
          src={ type === 'meals' ? mealIcon : drinkIcon }
          alt={ type === 'meals' ? 'mealIcon' : 'drinkIcon' }
        />

      </button>
    </div>
  );
}

Header.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Header;
