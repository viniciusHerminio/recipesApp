import { useState } from 'react';
import { radioIngredientsApi, radioNamesApi,
  radioFirstLetterApi } from '../services/radioInputApi';

function SearchBar() {
  const { searchInput, setSearchInput } = useState('');
  const { radioInput, setRadioinput } = useState('');

  const searchClick = () => {
    if (radioInput === 'ingredient') {
      radioIngredientsApi(searchInput);
    }
    if (radioInput === 'name') {
      radioNamesApi(searchInput);
    }
    if (radioInput === 'first-letter' && searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    radioFirstLetterApi(searchInput);
  };

  return (
    <div>
      <label htmlFor="ingredient">
        Ingredientes
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          name="ingedient"
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
          name="name"
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
          name="firs-letter"
          value="first-letter"
          // checked={}
          onChange={ ({ target: { value } }) => setRadioinput(value) }
        />
      </label>
      <label htmlFor="search-input">
        <input
          type="text"
          data-testid="search-input"
          name="search-input"
          value={ searchInput }
          onChange={ ({ target: { value } }) => setSearchInput(value) }
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

export default SearchBar;
