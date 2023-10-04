import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/Theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
