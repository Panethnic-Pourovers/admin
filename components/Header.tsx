// React Imports
import React from "react";

// Next Imports
import { useRouter } from "next/router";

// Material Imports
import { ThemeProvider } from '@mui/material/styles';

// Component Imports
import Navbar from "@/components/Navbar";
import theme from '@/components/Theme';

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
