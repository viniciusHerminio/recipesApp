import React from 'react';

function SearchBar() {
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
          // onchange={}
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
          // onchange={}
        />
      </label>
      <label htmlFor="first-letter">
        Primeira letra
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="firs-letter"
          value="first-letterr"
          // checked={}
          // onchange={}
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        // onClick={}
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
