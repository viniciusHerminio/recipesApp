import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function CheckBox({
  ing, measure, index, setIngredientsProgress, ingredientsProgress, title, allIngs }) {
  const [itsChecked, setItsChecked] = useState(false);
  // const [a, setA] = useState([]);

  const handleCheck = () => {
    const arrIngred = allIngs;
    arrIngred[index] = !itsChecked;
    setItsChecked(!itsChecked);
    setIngredientsProgress(arrIngred);
    const objThisRecipeIng = { [title]: arrIngred };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objThisRecipeIng));
    // console.log(arrIngred);
  };

  useEffect(() => {
    setItsChecked(ingredientsProgress);
  }, [ingredientsProgress]);

  return (
    <li>
      <label
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ ing }
      >
        <input
          type="checkbox"
          id={ ing }
          onChange={ () => handleCheck() }
          checked={ itsChecked }
        />
        <span>
          { ing }
          {' '}
          { measure }
        </span>
      </label>
    </li>
  );
}

CheckBox.defaultProps = {
  measure: '',
  ing: 'Loading...',
};

CheckBox.propTypes = {
  ing: PropTypes.string,
  measure: PropTypes.string,
  index: PropTypes.number.isRequired,
  setIngredientsProgress: PropTypes.func.isRequired,
  ingredientsProgress: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  allIngs: PropTypes.shape({}).isRequired,
};

export default CheckBox;
