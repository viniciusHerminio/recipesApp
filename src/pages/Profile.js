import React from 'react';
import Footer from '../components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
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
