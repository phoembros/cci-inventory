import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./user.scss";
//component
import TableUser from "../Component/User/TableUser";
import ModalUserAdd from "../Component/User/ModalUserAdd";
// Aleret Message
import AlertMessage from "../Component/AlertMessage/AlertMessage";

export default function User() {

  const [loading,setLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Alert message
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [checkMessage, setCheckMessage]= React.useState('')


  return (
    <div className="user-page">
        <Stack direction="row" spacing={2}>
            
            <Box className="slash" />
            <Stack direction="column" justifyContent="center">
                <Typography className="color"> User </Typography>
            </Stack>

            <Box sx={{flexGrow: 1}} />
            <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                      
                <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                    <Typography className="btn-text"> Add </Typography>
                </Button>
                <Modal open={open}>
                    <ModalUserAdd 
                        setAlert={setAlert} 
                        setMessage={setMessage}
                        setCheckMessage={setCheckMessage} 
                        handleClose={handleClose}
                        setLoading={setLoading}
                     />
                </Modal>
            </Stack>
        </Stack>

        <Box className="container">
            <TableUser  
                loading={loading}
                setAlert={setAlert}
                setMessage={setMessage}
                checkMessage={checkMessage} 
                setCheckMessage={setCheckMessage}
            />
        </Box>

        <AlertMessage alert={alert} setAlert={setAlert} message={message} setMessage={setMessage} checkMessage={checkMessage} />
    </div>
  );
}
