import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/operations';
import {
  LoginFormStyled,
  LoginFormLabelStyled,
  LoginFormInputStyled,
  LoginFormButtonStyled,
} from './LoginForm.styled';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    const form = event.currentTarget;
    setError('');
    setIsSubmitting(true);

    try {
      await dispatch(
        logIn({
          email: form.elements.email.value.trim(),
          password: form.elements.password.value,
        })
      ).unwrap();
    } catch (message) {
      setError(typeof message === 'string' ? message : 'Something went wrong. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <LoginFormStyled onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <LoginFormLabelStyled>
        Email
        <LoginFormInputStyled type="email" name="email" autoComplete="email" required />
      </LoginFormLabelStyled>
      <LoginFormLabelStyled>
        Password
        <LoginFormInputStyled type="password" name="password" autoComplete="current-password" required />
      </LoginFormLabelStyled>
      {error && <p role="alert" style={{ color: '#f5fc69' }}>{error}</p>}
      <LoginFormButtonStyled type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </LoginFormButtonStyled>
    </LoginFormStyled>
  );
};
