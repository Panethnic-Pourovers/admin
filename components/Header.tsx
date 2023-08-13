import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ThemeProvider } from '@mui/material/styles';
import Navbar from "./Navbar";
import theme from './Theme';

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
