import * as React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Stack, Typography, IconButton, Modal} from '@mui/material'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useNavigate } from 'react-router-dom';

//component
import EditSale from './EditSale';
import PaymentModal from './PaymentModal';
import DeleteSales from './DeleteSales';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';


export default function SalesAction({
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    DataSale,
}) {

    const navigate = useNavigate();
    // 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openEl = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleCloseEl = () => {
      setAnchorEl(null);
    };
  
    //Modal view
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Modal delete
    const [openDel, setOpenDel] = React.useState(false);
    const handleOpenDel = () => setOpenDel(true);
    const handleCloseDel = () => setOpenDel(false);

    //Modal Payment
    const [openPayment, setOpenPayment] = React.useState(false);
    const handleOpenPayment = () => setOpenPayment(true);
    const handleClosePayment = () => setOpenPayment(false);

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon sx={{ color: "#3C64F6" }} />
      </IconButton>

      { 
        DataSale?.status !== "paid" ?

          <Menu
            id="basic-button"
            anchorEl={anchorEl}
            open={openEl}
            onClose={handleCloseEl}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
              
              <MenuItem onClick={() => navigate(`/sales/print?invoice=${DataSale?._id}`)}>
                <Stack direction="row" spacing={2}>
                  <LocalPrintshopOutlinedIcon sx={{ color: "blue" }} />
                  <Typography>Print</Typography>
                </Stack>
              </MenuItem>
              
              <MenuItem onClick={() => { handleOpenPayment(); handleCloseEl()}}>
                <Stack direction="row" spacing={2}>
                  <CurrencyExchangeIcon sx={{ color: "green" }} />
                  <Typography>Payment</Typography>
                </Stack>
              </MenuItem>

              {
                DataSale?.status === "unpaid" ? 
                  <MenuItem onClick={() => { handleOpenDel(); handleCloseEl()}}>
                    <Stack direction="row" spacing={2}>
                      <DeleteIcon sx={{ color: "red" }} />
                      <Typography>Delete</Typography>
                    </Stack>
                  </MenuItem>  
                : 
                  null
              }

          </Menu>

        :
          <Menu
              id="basic-button"
              anchorEl={anchorEl}
              open={openEl}
              onClose={handleCloseEl}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={() => navigate(`/sales/print?invoice=${DataSale?._id}`)}>
                <Stack direction="row" spacing={2}>
                  <LocalPrintshopOutlinedIcon sx={{ color: "blue" }} />
                  <Typography>Print</Typography>
                </Stack>
              </MenuItem>
          </Menu>
      }  


      {/* Edit */}
      <Modal open={open} >
            <EditSale handleClose={handleClose} /> 
      </Modal>

      {/* Payment */}
      <Modal open={openPayment}>
            <PaymentModal 
              DataSale={DataSale}
              handleClose={handleClosePayment} 
              setAlert={setAlert}
              setMessage={setMessage}
              setCheckMessage={setCheckMessage}
              setRefetch={setRefetch}

            /> 
      </Modal>

      {/* Delete */}
      <Modal open={openDel}>
            <DeleteSales  
                handleCloseDel={handleCloseDel}
                DataSale={DataSale}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={setRefetch}
            /> 
      </Modal>
    </div>
  );
}
