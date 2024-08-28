import "./AddVacation.css";
import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { store } from "../../Redux/store";
import { checkJWT } from "../../Utils/JWT";
import { loginAction, logoutAction } from "../../Redux/AuthReducer";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Vacation } from "../../Modal/Vacation";
import notify from "../../Utils/Notify";
import { DrawerList } from '../DrawerList/DrawerList';

//material ui components
import { 
  Drawer,Button,CssBaseline,TextField,Grid,Box,Typography
  ,Container,createTheme, ThemeProvider,styled,IconButton,
} from "@mui/material";

//material ui icons
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from '@mui/icons-material/Menu';

const defaultTheme = createTheme();

export function AddVacation(): JSX.Element {
  const user = store.getState().auth;
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if in edit mode
  const editMode = location.state?.editMode;
  const vacationData = location.state?.vacationData;

  //UI control
  const [open, setOpen] = useState(false);
  const [showDollarSign, setShowDollarSign] = useState(true);
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    return localStorage.getItem('themeMode') as 'light' | 'dark' || 'light';
  });
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark');
  const [checkedFilter, setCheckedFilter] = useState<boolean>(false);
  const handleCheckedFilterChange = (filter: string) => {
    setCheckedFilter(filter === "true");
  };

  //Image handling
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Form handling
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Vacation>({
    defaultValues: editMode ? {
      vacationDest: vacationData.vacationDest,
      vacationDesc: vacationData.vacationDesc,
      vacationStart: vacationData.vacationStart.split('T')[0],
      vacationEnd: vacationData.vacationEnd.split('T')[0],
      vacationPrice: vacationData.vacationPrice,
    } : {}
  });

  // Theme and Style
  const colorMode = React.useMemo(
    () => ({
        toggleColorMode: () => {
            setMode((prevMode) => {
                const newMode = prevMode === 'light' ? 'dark' : 'light';
                localStorage.setItem('themeMode', newMode); // Save to localStorage
                return newMode;
            });
        },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const handleThemeToggle = () => {
    colorMode.toggleColorMode();
    setIsDarkMode(!isDarkMode);
  };

  const StyledMenuButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#ffffff' : theme.palette.text.primary,
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
  border: theme.palette.mode === 'dark' ? '2px solid #ffffff' : 'none',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.04)',
  },
  padding: theme.spacing(1),
  marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
  }));

  // Fetch vacation image
  const getVacationImage = async (imageName: string) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:8080/api/vacation/getImage/${imageName}`, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const blob = new Blob([response.data], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };
  useEffect(() => {
    if (editMode && vacationData) {
      getVacationImage(vacationData.vacationImageName).then(imageUrl => {
        if (imageUrl) {
          setExistingImageUrl(imageUrl);
          setSelectedImage(imageUrl);
        }
      });
    }
  }, [editMode, vacationData]);

  // Handle image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // Check if user is logged in
  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');
    if (storedToken) {
      const decodedUserData = checkJWT();
      if (decodedUserData) {
        store.dispatch(loginAction(decodedUserData));
      } else {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('vacations');
        store.dispatch(logoutAction());
        navigate('/SignIn');
      }
    } else {
      navigate('/SignIn');
    }
  }, [navigate]);

  // Add or Update vacation
  const addOrUpdateVacation: SubmitHandler<Vacation> = async (data) => {
    const formData = new FormData();
    formData.append('destination', data.vacationDest);
    formData.append('description', data.vacationDesc);
    const startDate = new Date(data.vacationStart);
    const endDate = new Date(data.vacationEnd);
    formData.append('startDate', startDate.toISOString());
    formData.append('endDate', endDate.toISOString());
    formData.append('price', data.vacationPrice.toString());
  
    if (selectedImage && selectedImage.startsWith('blob:')) {
      try {
        const response = await fetch(selectedImage);
        const blob = await response.blob();
        const imageFile = new File([blob], 'pexels-tothszabolcs-3148096.jpg', { type: 'image/jpeg' });
        formData.append('vacationImage', imageFile);
      } catch (error) {
        console.error('Error processing selected image:', error);
        notify.error("Error processing the selected image. Please try again.");
        return;
      }
    } else if (existingImageUrl) {
      formData.append('existingImageUrl', existingImageUrl);
    } else {
      notify.error("Please select an image for the vacation.");
      return;
    }
  
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    try {
      const url = editMode
        ? `http://localhost:8080/api/vacation/updateVacation/${vacationData.vacationId}`
        : "http://localhost:8080/api/vacation/addVacation";
      
      const token = sessionStorage.getItem('jwt');

      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      };
  
      let response;
      console.log(formData);
      if (editMode) {
        response = await axios.put(url, formData, config);
      } else {
        response = await axios.post(url, formData, config);
      }
  
      console.log("Response:", response.data);
      notify.success(`Vacation ${editMode ? 'updated' : 'added'} successfully`);
      navigate("/main");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error details:", error.response?.data);
        console.error("Status code:", error.response?.status);
        console.error("Headers:", error.response?.headers);
        notify.error(error.response?.data?.error?.message || `An error occurred while ${editMode ? 'updating' : 'adding'} the vacation.`);
      } else {
        console.error("Unexpected error:", error);
        notify.error(`An unexpected error occurred. Please try again later.`);
      }
    }
  };

  //Drawer list and actions
  const handleSignOut = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('vacations');
    store.dispatch(logoutAction());
    navigate('/SignIn');
  };
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          color: 'text.primary',
          backgroundImage: mode === 'light' 
            ? 'linear-gradient(to bottom, #ffffff, #a4d9ec)' 
            : 'none',
          transition: 'background-color 0.3s, background-image 0.3s',
          padding: 3,
        }}
      >
    <div className="AddVacation">
      {/* Menu */}
      <div>
      <StyledMenuButton 
                  onClick={toggleDrawer(true)}
                  className="menu-button"
                  size="large"
              >
                <MenuIcon/>
              </StyledMenuButton>
              <Drawer
                open={open}
                onClose={toggleDrawer(false)}
              >
                <DrawerList
                  user={user}
                  mode={mode}
                  handleThemeToggle={handleThemeToggle}
                  handleSignOut={handleSignOut}
                  checkedFilter={checkedFilter.toString()}
                  setCheckedFilter={handleCheckedFilterChange}
                />
              </Drawer>
          </div>
      {/* Add Vacation Form*/}
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="form-box"
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(255, 255, 255, 0.1)' : 3,
            border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
            }}
            >
            {/* Form title */}
            <Typography component="h1" variant="h5" sx={{ mb: 2, color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000' }}>
                {editMode ? 'Edit Vacation' : 'Add Vacation'}
            </Typography>
            <Box component="form" onSubmit={handleSubmit(addOrUpdateVacation)}  
            sx={{ 
            mt: 3, 
            width: '100%',
            '& .MuiTextField-root': {
              mb: 2,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
                },
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
              '& .MuiInputBase-input': {
                color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
              },
            },
            }}
            >
            <Grid container spacing={2}>
              {/* Destination */}
              <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    id="destination"
                    label="Destination"
                    {...register("vacationDest",{required:true})}
                    error={!!errors.vacationDest}
                    helperText={errors.vacationDest ? "Destination is required" : ""}
                  />
              </Grid>
              {/* Description */}
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    multiline
                    rows={4}
                    {...register("vacationDesc", {
                      required: "Description is required",
                      maxLength: {
                        value: 1000,
                        message: "Description must be 1000 characters or less"
                      }
                    })}
                    error={!!errors.vacationDesc}
                    helperText={errors.vacationDesc?.message || ""}
                    inputProps={{ maxLength: 1000 }}
                  />
              </Grid>
              {/* Start Date */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="startDate"
                  label="Start Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("vacationStart", { required: "Start Date is required" })}
                  error={!!errors.vacationStart}
                  helperText={errors.vacationStart?.message || ""}
                />
              </Grid>
              {/* End Date */}
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                  id="endDate"
                  label="End Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("vacationEnd", {
                    required: "End Date is required",
                    validate: (value) => {
                      const endDate = new Date(value);
                      const startDate = new Date(getValues("vacationStart"));
                      if (endDate < startDate) {
                        return "End Date cannot be before Start Date";
                      }
                      return true;
                    }
                  })}
                  error={!!errors.vacationEnd}
                  helperText={errors.vacationEnd?.message || ""}
                  inputProps={{ min: watch("vacationStart") }}
                />
              </Grid>
              {/* Price */}
              <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    {...register("vacationPrice", {
                      required: "Price is required",
                      min: { value: 0, message: "Price cannot be negative" },
                      max: { value: 10000, message: "Price cannot exceed 10000" },
                      valueAsNumber: true
                    })}
                    type="number"
                    InputProps={{
                      inputProps: { min: 0, max: 10000, step: 0.01 },
                      startAdornment: showDollarSign ? (
                        <InputAdornment position="start">
                          <Typography color={theme.palette.mode === 'dark' ? 'white' : 'inherit'}>
                            $
                          </Typography>
                        </InputAdornment>
                      ) : null,
                    }}
                    onFocus={() => setShowDollarSign(false)}
                    onBlur={() => setShowDollarSign(true)}
                    error={!!errors.vacationPrice}
                    helperText={errors.vacationPrice?.message || ""}
                  />
              </Grid>
              {/* Image upload */}
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span" fullWidth>
                        {editMode ? 'Change Photo' : 'Select Photo'}
                    </Button>
                  </label>
                  {errors.vacationImage && (
                    <Typography color="error" variant="caption" display="block" sx={{ mt: 1 }}>
                      {errors.vacationImage.message}
                    </Typography>
                  )}
              </Grid>
              {/* Image preview */}
              {(selectedImage || existingImageUrl) && (
                  <Grid item xs={12}>
                    <Box
                      component="img"
                      src={selectedImage || existingImageUrl || undefined}
                      alt="Selected vacation photo"
                    sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '200px',
                    objectFit: 'contain',
                    mt: 2,
                }}
                />
                </Grid>
              )}
              {/* Submit button */}
              <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {editMode ? 'Update Vacation' : 'Add Vacation'}
                  </Button>
              </Grid>
              {/* Cancel button */}
              <Grid item xs={12}>
                  <Button
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 1, mb: 2 }}
                    onClick={() => navigate('/main')}
                  >
                    Cancel
                  </Button>
              </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
    </Box>
    </ThemeProvider>
  );
}
