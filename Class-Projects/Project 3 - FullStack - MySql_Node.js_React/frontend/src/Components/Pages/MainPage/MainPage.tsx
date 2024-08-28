import "./MainPage.css";
import * as React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { store } from "../../Redux/store";
import {loginAction, logoutAction } from "../../Redux/AuthReducer";
import { Vacation } from "../../Modal/Vacation";
import { checkJWT } from '../../Utils/JWT';
import { DrawerList } from '../DrawerList/DrawerList';

//material ui components
import {
  Card, CardActions, CardContent, CardHeader,
  CardMedia, Grid, IconButton,Typography ,Button,Box,Drawer,
  Pagination,Badge,BadgeProps,styled,Dialog,
  DialogActions, DialogContent, DialogContentText, DialogTitle,
  Fab,Zoom,CssBaseline ,createTheme, ThemeProvider 
  } from "@mui/material";

//material ui icons
import { red } from '@mui/material/colors';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';

export function MainPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const user = store.getState().auth;

  // State hooks for theme and UI control
  const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
    return localStorage.getItem('themeMode') as 'light' | 'dark' || 'light';
  });
  const [isDarkMode, setIsDarkMode] = useState(mode === 'dark');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [checkedFilter, setCheckedFilter] = useState('');

  // State hooks for data management
  const [vacations, setVacations] = useState<Vacation[]>([]);
  const [vacationImages, setVacationImages] = useState<{ [key: string]: string }>({});
  const [filteredVacations, setFilteredVacations] = useState<Vacation[]>([]);
  const [userFollows, setUserFollows] = useState<{ [key: number]: boolean }>({});
  const [followerCounts, setFollowerCounts] = useState<{ [key: number]: number }>({});
  const [vacationToDelete, setVacationToDelete] = useState<Vacation | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [page, setPage] = useState(1);
  const vacationsPerPage = 10;

  // Theme and Style configuration
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
          background: {
            default: mode === 'light' ? '#ffffff' : '#000000', 
            paper: mode === 'light' ? '#ffffff' : '#121212',
          },
        },
      }),
    [mode]
  );

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      backgroundColor: '#87CEFA',
      color: theme.palette.getContrastText('#87CEFA'),
    },
  }));

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

  // Handlers for UI actions
  const handleThemeToggle = () => {
    colorMode.toggleColorMode();
    setIsDarkMode(!isDarkMode);
  };

  const handleSignOut = () => {
    sessionStorage.removeItem('vacations');
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userFollows');
    store.dispatch(logoutAction());
    navigate('/SignIn');
  };

  const handleFollowToggle = async (vacationId: number) => {
    try {
        const token = sessionStorage.getItem('jwt');
        const userId = user.userId;
        const isCurrentlyFollowing = userFollows[vacationId];
        
        if (isCurrentlyFollowing) {
            await axios.delete("http://localhost:8080/api/followers/deleteFollower", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                data: { vacationId, userId }
            });
        } else {
            await axios.post("http://localhost:8080/api/followers/addFollower", 
                { vacationId, userId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
        }

        const updatedUserFollows = { ...userFollows, [vacationId]: !isCurrentlyFollowing };
        setUserFollows(updatedUserFollows);
        sessionStorage.setItem('userFollows', JSON.stringify(updatedUserFollows));

        setFollowerCounts(prev => ({
            ...prev,
            [vacationId]: (prev[vacationId] || 0) + (isCurrentlyFollowing ? -1 : 1)
        }));
    } catch (error) {
        console.error('Error toggling follow:', error);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDeleteClick = (vacation: Vacation) => {
    setVacationToDelete(vacation);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setVacationToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (vacationToDelete) {
        try {
          const token = sessionStorage.getItem('jwt');
          await axios.delete(`http://localhost:8080/api/vacation/deleteVacation/${vacationToDelete.vacationId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
            
            const updatedVacations = vacations.filter(v => v.vacationId !== vacationToDelete.vacationId);
            setVacations(updatedVacations);
            sessionStorage.setItem('vacations', JSON.stringify(updatedVacations));
            
            handleCloseDeleteDialog();
        } catch (error) {
            console.error('Error deleting vacation:', error);
        }
    }
  };

  const handleEditVacation = (vacation: Vacation) => {
    navigate('/addVacation', { state: { editMode: true, vacationData: vacation } });
  };

  //Functions for formatting and other UI logic
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  };

  const sortVacationsByDate = (vacations: Vacation[]) => {
    return vacations.sort((a, b) => new Date(a.vacationStart).getTime() - new Date(b.vacationStart).getTime());
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const getVacationImage = async (imageName: string) => {
    try {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get(`http://localhost:8080/api/vacation/getImage/${imageName}`, {
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  //Data fetching
  useEffect(() => {
    const storedToken = sessionStorage.getItem('jwt');
    if (!storedToken) {
      navigate('/SignIn');
      return; 
    }
  
    const decodedUserData = checkJWT();
    store.dispatch(loginAction(decodedUserData));
  
    const fetchFollowersCountPerVacation = async () => {
      const token = sessionStorage.getItem('jwt');
      const response = await axios.get("http://localhost:8080/api/followers/getFollowersCountPerVacation", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = response.data;
      const countsObject = data.reduce((acc: { [key: number]: number }, item: { vacationId: number, follower_count: number }) => {
        acc[item.vacationId] = item.follower_count;
        return acc;
      }, {});
      setFollowerCounts(countsObject);
    };
  
    const fetchUserFollows = async () => {
      try {
        const token = sessionStorage.getItem('jwt');
        const userId = store.getState().auth.userId; 
        const response = await axios.get(`http://localhost:8080/api/followers/getUserFollows/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const followsData = response.data.reduce((acc: { [key: number]: boolean }, follow: any) => {
          acc[follow.vacationId] = true;
          return acc;
        }, {});
        setUserFollows(followsData);
        sessionStorage.setItem('userFollows', JSON.stringify(followsData));
      } catch (error) {
        console.error('Error fetching user follows:', error);
      }
    };
  
    const fetchAndUpdateVacations = async () => {
      try {
        const token = sessionStorage.getItem('jwt');
        const response = await axios.get("http://localhost:8080/api/vacation/getVacations", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = response.data;
        const sortedVacations = sortVacationsByDate(data);
        setVacations(sortedVacations);
        sessionStorage.setItem('vacations', JSON.stringify(sortedVacations));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          navigate('/SignIn');
        }
      }
    };
  
    const initializeData = async () => {
      await fetchUserFollows();
      await fetchFollowersCountPerVacation();
      await fetchAndUpdateVacations();
    };
  
    const storedUserFollows = sessionStorage.getItem('userFollows');
    if (storedUserFollows) {
      setUserFollows(JSON.parse(storedUserFollows));
    }
  
    const storedVacations = sessionStorage.getItem('vacations');
    if (location.state?.fromAddVacation || !storedVacations) {
      initializeData();
    } else {
      const parsedVacations = JSON.parse(storedVacations);
      setVacations(sortVacationsByDate(parsedVacations));
      initializeData();
    }
  }, [location, navigate]);

  //Fetching vacation images
  useEffect(() => {
    const fetchVacationImages = async () => {
        const newVacationImages: { [key: string]: string } = {};
        for (const vacation of vacations) {
            try {
              const imageData = await getVacationImage(vacation.vacationImageName);
              if (imageData && imageData.byteLength > 0) {
                const base64Image = btoa(
                  new Uint8Array(imageData).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                  )
                );
                newVacationImages[vacation.vacationImageName] = `data:image/jpeg;base64,${base64Image}`;
              }
            } catch (error) {
              console.error(`Error processing image for ${vacation.vacationImageName}:`, error);
            }
          }
          setVacationImages(newVacationImages);
        };
      
        if (vacations.length > 0) {
          fetchVacationImages();
        }
  }, [vacations]);

  //Scroll to top
  useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  //Filtering vacations
  useEffect(() => {
      const filterVacations = () => {
        let result = vacations;
    
        if (checkedFilter === 'followed') {
          result = result.filter(vacation => userFollows[vacation.vacationId]);
        } else if (checkedFilter === 'upcoming') {
          const nextMonth = new Date();
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          result = result.filter(vacation => new Date(vacation.vacationStart) >= nextMonth);
        } else if (checkedFilter === 'active') {
          const today = new Date();
          result = result.filter(vacation => new Date(vacation.vacationStart) <= today && new Date(vacation.vacationEnd) >= today);
        }
    
        setFilteredVacations(result);
      };
    
      filterVacations();
  }, [vacations, checkedFilter, userFollows]);

  // Pagination 
  const paginatedVacations = filteredVacations.slice(
      (page - 1) * vacationsPerPage,
      page * vacationsPerPage
  );


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
        }}
      >
      <div className="main-page">
          {/*Drawer */}
          <div className="menu">
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
                checkedFilter={checkedFilter}
                setCheckedFilter={setCheckedFilter}
              />
              </Drawer>
          </div>
          {/* Vacations */}
          <div style={{ padding: '20px' }}>
          <Grid container spacing={2} justifyContent="center">
          {paginatedVacations.map((vacation) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={vacation.vacationId}>
              {/* Vacation Card */}
              <Card className="vacation-card">
                {/* Card Header */}
                <CardHeader
                  title={vacation.vacationDest}
                  subheader={`${formatDate(vacation.vacationStart.toString())} - ${formatDate(vacation.vacationEnd.toString())}`}
                />
                {/* Card Media */}
                <CardMedia className="card-media"
                component="img"
                height="140"
                image={vacationImages[vacation.vacationImageName]}
                alt={vacation.vacationDest}
                />
                {/* Card Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {vacation.vacationDesc}
                  </Typography>
                </CardContent>
                {/* Card Actions */}
                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {user.userAdmin ? (
                            <>
                                <IconButton aria-label="edit" onClick={() => handleEditVacation(vacation)}>
                                    <EditNoteIcon />
                                </IconButton>
                                <IconButton aria-label="delete" onClick={() => handleDeleteClick(vacation)}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        ) : (
                          <IconButton 
                              aria-label="add to favorites" 
                              onClick={() => handleFollowToggle(vacation.vacationId)}
                          >
                              <StyledBadge badgeContent={followerCounts[vacation.vacationId] || 0} color="secondary">
                                  <FavoriteIcon sx={{ color: userFollows[vacation.vacationId] ? red[500] : 'inherit' }} />
                              </StyledBadge>
                          </IconButton>
                      )}
                    </Box>
                    <Box sx={{ 
                        backgroundColor: theme.palette.primary.main, 
                        color: theme.palette.primary.contrastText,
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography variant="body2" component="span" sx={{ fontWeight: 'bold' }}>
                            ${vacation.vacationPrice}
                        </Typography>
                    </Box>
                </CardActions>
            </Card>
                </Grid>
              ))}
            </Grid>
            <Pagination 
              count={Math.ceil(vacations.length / vacationsPerPage)} 
              page={page} 
              onChange={handlePageChange}
              sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
            />
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this vacation?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>No</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
          </div>
          {/*Scroll to top */}
          <Zoom in={showScrollTop}>
            <Fab 
              color="primary" 
              size="small" 
              onClick={handleScrollTop}
              style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                zIndex: 1000
              }}
            >
                <KeyboardArrowUpIcon />
              </Fab>
          </Zoom>
          </div>
        </Box>
    </ThemeProvider>
  )
}
