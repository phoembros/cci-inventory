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
import DeleteUser from './DeleteUser';
import UpdateUser from './UpdateUser';


export default function UserAction({ DataUser, setRefech, setAlert, setMessage, checkMessage, setCheckMessage , dataUserLogin }) {    

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
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateUser ||
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteUser ?

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
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.updateUser ?
                        <MenuItem onClick={()=> { handleOpen(); handleCloseEl(); }}>
                          <Stack direction="row" spacing={2}>
                            <EditIcon sx={{ color: "blue" }} />
                            <Typography> Update </Typography>
                          </Stack>
                        </MenuItem>
                      : null
                  }
                    

                  {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.deleteUser ?
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
            <UpdateUser 
                  handleClose={handleClose}
                  open={open}
                  DataUser={DataUser}
                  setRefech={setRefech}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  checkMessage={checkMessage} 
                  setCheckMessage={setCheckMessage}
              />               
      {/* </Modal> */}

      <Modal open={openDel}>
            <DeleteUser  
                  DataUser={DataUser}
                  setRefech={setRefech}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  checkMessage={checkMessage} 
                  setCheckMessage={setCheckMessage} 
                  handleCloseDel={handleCloseDel}/>
      </Modal>
    </div>
  );
}
