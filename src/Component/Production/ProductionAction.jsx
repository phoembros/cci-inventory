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


export default function ProductionAction({
    editDataProduction,   
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

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

  const [openVoid ,setOpenVoid] = React.useState(false);
  const handleOpenVoid = () => setOpenVoid(true);
  const handleCloseVoid = () => setOpenVoid(false);


  return (
    <div>
        
        <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={()=> {
                handleClose();
                handleOpenEdit();
            }}>
                <Stack direction="row" spacing={1}>
                    <EditIcon sx={{color:"blue"}}/>
                    <Typography>Edit</Typography>
                </Stack> 
            </MenuItem> 
    
            {
                editDataProduction?.status === 'approve' ?
                    <MenuItem onClick={()=> {
                        handleClose();
                        handleOpenQualityCheck();
                    }}>
                        <Stack direction="row" spacing={1}>
                            <CheckCircleOutlineOutlinedIcon sx={{color:"orange"}}/>
                            <Typography>Quality</Typography>
                        </Stack> 
                    </MenuItem> 
                :
                    null
            }
                 
            <MenuItem  onClick={()=> {
                handleClose();
                handleOpenVoid();
            }}>
                <Stack direction="row" spacing={1}>
                    <DeleteIcon sx={{color:"red"}}/>
                    <Typography>Delete</Typography>
                </Stack>    
            </MenuItem>
        </Menu>
        
        {/*  */}
        <Modal open={openEdit} >
            <UpdateProduction  
                handleClose={handleCloseEdit} 
                btnTitle={"Update"} 
                checkStatus={"update"} 
                editDataProduction={editDataProduction}
                storageRoomDataSelected={editDataProduction?.storageRoomId}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />            
        </Modal>
        {/*  */}
        <Modal open={openQualityCheck} >
            <ModalQualityCheck  
                handleClose={handleCloseQualityCheck} 
                editDataProduction={editDataProduction}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        </Modal>
        {/*  */}
        <Modal open={openVoid} >
            <ModalVoidProduction  
                handleClose={handleCloseVoid} 
                checkproduction= {true}  
                editDataProduction={editDataProduction}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        </Modal>



    </div>
  );
}