import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IconButton, Modal, Stack, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import UpdateProduction from './UpdateProduction';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ModalQualityCheck from './ModalQualityCheck';
import ModalVoidProduction from './ModalVoidProduction';
import ModalProgressProduction from './ModalProgressProduction';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';


export default function ProductionAction({
    nameRequest,
    dataUserLogin,
    editDataProduction,   
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    const [getDataEdit,setGetDataEdit] = React.useState(editDataProduction);

    React.useEffect( () => {
        if(editDataProduction) {
            setGetDataEdit(editDataProduction)
        }
    },[editDataProduction])

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openQualityCheck ,setOpenQualityCheck] = React.useState(false);
  const handleOpenQualityCheck = () => setOpenQualityCheck(true);
  const handleCloseQualityCheck = () => setOpenQualityCheck(false);

  const [openProgress ,setOpenProgress] = React.useState(false);
  const handleOpenProgress = () => setOpenProgress(true);
  const handleCloseProgress = () => setOpenProgress(false);

  const [openVoid ,setOpenVoid] = React.useState(false);
  const handleOpenVoid = () => setOpenVoid(true);
  const handleCloseVoid = () => setOpenVoid(false);


  return (
    <div>
        
        <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>

    {
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateProductions ||
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.completeProduction ||
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteProductions ?
            <>
                {
                    editDataProduction?.progress !== 'completed' ?

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{ 'aria-labelledby': 'basic-button', }}
                    >

                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateProductions ?
                                <MenuItem onClick={()=> {  handleClose();   handleOpenEdit();  }}>
                                    <Stack direction="row" spacing={1}>
                                        <EditIcon sx={{color:"blue"}}/>
                                        <Typography>Edit</Typography>
                                    </Stack> 
                                </MenuItem>
                            :
                                null
                        }

                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateProductions ?
                                <>                            
                                    {
                                        editDataProduction?.status === 'approve' && editDataProduction?.progress === "not started" ?
                                            <MenuItem onClick={()=> { handleClose();  handleOpenProgress(); }}>
                                                <Stack direction="row" spacing={1}>
                                                    <WifiProtectedSetupIcon sx={{color:"green"}}/>
                                                    <Typography>Progress</Typography>
                                                </Stack> 
                                            </MenuItem> 
                                        :  null
                                    }
                                </>                        
                            : null
                        }


                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.completeProduction ?
                                <>
                                    {
                                        editDataProduction?.status === 'approve' && editDataProduction?.progress === "in progress" ?
                                            <MenuItem onClick={()=> { handleClose(); handleOpenQualityCheck(); }}>
                                                <Stack direction="row" spacing={1}>
                                                    <CheckCircleOutlineOutlinedIcon sx={{color:"orange"}}/>
                                                    <Typography>Quantity</Typography>
                                                </Stack> 
                                            </MenuItem> 
                                        :
                                            null
                                    }
                                </>
                            :
                                null        
                        }

                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteProductions ?
                                <MenuItem  onClick={()=> {  handleClose(); handleOpenVoid(); }}>
                                    <Stack direction="row" spacing={1}>
                                        <DeleteIcon sx={{color:"red"}}/>
                                        <Typography>Delete</Typography>
                                    </Stack>    
                                </MenuItem>
                            :
                                null
                        }
                            

                    </Menu>

                    : null
                }
            </>
        :
            null
    }

        
         
        {/* <Modal open={openEdit} > */}
            <UpdateProduction  
                nameRequest={nameRequest}
                handleClose={handleCloseEdit} 
                open={openEdit}
                btnTitle={"Update"} 
                checkStatus={"update"} 
                editDataProduction={editDataProduction}
                storageRoomDataSelected={editDataProduction?.storageRoomId}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />            
        {/* </Modal> */}

         
        {/* <Modal open={openQualityCheck} > */}
            <ModalQualityCheck  
                open={openQualityCheck}
                handleClose={handleCloseQualityCheck} 
                editDataProduction={getDataEdit}                
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        {/* </Modal> */}

        
        {/* <Modal open={openProgress} > */}
            <ModalProgressProduction 
                open={openProgress}
                handleClose={handleCloseProgress} 
                editDataProduction={editDataProduction}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        {/* </Modal> */}

        {/*  */}
        {/* <Modal open={openVoid} > */}
            <ModalVoidProduction  
                handleClose={handleCloseVoid} 
                open={openVoid}
                checkproduction= {true}  
                editDataProduction={editDataProduction}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        {/* </Modal> */}



    </div>
  );
}