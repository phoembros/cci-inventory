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
import ModalDeleteRawMaterial from "./ModalDeleteRawMaterial";
import CreateRawMaterial from './CreateRawMaterial';

export default function RawMaterialAction({setRefetch , setAlert, setMessage, setCheckMessage, DataRow}) {


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

//   const [openViewProduction, setOpenViewProduction] = React.useState(false);
//   const handleOpenViewProduction = () => setOpenViewProduction(true);
//   const handleCloseViewProduction = () => setOpenViewProduction(false);

  const [openEdit ,setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  const [openDelete ,setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);


  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "#3C64F6" }} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenEdit();
          }}
        >
          <Stack direction="row" spacing={1}>
            <EditIcon sx={{ color: "orange" }} />
            <Typography> Edit </Typography>
          </Stack>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            handleOpenDelete();
          }}
        >
          <Stack direction="row" spacing={1}>
            <DeleteIcon sx={{ color: "red" }} />
            <Typography>Delete</Typography>
          </Stack>
        </MenuItem>
      </Menu>

      <Modal open={openEdit}>
        <CreateRawMaterial
          DataRow={DataRow}
          setAlert={setAlert}
          setMessage={setMessage}
          setCheckMessage={setCheckMessage}
          handleClose={handleCloseEdit}
          checkStatus={"update"}
          btnTitle={"Update"}
          setRefetch={setRefetch}
        />
      </Modal>

      {/*  */}
      <Modal open={openDelete}>
        <ModalDeleteRawMaterial
          DataRow={DataRow}
          setAlert={setAlert}
          setMessage={setMessage}
          setCheckMessage={setCheckMessage}
          handleClose={handleCloseDelete}
          setRefetch={setRefetch}
        />
      </Modal>
    </div>
  );
}