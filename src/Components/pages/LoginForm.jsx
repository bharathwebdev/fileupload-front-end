import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { UserContext } from '../../hooks/Context';
import { toast } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';
import GetToken from '../Auth/GetToken';
import Cookies from 'js-cookie';
import api from '../api/AxiosApi';
import { isAuthenticated } from '../Auth/AuthenticationConfig';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const {user,setUser} = React.useContext(UserContext);
const navigate = useNavigate();
React.useEffect(()=>{
 async function checkAuth(){
    const isLoggedIn = await isAuthenticated();
if (isLoggedIn) {
  navigate("/")
  return;
}
  }
  checkAuth()
},[])

  const handleSubmit = (event) => {

    event.preventDefault();
    // console.log(event)
    const data = new FormData(event.currentTarget);

  
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    };



    
  api.post("/api/v2/authenticate",credentials)
  .then(response=>{
        const bearToken  = response.data.data.bearerToken;
        console.log(response);
        // Cookies.set('bearerToken', bearToken, { expires: 1, sameSite: 'strict'});
      //  console.log(Cookies.get("bearerToken"))
        sessionStorage.setItem("user",JSON.stringify(response.data.data))
        // console.log(response.data.data)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${bearToken}`;
        // console.log("this is that " ,response.data.data )
        setUser(GetToken())
        navigate("/")
          
        
  }).catch(e=>{
    console.log(e)
    toast.error(e?.response?.data?.data?.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  })

  };

  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="/" variant="body2" style={{color:"rgb(20, 94, 255)"}}>
                  Home 
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/signup" variant="body2" style={{color:"rgb(20, 94, 255)"}}>
                  {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}