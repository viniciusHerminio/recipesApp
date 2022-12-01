import React from 'react';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header profileUser>Profile</Header>
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
