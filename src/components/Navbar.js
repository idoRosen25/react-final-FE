import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useQueryClient } from '@tanstack/react-query';
import { apiKeys } from '../API/apiKeys';
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

const Navbar = () => {
  const pathname = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const { getValue, removeValue } = useLocalStorage();
  const queryClient = useQueryClient();

  useEffect(() => {
    setLoggedIn(!!getValue(apiKeys.current()[0]));
  }, [pathname, getValue]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hotel App
          </Typography>
          {loggedIn && (
            <Button
              color="inherit"
              onClick={() => {
                removeValue(apiKeys.current()[0]);
                queryClient.clear();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
