import { createTheme } from '@mui/material/styles';
import '@fontsource/work-sans';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCC00',
    },
    secondary: {
      main: '#000'
    }
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '1em',
          padding: '6px 10px',
        }
      }
    }
  }
});

export default theme;
