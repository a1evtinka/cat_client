import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, selectRegisterFormError, resetRegisterFormError } from './authSlice';
import { Button, Select, Input, Grid, Toggle } from '@geist-ui/core';


function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectRegisterFormError);

  const {genders} = useSelector((state) => state.users); // достаем из стейта гендеры
  const {countries} = useSelector((state) => state.countries); // доставем из стейта страны
  let genderId; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  let countryId; // создаем промежуточную переменную, чтобы обойти кривую работу селектов гейста
  const genderHandler = (value) => genderId = +value;
  const countryHandler = (value) => countryId = +value;
  const user = useSelector((state) => state.auth);
  console.log(user)

  const handleSubmit = React.useCallback(
    async (event) => {
      event.preventDefault();
      const form = event.target;
      const body = {
        firstName: form.firstName?.value,
        lastName: form.lastName?.value,
        genderId: genderId,
        birthday: form.birthday?.value,
        countryId: countryId,
        email: form.email?.value,
        password: form.password?.value, // будет время, подумать как зашифровать пароль сразу
        passwordRepeat: form.passwordRepeat?.value, // будет время, подумать как зашифровать пароль сразу
      }
      const dispatchResult = await dispatch(
        register(body)
      );

      if (!dispatchResult.error) {
        form.reset();
        navigate('/');
      }
    },
    [dispatch, navigate]
  );

  const resetErrorOnChange = React.useCallback(() => {
    dispatch(resetRegisterFormError());
  }, [dispatch]);

  return (
    <div style={{ display: "flex",  justifyContent: "center", }}>
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Регистрация</h2>
      {error && (
        <div className="invalid-feedback mb-3" style={{ display: 'block' }}>
          {error}
        </div>
      )}
      <div className="mb-3">
        <Input
          width="250px"
          htmlType="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="firstName-input"
          name="firstName"
          placeholder="first name"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <div className="mb-3">
        <Input
          width="250px"
          htmlType="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="lastName-input"
          name="lastName"
          placeholder="last name"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <div className="mb-3">
      <Select width="250px" padding="0" placeholder="Select gender" onChange={genderHandler}>
        {genders?.map((gender) => <Select.Option key={gender.id} value={`${gender.id}`}>{gender.gender}</Select.Option>)}
      </Select>
      </div> 
      <div className="mb-3">
        <p>дата рождения</p>
        <Input
          width="250px"
          htmlType="date"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="birthday-input"
          name="birthday"
          placeholder="birthday"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <div className="mb-3">
      <Select width="250px" padding="0" placeholder="Select country" name="country" onChange={countryHandler}>
        {countries?.map((country) => <Select.Option key={country.id} value={`${country.id}`}>{country.country}</Select.Option>)}
      </Select >
      </div> <br />
      <div className="mb-3">
        <Input
          width="250px"
          htmlType="email"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="email-input"
          name="email"
          placeholder="email"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <div className="mb-3">
        <Input.Password
          width="250px"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-input"
          name="password"
          placeholder="password"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <div className="mb-3">
        <Input.Password
          width="250px"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="password-repeat-input"
          name="passwordRepeat"
          placeholder="repeat password"
          onChange={resetErrorOnChange}
        />
      </div> <br />
      <Button htmlType="submit" className="btn btn-primary">Зарегистрироваться</Button>
    </form>
    </div>
  );
}

export default Register;
