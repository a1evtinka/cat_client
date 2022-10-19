import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectLoginFormError, resetLoginFormError } from './authSlice';
import { Button, Input, Grid, Toggle } from '@geist-ui/core';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectLoginFormError);

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      console.log(event.target)
      const form = event.target;
      const dispatchResult = await dispatch(
        login({
          email: form.email.value,
          password: form.password.value,
        })
      );

      if (!dispatchResult.error) {
        form.reset();
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  const resetErrorOnChange = React.useCallback(() => {
    dispatch(resetLoginFormError());
  }, [dispatch]);

  return (
    <div style={{   display: "flex",  justifyContent: "center", }}>
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Вход</h2>
      {error && (
        <div className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="name-input" className="form-label" />
        <Input
          width="231.5px"
          htmlType="email"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="email-input"
          placeholder="e-mail"
          name="email"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <div className="mb-3">
        <label htmlFor="password-input" className="form-label" />
        <Input.Password
          width="231.5px"
          // type="password"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-input"
          placeholder="password"
          name="password"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <Button htmlType="submit" className="btn btn-primary">Войти</Button>
    </form>
    </div>
  );
}

export default Login;
