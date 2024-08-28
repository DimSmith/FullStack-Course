import "./DrawerList.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, 
        ListItemText, Divider, Checkbox, FormControl,
        FormGroup, FormLabel, FormControlLabel, Switch 
} from '@mui/material';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import BarChartIcon from '@mui/icons-material/BarChart';
import DownloadIcon from '@mui/icons-material/Download';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import HomeIcon from '@mui/icons-material/Home';


type User = {
    userFname: string;
    userLname: string;
    userAdmin: boolean;
};

type DrawerListProps = {
    user: User;
    mode: 'dark' | 'light';
    handleThemeToggle: () => void;
    handleSignOut: () => void;
    checkedFilter: string;
    setCheckedFilter: (filter: string) => void;
};

const downloadReports = async () => {
    const token = sessionStorage.getItem('jwt');

    try {
        const response = await axios.get("http://localhost:8080/api/followers/getFollowersCountPerVacation", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const vacations = JSON.parse(sessionStorage.getItem('vacations') || '[]');
        
        const csvContent = "data:text/csv;charset=utf-8," 
            + response.data.map((item: any) => {
                const vacation = vacations.find((v: any) => v.vacationId === item.vacationId);
                const destination = vacation?.vacationDest || `Unknown (ID: ${item.vacationId})`;
                return `${destination},${item.follower_count}`;
            }).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "vacation_reports.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error downloading the report:", error.response?.status, error.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
};


export const DrawerList = ({
    user,
    mode,
    handleThemeToggle,
    handleSignOut,
    checkedFilter,
    setCheckedFilter
    }: DrawerListProps) => {

    const navigate = useNavigate();
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 18) return "Good Afternoon";
        return "Good Evening";
        };
    return (

    <Box sx={{ width: 250 }} role="presentation">
        <List>
        {/* User Info */}
        <ListItem>
            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
            <ListItemText 
            primary={`${getGreeting()},`}
            secondary={`${user.userFname} ${user.userLname}`}
            />
        </ListItem>
        </List>
        <Divider />
        <List>
        {user.userAdmin ? (
            <>
            {/* Main Page */}
            <ListItem>
            <ListItemButton onClick={() => navigate('/Main')}>
                <ListItemIcon>
                <HomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Main Page" />
            </ListItemButton>
            </ListItem>
            {/* Add New Vacation */}
            <ListItem>
            <ListItemButton onClick={() => navigate('/addVacation')}>
                <ListItemIcon>
                <AddLocationIcon />
                </ListItemIcon>
                <ListItemText primary="Add New Vacation" />
            </ListItemButton>
            </ListItem>
            {/* Reports */}
            <ListItem>
            <ListItemButton onClick={() => navigate('/Reports')}>
                <ListItemIcon>
                <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Vacation Reports" />
            </ListItemButton>
              </ListItem>
              {/* Download Reports */}
              <ListItem>
                <ListItemButton onClick={downloadReports}>
                  <ListItemIcon>
                <DownloadIcon />
                </ListItemIcon>
                <ListItemText primary="Download Reports" />
              </ListItemButton>
            </ListItem>
            </>
        ) : (
          <ListItem>
            {/* Filter */}
            <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
              <FormLabel component="legend">Select Filter:</FormLabel>
              <FormGroup sx={{ mt: 2, '& .MuiFormControlLabel-root': { mb: 2 } }}> 
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilter === 'followed'}
                      onChange={() => setCheckedFilter(checkedFilter === 'followed' ? '' : 'followed')}
                      name="followed"
                    />
                  }
                  label="Followed Vacations"
                  sx={{ '& .MuiFormControlLabel-label': { ml: 0.5 } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilter === 'active'}
                      onChange={() => setCheckedFilter(checkedFilter === 'active' ? '' : 'active')}
                      name="active"
                    />
                  }
                  label="Active Vacations"
                  sx={{ '& .MuiFormControlLabel-label': { ml: 0.5 } }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedFilter === 'upcoming'}
                      onChange={() => setCheckedFilter(checkedFilter === 'upcoming' ? '' : 'upcoming')}
                      name="upcoming"
                    />
                  }
                  label="Upcoming Vacations"
                  sx={{ '& .MuiFormControlLabel-label': { ml: 0.5 } }}
                />
              </FormGroup>
            </FormControl>
          </ListItem>
        )}
      </List>
      <Divider />
      {/* Theme Toggle */}
      <List>
        <ListItem>
          <ListItemIcon>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </ListItemIcon>
          <ListItemText primary={mode === 'dark' ? "Light Mode" : "Dark Mode"} />
          <Switch
            edge="end"
            onChange={handleThemeToggle}
            checked={mode === 'dark'}
          />
        </ListItem>
      </List>
      <Divider />
        {/* Sign Out Button */}
          <List>
            <ListItem>
                  <ListItemButton onClick={handleSignOut}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign Out"/>
                  </ListItemButton>
              </ListItem>
          </List>
    </Box>
  );
};
