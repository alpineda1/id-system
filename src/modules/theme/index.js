import { darkScrollbar } from '@mui/material';
import DarkTheme from './components/dark';
import LightTheme from './components/light';

const ThemeModule = (mode, theme) => ({
  palette: {
    mode: mode,
    ...(mode === 'light' ? LightTheme.palette : DarkTheme.palette),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: mode === 'dark' ? darkScrollbar() : null,
      },
    },
  },
});

export default ThemeModule;
