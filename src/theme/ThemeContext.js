
import React, { createContext, useState } from 'react';
import { Appearance } from 'react-native';
import { LightTheme, DarkTheme } from './colors';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();

  const [themeMode, setThemeMode] = useState('default');

  const getTheme = () => {
    if (themeMode === 'light') return LightTheme;
    if (themeMode === 'dark') return DarkTheme;
    return systemTheme === 'dark' ? DarkTheme : LightTheme;
  };

  return (
    <ThemeContext.Provider value={{ theme: getTheme(), themeMode, setThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
};