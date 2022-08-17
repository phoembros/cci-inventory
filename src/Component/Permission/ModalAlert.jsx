import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, Table, TableContainer, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalalert.scss';
import { UPDATE_PRODUCTION , COMPLETE_PRODUCTION } from "../../Schema/production"
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from '../../Schema/user';
import { GET_PRODUCTION_UNIT, GET_PRODUCT_UNIT } from "../../Schema/product";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ListProductGroup from "../Production/ListProductGroup";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalAlert({
    resetForm,
    modalTitle,
    handleClose,
    handleCloseModalCreate,
    open
}) {    

    return (
        <Dialog open={open} className="dialog-alert">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>                 
                    <Typography className='header-title' variant="h6" >
                        {modalTitle}
                    </Typography>             
                    <Box sx={{flexGrow:1}}></Box>
                    {/* <IconButton onClick={() => handleClose()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>     */}
                </Stack> 
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 
                    
                    <Stack direction="row" spacing={2} width="100%">    
                        <Stack direction="column" justifyContent="center" width="260px">           
                            <Typography variant='body1' >
                                Do you want to close this form? 
                            </Typography>  
                        </Stack> 
                    </Stack>

                    <Stack direction="row" spacing={5} sx={{mt:3}}>  
                        <Box sx={{flexGrow:1}}></Box>                      
                            <Button variant="contained" color="error" onClick={handleClose}>No</Button> 
                            <Button variant="contained" onClick={() => { handleClose();resetForm();handleCloseModalCreate();}}>Ok</Button> 
                        <Box sx={{flexGrow:1}}></Box>                     
                    </Stack>

                </DialogContentText>
            </DialogContent>       
        </Dialog>
    )
}