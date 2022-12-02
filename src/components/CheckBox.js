import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CheckBox({ ing, measure, index }) {
  const [itsChecked, setItsChecked] = useState(false);
  return (
    <li>
      <label
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ ing }
      >
        <input
          type="checkbox"
          id={ ing }
          onChange={ () => setItsChecked(!itsChecked) }
          checked={ itsChecked }
        />
        { ing }
        {' '}
        { measure }
      </label>
    </li>
  );
}

CheckBox.propTypes = {
  ing: PropTypes.string.isRequired,
  measure: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default CheckBox;
