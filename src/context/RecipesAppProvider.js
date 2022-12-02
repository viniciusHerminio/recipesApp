import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioinput] = useState('');

  const value = useMemo(() => ({
    searchInput,
    setSearchInput,
    radioInput,
    setRadioinput,
  }), [searchInput,
    setSearchInput,
    radioInput,
    setRadioinput]);

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
