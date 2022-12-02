import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  const redirectPageDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const redirectPageFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const redirectPageLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  const mail = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <Header profileUser>Profile</Header>
      { localStorage.getItem('user') !== null ? (
        <p data-testid="profile-email">
          { mail.email }
        </p>)
        : null}
      <button
        type="button"
        onClick={ redirectPageDoneRecipes }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        type="button"
        onClick={ redirectPageFavoriteRecipes }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        onClick={ redirectPageLogout }
        data-testid="profile-logout-btn"
      >
        Logout
      </button>
      <footer
        className="position-absolute fixed-bottom"
        data-testid="footer"
      >
        <Footer />
      </footer>
    </div>
  );
}

export default Profile;
