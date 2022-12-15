import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import recipesIcon from '../images/iconRecipesApp.png';
import recipesName from '../images/nameRecipesApp.png';
import foodsIcon from '../images/icone-prato.png';
import drinksIcon from '../images/icone-bebida.png';
import RecipesAppContext from '../context/RecipesAppContext';

function Header({ search, profileUser, children }) {
  const [searching, setSearching] = useState(false);
  const { setSearchInput } = useContext(RecipesAppContext);
  return (
    <div>
      <div className="top-header">
        <div className="top-images">
          <img src={ recipesIcon } alt="logo" />
          <img src={ recipesName } alt="Recipes App" />
        </div>
        <div>
          {profileUser && (
            <Link to="/profile">
              <img alt="iconProfile" src={ iconProfile } data-testid="profile-top-btn" />
            </Link>
          )}
          {search && (
            <button
              className="search-top-btn"
              onClick={ () => setSearching((previoStat) => !previoStat) }
              type="button"
            >
              <img alt="iconSearch" src={ iconSearch } data-testid="search-top-btn" />
            </button>
          )}
          {searching && <input
            type="text"
            data-testid="search-input"
            onChange={ ({ target: { value } }) => setSearchInput(value) }
          />}
        </div>
      </div>
      <div className="top-type">
        <img
          className="img-type"
          src={ children === 'Meals' ? foodsIcon : drinksIcon }
          alt="type"
        />
        <p className="type-text" data-testid="page-title">{children}</p>
      </div>
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
