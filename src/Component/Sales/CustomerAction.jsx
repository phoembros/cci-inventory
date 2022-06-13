import *as React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Stack, Typography, IconButton, Modal, Box} from '@mui/material'

import EditCustomer from './EditCustomer';
import CustomerDelete from './CustomerDelete';

export default function CustomerAction({
  setRefetch,
  setAlert,
  setMessage,
  DataCustomer,
  setCheckMessage,
}) {
  // console.log(DataCustomer?._id, 'sup')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openEl = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseEl = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const [openDel, setOpenDel] = React.useState(false);
  const handleCloseDel = () => setOpenDel(false);
  const handleOpenDel = () => setOpenDel(true);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "#3C64F6" }} />
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
        <MenuItem onClick={handleOpen}>
          <Stack direction="row" spacing={2}>
            <EditIcon sx={{ color: "blue" }} />
            <Typography> Edit </Typography>
          </Stack>
        </MenuItem>

        <MenuItem onClick={handleOpenDel}>
          <Stack direction="row" spacing={2}>
            <DeleteIcon sx={{ color: "red" }} />
            <Typography> Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      <Modal open={open}>
        <EditCustomer
          setRefetch={setRefetch}
          handleClose={handleClose}
          DataCustomer={DataCustomer}
          setAlert={setAlert}
          setMessage={setMessage}
          setCheckMessage={setCheckMessage}
        />
      </Modal>

      <Modal open={openDel}>
        <CustomerDelete
          setRefetch={setRefetch}
          handleCloseDel={handleCloseDel}
          DataCustomer={DataCustomer}
          setAlert={setAlert}
          setMessage={setMessage}
          setCheckMessage={setCheckMessage}
        />
      </Modal>
    </div>
  );
}
