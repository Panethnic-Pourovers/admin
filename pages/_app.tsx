import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/styles/Theme';
import { BooksContextProvider } from '@/components/BookCatalog/BooksContext';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BooksContextProvider>
          <Component {...pageProps} />
        </BooksContextProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
