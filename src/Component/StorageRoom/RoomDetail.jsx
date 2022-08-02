import * as React from "react";
import { Box ,Paper, Button,Stack , IconButton,Typography, TextField, InputAdornment, Modal,} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './purchase.scss';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import PurchaseRawMaterial from './PurchaseRawMaterial';
import RoomDetialAction from "./RoomDetialAction"
import ViewPurchase from './ViewPurchase';
import {GET_PRODUCT_STORAGE_ROOM_BY} from "../../Schema/starageroom";
import { useQuery } from "@apollo/client";
import {useLocation} from "react-router-dom";
import ViewRoomDetail from "./ViewRoomDetail";
import { GET_USER_LOGIN } from "../../Schema/user";
import PermissionContent from "../Permission/PermissionContent";
import DescriptionIcon from '@mui/icons-material/Description';

export default function RoomDetail() {

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN)
    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [roomId, setRoomId] = React.useState(params.get("storageId"));
    const [roomName, setRoomName] = React.useState(params.get("name"));

    React.useEffect( () => {
        setRoomId(params.get("storageId"));       
        setRoomName(params.get("name")); 
    }, [location.search]);
    // ENd get ID

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openViewPurchase, setOpenViewPurchase] = React.useState(false);
    const handleOpenViewPurchase = () => setOpenViewPurchase(true);
    const handleCloseViewPurchase = () => setOpenViewPurchase(false);

    const [dataView,setDateView] = React.useState([])
    
    const {data} = useQuery(GET_PRODUCT_STORAGE_ROOM_BY, {
        variables: {
            storageRoomId:roomId,
        },
    });

    console.log(data?.getProductByStorageRoomId, 'storage')

    
    return(
        <div className="purchases-page">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />

                <Stack direction="column" justifyContent="center" className="page-titles">
                    <Stack direction="row" spacing={1}>
                        <Link to="/storage-room" style={{textDecoration: "none"}}>
                            <Typography className="color">Storage Room</Typography>
                        </Link>
                        <Typography className="color">/ {roomName}</Typography>
                    </Stack>                  
                </Stack>
                
                <Stack direction="column" justifyContent="center" className="page-titles-mobile">
                    <Stack direction="row" spacing={1}>                       
                        <Typography className="color">{roomName}</Typography>
                    </Stack>                         
                </Stack>

                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="btn"  justifyContent="right" spacing={1}>  
                     {/* <Box className="btn-text-field" >                       
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
                    </Box>  */}
                </Stack>
                 {/* <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                       
                    <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text"> Purchase</Typography>
                    </Button>
                    <Modal open={open}>
                        <PurchaseRawMaterial handleClose={handleClose} btnTitle={"Create"}/>
                    </Modal>       
                </Stack>  */}
            </Stack>

            {
                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getProductByStorageRoomId ?

                    <>
                        <Box className="container">
                            <TableContainer >
                                <Table className="table" aria-label="simple table">
                                    <TableHead >
                                        <TableRow className="header-row">
                                            <TableCell className="header-title" colSpan={2}>Name</TableCell>
                                            <TableCell className="header-title">Qty In Stock</TableCell>   
                                            <TableCell className="header-title">Unit Price</TableCell>                             
                                            <TableCell className="header-title">Total</TableCell>    
                                            <TableCell className="header-title"></TableCell>                              
                                        </TableRow>
                                    </TableHead>
                                {
                                    data?.getProductByStorageRoomId?.length !== 0 ?
                                        <>
                                            {data?.getProductByStorageRoomId?.map((row , index) => (
                                                <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                                    <TableRow  className="body-row">
                                                        <TableCell onClick={() => {handleOpenViewPurchase(); setDateView(row);}} className="body-title" component="th" scope="row" width="3%" > {index+1}- </TableCell>
                                                        <TableCell onClick={() => {handleOpenViewPurchase(); setDateView(row);}} className="body-title" component="th" scope="row" width="25%"> {row?.productName} </TableCell>
                                                        <TableCell onClick={() => {handleOpenViewPurchase(); setDateView(row);}} className="body-title" >{row?.totalQtyUM-row?.totalQtyUMSold} {row?.completedUnit}</TableCell>
                                                        <TableCell onClick={() => {handleOpenViewPurchase(); setDateView(row);}} className="body-title" >${row?.unitPrice}</TableCell>
                                                        <TableCell onClick={() => {handleOpenViewPurchase(); setDateView(row);}} className="body-title" >${(row?.totalQtyUM*row?.unitPrice-row?.totalQtyUMSold*row?.unitPrice).toFixed(2)}</TableCell>                                                                   
                                                        <TableCell className="body-title" align="right">
                                                            <RoomDetialAction />                        
                                                        </TableCell>                                                                               
                                                    </TableRow>                                                    
                                                </TableBody>                        
                                            ))}
                                        </>
                                    :
                                        <TableBody component={Paper} className="body-odd">                        
                                            <TableRow  className="body-row">
                                                <TableCell className="body-title" align="center" colSpan={7} rowSpan={5}>
                                                    <Stack direction="row" justifyContent="center">                                                
                                                        <Stack direction="column" justifyContent="center" >
                                                            <IconButton>
                                                                <DescriptionIcon sx={{color: "white"}}/>
                                                            </IconButton>
                                                            <Typography variant="body2" sx={{color: "white" }}>No Data</Typography>
                                                        </Stack>                                                
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                }
                                    
                                </Table>
                            </TableContainer>
                        </Box> 
                    </>
                :
                    <PermissionContent />
            }
            

            {/* <Modal open={openViewPurchase}> */}
                <ViewRoomDetail open={openViewPurchase} handleClose={handleCloseViewPurchase} DataView={dataView} />
            {/* </Modal> */}
            
        </div>
    );
}