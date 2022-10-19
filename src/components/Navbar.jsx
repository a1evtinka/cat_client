import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Grid, Toggle } from '@geist-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar({ onChange, isChecked }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth?.user)
  return (
    <Grid.Container gap={0} justify="center" height="75px" alignContent="center" alignItems="center">
      <Grid xs={6} md={6}>
        <NavLink to="/">
          <Button auto>Все поездки</Button>
        </NavLink>
        {user && <NavLink to="/create/event">
          <Button auto>Создать событие</Button>
        </NavLink>}
      </Grid>
      <Grid xs={3} md={3}>
        <NavLink to="about">
          <>
          <Button auto>О нас</Button>
          {user && 
          <NavLink to='feedback'>
            <Button auto>Связь
            </Button>
          </NavLink>
          }
          </>
        </NavLink>
      </Grid>
      <Grid xs={6} md={6} justify="end" alignContent="center" alignItems="center">
      {user ?
        <>
        {/* <NavLink to="pay">
          <Button auto>Оплатить</Button>
        </NavLink> */} 
        <NavLink to="myevents">
          <Button auto>Мои поездки</Button>
        </NavLink>
         <NavLink to="profile">
          <Button auto>Профиль</Button>
        </NavLink>
        <Button auto onClick={() => {
          dispatch(logout())
          navigate('/')
        }}>Выход</Button>
        </>:
        <>
        <NavLink to="/auth/login">
          <Button auto>Войти</Button>
        </NavLink>
        <NavLink to="/auth/register">
          <Button auto>Регистрация</Button>
        </NavLink>
        </>}
      </Grid>
      <Grid xs md={1} style={{ marginLeft: '5px' }}>
        <Toggle type="secondary" initialChecked={isChecked} onChange={onChange} />
      </Grid>
    </Grid.Container>
  );
}
