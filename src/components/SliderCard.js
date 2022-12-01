import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/SliderCard.css';

function SliderCard({ recipe, i }) {
  return (
    <motion.div className="slider-card">
      <div data-testid={ `${i}-recommendation-card` } className="slider-card-box">
        <motion.div className="slider-card-box-img">
          <img src={ recipe.strDrinkThumb } className="slider-recipe-img" />
        </motion.div>
        <div>
          <p
            data-testid={ `${i}-recommendation-title` }
            className="sluder-card-box-title"
          >
            { recipe.strDrink }
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default SliderCard;
