import { useState } from 'react';
import { Link } from 'react-router-dom';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
// import RecipesAppContext from '../context/RecipesAppContext';

function Header({ search, profileUser, children }) {
  const [searching, setSearching] = useState(false);
  return (
    <div>
      {profileUser && (
        <Link to="/profile">
          <img alt="iconProfile" src={ iconProfile } data-testid="profile-top-btn" />
        </Link>
      )}
      {search && (
        <button onClick={ () => setSearching((previoStat) => !previoStat) } type="button">
          <img alt="iconSearch" src={ iconSearch } data-testid="search-top-btn" />
        </button>
      )}
      {searching && <input
        type="text"
        data-testid="search-input"
      />}
      <p data-testid="page-title">{children}</p>
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
