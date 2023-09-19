// React Imports
import React from 'react';

// Material Imports
import { ThemeProvider } from '@mui/material/styles';

// Component Imports
import Navbar from '@/components/Navbar';
import theme from '@/styles/Theme';

const Header: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <nav>
        <Navbar />
      </nav>
    </ThemeProvider>
  );
};

export default Header;
