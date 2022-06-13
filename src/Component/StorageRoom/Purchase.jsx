import * as React from "react";
import { Box ,Paper, Button, Stack , IconButton,Typography, TextField, InputAdornment, Modal,} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow, Pagination} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './purchase.scss';
import { Link, useLocation } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import PurchaseRawMaterial from './PurchaseRawMaterial';
import PurchaseRawMaterialAction from './PurchaseRawMaterialAction';
import ViewPurchase from './ViewPurchase';
import { GET_PURCHASE_RAW_MATERAIL_PAGINATION } from '../../Schema/starageroom';
import {useQuery} from '@apollo/client';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AlertMessage from "../AlertMessage/AlertMessage";
import moment from "moment";
  

export default function ProductCategories() {

    //Dataview 
    const [PurchaseData, setPurchaseData] = React.useState([])

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [roomId, setRoomId] = React.useState(params.get("storageId"));
    React.useEffect( () => {
        setRoomId(params.get("storageId"));        
    }, [location.search]);
    // End get Id Storage Room

    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");


    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openViewPurchase, setOpenViewPurchase] = React.useState(false);
    const handleOpenViewPurchase = () => setOpenViewPurchase(true);
    const handleCloseViewPurchase = () => setOpenViewPurchase(false);
    
    const [pageShow, setPageShow] = React.useState()
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(8)
    const [keyword, setKeyWord] = React.useState("")

    const [dataPurchaseRawMaterial,setDataPurchaseRawMaterial] = React.useState([]);

    const { data , refetch } = useQuery(GET_PURCHASE_RAW_MATERAIL_PAGINATION, {
        variables: {
            storageId: roomId,
            page: page,
            limit:limit,
            keyword: keyword,
            pagination: true,
        },
        onCompleted: ({getPurchaseRawMaterialPagination}) => {
            // console.log(getPurchaseRawMaterialPagination?.purchaseRawMaterial,"data");    
            setDataPurchaseRawMaterial(getPurchaseRawMaterialPagination?.purchaseRawMaterial)        
        },
        onError: (error) => {
            console.log(error.message)
        }
    });

    React.useEffect(()=>{
        refetch()
        setPageShow(data)
    }, [page, keyword])

   
    
    return(
        <div className="purchases-page">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Stack direction="row" spacing={1}>
                        <Link to="/storage-room" style={{textDecoration: "none"}}>
                            <Typography className="color">Storage Room</Typography>
                        </Link>
                        <Typography className="color">/ Raw Materials</Typography>
                    </Stack>                  
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="btn"  justifyContent="right" spacing={1}>  
                     <Box className="btn-text-field" >                       
                        <TextField 
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Search Dashboard"                           
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
                </Stack>
                <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                       
                    <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text"> Purchase</Typography>
                    </Button>
                    <Modal open={open}>
                        <PurchaseRawMaterial 
                            handleClose={handleClose} 
                            btnTitle={"Create"}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}
                            setRefetch={refetch}
                        />
                    </Modal>       
                </Stack>
            </Stack>

            <Box className="container">
                <TableContainer >
                    <Table className="table" aria-label="simple table">
                        <TableHead >
                            <TableRow className="header-row">
                                <TableCell className="header-title">PO Number</TableCell>                                  
                                <TableCell className="header-title">Purchase By</TableCell>  
                                <TableCell className="header-title">purchase Date</TableCell>                               
                                <TableCell className="header-title">Priority</TableCell>    
                                <TableCell className="header-title">Status</TableCell>                               
                                <TableCell className="header-title" align="center"></TableCell>                        
                            </TableRow>
                        </TableHead>
                        {dataPurchaseRawMaterial?.map((row , index) => (
                            <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                <TableRow  className="body-row">
                                    <TableCell onClick={()=>{handleOpenViewPurchase(); setPurchaseData(row)}} className="body-title" component="th" scope="row" width="15%" > {moment(row?.createdAt).format('YYMM')}-{row?.purchaseId.padStart(2, '0')} </TableCell>                                                                  
                                    <TableCell onClick={()=>{handleOpenViewPurchase(); setPurchaseData(row)}} className="body-title" >{row?.purchaseBy?.first_name+' '+row?.purchaseBy?.last_name}</TableCell>
                                    <TableCell onClick={()=>{handleOpenViewPurchase(); setPurchaseData(row)}} className="body-title" >{moment(row?.purchaseDate).format("DD/MM/YYYY")}</TableCell>
                                    <TableCell onClick={()=>{handleOpenViewPurchase(); setPurchaseData(row)}} className="body-title" >{row?.priority}</TableCell>    
                                    <TableCell onClick={()=>{handleOpenViewPurchase(); setPurchaseData(row)}} className="body-title" >
                                        <Typography className={`status-${row.status}`}>{row?.status}</Typography>
                                    </TableCell>                                                                   
                                    <TableCell className="body-title" align="right">
                                        <PurchaseRawMaterialAction 
                                            editData={row}
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

            <Stack direction="row" justifyContent="right" spacing={2}>
            <IconButton disabled={ data?.getPurchaseRawMaterialPagination?.paginator?.prev === null? true: false }
                onClick={() =>
                setPage(data?.getPurchaseRawMaterialPagination?.paginator?.prev)
                }
            >
                <ArrowBackIosNewIcon />
            </IconButton>
            <Stack direction="column" justifyContent="center" >
                <Pagination
                    page={pageShow}
                    hideNextButton="true"
                    hidePrevButton="true"
                    variant="outlined"
                    color="primary"
                    count={data?.getPurchaseRawMaterialPagination?.paginator?.totalPages}
                    onChange={(event) => setPage(parseInt(event?.target?.textContent))}
                />
            </Stack>
            <IconButton
                disabled={
                data?.getPurchaseRawMaterialPagination?.paginator?.next === null
                    ? true
                    : false
                }
                onClick={() =>
                setPage(data?.getPurchaseRawMaterialPagination?.paginator?.next)
                }
            >
                <ArrowForwardIosIcon />
            </IconButton> 
            </Stack>
            <Modal open={openViewPurchase}>
                <ViewPurchase 
                    handleClose={handleCloseViewPurchase} 
                    PurchaseData={PurchaseData}
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