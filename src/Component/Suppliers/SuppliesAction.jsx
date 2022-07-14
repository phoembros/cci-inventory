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
    dataUserLogin,
    setRefetch,
    newData,    
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

    {
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateSupplier ||
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteSupplier ?
            <>
                <Menu
                    id="basic-button"
                    anchorEl={anchorEl}
                    open={openEl}
                    onClose={handleCloseEl}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >

                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateSupplier ?
                        <MenuItem onClick={()=> { handleOpen(); handleCloseEl();} }>
                            <Stack direction="row" spacing={2}>
                                <EditIcon sx={{ color: "blue" }} />
                                <Typography> Edit </Typography>
                            </Stack>
                        </MenuItem>
                    : null
                }

                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteSupplier ?
                        <MenuItem onClick={()=> { handleOpenDel(); handleCloseEl();} }>
                            <Stack direction="row" spacing={2}>
                                <DeleteIcon sx={{ color: "red" }} />
                                <Typography> Delete</Typography>
                            </Stack>
                        </MenuItem> 
                    : null
                }
                    
                    
                </Menu>
            </>
        :
            null
    }
        
        
        {/* <Modal open={open}> */}
            <UpdateSupplies
                  setRefetch={setRefetch}
                  handleClose={handleClose}
                  open={open}
                  newData={newData}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  setCheckMessage={setCheckMessage}
            />
        {/* </Modal> */}
        {/* <Modal open={openDel}> */}
            <DeleteSupplies
                  setRefetch={setRefetch}
                  newData={newData}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  open={openDel}
                  setCheckMessage={setCheckMessage}
                  handleCloseDel={handleCloseDel}/>
        {/* </Modal> */}
   
    </>
  )
}