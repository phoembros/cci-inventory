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

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat,  carbs, protein};
  }
  
const rows = [
    createData('PO#0012', 'cosmetic', 1.23, 12 ,"Approval"),
    createData('PO#0012', 'cosmetic', 1.23, 2 ,"Pending"),
    createData('PO#0012', 'cosmetic', 1.23, 34 ,"Rejected"),
    createData('PO#0012', 'cosmetic', 1.23, 21 ,"Rejected"),
];
  

export default function RoomDetail() {

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [roomId, setRoomId] = React.useState(null);
    React.useEffect( () => {
        setRoomId(params.get("storageId"));        
    }, [location.search]);
    // ENd get ID

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openViewPurchase, setOpenViewPurchase] = React.useState(false);
    const handleOpenViewPurchase = () => setOpenViewPurchase(true);
    const handleCloseViewPurchase = () => setOpenViewPurchase(false);

    
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
                <Stack direction="column" justifyContent="center">
                    <Stack direction="row" spacing={1}>
                        <Link to="/storage-room" style={{textDecoration: "none"}}>
                            <Typography className="color">Storage Room</Typography>
                        </Link>
                        <Typography className="color">/ Products</Typography>
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
                 {/* <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                       
                    <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text"> Purchase</Typography>
                    </Button>
                    <Modal open={open}>
                        <PurchaseRawMaterial handleClose={handleClose} btnTitle={"Create"}/>
                    </Modal>       
                </Stack>  */}
            </Stack>

            <Box className="container">
                <TableContainer >
                    <Table className="table" aria-label="simple table">
                        <TableHead >
                            <TableRow className="header-row">
                                <TableCell className="header-title" colSpan={2}>Name</TableCell>
                                <TableCell className="header-title">Qty In Stock</TableCell>                               
                                <TableCell className="header-title">Total</TableCell>    
                                <TableCell className="header-title"></TableCell>                              
                            </TableRow>
                        </TableHead>
                        {data?.getProductByStorageRoomId.map((row , index) => (
                            <TableBody component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                <TableRow  className="body-row">
                                    <TableCell onClick={handleOpenViewPurchase} className="body-title" component="th" scope="row" width="3%" > {index+1}- </TableCell>
                                    <TableCell onClick={handleOpenViewPurchase} className="body-title" component="th" scope="row" width="25%"> {row.productName} </TableCell>
                                    <TableCell onClick={handleOpenViewPurchase} className="body-title" >{row.qtyInThisStorage} {row?.unit}</TableCell>
                                    <TableCell onClick={handleOpenViewPurchase} className="body-title" >{row.totalStockAmount}</TableCell>                                                                   
                                    <TableCell className="body-title" align="right">
                                        <RoomDetialAction />                        
                                    </TableCell>                            
                                </TableRow>
                            </TableBody>                        
                        ))}
                    </Table>
                </TableContainer>
            </Box> 

            <Modal open={openViewPurchase}>
                <ViewPurchase handleClose={handleCloseViewPurchase} />
            </Modal>
            
        </div>
    );
}