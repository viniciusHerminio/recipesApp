import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import iconProfile from '../images/profileIcon.svg';
import iconSearch from '../images/searchIcon.svg';
import RecipesAppContext from '../context/RecipesAppContext';

function Header({ search, profileUser, children, goBack }) {
  const [searching, setSearching] = useState(false);
  const { setSearchInput, setLoading } = useContext(RecipesAppContext);
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
    setLoading(true);
  };
  return (
    <div className="header">
      {goBack && <TbArrowNarrowLeft
        className="arrow-left"
        onClick={ handleClick }
      />}
      <h2 data-testid="page-title">{children}</h2>
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
        onChange={ ({ target: { value } }) => setSearchInput(value) }
      />}
    </div>
  );
}

Header.propTypes = {}.isRequired;

export default Header;
