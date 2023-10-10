import LogoSVG from '@/public/images/LogoSVG';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import { PAGES } from 'src/utils/constants';

function Navbar() {
  // the anchorEl prop on the menu is the button that will open the mobile nav menu. When set, the menu will open.
  const [mobileAnchorElForNav, setMobileAnchorElForNav] =
    React.useState<null | HTMLElement>(null);

  const router = useRouter();

  const handleOpenMobileNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileAnchorElForNav(event.currentTarget);
  };

  const handleCloseMobileNavMenu = () => {
    setMobileAnchorElForNav(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ borderBottom: '1px solid black' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Work Sans, sans-serif',
              fontWeight: 400,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <LogoSVG />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMobileNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={mobileAnchorElForNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(mobileAnchorElForNav)}
              onClose={handleCloseMobileNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {PAGES.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseMobileNavMenu}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Work Sans, sans-serif',
              fontWeight: 400,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <LogoSVG />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map((page) => (
              <Button
                key={page.name}
                onClick={() => {
                  handleCloseMobileNavMenu();
                  router.push(`/${page.link}`); // Navigate to the corresponding link
                }}
                sx={{
                  my: 2,
                  fontSize: '1.1em',
                  mx: 1,
                  color: 'black',
                  display: 'block',
                  '&:hover': {
                    color: 'white',
                  },
                  whiteSpace: 'nowrap',
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
