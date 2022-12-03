import { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import { radioIngredientsApi, radioNamesApi,
  radioFirstLetterApi } from '../services/radioInputApi';

function SearchBar() {
  const { searchInput,
    radioInput,
    setRadioinput } = useContext(RecipesAppContext);

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

  // const searchClickDrinks = () => {
  //   if (radioInput === 'ingredient') {
  //     radioDrinksIngredientsApi(searchInput);
  //   }
  //   if (radioInput === 'name') {
  //     radioDrinksNamesApi(searchInput);
  //   }
  //   if (radioInput === 'first-letter' && searchInput.length > 1) {
  //     global.alert('Your search must have only 1 (one) character');
  //   }
  //   radioDrinksFirstLetterApi(searchInput);
  // };

  // const HandleClick = () => {
  // };

  // console.log(setRadioinput);
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
        onClick={ searchClickMeals }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
