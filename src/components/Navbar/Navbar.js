import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useQueryClient } from '@tanstack/react-query';
import { apiKeys } from '../../API/apiKeys';
import { useLocation, useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import {
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

const drawerWidth = 240;
const navItems = ['Home', 'Reservations', 'Logout'];

const Navbar = () => {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { getValue, removeValue } = useLocalStorage();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const onNavItemClick = (item) => {
    switch (item) {
      case 'Reservations':
        navigate('/reservations');
        break;
      case 'Logout':
        if (loggedIn) {
          removeValue(apiKeys.current()[0]);
          queryClient.clear();
          window.location.reload();
        }
        break;
      default:
        break;
    }
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => (
          <ListItem
            key={item}
            disablePadding
            sx={{
              borderBottom: '1px solid rgba(105,105,105,0.2)',
            }}
          >
            <ListItemButton
              sx={{ textAlign: 'center' }}
              onClick={() => onNavItemClick(item)}
              disabled={pathname.includes(item.toLowerCase())}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  useEffect(() => {
    setLoggedIn(!!getValue(apiKeys.current()[0]));
  }, [pathname, getValue]);

  return (
    <Box sx={{ flexGrow: 1, height: '8vh' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ justifyItems: 'center' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{ py: { sm: 1, xs: 0 }, mr: { xs: 5, sm: 2, md: 0 } }}
          >
            React Hotels
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' }, mb: -1 }}>
            {navItems.map(
              (item) =>
                (item !== 'Logout' || loggedIn) && (
                  <Button
                    key={item}
                    sx={{ color: '#fff' }}
                    onClick={() => onNavItemClick(item)}
                  >
                    {item}
                  </Button>
                ),
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};
export default Navbar;
