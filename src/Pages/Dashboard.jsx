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
import { Link } from "react-router-dom";

//Component
import Chart from "../Component/Dashboard/Chart";
import PurchaseProduct from "../Component/Dashboard/PurchaseProduct";
import TableRawMaterail from "../Component/Dashboard/TableRawMaterail";
import RadialChart from "../Component/Dashboard/RadialChart";

import { GET_USER_LOGIN } from "../Schema/user";
// 
import { useQuery } from "@apollo/client";
import { GET_RAW_MATERAIL_PAGINATION } from "../Schema/rawmaterial";
import { GET_PRODUCT_WITH_PAGINATION } from "../Schema/product";
import { GET_SAL_UNPAITOWE } from "../Schema/dasboard";
import PermissionContent from "../Component/Permission/PermissionContent";
import LoadingPage from "../Component/Permission/LoadingPage";


export default function Dashboard() {

  const [loading,setLoading] = React.useState(true);

  const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
    pollInterval: 10000,
  })
  // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

  React.useEffect( () => {
    if(dataUserLogin?.getuserLogin?.role_and_permission?.permissions) {
        setLoading(false)
    }
  },[dataUserLogin?.getuserLogin?.role_and_permission?.permissions])

  //Query Raw Material
  const { data, refetch } = useQuery(GET_RAW_MATERAIL_PAGINATION, {
      variables: {     
          keyword: "",
          pagination: false,          
      },
      pollInterval: 10000,    
  });
  // console.log(data?.getRawMaterialPagination?.rawMaterial?.length)

  const { data: dataSale } = useQuery(GET_SAL_UNPAITOWE,{
    pollInterval: 10000,
  });
  // console.log(dataSale?.getInvoiceOweAndUnpaid)


  //Query Product
  const { data : dataProduct } = useQuery(GET_PRODUCT_WITH_PAGINATION, {
      variables: {     
          keyword: "",
          pagination: false,          
      },    
      pollInterval: 10000,
  });
  // console.log(dataProduct?.getProductPagination?.products?.length)

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

          {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createRole ?
              <Button
                variant="contained"
                sx={{ boxShadow: "none" }}
                onClick={() => navigate("/sales?create=true")}
                className="btn-invoice"
              >
                  Invoice
              </Button>
            :
              null
          }
          
          {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createProductions ?
              <Button
                variant="contained"
                sx={{ boxShadow: "none" }}
                onClick={() => navigate("/production?create=true")}
                className="btn-production"
              >
                  Productions
              </Button>
            :
              null
          }

          
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
                      <Typography className="text-inline">Raw Material</Typography>
                      <Typography className="sub-color">Total Raw Material</Typography>
                  </Stack>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Button className="btn-maker">
                      <Stack direction="row" justifyContent="center" spacing={1}>
                        <Box className="circle">
                          <Typography className="text-padding">{data?.getRawMaterialPagination?.rawMaterial ? data?.getRawMaterialPagination?.rawMaterial?.length : 0}</Typography>
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
                  <Typography className="text-inline">Product</Typography>
                  <Typography className="sub-color">Total Product</Typography>
                </Stack>
                <Box sx={{ flexGrow: 1 }}></Box>
                <Button className="btn-maker">
                  <Stack direction="row" justifyContent="center" spacing={1}>
                    <Box className="circle">
                      <Typography className="text-padding">{dataProduct?.getProductPagination?.products? dataProduct?.getProductPagination?.products?.length : 0}</Typography>
                    </Box>                   
                  </Stack>
                </Button>
              </Stack>
            </Box>
        </Grid>


        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
            <Box className="box-top">
                <Stack className="center" direction="row" spacing={2}>
                  <Stack direction="column" justifyContent="center">
                    <CircleIcon className="success" />
                  </Stack>
                  <Stack direction="column" justifyContent="center">
                    <Typography className="text-inline">Sale Invoice</Typography>
                    <Typography className="sub-color">Upaid & Owe</Typography>
                  </Stack>
                  <Box sx={{ flexGrow: 1 }}></Box>
                  <Button className="btn-maker">
                    <Stack direction="row" justifyContent="center" spacing={1}>
                      <Box className="circle">
                        <Typography className="text-padding">{dataSale?.getInvoiceOweAndUnpaid ? dataSale?.getInvoiceOweAndUnpaid : 0}</Typography>
                      </Box>                      
                    </Stack>
                  </Button>
                </Stack>
            </Box>
        </Grid>

        
        
        <Grid item xs={12} md={12} lg={12} xl={6}>
          <Box  sx={{  padding: 2 ,  borderRadius: 3 ,  width: "100%", height: "100%", backgroundColor: "#fff",  display: "flex", justifyContent: "center", flexDirection: "column",}}>
                <Chart dataUserLogines={dataUserLogin}/>                            
          </Box>
        </Grid>
        <Grid item xs={12} md={12} lg={12} xl={6}>           
            <PurchaseProduct dataUserLogines={dataUserLogin}/>           
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
                            {
                              dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getTopRawMaterial ?
                                <RadialChart />
                              :
                                loading ? 
                                  <LoadingPage />
                                :
                                  <PermissionContent />
                            }
                            
                          </Grid>
                      </Grid>
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <Stack direction="column" className="footer">
                          <Link to="/raw-material">
                              <Typography className="color">View ALL Material</Typography>
                          </Link>
                          <Typography className="modal" variant="body2">
                              Raw Materials that use as much in order to make the product.
                          </Typography>
                      </Stack>
                </Stack>
            </Box>
        </Grid>
        
        <Grid item xs={12} md={12} xl={6}>
            <TableRawMaterail dataUserLogines={dataUserLogin}/>
        </Grid>
      </Grid>
      {/* end container */}
    </div>
  );
}
