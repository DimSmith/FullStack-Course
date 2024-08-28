import './SignUp.css'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../Modal/User";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import notify from "../../Utils/Notify";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Radio } from '@mui/material';
import { store } from "../../Redux/store";
import { loginAction, setTokenAction } from "../../Redux/AuthReducer";
import { checkJWT } from '../../Utils/JWT';

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

const defaultTheme = createTheme();

export function SignUp(): JSX.Element {
  const navigate=useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<User>({
    defaultValues: {
      userAdmin: 0,
    },
  });

  const userAdminValue = watch("userAdmin");
  
  const newUser: SubmitHandler<User> = (data) => {
    axios
      .post("http://localhost:8080/api/user/registerUser", {
        userFname: data.userFname,
        userLname: data.userLname,
        userEmail: data.userEmail,
        userPass: data.userPass,
        userAdmin: data.userAdmin ,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.token) {
          const token = `Bearer ${result.data.token}`;
          sessionStorage.setItem('jwt', token);
          if (checkJWT()) {
            const user = result.data;
            console.log(user);
            store.dispatch(loginAction(user));
            store.dispatch(setTokenAction(token));
            notify.success(`Registration successful, Welcome and Find Your Dream Vacation!`);
            navigate("/Main");
          }
        }
      })
      .catch((err) => {
        notify.error(err.response?.data?.message || "Registration failed");
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
                  'url("https://images.pexels.com/photos/261679/pexels-photo-261679.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
    
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
                  Register
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(newUser)} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  required
                  autoComplete="given-name"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  {...register("userFname",{required:true})}
                    error={!!errors.userFname}
                    helperText={errors.userFname ? "You must enter your first name" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors.userFname ? 'red' : 'inherit',
                        },
                        '&:hover fieldset': {
                          borderColor: errors.userFname ? 'red' : 'inherit',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: errors.userFname ? 'red' : 'primary.main',
                        },
                      },
                    }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register("userLname",{required:true})}
                    error={!!errors.userLname}
                    helperText={errors.userLname ? "You must enter your last name" : ""}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: errors.userLname ? 'red' : 'inherit',
                        },
                        '&:hover fieldset': {
                            borderColor: errors.userLname ? 'red' : 'inherit',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: errors.userLname ? 'red' : 'primary.main',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required  
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    {...register("userEmail",{
                      required:true, 
                      pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/})}
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
                  </Grid>
                <Grid item xs={12}>
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
                </Grid>
                <Grid item xs={12}>
      <FormControl component="fieldset" error={!!errors.userAdmin}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <FormLabel component="legend">Are you an admin?</FormLabel>
          </Grid>
          <Grid item>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group"
              value={userAdminValue}
              onChange={(e) => setValue("userAdmin", Number(e.target.value))}
            >
              <FormControlLabel value={0} control={<Radio />} label="No" />
              <FormControlLabel value={1} control={<Radio />} label="Yes" />
            </RadioGroup>
            {errors.userAdmin && (
              <Typography variant="body2" color="error">
                {errors.userAdmin.message}
              </Typography>
            )}
          </Grid>
        </Grid>
      </FormControl>
    </Grid>
              </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                    Sign up
                </Button>
                  <Grid container>
                    <Grid item>
                      <Link component={RouterLink} to="/SignIn" variant="body2">
                        {"Already have an account? Sign in"}
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
  