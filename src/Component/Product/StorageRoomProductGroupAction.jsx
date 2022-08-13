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
import ModalDeleteCategory from './ModalDeleteCategory';
import CreateCategory from './CreateCategory';
import CreateProductGroup from './CreateProductGroup';
import ModalDeleteProductGroup from './ModalDeleteProductGroup';
import AdjustQauntity from './AdjustQauntity';
import TransformIcon from '@mui/icons-material/Transform';

export default function StorageRoomProductGroupAction({
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    editData,    
    dataRole,
    storageRoomId, 
    setLoadingQty,   
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);
 
  const [openAdjust ,setOpenAdjust] = React.useState(false);
  const handleOpenAdjust = () => setOpenAdjust(true);
  const handleCloseAdjust = () => setOpenAdjust(false);


  return (
    <div>

        <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>

        {
            dataRole?.adjustQtyProductGroup ?
    
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
                    dataRole?.adjustQtyProductGroup ?
                        <MenuItem onClick={()=> {
                            handleClose();
                            handleOpenAdjust();
                        }}>
                            <Stack direction="row" spacing={1}>
                                <TransformIcon sx={{color:"orange"}}/>
                                <Typography>Adjust Qty</Typography>
                            </Stack> 
                        </MenuItem>
                    : null
                }

                
                    
            </Menu>

            :
                null
        }    

           

        <AdjustQauntity 
            storageRoomId={storageRoomId}
            editData={editData}
            open={openAdjust}
            handleClose={handleCloseAdjust} 
            setAlert={setAlert}
            setMessage={setMessage}
            setCheckMessage={setCheckMessage}    
            setRefetch={setRefetch}   
            setLoadingQty={setLoadingQty}         
        />

    </div>
  );
}