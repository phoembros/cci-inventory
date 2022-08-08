import * as React from "react";
import { Box ,Paper, Button,Stack , IconButton,Typography, TextField, InputAdornment, Modal, Accordion, AccordionSummary, AccordionDetails,} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './roomdetail.scss';
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductGroupList from "./ProductGroupList";
import LoadingPage from "../Permission/LoadingPage";

export default function RoomDetail() {

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN)
    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    const [loading,setLoading] = React.useState(true);

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
    
    const { data,refetch } = useQuery(GET_PRODUCT_STORAGE_ROOM_BY, {
        variables: {
            storageRoomId: roomId,
        },
        onCompleted: ({getProductByStorageRoomId}) => {
            setDateView(getProductByStorageRoomId)
            // console.log(getProductByStorageRoomId)  
            setTimeout( () => {
                setLoading(false)                
            },2000)          
        },
        fetchPolicy:'cache-and-network'
    });


    // console.log(dataView, 'storage')
    
    return(
        <div className="room-detail-page">
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
                
            </Stack>

            {
                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getProductByStorageRoomId ?
                    <>
                        <Box className="container">                          

                            <TableContainer >
                                <Table className="table" aria-label="simple table">
                                    
                                {
                                    dataView?.length !== 0 ?
                                        <>
                                            { dataView?.map((row , index) => (
                                                <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                                    <TableRow  className="body-row">
                                                        <TableCell className="body-title" component="th" scope="row" colSpan={7} rowSpan={5}>
                                                            <Accordion className="accordion-style">

                                                                <AccordionSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >   
                                                                    <Stack direction="row" spacing={4}>                                                                        
                                                                        <Typography>{index+1} - </Typography>                                                                        
                                                                        <Box width="200px"> 
                                                                            <Typography>Name: {row?.productName}</Typography>       
                                                                        </Box>                                                                           
                                                                        <Typography>Category: {row?.category?.categoryName}</Typography>                                                                   
                                                                    </Stack>                                                                    
                                                                </AccordionSummary>

                                                                <AccordionDetails>
                                                                    <Box sx={{pl:5 , pr:5}}>
                                                                        <ProductGroupList productId={row?._id} />
                                                                    </Box>                                                                    
                                                                </AccordionDetails>

                                                            </Accordion>
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
                    loading ?
                        <LoadingPage />
                    :        
                        <PermissionContent />
            }
            

            {/* <Modal open={openViewPurchase}> */}
                {/* <ViewRoomDetail open={openViewPurchase} handleClose={handleCloseViewPurchase} DataView={dataView} /> */}
            {/* </Modal> */}
            
        </div>
    );
}