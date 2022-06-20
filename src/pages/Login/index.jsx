import React, { useCallback, useEffect, useState } from 'react';
import Input from '../components/Input';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const checkErrors = useCallback(() => {
    const minLen = 6;
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

  return (
    <form>
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
