import {TextField , Pagination, Box, Button, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, MenuItem, FormControl, Select, Autocomplete } from "@mui/material";
import * as React from "react";
import './production.scss';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CreateProduction from "../Component/Production/CreateProduction";
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import ProductionAction from "../Component/Production/ProductionAction";
import ViewProduction from '../Component/Production/ViewProduction';
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { GET_PRODUCTION_WITH_PAGINATION } from "../Schema/production";
import { useQuery } from "@apollo/client"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import moment from "moment";

//icon progress
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';

// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { GET_PRODUCT_WITH_PAGINATION } from "../Schema/product";


export default function Production() {
    //View details
    const [ViewData, setViewData] = React.useState({})

    // Get Product
    const [productFilter,setProductFilter] = React.useState([])
    const { data: dataProductFilter } = useQuery(GET_PRODUCT_WITH_PAGINATION , {
        variables: {           
            keyword: "",
            pagination: true,
        },       
    })
   
    React.useEffect( () => {
        if(dataProductFilter?.getProductPagination?.products){
            console.log(dataProductFilter?.getProductPagination?.products)
            let rows = []; 
            dataProductFilter?.getProductPagination?.products?.forEach((element) => {
                const allrow = {
                    label: element?.productName,
                    _id: element?._id,
                };
                rows.push(allrow);
            });
            setProductFilter(rows)
        }
    },[dataProductFilter?.getProductPagination?.products])
    console.log(productFilter)

    // End Get Product 

    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    const [openCreateProduction, setOpenCreateProduction] = React.useState(false);
    const handleOpenCreateProduction = () => setOpenCreateProduction(true);
    const handleCloseCreateProduction = () => setOpenCreateProduction(false);

    const [openView,setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    // get Production 
    const [productionData,setProductionData] = React.useState([]);  
    const [pageShow, setPageShow] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(8);
    const [keyword, setKeyword] = React.useState("");
    const [productId,setProductId] = React.useState("");

    const { data , refetch } = useQuery(GET_PRODUCTION_WITH_PAGINATION , {
        variables: {
            productId: productId,
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
        },
        fetchPolicy:'cache-and-network',
        onCompleted: ({getProductionsPagination}) => {
            // console.log(getProductionsPagination)
            setProductionData(getProductionsPagination?.productions);
        }
    })    
    // End Get Production

    React.useEffect(()=>{
        refetch()
        setPageShow(page)
    }, [page, keyword , productId ])
    


    return(
        <div className="production-page">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Typography className="color">Production</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" spacing={1} className="btn-filter">                    
                    <Autocomplete                       
                        disablePortal                        
                        options={productFilter}
                        onChange={(event, value) => setProductId(value?._id) }
                        renderInput={(params) => ( 
                            <TextField fullWidth className="text-field" {...params} placeholder="Product Name" size="small" /> 
                        )}
                    />

                </Stack>

                <Stack direction="row" className="btn-search"  justifyContent="right" spacing={1}>   
                    <Box className="btn-text-field" >                       
                        <TextField 
                            onChange={(event) => setKeyword(event?.target?.value)}
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Production ID"                           
                            size="small"                           
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),                               
                            }}
                        />
                    </Box>  

                    {/* button Create */}
                    <Button className="btn-add" onClick={handleOpenCreateProduction} startIcon={<AddIcon/>} >
                        <Typography className="btn-text">Create</Typography>
                    </Button>  
                    <Modal open={openCreateProduction} >                           
                        <CreateProduction  
                            handleClose={handleCloseCreateProduction}
                            btnTitle={"Create"}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}
                            setRefetch={refetch}
                            checkStatus={"create"}
                        />                         
                    </Modal>
                    {/* button Create */}         
                    
                </Stack>
            </Stack>

            <Box className="container">
                <TableContainer >
                    <Table className="table" aria-label="simple table">
                        <TableHead >
                            <TableRow className="header-row">
                                <TableCell className="header-title">ID</TableCell>
                                <TableCell className="header-title">Product</TableCell>
                                <TableCell className="header-title">Progress</TableCell>
                                <TableCell className="header-title">QTY</TableCell> 
                                <TableCell className="header-title">Priority</TableCell>                                
                                <TableCell className="header-title">Status</TableCell>   
                                <TableCell className="header-title" align="center"></TableCell>                        
                            </TableRow>
                        </TableHead>
                        {productionData?.map((row , index) => (
                            <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" } >                        
                                <TableRow  className="body-row">
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" component="th" scope="row" width="10%" >{moment(row?.createdAt).format("YYMM")}-{row?.productionsId.padStart(2, '0')}</TableCell>
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" component="th" scope="row" width="25%">{row?.production?.productName}</TableCell>
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" width="20%">
                                        {
                                            row?.progress === "not started" ?
                                                <Stack direction="row" spacing={1}>
                                                    <PanoramaFishEyeIcon sx={{color:"red", width:"17px"}} />
                                                    <Stack direction="column" justifyContent="center">
                                                        <Typography variant="body2">Not started</Typography>
                                                    </Stack>
                                                </Stack>
                                            : null
                                        }

                                        {
                                            row?.progress === "in progress" ?
                                                <Stack direction="row" spacing={1}>
                                                    <WifiProtectedSetupIcon sx={{color:"green", width:"17px"}} />
                                                    <Stack direction="column" justifyContent="center">
                                                        <Typography variant="body2">In Progress</Typography>
                                                    </Stack>
                                                </Stack>
                                            : null
                                        }

                                        {
                                            row?.progress === "completed" ?                                        
                                                <Stack direction="row" spacing={1}>
                                                    <CheckCircleIcon sx={{color:"#0969A0", width:"17px"}} />
                                                    <Stack direction="column" justifyContent="center">
                                                        <Typography variant="body2">Completed</Typography>
                                                    </Stack>
                                                </Stack>
                                            : null
                                        }
                                    </TableCell>

                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" align="left" width="10%">{row?.qty}</TableCell>

                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" width="15%">

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
                                    
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" align="left" width="10%">
                                        <Typography className={`status-${row?.status}`}>{row?.status}</Typography>
                                    </TableCell>                                    
                                    <TableCell className="body-title" align="right">
                                        <ProductionAction 
                                            btnTitle={"Update"}                                                                                    
                                            editDataProduction={row}
                                            setAlert={setAlert}
                                            setMessage={setMessage}
                                            setCheckMessage={setCheckMessage}
                                            setRefetch={refetch}
                                        />
                                    </TableCell>                            
                                </TableRow>
                            </TableBody>                        
                        ))}
                    </Table>
                </TableContainer>
            </Box> 
            
            <Stack direction='row' justifyContent="right" spacing={2}>
                <IconButton disabled={data?.getProductionsPagination?.paginator?.prev === null ? true : false}
                    onClick={()=>setPage(data?.getProductionsPagination?.paginator?.prev)}
                >
                    <ArrowBackIosNewIcon sx={{":hover" :{color:"#0969A0"}}}/>
                </IconButton>
                <Stack direction='column' justifyContent='center'>
                    <Pagination 
                        page={pageShow}
                        hideNextButton="true"
                        hidePrevButton="true"
                        variant="outlined"
                        color="primary"
                        count={data?.getProductionsPagination?.paginator?.totalPages}
                        onChange={(event)=>setPage(parseInt(event?.target?.textContent))}
                    />
                </Stack>
                <IconButton disabled={data?.getProductionsPagination?.paginator?.next === null ? true : false}
                            onClick={()=>setPage(data?.getProductionsPagination?.paginator?.next)}>
                    <ArrowForwardIosIcon sx={{":hover" :{color:"#0969A0"}}}/>
                </IconButton>
            </Stack>
            <Modal open={openView}>
                <ViewProduction 
                    handleClose={handleCloseView} 
                    ViewData={ViewData}
                    setAlert={setAlert}
                    setMessage={setMessage}
                    setCheckMessage={setCheckMessage}
                    setRefetch={refetch}
                />
            </Modal>

            <AlertMessage alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>

        </div>
    );
}