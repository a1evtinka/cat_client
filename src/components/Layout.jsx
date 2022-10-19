import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { GeistProvider, CssBaseline } from '@geist-ui/core';
import Navbar from './Navbar';

export default function Layout() {
  const [themeType, setThemeType] = useState(localStorage.getItem('themeType') || 'ligh');
  const switchThemes = () => {
    setThemeType((last) => (last === 'dark' ? 'light' : 'dark'));
  };
  useEffect(() => localStorage.setItem('themeType', `${themeType}`),
    [themeType]);
  return (
    <GeistProvider themeType={themeType}>
      <CssBaseline />
      <Navbar onChange={switchThemes} isChecked={themeType === 'dark'} />
      <Outlet />
    </GeistProvider>
  );
}
