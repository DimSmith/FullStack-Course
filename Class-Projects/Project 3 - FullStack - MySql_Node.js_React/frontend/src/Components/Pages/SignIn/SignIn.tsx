//Main Imports
import "./SignIn.css";
import axios from "axios";
import notify from "../../Utils/Notify";
import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../Modal/User";
import { checkJWT } from "../../Utils/JWT";
import { store } from "../../Redux/store";
import { loginAction, setTokenAction } from "../../Redux/AuthReducer";

//Material UI
import {Paper,TextField,Link,Button,Avatar,Box,Grid,IconButton,InputAdornment,Typography} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

//Copyright
function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/PrivacyPolicy">
        Vacations
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

//Theme
const defaultTheme = createTheme();

//SignIn
export function SignIn(): JSX.Element {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const logIn: SubmitHandler<User> = (data) => {
    axios
      .post("http://localhost:8080/api/user/loginUser", {
        userEmail: data.userEmail,
        userPass: data.userPass,
      })
      .then((result) => {
        if (result.data.token) {
          const token = `Bearer ${result.data.token}`;
          sessionStorage.setItem('jwt', token);
          if (checkJWT()) {
            const user = result.data;
            store.dispatch(loginAction(user));
            store.dispatch(setTokenAction(token));
            notify.success(`Welcome and Find Your Dream Vacation!`);
            navigate("/main");
          }
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
        notify.error(err.response?.data?.message || "Login failed");
      });
  };
      return (
        <ThemeProvider theme={defaultTheme}>
          <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
                backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'left',
              }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
              <Box
                sx={{
                  my: 8,
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
                  Login
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(logIn)} sx={{ mt: 1 }}>
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    {...register("userEmail",{required:true, pattern:/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/})}
                    error={!!errors.userEmail}
                    helperText={errors.userEmail ? "Invalid email address" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors.userEmail ? 'red' : 'inherit',
                        },
                        '&:hover fieldset': {
                          borderColor: errors.userEmail ? 'red' : 'inherit',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: errors.userEmail ? 'red' : 'primary.main',
                        },
                      },
                    }}
                  />
                  <TextField
                    required
                    margin="normal"
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    {...register("userPass", {required: true, minLength: 4})}
                    error={!!errors.userPass}
                    helperText={errors.userPass ? "Invalid password" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors.userPass ? 'red' : 'inherit',
                        },
                        '&:hover fieldset': {
                          borderColor: errors.userPass ? 'red' : 'inherit',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: errors.userPass ? 'red' : 'primary.main',
                        },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link component={RouterLink} to="/SignUp" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                  <Copyright sx={{ mt: 5 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ThemeProvider>
      );
    }