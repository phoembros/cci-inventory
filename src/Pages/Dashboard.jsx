import * as React from "react";
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Paper,
  Button,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import "./dashboard.scss";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircleIcon from "@mui/icons-material/Circle";
import ShareLocationTwoToneIcon from "@mui/icons-material/ShareLocationTwoTone";
import { withStyles } from "@material-ui/core/styles";
import NightlightRoundedIcon from "@mui/icons-material/NightlightRounded";
import NightlightOutlinedIcon from '@mui/icons-material/NightlightOutlined';
import Switch from "@mui/material/Switch";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { styled } from '@mui/material/styles';

//Component
import Chart from "../Component/Dashboard/Chart";
import PurchaseProduct from "../Component/Dashboard/PurchaseProduct";
import TableRawMaterail from "../Component/Dashboard/TableRawMaterail";
import RadialChart from "../Component/Dashboard/RadialChart";


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));


export default function Dashboard() {
  //switch
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  //end

  return (
    <div className="dashboard-page">
      {/*  Top */}
      <Stack direction="row" spacing={2}>
          <Box className="slash" />
          <Stack direction="column" justifyContent="center">
            <Typography className="color">Dashboard</Typography>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" justifyContent="right" className="btn-search">
              <Box className="search">
                <TextField className="text-field"
                    fullWidth
                    id="input-with-sx"
                    placeholder="Search Dashboard"
                    size="small"
                    // variant="standard"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton disableRipple={true} size="small">
                            <TuneIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                />
              </Box>
          </Stack>
      </Stack>
      {/* end Top */}
      <Box sx={{mt:4}}></Box>
      {/* container */}
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Box sx={{padding: 2,  borderRadius: 3, width: "100%", backgroundColor: "#fff", display: "flex" , justifyContent: "center" , flexDirection: 'column' }} >
              <Chart />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ borderRadius: 3,  width: "100%", height: 200, backgroundColor: "#fff", }} >
            <PurchaseProduct />
          </Box>
          <Grid container spacing={2} sx={{ mt: "1px" }}>
            <Grid item xs={4}>
              <Box sx={{ padding: 2, borderRadius: 3, width: "100%", height: 130, backgroundColor: "#fff", }} >
                <Grid container className="color">
                  Storage Room
                </Grid>
                <Stack className="card" direction="row" spacing={2}>
                  <Grid container direction="column">
                    <Paper className="icon">
                      <ShareLocationTwoToneIcon />
                    </Paper>
                    <Grid className="text"> Product </Grid>
                  </Grid>
                  <Grid className="num-make" container direction="column">
                    50
                  </Grid>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{  padding: 2, borderRadius: 3, width: "100%", height: 130, backgroundColor: "#fff", }} >
                <Grid container className="color">
                  Storage Room
                </Grid>
                <Stack className="card" direction="row" spacing={2}>
                  <Grid container direction="column">
                    <Paper className="icon">
                      <ShareLocationTwoToneIcon />
                    </Paper>
                    <Grid className="text"> Product </Grid>
                  </Grid>
                  <Grid className="num-make" container direction="column">
                    50
                  </Grid>
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Box sx={{  padding: 2, borderRadius: 3, width: "100%", height: 130, backgroundColor: "#fff", }} >
                <Grid container className="color">
                  Storage Room
                </Grid>
                <Stack className="card" direction="row" spacing={2}>
                  <Grid container direction="column">
                    <Paper className="icon">
                      <ShareLocationTwoToneIcon />
                    </Paper>
                    <Grid className="text"> Product </Grid>
                  </Grid>
                  <Grid className="num-make" container direction="column">
                    50
                  </Grid>
                </Stack>
              </Box>
            </Grid>


          </Grid>
        </Grid>
      </Grid>

      {/*Purchase Order*/}
      <Grid container spacing={3} sx={{ mt: "1px" }}>
        <Grid item xs={4}>

          <Stack sx={{width: "100%",}} direction="row" spacing={5}>
              <Typography className="color" > Purchase Order Pendding</Typography>
              <Box sx={{flexGrow:1}}></Box>            
              <IconButton>
                <MoreVertIcon color="primary" />
              </IconButton>
          </Stack>
                    
          <Box sx={{padding: 2,  borderRadius: 2, width: "100%", backgroundColor: "#fff", display: "flex" , justifyContent: "center" , flexDirection: 'column' , mt:2 }} >
              <Stack className="center"  direction="row" spacing={2}>
                  <Stack direction="column" justifyContent="center">
                      <CircleIcon className="success"/>
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                      <Typography className="text-inline">Raw Material</Typography>
                      <Typography className="sub-color"> Agent and meduim </Typography>
                  </Stack>
                  <Box sx={{flexGrow:1}}></Box>
                  <Button className="btn-maker">
                        <Stack direction="row" justifyContent="center" spacing={1}>
                            <Box className="circle">
                              <Typography className="text-padding">10</Typography>
                            </Box>
                            <Stack direction="column" justifyContent="center">
                              <Typography className="text-padding">Pendding</Typography>
                            </Stack>
                        </Stack>
                  </Button>
              </Stack>
              <Stack className="center"  direction="row" spacing={2} sx={{mt:2}}>
                  <Stack direction="column" justifyContent="center">
                      <CircleIcon className="success"/>
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                      <Typography className="text-inline">Product</Typography>
                      <Typography className="sub-color"> Agent and meduim </Typography>
                  </Stack>
                  <Box sx={{flexGrow:1}}></Box>
                  <Button className="btn-maker">
                        <Stack direction="row" justifyContent="center" spacing={1}>
                            <Box className="circle">
                              <Typography className="text-padding">10</Typography>
                            </Box>
                            <Stack direction="column" justifyContent="center">
                              <Typography className="text-padding">Pendding</Typography>
                            </Stack>
                        </Stack>
                  </Button>
              </Stack>
          </Box>

                    
          <Stack direction="column"  sx={{ padding: 2, borderRadius: 3, width: "70%", height: 170, backgroundColor: "#EDEFFA", mt:4 }}>
              <Stack direction="row" spacing={2}>                       
                  <Paper sx={{ borderRadius: 2 , display: "flex" , justifyContent: "center" , flexDirection:"column" , padding:1 , backgroundColor: "#5A5A5A"}}>
                      <NightlightOutlinedIcon sx={{color:"#fff"}}/>
                  </Paper>  
                  <Box sx={{flexGrow: 1}}></Box>
                  <Stack direction="column" justifyContent="center" >
                      <IconButton>
                          <MoreHorizOutlinedIcon />
                      </IconButton>
                  </Stack>
              </Stack>  
              <Box sx={{flexGrow:1}}></Box>
              <Stack direction="row" spacing={1}> 
                  <Box className="mode-text">
                      <Typography className="text">Mode</Typography>
                      <Typography className="text-black">Create Night Mode</Typography>
                      <Typography className="text-black">For this app</Typography>
                  </Box>
                  <Box sx={{flexGrow:1}}></Box>
                  <Stack direction="column" justifyContent="center" >
                      <FormGroup>
                        <FormControlLabel
                          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked />}                          
                        />
                      </FormGroup>
                  </Stack>
              </Stack>
                  
          </Stack>      
          





          
        </Grid>

        {/* Raw Materail*/}
        <Grid item xs={4}>
          <Box
            sx={{
              paddingX: 2,
              borderRadius: 3,
              width: "100%",
              height: 320,
              // backgroundColor: "#fff",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Grid
                item
                xs={12}
                className="title"
                direction="column"
                spacing={2}
              >
                <Grid className="right"> Cash Purchase Raw Material </Grid>
                <Grid className="buttom"> In 3 Month </Grid>
              </Grid>
            </Stack>
            <TableRawMaterail />
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Box
            sx={{
              paddingX: 2,
              borderRadius: 3,
              width: "100%",
              height: 320,
              // backgroundColor: "#fff",
            }}
          >
            <Stack direction="row" spacing={2} display="flex">
              <Grid container className="title">
                <Grid container className="right">
                  Top Raw Material
                </Grid>
                <Grid container>
                  <Grid item xs={4} md={4}>
                      <Grid container className="start-merge">
                        <CircleIcon className="success" />
                        Material Name
                      </Grid>

                      <Grid container className="start-merge">
                        <Typography>
                          <CircleIcon className="warning" />
                          Material Name
                        </Typography>
                      </Grid>

                      <Grid container className="start-merge">
                        <Typography>
                          <CircleIcon className="error" />
                          Material Name
                        </Typography>
                      </Grid>

                      <Grid container className="start-merge">
                        <Typography>
                          <CircleIcon className="primary" />
                          Material Name
                        </Typography>
                      </Grid>
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <RadialChart />
                  </Grid>

                  <Grid item xs={12} direction="column" className="footer">
                    <Grid className="color">View ALL Material</Grid>
                    <Grid className="modal"> Agent and meduim </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* end container */}
    </div>
  );
}
