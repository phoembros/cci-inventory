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
import NightlightOutlinedIcon from "@mui/icons-material/NightlightOutlined";
import Switch from "@mui/material/Switch";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      {/*  Top */}
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Dashboard</Typography>
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Button
          variant="contained"
          color="primary"
          sx={{ boxShadow: "none" }}
          onClick={() => navigate("/sales?create=true")}
        >
          Invoice
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ boxShadow: "none" }}
          onClick={() => navigate("/production?create=true")}
        >
          Productions
        </Button>
      </Stack>
      {/* end Top */}
      <Box sx={{ mt: 4 }}></Box>

      {/* container */}
      <Grid container spacing={4}>

        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box className="box-top" >
                <Stack className="center" direction="row" spacing={2}>
                  <Stack direction="column" justifyContent="center">
                    <CircleIcon className="success" />
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Typography className="text-inline">Purchase</Typography>
                    <Typography className="sub-color">Material pending</Typography>
                  </Stack>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Button className="btn-maker">
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      <Box className="circle">
                        <Typography className="text-padding">10</Typography>
                      </Box>                      
                    </Stack>
                  </Button>
                </Stack>
            </Box>
        </Grid>


        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box className="box-top" >
              <Stack className="center" direction="row" spacing={2}>
                <Stack direction="column" justifyContent="center">
                  <CircleIcon className="success" />
                </Stack>
                <Stack direction="column" justifyContent="center">
                  <Typography className="text-inline">Production</Typography>
                  <Typography className="sub-color">Pendding</Typography>
                </Stack>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button className="btn-maker">
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Box className="circle">
                      <Typography className="text-padding">10</Typography>
                    </Box>                   
                  </Stack>
                </Button>
              </Stack>
            </Box>
        </Grid>


        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box className="box-top" >
                <Stack className="center" direction="row" spacing={2}>
                  <Stack direction="column" justifyContent="center">
                    <CircleIcon className="success" />
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Typography className="text-inline">Invoice</Typography>
                    <Typography className="sub-color">Upaid & Owe</Typography>
                  </Stack>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Button className="btn-maker">
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      <Box className="circle">
                        <Typography className="text-padding">10</Typography>
                      </Box>                      
                    </Stack>
                  </Button>
                </Stack>
              </Box>
        </Grid>

        
        
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <Box  sx={{  padding: 2 ,  borderRadius: 3 ,  width: "100%", height: "100%", backgroundColor: "#fff",  display: "flex", justifyContent: "center", flexDirection: "column",}}>
              <Chart />
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={6}>           
            <PurchaseProduct />           
        </Grid>

      </Grid>

      {/*Purchase Order*/}
      <Grid container spacing={3} sx={{ mt: "1px" }}>
        <Grid item xs={12} md={12} xl={6}>
            <Box  sx={{  padding: 2,   borderRadius: 3,  width: "100%",  height: "100%",  backgroundColor: "#fff",  }} >
                <Stack direction="column" spacing={2} justifyContent="center">
                      <Typography className="color">Top Raw Material</Typography>
                      <Grid container className="title">
                          <Grid item xs={12} md={12}>
                            <RadialChart />
                          </Grid>
                      </Grid>

                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Stack direction="column" className="footer">
                          <Typography className="color">View ALL Material</Typography>
                          <Typography className="modal" variant="body2">
                            Created by William Valentine Wright in 1860,{" "}
                          </Typography>
                      </Stack>
                </Stack>
            </Box>
        </Grid>
        
        <Grid item xs={12} md={12} xl={6}>
          <TableRawMaterail />
        </Grid>
      </Grid>
      {/* end container */}
    </div>
  );
}
