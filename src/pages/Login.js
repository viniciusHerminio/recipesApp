import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Login.css';
import logo from '../images/recipeLogo.png';

function Login() {
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const redirectRecipes = () => {
    history.push('/meals');
  };
  const validation = () => {
    const SIX = 7;
    const regex = /[\w.ã]+@\w+\.\w{2,8}(\.\w{0,2})?/g;
    const validEmail = regex.test(login.email);
    if (login.password.length >= SIX && validEmail) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const setLocalStorange = () => {
    const { email } = login;
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  useEffect(() => {
    validation();
  }, [login.password]);

  const handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'email') {
      setLogin(() => ({
        ...login,
        email: value,
      }));
    } if (name === 'password') {
      setLogin(() => ({
        ...login,
        password: value,
      }));
    }
    validation();
  };

  return (
    <div className="login-body">
      <div className="logo-images">
        <ul className="geometric">
          <li />
          <li />
          <li />
        </ul>
      </div>
      <div className="form-login">
        <img src={ logo } alt="tomate" />
        <h4>Login</h4>
        <label htmlFor="email">
          <span>Email:</span>
          <input
            data-testid="email-input"
            value={ login.email }
            onChange={ handleChange }
            name="email"
            type="email"
          />
        </label>
        <label htmlFor="key">
          <span>Password:</span>
          <input
            data-testid="password-input"
            name="password"
            value={ login.password }
            type="password"
            onChange={ handleChange }
          />
        </label>
        <button
          className="login-btn"
          data-testid="login-submit-btn"
          type="button"
          disabled={ disabled }
          onClick={ () => {
            setLocalStorange();
            redirectRecipes();
          } }
        >
          Enter

        </button>

        <p>or</p>
        <button type="button" className="register-btn">Register now</button>
      </div>
    </div>
  );
}

export default Login;
