import { useState, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function MainPage(): JSX.Element {
    const IOSSwitch = styled((props: SwitchProps) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color:
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[600],
            },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
        },
        '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
        },
        '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        },
    }));

    const [server,setServer] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:8080/api/all")
        .then (response => response.data)
        .then (data=>setServer(data));
    },[])

    return (
        <div className="MainPage">
            {server.length>0 && server.map(item=>
                <>
                    <div className="Box" key={item["id"]}>
                        <h2>{item["sname"]}</h2><hr/>
                        IP: {item["ip"]}<hr/>
                        Company: {item["name"]}<hr/>
                        <FormControlLabel
                        control={<IOSSwitch 
                            sx={{ m: 1 }} 
                            checked={item["status"]}
                            />}
                            label={item["status"]=== 1 ? "Online":"Offline"}
                        />
                        <hr/>
                        Date: {item["date"]}
                    </div>
                </>
            )}
        </div>
    );
}
