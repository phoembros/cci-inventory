import React from "react";
import "./purchaseproduct.scss";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Box, Typography, Divider, IconButton, TableContainer, Table, TableBody, TableCell, TableRow, Paper } from "@mui/material";
import { GET_PRODUCTION_WITH_PAGINATION } from "../../Schema/production";
import { useQuery } from "@apollo/client";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DescriptionIcon from '@mui/icons-material/Description';
// import moment from "moment"
// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import PermissionContent from "../Permission/PermissionContent";
import ViewProduction from "../Production/ViewProduction";
import AlertMessage from "../AlertMessage/AlertMessage";
import LoadingPage from "../Permission/LoadingPage";
import { useTheme } from '@mui/material/styles';


function PurchaseProduct({dataUserLogines}) {

    const theme = useTheme();

    const navigate = useNavigate();

    const [loading,setLoading] = React.useState(true);

    React.useEffect( () => {
        if(dataUserLogines?.getuserLogin?.role_and_permission?.permissions) {
            setLoading(false)
        }
    },[dataUserLogines?.getuserLogin?.role_and_permission?.permissions])

    const [ViewData,setViewData] = React.useState(null);
    
    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    // open dialog
    const [openView,setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);


    // get Production 
    const [productionData,setProductionData] = React.useState([]);  
    const [status,setStatus] = React.useState("")

    const { data , refetch } = useQuery(GET_PRODUCTION_WITH_PAGINATION , {
        variables: {
            productId: "",
            page: 1,
            limit: 4,
            keyword: "",
            pagination: true,
            status: status,
            priority: "",
            progress: "",
        },       
    })

    React.useEffect( () => {
        refetch()
    },[status])

    React.useEffect( () => {
        setStatus("pending");
    },[])

    React.useEffect( () => {
        if(data?.getProductionsPagination?.productions){
            setProductionData(data?.getProductionsPagination?.productions)
        }
    },[data?.getProductionsPagination?.productions])
    
  

  return (
    <Stack component={Paper} className="purchase" spacing={1} padding="2%">
        <Stack direction="row" spacing={2}>
            <Typography className={theme.palette.mode === 'dark' ? "title-dark" : "title" }> Production </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Stack direction="row" justifyContent="center">
                <Typography className={theme.palette.mode === 'dark' ? "title-dark" : "title" } variant="body2"> Pending: {productionData?.length} </Typography>
            </Stack>
        </Stack>
        <Divider />

        

        {
            dataUserLogines?.getuserLogin?.role_and_permission?.permissions?.getProductionsPagination ?

                <>
                    <Box display="flex" flexDirection="column" justifyContent="center" height="100%">
                    {
                        productionData?.length === 0 ? 
                        <Stack direction="row" justifyContent="center" height="100%">
                            <Stack direction="column" justifyContent="center">
                                <IconButton>
                                    <DescriptionIcon sx={{color: "#d0e3ed"}}/>
                                </IconButton>
                                <Typography variant="body2" sx={{color: "#d0e3ed"}}>No Data</Typography>
                            </Stack>
                        </Stack>
                    :
                        null
                    }
                    

                        <Box className="container">
                            <TableContainer className="table-container">
                                <Table className="table" aria-label="simple table">
                                    {productionData?.map((row, index) => (
                                        <TableBody key={index} component={Paper} className="body">
                                        <TableRow className={index%2 === 0 ? "body-row" : "body-odd"}>
                                            <TableCell                    
                                                className="body-title"
                                                width="30%"
                                            >
                                                <Typography> {row?.production?.productId?.productName}</Typography>
                                            </TableCell>
                                            <TableCell
                                            className="body-title"
                                            width="20%"
                                            >
                                                {
                                                    row.priority === "urgent" ?                                        
                                                        <Stack direction="row" spacing={1}>
                                                            <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                                                            <Stack direction="column" justifyContent="center">
                                                                <Typography variant="body2">Urgent</Typography>
                                                            </Stack>
                                                        </Stack>
                                                    : null
                                                }

                                                {
                                                    row.priority === "important" ?                                          
                                                        <Stack direction="row" spacing={1}>
                                                            <PriorityHighIcon sx={{color:"red", width:"17px"}} />
                                                            <Stack direction="column" justifyContent="center">
                                                                <Typography variant="body2">Important</Typography>
                                                            </Stack>
                                                        </Stack>    
                                                    : null                                        
                                                }

                                                {
                                                    row.priority === "medium" ? 
                                                        <Stack direction="row" spacing={1}>
                                                            <FiberManualRecordIcon sx={{color:"green", width:"17px"}} />
                                                            <Stack direction="column" justifyContent="center">
                                                                <Typography variant="body2">Medium</Typography>
                                                            </Stack>
                                                        </Stack>
                                                    : null                                        
                                                }

                                                {
                                                    row.priority === "low" ? 
                                                        <Stack direction="row" spacing={1}>
                                                            <ArrowDownwardIcon sx={{color:"blue", width:"17px"}} />
                                                            <Stack direction="column" justifyContent="center">
                                                                <Typography variant="body2">Low</Typography>
                                                            </Stack>
                                                        </Stack>
                                                    : null
                                                }
                                            </TableCell>
                                            <TableCell
                                            className="body-title"
                                            width="30%"
                                            >
                                                <Typography sx={{fontWeight: "bold", color: "orange" }}> {row?.status} </Typography>
                                            </TableCell>
                                            <TableCell 
                                            className="body-title"
                                            align="right"
                                            width="15%"
                                            >
                                                
                                                    <Button sx={{textTransform: "none"}} onClick={ () => { handleOpenView(); setViewData(row) }}>
                                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                                            <RemoveRedEyeIcon sx={{ color: "blue" }} />
                                                            <Typography className="invoice-table-text">View</Typography>
                                                        </Stack>                  
                                                    </Button> 

                                            </TableCell>                        
                                        </TableRow>
                                        </TableBody>
                                    ))} 
                                </Table>
                                
                            </TableContainer>
                        </Box>   

                    
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <Stack direction="row" justifyContent="center" sx={{mt:2}}>
                            <Button className="left-make" onClick={() => navigate("/production")}>
                                View All
                            </Button>
                        </Stack>
                    </Box>
                </>
            :
                loading ?
                    <LoadingPage />
                :
                    <PermissionContent />

        }
    
        {/* <Modal open={openView}> */}
        <ViewProduction 
            dataUserLogin={dataUserLogines}
            open={openView}
            handleClose={handleCloseView} 
            ViewData={ViewData}
            setAlert={setAlert}
            setMessage={setMessage}
            setCheckMessage={setCheckMessage}
            setRefetch={refetch}
        />
        {/* </Modal> */}

        <AlertMessage
          alert={alert}
          message={message}
          setAlert={setAlert}
          setMessage={setMessage}
          checkMessage={checkMessage}
          setCheckMessage={setCheckMessage}
        />


    </Stack>
  );
}

export default PurchaseProduct;
