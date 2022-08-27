import React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Stack, Typography, IconButton, Modal } from '@mui/material';
// import AlertMessage from "../../Component/AlertMessage";

//component
import ModalDeleteUnit from './ModalDeleteUnit';
import CreateUnit from './CreateUnit';


export default function UnitAction({ DataUnit, setRefetch, setAlert, setMessage, setCheckMessage , dataUserLogin }) {    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openEl = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseEl = () => {
      setAnchorEl(null);
    };
  
    //Modal Update
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Modal Delete
    const [openDel, setOpenDel] = React.useState(false);
    const handleOpenDel = () => setOpenDel(true);
    const handleCloseDel = () => setOpenDel(false);


  return (
    <div>

      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "#3C64F6" }} />
      </IconButton>

      {
          dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateUnit ||
          dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteUnit ?
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
                  dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateUnit ?

                      <MenuItem onClick={()=> { handleOpen(); handleCloseEl(); }}>
                        <Stack direction="row" spacing={2}>
                          <EditIcon sx={{ color: "blue" }} />
                          <Typography> Update </Typography>
                        </Stack>
                      </MenuItem>

                  : null
                }

                    
                {
                  dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteUnit ?  

                    <MenuItem onClick={()=> { handleOpenDel(); handleCloseEl(); }}>
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

      {/* <Modal open={open} > */}
            <CreateUnit 
                  handleClose={handleClose}
                  btnTitle="Update"
                  open={open}
                  DataUnit={DataUnit}
                  setRefetch={setRefetch}
                  setAlert={setAlert}
                  setMessage={setMessage}                
                  setCheckMessage={setCheckMessage}
              />               
      {/* </Modal> */}

     
            <ModalDeleteUnit  
                open={openDel}
                DataUnit={DataUnit}
                setRefetch={setRefetch}
                setAlert={setAlert}
                setMessage={setMessage}               
                setCheckMessage={setCheckMessage} 
                handleClose={handleCloseDel}
            />
     
    </div>
  );
}
