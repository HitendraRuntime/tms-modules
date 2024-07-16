import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { getLoggedInUser, isUserLoggedIn, logout } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

const settings = ['Profile', 'Logout'];

const HeaderComponents = () => {

  const isAuth = isUserLoggedIn();
  console.log("isAuth :: " + isAuth);

  const navigator = useNavigate();

  const username = (isAuth) ? getLoggedInUser() : "Default User";
  console.log("username :: " + username);

  function handleLogout() {
    logout();
    navigator('/')
  }

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    //console.log(e);
    if (setting) {
      console.log(`Clicked setting: ${setting}`);
      if (setting == "Logout") {
        handleLogout();
      }
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">

        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TMS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              key="logout"
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
            </Button>
          </Box>

          {
            isAuth &&
            <Box display="flex" justifyContent={'flex-end'}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          }

          {
            !isAuth &&
            <Box display="flex" justifyContent={'flex-end'}>
              
              <Link href="/" variant="body2" >
              <Button variant="contained" color='success' startIcon={<VpnKeyIcon />}>
                  Login
                  </Button>
              </Link>

              <Link href="/register">
              <Button variant="contained" color='secondary' startIcon={<AppRegistrationIcon />}>
                  Register
                  </Button>
              </Link>
            </Box>
          }

        </Toolbar>
      </Container>
    </AppBar>
  );

}

export default HeaderComponents;