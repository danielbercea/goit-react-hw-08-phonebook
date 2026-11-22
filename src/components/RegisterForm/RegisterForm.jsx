import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/operations';
import {
  RegisterFormStyled,
  RegisterFormLabelStyled,
  RegisterFormInputStyled,
  RegisterFormButtonStyled,
} from './RegisterForm.styled';

export const RegisterForm = () => {
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
        register({
          name: form.elements.name.value.trim(),
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
    <RegisterFormStyled onSubmit={handleSubmit} aria-busy={isSubmitting}>
      <RegisterFormLabelStyled>
        Username
        <RegisterFormInputStyled type="text" name="name" autoComplete="name" required />
      </RegisterFormLabelStyled>
      <RegisterFormLabelStyled>
        Email
        <RegisterFormInputStyled type="email" name="email" autoComplete="email" required />
      </RegisterFormLabelStyled>
      <RegisterFormLabelStyled>
        Password
        <RegisterFormInputStyled type="password" name="password" autoComplete="new-password" required />
      </RegisterFormLabelStyled>
      {error && <p role="alert" style={{ color: '#f5fc69' }}>{error}</p>}
      <RegisterFormButtonStyled type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </RegisterFormButtonStyled>
    </RegisterFormStyled>
  );
};
