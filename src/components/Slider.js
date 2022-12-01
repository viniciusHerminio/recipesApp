import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import SliderCard from './SliderCard';
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
            // onCli
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

export default Slider;
