import * as React from "react"
import { Button, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import logo from "../../Assets/CCI.svg";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";
import './menunavbar.scss';
// Icons
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      height: '100%',
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
      }),
    }),
  );


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    }));


export default function MenuNavbar({open , handleDrawerClose}) {

    let location = useLocation();
    const theme = useTheme();

    const navigate = useNavigate();

    return (
        <>       
        
        <Drawer  variant="permanent" open={open} className={theme.palette.mode === 'dark' ? "drawer-menu-dark" : "drawer-menu" } >
            <DrawerHeader sx={{mt:3 , mb:3}} >
                <Button className='drawerheader' 
                    onClick={() => {
                        // handleDrawerClose()
                        navigate("/dashboard")
                    }}
                >
                   <img src={logo} alt="logo" width="70%"/>
                </Button>        
            </DrawerHeader>

            <List className='list' >
                {/* Item */}                   
                <ListItem className={theme.palette.mode === 'dark' && location.pathname === "/dashboard" ? 'list-item-active' : 'list-item' } disablePadding sx={{ display: 'block' }}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5 }} >
                            <ListItemIcon  className={location.pathname === "/dashboard" ? "list-item-icon-active" : "list-item-icon"} > 
                                <DashboardCustomizeOutlinedIcon />                    
                            </ListItemIcon>
                            <ListItemText  
                                className={location.pathname === "/dashboard" ? "list-item-text-active" : "list-item-text"}
                                primary={"Dashboard"}                                
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}

                {/* Item */}                   
                <ListItem className={
                        theme.palette.mode === 'dark' && location.pathname === "/storage-room" ||
                        theme.palette.mode === 'dark' && location.pathname === "/storage-room/purchase" ||
                        theme.palette.mode === 'dark' && location.pathname === "/storage-room/roomdetail"
                    ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}
                >
                    <Link to="/storage-room" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button'sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/storage-room" || location.pathname === "/storage-room/purchase" || location.pathname === "/storage-room/roomdetail" ? "list-item-icon-active" : "list-item-icon"} >
                                <FormatListBulletedOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/storage-room" || location.pathname === "/storage-room/purchase" || location.pathname === "/storage-room/roomdetail" ? "list-item-text-active" : "list-item-text"}
                                primary={"Storage Room"}                                
                            />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}

                {/* Item */}                   
                <ListItem className={
                    theme.palette.mode === 'dark' && location.pathname === "/raw-material" ||
                    theme.palette.mode === 'dark' && location.pathname === "/raw-material/categories" 
                    ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}
                >
                    <Link to="/raw-material" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/raw-material" || location.pathname === "/raw-material/categories" ? "list-item-icon-active" : "list-item-icon"} >
                                <DeviceHubIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/raw-material" || location.pathname === "/raw-material/categories" ? "list-item-text-active" : "list-item-text"}
                                primary={"Raw Materials"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}

                {/* Item */}                   
                <ListItem className={
                    theme.palette.mode === 'dark' && location.pathname === "/product" || 
                    theme.palette.mode === 'dark' && location.pathname === "/product/categories"  ||
                    theme.palette.mode === 'dark' && location.pathname === "/product/details" 
                    ? 'list-item-active' : 'list-item' }  disablePadding sx={{ display: 'block' }} 
                >
                    <Link to="/product" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/product" || location.pathname === "/product/categories" || location.pathname === "/product/details" ? "list-item-icon-active" : "list-item-icon"} >
                                <WorkOutlineIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/product" || location.pathname === "/product/categories" || location.pathname === "/product/details" ? "list-item-text-active" : "list-item-text"}
                                primary={"Product"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}

                

                {/* Item */}                   
                <ListItem className={theme.palette.mode === 'dark' && location.pathname === "/production" ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}>
                    <Link to="/production" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/production" ? "list-item-icon-active" : "list-item-icon"} >
                                <AutoFixHighIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/production" ? "list-item-text-active" : "list-item-text"}
                                primary={"Production"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}

                {/* Item */}                   
                <ListItem className={
                    theme.palette.mode === 'dark' && location.pathname === "/sales" ||
                    theme.palette.mode === 'dark' && location.pathname === "/sales/print"
                    ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}
                >
                    <Link to="/sales" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/sales" || location.pathname === "/sales/print" ? "list-item-icon-active" : "list-item-icon"} >
                                <ShoppingCartOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/sales" || location.pathname === "/sales/print" ? "list-item-text-active" : "list-item-text"}
                                primary={"Sales"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}
                
                {/* Item */}                   
                <ListItem className={                 
                    theme.palette.mode === 'dark' && location.pathname === "/customer"
                    ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}
                >
                    <Link to="/customer" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/customer" ? "list-item-icon-active" : "list-item-icon"} >
                                <PersonOutlineIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/customer" ? "list-item-text-active" : "list-item-text"}
                                primary={"Customer"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}


                {/* Item */}                   
                <ListItem className={theme.palette.mode === 'dark' && location.pathname === "/supplies" ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}>
                    <Link to="/supplies" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/supplies" ? "list-item-icon-active" : "list-item-icon"} >
                                <AddShoppingCartSharpIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/supplies" ? "list-item-text-active" : "list-item-text"}
                                primary={"Supplier"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}
                     
                {/* Item */}                   
                <ListItem className={theme.palette.mode === 'dark' && location.pathname === "/user" ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}>
                    <Link to="/user" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/user" ? "list-item-icon-active" : "list-item-icon"} >
                                <GroupAddIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/user" ? "list-item-text-active" : "list-item-text"}
                                primary={"User"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}

                {/* Item */}                   
                <ListItem className={theme.palette.mode === 'dark' && location.pathname === "/report" ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}>
                    <Link to="/report" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={location.pathname === "/report" ? "list-item-icon-active" : "list-item-icon"} >
                                <ContentCopyOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText 
                                className={location.pathname === "/report" ? "list-item-text-active" : "list-item-text"}
                                primary={"Report"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}
                
            
            </List>
            
            <Box sx={{flexGrow:1}}></Box>

            <List className='list' >
                {/* Item */}                   
                <ListItem className={
                    theme.palette.mode === 'dark' && location.pathname === "/system-setting" ||
                    theme.palette.mode === 'dark' && location.pathname === "/system-setting/role"
                ? 'list-item-active' : 'list-item' }   disablePadding sx={{ display: 'block' }}>
                    <Link to="/system-setting" style={{ textDecoration: 'none' }}>
                        <ListItemButton className='list-item-button' sx={{ px: 2.5, }} >
                            <ListItemIcon className={
                                location.pathname === "/system-setting" || location.pathname === "/system-setting/role" ? "list-item-icon-active" : "list-item-icon"}  >
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText
                                className={ location.pathname === "/system-setting" || location.pathname === "/system-setting/role" ? "list-item-text-active" : "list-item-text"}
                                primary={"System Setting"} />
                        </ListItemButton>
                    </Link>
                </ListItem>
                {/* Item */}
            </List> 

        {/* <Divider /> */}            
        </Drawer>

        </>

    );
}