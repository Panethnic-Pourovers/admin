import { createTheme } from '@mui/material/styles';
import '@fontsource/work-sans';

declare module '@mui/material/Box' {
  interface BoxPropsVariantOverrides {
    modalBox: true;
  }
}

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
          margin: '1em 0em 1em 0.5em',
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          maxWidth: '40vw',
          minWidth: '25em',
          margin: '1em auto',
        },
      },
    },
  },
});

export default theme;
