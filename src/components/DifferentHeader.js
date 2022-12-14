import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { TbArrowNarrowLeft } from 'react-icons/tb';
import { PropTypes } from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/share.svg';

function DifferentHeader({ shareClick, favoriteClick, favorited }) {
  const [changeAppearance, setChangeAppearance] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const limite = 470;
      window
        .addEventListener('scroll', () => setChangeAppearance(window
          .scrollY >= limite));
    }
  }, []);

  return (
    <header
      className={ changeAppearance ? 'different-header' : '' }
    >
      <TbArrowNarrowLeft
        className="arrow-left"
        onClick={ () => history.goBack() }
      />
      { changeAppearance && (
        <div className="buttons-area">
          <button
            className="fav-btn-header"
            type="button"
            onClick={ favoriteClick }
          >
            <img
              data-testid="favorite-btn"
              src={ favorited ? blackHeartIcon : whiteHeartIcon }
              alt="Favorite Icon"
            />
          </button>
          <button
            className="share-btn-header"
            type="button"
            data-testid="share-btn"
            onClick={ shareClick }
          >
            <img
              src={ shareIcon }
              alt="Share Icon"
            />
          </button>
        </div>
      )}
    </header>
  );
}

DifferentHeader.propTypes = {
  shareClick: PropTypes.func.isRequired,
  favoriteClick: PropTypes.func.isRequired,
  favorited: PropTypes.bool.isRequired,
};

export default DifferentHeader;
