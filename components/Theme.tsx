import { createTheme } from '@mui/material/styles';
import '@fontsource/work-sans';


// Define your custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCC00',
    },
  },
  typography: {
    fontFamily: '"Work Sans", sans-serif',
  },
  // Other theme properties (spacing, breakpoints, etc.)
});

export default theme;
