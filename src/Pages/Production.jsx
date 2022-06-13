import {TextField , Pagination, Box, Button, IconButton, InputAdornment, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, MenuItem, FormControl, Select } from "@mui/material";
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


export default function Production() {
    //View details
    const [ViewData, setViewData] = React.useState({})

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

    // React.useEffect( () => {
    //     if(data?.getProductionsPagination?.productions){
    //         console.log(data?.getProductionsPagination?.productions , "data" )
    //         setProductionData(data?.getProductionsPagination?.productions);
    //     }
    // },[data?.getProductionsPagination?.productions])
    
    // End Get

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
                    <FormControl className="form-controll-select" size="small" fullWidth >                       
                        <Select         
                            IconComponent={(props) => (<KeyboardArrowDownOutlinedIcon {...props}/>)}                
                            placeholder="Production"
                            defaultValue={" "}
                            onChange={(e) => setProductId(e.target.value)}                 
                        >                            
                            <MenuItem value=" ">Production</MenuItem>
                            <MenuItem value="62a1a3fb27a0158ab6278cb4">A</MenuItem>
                            <MenuItem value="629dd27bfa9f1de38447aa37">B</MenuItem>                            
                        </Select>
                    </FormControl>
                </Stack>

                <Stack direction="row" className="btn-search"  justifyContent="right" spacing={1}>   
                    <Box className="btn-text-field" >                       
                        <TextField 
                            onChange={(event)=>setKeyword(event?.target?.value)}
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Search Production ID"                           
                            size="small"                           
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
                                <TableCell className="header-title" >Product</TableCell>
                                <TableCell className="header-title">Progress</TableCell>
                                <TableCell className="header-title">Priority</TableCell>
                                <TableCell className="header-title">QTY</TableCell>  
                                <TableCell className="header-title">Status</TableCell>   
                                <TableCell className="header-title" align="center"></TableCell>                        
                            </TableRow>
                        </TableHead>
                        {productionData?.map((row , index) => (
                            <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" } >                        
                                <TableRow  className="body-row">
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" component="th" scope="row" width="10%" > {moment(row?.createdAt).format("YYMM")}-{row?.productionsId.padStart(2, '0')} </TableCell>
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" component="th" scope="row" width="25%"> {row?.production?.productName} </TableCell>
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" width="20%">{row?.progress}</TableCell>
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" width="15%">{row.priority}</TableCell>
                                    <TableCell onClick={()=>{handleOpenView(); setViewData(row)}} className="body-title" align="left" width="15%">{row?.qty}</TableCell>
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