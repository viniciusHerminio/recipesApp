import { useContext } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import { radioIngredientsApi, radioNamesApi,
  radioFirstLetterApi, radioDrinksIngredientsApi,
  radioDrinksNamesApi, radioDrinksFirstLetterApi } from '../services/radioInputApi';

function SearchBar() {
  const { searchInput,
    radioInput,
    setRadioinput, historyPathname } = useContext(RecipesAppContext);

  const searchClickMeals = async () => {
    // console.log(searchInput);
    if (radioInput === 'ingredient') await radioIngredientsApi(searchInput);
    if (radioInput === 'name') await radioNamesApi(searchInput);
    if (radioInput === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        await radioFirstLetterApi(searchInput);
      }
    }
  };

  const searchClickDrinks = async () => {
    if (radioInput === 'ingredient') await radioDrinksIngredientsApi(searchInput);
    if (radioInput === 'name') await radioDrinksNamesApi(searchInput);
    if (radioInput === 'first-letter') {
      if (searchInput.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        await radioDrinksFirstLetterApi(searchInput);
      }
    }
  };
  const searchClick = () => {
    if (historyPathname === '/meals') {
      searchClickMeals();
    } else {
      searchClickDrinks();
    }
  };
  // console.log(searchClick);

  return (
    <div>
      <label htmlFor="ingredient">
        Ingredientes
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="searchBar"
          value="ingredient"
          // checked={}
          onChange={ ({ target: { value } }) => setRadioinput(value) }
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          data-testid="name-search-radio"
          name="searchBar"
          value="name"
          // checked={}
          onChange={ ({ target: { value } }) => setRadioinput(value) }
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="searchBar"
          value="first-letter"
          // checked={}
          onChange={ ({ target: { value } }) => setRadioinput(value) }
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ searchClick }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = ({
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
  }),
}).isRequired;

export default SearchBar;
