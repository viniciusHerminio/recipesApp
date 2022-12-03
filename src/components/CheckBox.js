import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from '../context/RecipesAppContext';

function CheckBox({
  ing,
  measure,
  index,
  setIngredientsProgress,
  ingredientsProgress,
  title,
  allIngs,
  ings,
}) {
  const [itsChecked, setItsChecked] = useState(false);
  const { setDisabled } = useContext(RecipesAppContext);

  const handleFinishBtn = () => {
    if (allIngs
      .filter((cc) => cc === true).length === ings
      .filter((az) => az !== '' && az !== null).length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleCheck = () => {
    const arrIngred = allIngs;
    arrIngred[index] = !itsChecked;
    setItsChecked(!itsChecked);
    setIngredientsProgress(arrIngred);
    const objThisRecipeIng = { [title]: arrIngred };
    localStorage.setItem('inProgressRecipes', JSON.stringify(objThisRecipeIng));
    handleFinishBtn();
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
  allIngs: PropTypes.shape({
    filter: PropTypes.func,
  }).isRequired,
  ings: PropTypes.shape({
    filter: PropTypes.func,
  }).isRequired,
};

export default CheckBox;
