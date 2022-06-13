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
import PurchaseRawMaterial from './PurchaseRawMaterial';

export default function RoomDetailAction() {

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


  return (
    <div>
        
        <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>
        {/* <Menu
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
      
           
            <MenuItem  onClick={()=> {
                handleClose();
                handleOpenDelete();
            }}>
                <Stack direction="row" spacing={1}>
                    <DeleteIcon sx={{color:"red"}}/>
                    <Typography>Void</Typography>
                </Stack>    
            </MenuItem>

        </Menu> */}
        

        <Modal open={openEdit}>
            <PurchaseRawMaterial handleClose={handleCloseEdit} btnTitle={"Update"} />
        </Modal>
        
        {/*  */}
        <Modal open={openDelete}>
            <ModalDeletePurchaseRawMaterial handleClose={handleCloseDelete} />
        </Modal>
        


    </div>
  );
}