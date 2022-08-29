import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Outlet, useLocation } from 'react-router-dom';
import MenuNavbar from '../Component/Menu/MenuNavbar';
import TopNavbar from '../Component/Menu/TopNavbar';
import MenuNavbarMobile from "../Component/Menu/MenuNavbarMobile"
import { GET_USER_LOGIN } from '../Schema/user';
import { useQuery } from '@apollo/client';
import { Backdrop, Button, Paper, Slide, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import "./layout.scss";
import logo from "../Assets/CCI512.png";
import ReplayIcon from '@mui/icons-material/Replay';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function Layout({prefersDarkMode, setPrefersDarkMode }) {

  let location = useLocation();
  
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [openMobile, setOpenMobile] = React.useState(false);
  const handleDrawerOpenMobile = () => setOpenMobile(true);
  const handleDrawerCloseMobile = () => setOpenMobile(false);


  // Resize width
  const [width, setWidth]   = React.useState(window.innerWidth);
  const updateDimensions = () => {
      setWidth(window.innerWidth);      
  }
  React.useEffect( () => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // console.log(width)


  // Sleep Screen ================================================================================================
  const [openBackdrop, setOpenBackdrop] = React.useState(true);
  const [iconReload,setIconReload] = React.useState(false);

  const handleCloseBackdrop = () => {
    setIconReload(true)
    setTimeout( () => {
      setOpenBackdrop(false);
      setIconReload(false)
    },2000)        
    window.location.reload(location.pathname);
  };

  const { data: dataUserLogin } = useQuery(GET_USER_LOGIN, {
    pollInterval: 10000,
    onCompleted: ({getuserLogin}) => { 
      console.log(getuserLogin);      
    },
    onError: (error) => { 
      console.log(error?.message);
      let result = error.message.includes("expired");
      if(result){
          setOpenBackdrop(true)          
      }
    }
  })
  // Sleep Screen ================================================================================================


  if(openBackdrop){
    return(     
       
        <Backdrop
          className='backdrop-style'
          sx={{                   
            color: '#fff',            
            zIndex: (theme) => theme.zIndex.drawer + 1 
          }}
          transitionDuration={{ enter: 500, exit: 1000 }}
          open={openBackdrop}         
        > 
            <Box className="background-image" />
            <Stack direction="column"  justifyContent="center" sx={{height: "100vh"}}>  
                <Box display="flex" flexDirection="column" justifyContent="center" height="90%">          
                    <Box display="flex" justifyContent="center" width="100%">       
                        <img src={logo} alt="logo" width="25%"/>  
                    </Box>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Typography className='system-title'>CCI INVENTORY SYSTEM</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" width="100%">
                      <Button 
                          variant='contained' 
                          endIcon={iconReload ? <CircularProgress sx={{color: "white"}} size="25px"/> : <ReplayIcon />}
                          onClick={handleCloseBackdrop}
                      >
                        Back to Page
                      </Button>                                 
                    </Box>  
                </Box>  
                <Box sx={{flexGrow:1}}></Box>
                <Box display="flex" justifyContent="center" width="100%" sx={{mb:"10px"}}>
                  <Typography className='power-title'>Power By: GO GLOBAL TECH</Typography>
                </Box>                            
            </Stack>           
        </Backdrop>
           
    )
  }

  return (
    <Box sx={{ display: 'flex' }}>

      {
          width > 1300 ?

        <>
            <AppBar  sx={{boxShadow: "none"}}  position="fixed"  open={open} >                            
                <TopNavbar 
                    prefersDarkMode={prefersDarkMode} 
                    setPrefersDarkMode={setPrefersDarkMode} 
                    handleDrawerOpen={handleDrawerOpen} 
                    open={open}
                />             
            </AppBar>


            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >       

                  <MenuNavbar open={open} handleDrawerClose={handleDrawerClose}/>
        
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </>

      :

      <>
          <AppBar  sx={{boxShadow: "none"}} position="fixed"  open={openMobile}>                            
              <TopNavbar 
                  prefersDarkMode={prefersDarkMode} 
                  setPrefersDarkMode={setPrefersDarkMode} 
                  handleDrawerOpen={handleDrawerOpenMobile} 
                  open={openMobile}
              />             
          </AppBar>

          <Drawer
              sx={{
                  width: drawerWidth,
                  flexShrink: 0,
                  '& .MuiDrawer-paper': {
                      width: drawerWidth,
                      boxSizing: 'border-box',
                  },
              }}
              variant="persistent"
              anchor="left"
              open={openMobile}
          >       
            
                <MenuNavbarMobile open={openMobile} handleDrawerClose={handleDrawerCloseMobile}/>

          </Drawer>
          <Main open={openMobile}>
              <DrawerHeader />
              <Outlet />
          </Main>

      </>
      }
        
    </Box>
  );
}