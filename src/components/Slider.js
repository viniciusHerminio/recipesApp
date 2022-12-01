import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../styles/Slider.css';

function Slider({ recipes, type }) {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  });

  const six = 6;
  const thumb = type === 'meals' ? 'strDrinkThumb' : 'strMealThumb';
  const title = type === 'meals' ? 'strDrink' : 'strMeal';
  return (
    <motion.div
      className="carousel"
      whileTop={ { cursor: 'grabbing' } }
      ref={ carousel }
    >
      <motion.div
        className="inner"
        drag="x"
        dragConstraints={ { right: 0, left: -width } }
      >
        {recipes.filter((_r, index) => index < six).map((recipe, i) => (
          <motion.div
            key={ `${i}-${recipe}` }
            className="inner-item"
            data-testid={ `${i}-recommendation-card` }
          >
            <img
              src={ recipe[thumb] }
              className="slider-recipe-img"
              alt={ recipe[title] }
            />
            <p data-testid={ `${i}-recommendation-title` }>
              { recipe[title] }
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

Slider.propTypes = {
  recipes: PropTypes.shape({
    filter: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Slider;
