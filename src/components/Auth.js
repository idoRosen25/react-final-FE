import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useAuth from '../hooks/useAuth';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const theme = createTheme();

const Auth = () => {
  const { auth, inputs, setInputs, isLogin, setIsLogin, notify, handleSubmit } =
    useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '93vh', mt: -1.5 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          style={{
            backgroundImage:
              'url(https://i0.wp.com/kenwoodtravel.co.uk/blog/wp-content/uploads/Untitled-design-1-1.png?fit=2310%2C1208&ssl=1  )',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              mb: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoFocus
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    email: e.target.value || '',
                  }))
                }
                value={inputs.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    password: e.target.value || '',
                  }))
                }
                value={inputs.password}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                component={Link}
                onClick={handleSubmit}
              >
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
              <Grid container>
                <Grid item>
                  <Button
                    variant="body2"
                    onClick={() => setIsLogin((prev) => !prev)}
                  >
                    {isLogin
                      ? "Don't have an account? Sign Up"
                      : 'Already have an account? Sign In'}
                  </Button>
                </Grid>
                {auth.isError && <p>{auth.error.message}</p>}
              </Grid>
            </Box>
            {notify && (
              <Stack sx={{ width: '70%', marginLeft: '15%', marginTop: '10%' }}>
                <Alert
                  severity="error"
                  variant="outlined"
                  sx={{ width: '80%' }}
                >
                  <Typography variant="subtitle1" gutterBottom>{`${
                    isLogin ? 'Login' : 'Signup'
                  } Error`}</Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {auth.error?.error?.message || 'submothing went wrong'}
                  </Typography>
                </Alert>
              </Stack>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
export default Auth;
