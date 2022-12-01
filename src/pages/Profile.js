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

  const getEmail = () => {
    const value = localStorage.getItem('user');
    const emailTratamento = JSON.parse(value);
    const { email } = emailTratamento;
    return email;
  };
  const email = getEmail();

  return (
    <div>
      <h1>Profile</h1>
      <Header profileUser>Profile</Header>
      <p data-testid="profile-email">{email}</p>
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
