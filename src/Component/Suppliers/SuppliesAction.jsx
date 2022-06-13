import * as React from "react";
import {Stack, IconButton, Typography, Modal, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

//component
import UpdateSupplies from "./UpdateSupplies";
import DeleteSupplies from "./DeleteSupplies";

export default function SuppliesAction({
    setRefetch,
    newData,
    alert,
    message,
    setAlert,
    setMessage,
    setCheckMessage,
}) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openEl = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleCloseEl = () => setAnchorEl(null);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openDel, setOpenDel] = React.useState(false);
    const handleOpenDel = () => setOpenDel(true);
    const handleCloseDel = () => setOpenDel(false);
    
    
  return (
    <>
        <IconButton onClick={handleClick}>
                <MoreVertIcon sx={{color:"#3C64F6"}}/>   
        </IconButton>

        <Menu
            id="basic-button"
            anchorEl={anchorEl}
            open={openEl}
            onClose={handleCloseEl}
            MenuListProps={{
            "aria-labelledby": "basic-button",
        }}
      >
            <MenuItem onClick={()=> { handleOpen(); handleCloseEl();} }>
                <Stack direction="row" spacing={2}>
                    <EditIcon sx={{ color: "blue" }} />
                    <Typography> Edit </Typography>
                </Stack>
            </MenuItem> 

             <MenuItem onClick={()=> { handleOpenDel(); handleCloseEl();} }>
                <Stack direction="row" spacing={2}>
                    <DeleteIcon sx={{ color: "red" }} />
                    <Typography> Delete</Typography>
                </Stack>
            </MenuItem> 
        </Menu>
        
        <Modal open={open}>
            <UpdateSupplies
                  setRefetch={setRefetch}
                  handleClose={handleClose}
                  newData={newData}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  setCheckMessage={setCheckMessage}
                />
        </Modal>
        <Modal open={openDel}>
            <DeleteSupplies
                  setRefetch={setRefetch}
                  newData={newData}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  setCheckMessage={setCheckMessage}
                  handleCloseDel={handleCloseDel}/>
        </Modal>
   
    </>
  )
}