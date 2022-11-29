import React, { useEffect, useState } from 'react';

function Login() {
  const [disabled, setDisabled] = useState(true);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

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
    <div>
      <input
        data-testid="email-input"
        placeholder="Email"
        value={ login.email }
        onChange={ handleChange }
        name="email"
        type="email"
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
        name="password"
        value={ login.password }
        type="password"
        onChange={ handleChange }
      />
      <button
        data-testid="login-submit-btn"
        type="button"
        disabled={ disabled }
        onClick={ () => setLocalStorange() }
      >
        Enter

      </button>
    </div>
  );
}

export default Login;
