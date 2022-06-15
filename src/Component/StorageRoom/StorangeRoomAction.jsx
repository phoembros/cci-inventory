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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import ModalDeleteStorageRoom from "./ModalDeleteStorageRoom";
import ModalCreateStorageRoom from "./ModalCreateStorageRoom";

export default function StorangeRoomAction({
    row,
    alert,
    message,
    setAlert,
    setMessage,
    setRefetch,
    setCheckMessage,
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const [openViewPurchase, setOpenViewPurchase] = React.useState(false);
  const handleOpenViewPurchase = () => setOpenViewPurchase(true);
  const handleCloseViewPurchase = () => setOpenViewPurchase(false);

  const [openQualityCheck ,setOpenQualityCheck] = React.useState(false);
  const handleOpenQualityCheck = () => setOpenQualityCheck(true);
  const handleCloseQualityCheck = () => setOpenQualityCheck(false);

  const [openDelete ,setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);


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
                handleOpenViewPurchase();
            }}>
                <Stack direction="row" spacing={1}>
                    <EditIcon sx={{color:"blue"}}/>
                    <Typography>Edit</Typography>
                </Stack> 
            </MenuItem> 
      
           
            <MenuItem  onClick={()=> {
                handleClose();
                handleOpenDelete();
            }}>
                <Stack direction="row" spacing={1}>
                    <DeleteIcon sx={{color:"red"}}/>
                    <Typography>Delete</Typography>
                </Stack>    
            </MenuItem>

        </Menu>
        

        <Modal open={openViewPurchase}>
            <ModalCreateStorageRoom 
                row={row}
                setRefetch={setRefetch}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                handleClose={handleCloseViewPurchase}
                checkStatus={"update"}
                btnTitle={"Update"}
            />
        </Modal>
        {/*  */}
        <Modal open={openDelete}>
            <ModalDeleteStorageRoom
                setRefetch={setRefetch}
                row={row} 
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                handleClose={handleCloseDelete} />
        </Modal>
        
        

    </div>
  );
}