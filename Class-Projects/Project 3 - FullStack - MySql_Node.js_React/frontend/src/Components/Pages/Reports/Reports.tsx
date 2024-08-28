import "./Reports.css";
import axios from 'axios';
import React from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../Redux/AuthReducer";
import { store } from "../../Redux/store";
import { DrawerList } from '../DrawerList/DrawerList';

//material ui components
import { Box, createTheme, CssBaseline, Drawer, 
        IconButton, Paper, styled,  ThemeProvider 
} from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';

//material ui icons
import MenuIcon from '@mui/icons-material/Menu';

export function Reports(): JSX.Element {
    const navigate = useNavigate();
    const user = store.getState().auth;

    // State hooks for theme and UI control
    const [open, setOpen] = React.useState(false);
    const [mode, setMode] = React.useState<'light' | 'dark'>(() => {
        return localStorage.getItem('themeMode') as 'light' | 'dark' || 'light';
    });
    const [isDarkMode, setIsDarkMode] = useState(mode === 'dark');
    const [chartData, setChartData] = useState<{ destination: string; followers: number }[]>([]);
    const [checkedFilter, setCheckedFilter] = useState<boolean>(false);
    const handleCheckedFilterChange = (filter: string) => {
        setCheckedFilter(filter === "true");
    };
    
    // Theme and Style configuration
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('themeMode', newMode); 
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

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleSignOut = () => {
        sessionStorage.removeItem('vacations');
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('userFollows');
        store.dispatch(logoutAction());
        navigate('/SignIn');
    };

    // Fetch followers count per vacation
    useEffect(() => {
        const fetchFollowersCountPerVacation = async () => {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                navigate('/SignIn');
                return;
            }
    
            try {
                const response = await axios.get("http://localhost:8080/api/followers/getFollowersCountPerVacation", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const vacations = JSON.parse(sessionStorage.getItem('vacations') || '[]');
                
                const combinedData = response.data.map((item: any) => {
                    const vacation = vacations.find((v: any) => v.vacationId === item.vacationId);
                    return {
                        destination: vacation?.vacationDest || `Unknown (ID: ${item.vacationId})`,
                        followers: item.follower_count
                    };
                });
                setChartData(combinedData);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.status === 401) {
                        navigate('/SignIn');
                    } else {
                        console.error("Error fetching data:", error.response?.status, error.message);
                    }
                } else {
                    console.error("An unexpected error occurred:", error);
                }
            }
        };
        fetchFollowersCountPerVacation();
    }, [navigate]);
    
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="Reports" 
        style={{ 
            height: '100vh', 
            overflow: 'hidden',
            backgroundColor: theme.palette.background.default
        }}>
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
                    checkedFilter={checkedFilter.toString()}
                    setCheckedFilter={handleCheckedFilterChange}
                    />
                </Drawer>
            </div>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            width: '95%',
                            maxWidth: '1200px',
                            textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            border: '1px solid black'
                        }}
                    >
                        <h2>Vacation Followers Report</h2>
                        {chartData.length > 0 && (
                            <BarChart
                                xAxis={[{ scaleType: 'band', data: chartData.map(item => item.destination) }]}
                                series={[{ data: chartData.map(item => item.followers) }]}
                                width={1100}
                                height={550}
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        )}
                    </Paper>
                </Box>
            </div>
        </ThemeProvider>
    );
}
