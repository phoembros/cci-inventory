import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { Outlet } from 'react-router-dom';
import MenuNavbar from '../Component/Menu/MenuNavbar';
import TopNavbar from '../Component/Menu/TopNavbar';
import MenuNavbarMobile from "../Component/Menu/MenuNavbarMobile"

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

  console.log(width)


  return (
    <Box sx={{ display: 'flex' }}>

      {
          width > 1024 ?

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