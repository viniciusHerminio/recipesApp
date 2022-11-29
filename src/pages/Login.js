import React from 'react';

function Login() {
  return (
    <div>
      <input
        data-testid="email-input"
        placeholder="Email"
      />
      <input
        data-testid="password-input"
        placeholder="Senha"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter

      </button>
    </div>
  );
}

export default Login;
