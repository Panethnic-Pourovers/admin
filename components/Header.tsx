import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeProvider } from '@mui/material/styles';

// 
import Navbar from "./Navbar";
import theme from './Theme';

// local imports
import { PAGES } from "src/utils/constants";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  return (
    <ThemeProvider theme={theme}>
      <nav>
        <Navbar />
      </nav>

    </ThemeProvider>
  );
};

export default Header;
