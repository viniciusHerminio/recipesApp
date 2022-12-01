import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  return (
    <RecipesAppContext.Provider value={ value }>
      <div>
        { children }
      </div>
    </RecipesAppContext.Provider>
  );
}
RecipesAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default RecipesAppProvider;
