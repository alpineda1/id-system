import { darkScrollbar } from '@mui/material';
import DarkTheme from './components/dark';
import LightTheme from './components/light';

const ThemeModule = (mode, theme) => ({
  palette: {
    mode: mode,
    ...(mode === 'light' ? LightTheme.palette : DarkTheme.palette),
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    htmlFontSize: 22,
    fontSize: 18,
    h1: {
      fontFamily:
        'Lexend, Poppins, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily:
        'Lexend, Poppins, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily:
        'Lexend, Poppins, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily:
        'Lexend, Poppins, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily:
        'Lexend, Poppins, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily:
        'Lexend, Poppins, Inter, Roboto, Helvetica, Arial, sans-serif',
      fontWeight: 600,
    },
    subtitle1: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    body1: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    body2: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    button: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    caption: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
    overline: {
      fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          marginBottom: theme.spacing(2),
          borderRadius: theme.spacing(2),
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(1.5),
          boxShadow: 'none',
          letterSpacing: '0.15em',
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.MuiToggleButton-root': {
            borderRadius: theme.spacing(2),
          },
          '&.MuiToggleButtonGroup-grouped.MuiToggleButton-root': {
            lineHeight: 1,
            padding: [theme.spacing(1.25), theme.spacing(2.5)].join(' '),
            textTransform: 'capitalize',
            '& .MuiIcon-root': {
              fontSize: '1.25em',
              marginLeft: theme.spacing(1),
            },
          },
          '& .MuiTouchRipple-root': {
            opacity: 0.4,
          },
          '&.MuiLoadingButton-root': {
            padding: [theme.spacing(1.5), theme.spacing(2)].join(' '),
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: mode === 'dark' ? darkScrollbar() : null,
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          width: '100%',
          '& .MuiTextField-root': {
            width: '100%',
          },
          '& .MuiInputLabel-root': {
            top: theme.spacing(0.6),
            left: theme.spacing(1.5),
          },
          '& .MuiInputBase-root': {
            borderRadius: theme.spacing(2),
          },
          '& .MuiInputBase-input': {
            marginTop: theme.spacing(0.5),
            marginBottom: theme.spacing(0.25),
            paddingTop: theme.spacing(3.25),
            paddingRight: theme.spacing(3),
            paddingBottom: theme.spacing(1),
            paddingLeft: theme.spacing(3),
          },
          '& .MuiInputBase-input.MuiInputBase-inputMultiline': {
            paddingTop: theme.spacing(0.5),
            paddingRight: theme.spacing(1.5),
            paddingBottom: 0,
            paddingLeft: theme.spacing(1.5),
          },
          '& .MuiInputBase-root.MuiFilledInput-underline': {
            borderRadius: [theme.spacing(2), theme.spacing(2), 0, 0].join(' '),
            outline: 'none',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        edgeEnd: {
          marginLeft: 0,
          marginRight: `-${theme.spacing(1)}`,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        positionEnd: {
          height: 'auto',
          marginRight: theme.spacing(1),
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.MuiSelect-root': {
            marginBottom: theme.spacing(0.5),
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&.MuiInputBase-input.MuiFilledInput-input:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: '2em',
          paddingBottom: '2em',
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
    },
    MuiTimelineOppositeContent: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        overline: {
          color:
            mode === 'light'
              ? 'rgba(0, 0, 0, 0.38)'
              : 'rgba(255, 255, 255, 0.5)',
          fontWeight: 800,
        },
      },
    },
  },
});

export default ThemeModule;
