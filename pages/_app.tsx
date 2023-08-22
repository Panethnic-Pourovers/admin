import { AppProps } from "next/app";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import theme from '@/components/Theme';

const App = ({ Component, pageProps }: AppProps) => {

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
    
  );
};

export default App;
