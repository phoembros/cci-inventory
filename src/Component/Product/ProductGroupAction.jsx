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

export default function ProductGroupAction({
    dataUserLogin,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    editData,
    productUnit,
    dataRole,
}) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const [openEdit ,setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openAdjust ,setOpenAdjust] = React.useState(false);
  const handleOpenAdjust = () => setOpenAdjust(true);
  const handleCloseAdjust = () => setOpenAdjust(false);

  const [openDelete ,setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);


  return (
    <div>
        
        <IconButton onClick={handleClick}>
            <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>

    {
        dataRole?.updateProductGroup || dataRole?.adjustQtyProductGroup || dataRole?.deleteProductGroup ?
   
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
                dataRole?.updateProductGroup ?
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
                :
                    null
            }
                 

            {/* {
                dataRole?.deleteProductGroup ?
                    <MenuItem  onClick={()=> {
                        handleClose();
                        handleOpenDelete();
                    }}>
                        <Stack direction="row" spacing={1}>
                            <DeleteIcon sx={{color:"red"}}/>
                            <Typography>Delete</Typography>
                        </Stack>    
                    </MenuItem>
                : 
                    null
            } */}
                
                
        </Menu>

        :
            null
    }    

        
        {/* <Modal open={openEdit} > */}
            <CreateProductGroup 
                handleClose={handleCloseEdit} 
                open={openEdit}
                btnTitle={"Update"} 
                editData={editData}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}    
                setRefetch={setRefetch}
                checkStatus={"update"} 
                productUnit={productUnit}
            />
        {/* </Modal> */}

    
        {/* <Modal open={openDelete} > */}
            <ModalDeleteProductGroup 
                editData={editData}
                open={openDelete}
                handleClose={handleCloseDelete} 
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}    
                setRefetch={setRefetch}
            />
        {/* </Modal> */}

        <AdjustQauntity 
            editData={editData}
            open={openAdjust}
            handleClose={handleCloseAdjust} 
            setAlert={setAlert}
            setMessage={setMessage}
            setCheckMessage={setCheckMessage}    
            setRefetch={setRefetch}
        />

    </div>
  );
}