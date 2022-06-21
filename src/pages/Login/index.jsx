import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input } from '../components';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const checkErrors = useCallback(() => {
    const minLen = 7;
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const errors = [
      password.length < minLen,
      !validateEmail.test(email),
    ];

    setDisabled(errors.some((error) => error));
  }, [email, password.length]);

  useEffect(() => {
    checkErrors();
  }, [checkErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (
    <form onSubmit={ handleSubmit }>
      <Input
        id="email-input"
        type="email"
        value={ email }
        func={ setEmail }
        label="Email: "
      />
      <Input
        id="password-input"
        type="password"
        value={ password }
        func={ setPassword }
        label="Senha: "
      />
      <div>
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
        >
          Enviar
        </button>
      </div>
    </form>
  );
}
