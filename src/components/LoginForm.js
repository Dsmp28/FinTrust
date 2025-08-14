import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [clientCode, setClientCode] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = clientCode.trim() !== '' && username.trim() !== '' && password.trim() !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid && onLogin) {
      onLogin({
        clientCode: clientCode.trim(),
        username: username.trim(),
        password: password.trim()
      });
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <img 
          src="https://fintrustauditores.com/wp-content/uploads/2024/07/FINTRUST-LOGO-04-1024x1024.png" 
          alt="FinTrust Logo" 
          className="logo"
        />
        <h2>FinTrust - Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="clientCode">Código de Cliente</label>
            <input
              type="text"
              id="clientCode"
              value={clientCode}
              onChange={(e) => setClientCode(e.target.value)}
              placeholder="Ingrese su código de cliente"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={`login-button ${isFormValid ? 'enabled' : 'disabled'}`}
            disabled={!isFormValid}
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;