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
import Switch from "@mui/material/Switch";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//Component
import Chart from "../Component/Dashboard/Chart";
import PurchaseProduct from "../Component/Dashboard/PurchaseProduct";
import TableRawMaterail from "../Component/Dashboard/TableRawMaterail";
import RadialChart from "../Component/Dashboard/RadialChart";


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

      {/* container */}
      <Grid container spacing={5} sx={{ mt: "1px" }}>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: 3,
              width: "100%",
              height: 350,
              backgroundColor: "#fff",
            }}
          >
            <Chart />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              borderRadius: 3,
              width: "100%",
              height: 200,
              backgroundColor: "#fff",
            }}
          >
            <PurchaseProduct />
          </Box>

          <Grid container spacing={2} sx={{ mt: "1px" }}>
            <Grid item xs={4}>
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 3,
                  width: "100%",
                  height: 130,
                  backgroundColor: "#fff",
                }}
              >
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
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 3,
                  width: "100%",
                  height: 130,
                  backgroundColor: "#fff",
                }}
              >
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
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 3,
                  width: "100%",
                  height: 130,
                  backgroundColor: "#fff",
                }}
              >
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
          <Stack container className="make-icon" direction="row" spacing={5}>
            <Stack className="color"> Purchase Order Pendding</Stack>

            <Stack className="left-icon">
              <IconButton>
                <MoreVertIcon color="primary" />
              </IconButton>
            </Stack>
          </Stack>
          <Box
            sx={{
              borderRadius: 3,
              width: "100%",
              height: 320,
              // backgroundColor: "#efef",
            }}
          >
            <Box
              sx={{
                paddingX: 2,
                borderRadius: 3,
                width: "100%",
                height: 140,
                // backgroundColor: "#fff",
              }}
            >
              {/*Order 1*/}
              <Grid container className="center" spacing={2} sx={{ mt: "1px" }}>
                <Grid item xs={2} container direction="column">
                  <CircleIcon className="success" />
                </Grid>

                <Grid item xs={6} container direction="column" display="flex">
                  <Grid className="text-inline">Purchase Product</Grid>
                  <Grid className="sub-color"> Agent and meduim </Grid>
                </Grid>

                <Grid item xs={4} container direction="column">
                  <Button variant="contained" className="btn-maker">
                    <Paper className="circle">50</Paper>
                    <Typography className="text-padding">Padding</Typography>
                  </Button>
                </Grid>
              </Grid>

              {/*Order 2*/}
              <Grid container className="center" spacing={2} sx={{ mt: "1px" }}>
                <Grid item xs={2} container direction="column">
                  <CircleIcon className="warning" />
                </Grid>

                <Grid item xs={6} container direction="column" display="flex">
                  <Grid className="text-inline">Purchase Product</Grid>
                  <Grid className="sub-color"> Agent and meduim </Grid>
                </Grid>

                <Grid item xs={4} container direction="column">
                  <Button variant="contained" className="btn-maker">
                    <Paper className="circle">10</Paper>

                    <Typography className="text-padding">Padding</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>

            {/* Dark mode*/}
            <Grid container spacing={1} sx={{ mt: "1px" }}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    paddingX: 2,
                    borderRadius: 3,
                    width: "70%",
                    height: 170,
                    backgroundColor: "#CBD5FE",
                  }}
                >
                  <Stack
                    container
                    className="make-icon"
                    direction="row"
                    spacing={1}
                  >
                    <Stack>
                      <Stack className="card" direction="row" spacing={2}>
                        <Grid container direction="column">
                          <IconButton>
                            <Paper className="icon-mark">
                              <NightlightRoundedIcon />
                            </Paper>
                          </IconButton>
                        </Grid>
                      </Stack>
                    </Stack>

                    <Stack className="left-icon">
                      <IconButton>
                        <MoreHorizIcon color="primary" />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Stack
                    container
                    className="make-icon"
                    direction="row"
                    spacing={1}
                  >
                    <Stack direction="row">
                      <Grid
                        item
                        xs={12}
                        className="title"
                        direction="column"
                        spacing={2}
                      >
                        <Grid className="buttom"> Mode </Grid>
                        <Grid className="text"> Create Night Mode </Grid>
                        <Grid className="text"> For this app </Grid>
                      </Grid>
                    </Stack>

                    <Stack className="left-icon">
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Box>
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
