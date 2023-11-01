import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/Theme';
import { BooksContextProvider } from '@/components/BookCatalog/BooksContext';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <BooksContextProvider>
        <Component {...pageProps} />
      </BooksContextProvider>
    </ThemeProvider>
  );
};

export default App;
