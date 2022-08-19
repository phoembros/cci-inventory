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


//icon progress
import AlbumIcon from '@mui/icons-material/Album';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';


export default function Filter ({ setPriority , setStatus }) {

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
                    Select Filter
                </MenuItem>                 
                <Divider />
                <MenuItem onClick={() => {setPriority("");setStatus("")}}>
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
                        <ListItemText primary="Priority" />
                        {openDropDownPriority ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openDropDownPriority} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setPriority("urgent")}>
                                <ListItemIcon>
                                    <NotificationsActiveIcon sx={{fontSize:"20px" , color: "red"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Urgent"/>
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setPriority("medium")}>
                                <ListItemIcon>
                                    <FiberManualRecordIcon sx={{fontSize:"20px" , color: "green"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Medium"/>
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setPriority("low")}>
                                <ListItemIcon>
                                    <ArrowDownwardIcon sx={{fontSize:"20px" , color: "blue"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Low"/>
                            </ListItemButton>
                        </List>
                    </Collapse>


                    <ListItemButton onClick={handleClickDropDownStatus}>                       
                        <ListItemText primary="Status" />
                        {openDropDownStatus ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openDropDownStatus} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("completed")}>
                                <ListItemIcon>
                                    <CheckCircleIcon sx={{fontSize:"22px" , color: "green"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Completed" />
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("pending")}>
                                <ListItemIcon>
                                    <PendingIcon sx={{fontSize:"20px" , color: "orange"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Pending" />
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("approved")}>
                                <ListItemIcon>
                                    <AlbumIcon sx={{fontSize:"22px", color: "#20D819"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Approved" />
                            </ListItemButton>
                        </List>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 2 }} onClick={() => setStatus("reject")}>
                                <ListItemIcon>
                                    <BlockOutlinedIcon sx={{fontSize:"20px" , color: "red"}}/>
                                </ListItemIcon>
                                <ListItemText primary="Reject" />
                            </ListItemButton>
                        </List>
                        
                    </Collapse>


                </List>
                
            </Menu>

        </>
    );
}