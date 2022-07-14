import * as React from "react";
import { Button , IconButton, Stack, Toolbar, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { Box } from "@mui/system";
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Profile from "./Profile";

export default function TopNavbar ({ prefersDarkMode , setPrefersDarkMode , handleDrawerOpen , open }) { 

    const theme = useTheme();

    return(
        <>       
            <Toolbar 
                sx={{ 
                    backgroundColor: theme.palette.mode === 'dark' ? "background.default" : "#fff", 
                    borderBottom: theme.palette.mode === 'dark' ? "1px solid #fff" : null,
                }}
            >
                <Stack direction="row" spacing={2} sx={{ width:"100%" }}> 

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon sx={{color: theme.palette.mode === 'dark' ? "#fff" : "#007654" }}/>
                    </IconButton>

                    <Box sx={{flexGrow: 1}} />

                    <Stack direction="row" spacing={1} justifyContent="right">   

                        <IconButton onClick={() => setPrefersDarkMode(!prefersDarkMode)} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon sx={{ color: "#007654" }}/>}
                        </IconButton>                           

                        {/* <IconButton>
                            <NotificationsActiveOutlinedIcon sx={{color: theme.palette.mode === 'dark' ? "#fff": "#0969A0" }} />
                        </IconButton> */}

                        <Profile /> 
                                               
                    </Stack>                        
                </Stack>
            </Toolbar>
        </>
    )
}