import { createTheme } from '@mui/material/styles';
import '@fontsource/work-sans';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCC00',
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
});

export default theme;
