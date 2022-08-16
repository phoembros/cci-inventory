import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Modal, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalDeletePurchaseRawMaterial from "./ModalDeletePurchaseRawMaterial";
import ViewPurchase from "./ViewPurchase";
import PurchaseRawMaterialUpdate from './PurchaseRawMaterialUpdate';
import ModalCheckPurchase from "./ModalCheckPurchase"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PaymentModal from './PaymentModal';

export default function RawMaterialAction({
    nameRequest,
    dataUserLogin,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    purchaseIdView,
}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () =>  setAnchorEl(null);
    
    const [openDelete ,setOpenDelete] = React.useState(false);
    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    const [openEdit ,setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
   
    const [openCheck,setOpenCheck] = React.useState(false);
    const handleOpenCheck = () => setOpenCheck(true);
    const handleCloseCheck = () => setOpenCheck(false);

    const [openPayment,setOpenPayment] = React.useState(false);
    const handleOpenPayment = () => setOpenPayment(true);
    const handleClosePayment = () => {
        setOpenPayment(false);
        window.history.replaceState(null, "", "/purchase-material")
    }

    React.useEffect( () => {
        if(purchaseIdView !== null && purchaseIdView === editData?._id) {
            handleOpenPayment();
        }
    },[purchaseIdView])
    
  return (
    <div>        
        <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>

        {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updatePurchaseRawMaterial ||
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deletePurchaseRawMaterial ||
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.completePurchaseRawMaterial ?         

            <>
                {
                    editData?.status !== "completed" && editData?.status !== "voided"  ? 
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

                            {
                                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updatePurchaseRawMaterial ?
                                    <MenuItem onClick={()=> {
                                        handleClose();
                                        handleOpenEdit();
                                    }}>
                                        <Stack direction="row" spacing={1}>
                                            <EditIcon sx={{color:"blue"}}/>
                                            <Typography>Edit</Typography>
                                        </Stack> 
                                    </MenuItem> 
                                : null
                            }
                            

                            {
                                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.completePurchaseRawMaterial ||
                                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updatePurchaseRawMaterial ?
                                    <>
                                        {
                                            editData?.status === "approved" ?
                                                <>

                                                {
                                                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.completePurchaseRawMaterial ?
                                                    <>
                                                        <MenuItem onClick={()=> {
                                                            handleClose();
                                                            handleOpenCheck();
                                                        }}>
                                                            <Stack direction="row" spacing={1}>
                                                                <CheckCircleOutlineIcon sx={{color:"green"}}/>
                                                                <Typography>Complete</Typography>
                                                            </Stack> 
                                                        </MenuItem>
                                                    </>
                                                    :
                                                        null
                                                }
                                                    
                                                {
                                                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updatePurchaseRawMaterial ?
                                                        <MenuItem onClick={()=> {
                                                            handleClose();
                                                            handleOpenPayment();
                                                        }}>
                                                            <Stack direction="row" spacing={1}>
                                                                <CurrencyExchangeIcon sx={{color:"#F15412"}}/>
                                                                <Typography>Payment</Typography>
                                                            </Stack> 
                                                        </MenuItem>
                                                    :
                                                        null
                                                }

                                                </>
                                            :
                                                null
                                        } 
                                    </>
                                :
                                    null
                            }

                                              
                        

                            {
                                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deletePurchaseRawMaterial ?
                                    <MenuItem  onClick={()=> {
                                        handleClose();
                                        handleOpenDelete();
                                    }}>
                                        <Stack direction="row" spacing={1}>
                                            <DeleteIcon sx={{color:"red"}}/>
                                            <Typography>Void</Typography>
                                        </Stack>    
                                    </MenuItem>
                                : null
                            }

                        </Menu>
                    :
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >

                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updatePurchaseRawMaterial ?
                                <MenuItem onClick={()=> {
                                    handleClose();
                                    handleOpenPayment();
                                }}>
                                    <Stack direction="row" spacing={1}>
                                        <CurrencyExchangeIcon sx={{color:"#F15412"}}/>
                                        <Typography>Payment</Typography>
                                    </Stack> 
                                </MenuItem> 
                            :
                                null
                        }

                        {
                                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deletePurchaseRawMaterial ?
                                    <MenuItem  onClick={()=> {
                                        handleClose();
                                        handleOpenDelete();
                                    }}>
                                        <Stack direction="row" spacing={1}>
                                            <DeleteIcon sx={{color:"red"}}/>
                                            <Typography>Void</Typography>
                                        </Stack>    
                                    </MenuItem>
                                : null
                            }
                            

                        </Menu>
                }

            </>

            :
                null
        }

        
         

        

        {/* <Modal open={openEdit}> */}
            <PurchaseRawMaterialUpdate 
                nameRequest={nameRequest}
                handleClose={handleCloseEdit} 
                open={openEdit}
                btnTitle={"Update"} 
                editData={editData}   
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}             
            />
        {/* </Modal> */}
        {/*  */}

        {/* <Modal open={openCheck}> */}
            <ModalCheckPurchase 
                handleClose={handleCloseCheck} 
                open={openCheck}
                btnTitle={"Update"} 
                editData={editData}   
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}             
            />
        {/* </Modal> */}
        
        {/*  */}
        {/* <Modal open={openDelete}> */}
            <ModalDeletePurchaseRawMaterial 
                handleClose={handleCloseDelete}
                open={openDelete}
                editData={editData}   
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}  
            />
        {/* </Modal> */}

        {/*  */}
        {/* <Modal open={openPayment}> */}
            <PaymentModal 
                handleClose={handleClosePayment} 
                open={openPayment}
                btnTitle={"Update"} 
                editData={editData}   
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}             
            />
        {/* </Modal> */}
        


    </div>
  );
}