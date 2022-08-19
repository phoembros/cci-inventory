import { Avatar, Button, Collapse, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Menu, MenuItem, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import * as React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { auth } from "../../firebase";
import {  getAuth ,signOut } from "firebase/auth";
import TuneIcon from '@mui/icons-material/Tune';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';




export default function Filter ({ setStatus }) {

    const navigate = useNavigate();
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () =>  setAnchorEl(null);

       
    const [openDropDownPriority, setOpenDropDownPriority] = React.useState(false);
    const handleClickDropDownPriority = () => {
        setOpenDropDownPriority(!openDropDownPriority);
    };

    const [openDropDownStatus, setOpenDropDownStatus] = React.useState(false);
    const handleClickDropDownStatus = () => {
        setOpenDropDownStatus(!openDropDownStatus);
    };


    return(
        <>
            <IconButton size="small" onClick={handleClick}>
                <TuneIcon sx={{color: "gray"}}/>
            </IconButton>
          
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                // onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    Filter
                </MenuItem>                 
                <Divider />
                <MenuItem onClick={() => setStatus("") }>
                    View All
                </MenuItem> 
                <List
                    sx={{ width: '100%', maxWidth: 530, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader" sx={{width:"190px"}}>
                            {/* Select Filter: */}
                        </ListSubheader>
                    }
                >                    

                    <ListItemButton onClick={handleClickDropDownPriority}>                       
                        <ListItemText primary="Status" />
                        {openDropDownPriority ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openDropDownPriority} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("paid")}>
                                <ListItemIcon>
                                    <MonetizationOnIcon sx={{fontSize:"23px" , color: "green"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Paid"/>
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("owe")}>
                                <ListItemIcon>
                                    <MonetizationOnIcon sx={{fontSize:"23px" , color: "orange"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Owe"/>
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("unpaid")}>
                                <ListItemIcon>
                                    <MonetizationOnIcon sx={{fontSize:"23px" , color: "red"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Unpaid"/>
                            </ListItemButton>
                        </List>
                    </Collapse>



                </List>
                
            </Menu>

        </>
    );
}