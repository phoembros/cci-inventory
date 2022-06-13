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
import ModalDeleteCategoryMaterial from "./ModalDeleteCategoryMaterial";
import CreateCategoryMaterial from './CreateCategoryMaterial';

export default function CategoryMaterialAction({
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    editData,
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const [openEdit ,setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

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
                handleOpenEdit();
            }}>
                <Stack direction="row" spacing={1}>
                    <EditIcon sx={{color:"orange"}}/>
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
        

        <Modal open={openEdit}>
            <CreateCategoryMaterial 
                checkStatus={"update"}
                handleClose={handleCloseEdit} 
                btnTitle={"Update"}
                editData={editData}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        </Modal>
        
        {/*  */}
        <Modal open={openDelete}>
            <ModalDeleteCategoryMaterial 
                handleClose={handleCloseDelete} 
                editData={editData}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            />
        </Modal>
        


    </div>
  );
}