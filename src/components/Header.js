import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
// import iconProfile from '../images/profileIcon.svg';
// import iconSearch from '../images/searchIcon.svg';
import foodsIcon from '../images/icone-prato.png';
import drinksIcon from '../images/icone-bebida.png';
import logo from '../images/alternativeLogoWhite.png';
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
    <div>
      <div className="top-header">
        <div className="top-images">
          <img src={ logo } alt="logo" />
          {/* <img src={ recipesName } alt="Recipes App" /> */}
        </div>
        <div className="top-btn">
          {profileUser && (
            <Link to="/profile">
              <i
                className="fa-regular fa-user"
                data-testid="profile-top-btn"
                src="profileIcon"
              />
              {/* <img
                className="hide"
                src={ iconProfile }
                alt="profile"
                data-testid="profile-top-btn"
              /> */}
            </Link>
          )}
          {search && (
            <button
              className="search-top-btn"
              onClick={ () => setSearching((previoStat) => !previoStat) }
              type="button"
            >
              <i
                className="fa-sharp fa-solid fa-magnifying-glass"
                data-testid="search-top-btn"
                src="searchIcon"
              />
              {/* <img
                className="hide"
                src={ iconSearch }
                alt="search"
                data-testid="search-top-btn"
              /> */}
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
