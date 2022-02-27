import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  useTheme,
} from '@mui/material/styles';
import ThemeModule from 'modules/theme';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext();

export const useThemeMode = () => {
  useContext(ThemeContext);
};

export const ThemeContextProvider = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useTheme();

  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (!!localTheme) setMode(localTheme);
  }, []);

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode((prevThemeMode) => {
          const currTheme = prevThemeMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', currTheme);
          return currTheme;
        });
      },
    }),
    [],
  );

  const themeProvider = useMemo(
    () => responsiveFontSizes(createTheme(ThemeModule(mode, theme))),
    [mode, theme],
  );

  return (
    <ThemeContext.Provider value={themeMode}>
      <ThemeProvider theme={themeProvider}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
