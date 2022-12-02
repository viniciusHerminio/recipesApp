import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function RecipesAppProvider({ children }) {
  const [inProgress, setInProgress] = useState([]);
  const [type, setType] = useState('');

  const value = useMemo(() => ({
    inProgress,
    setInProgress,
    type,
    setType,
  }), [inProgress, type]);

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
