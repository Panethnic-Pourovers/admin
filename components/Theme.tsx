import { createTheme } from '@mui/material/styles';
import '@fontsource/work-sans';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCC00',
    },
    secondary: {
      main: '#000',
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '1em',
          boxShadow: '0px 3px 1px -2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {},
      },
    },
  },
});

export default theme;
