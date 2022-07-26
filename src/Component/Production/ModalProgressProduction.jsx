import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalqualitycheck.scss';
import { UPDATE_PRODUCTION } from "../../Schema/production"
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from '../../Schema/user';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalProgressProduction({
    handleClose,
    open,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

     // Get User ID  
     const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
     const userId =  userLoginData?.getuserLogin?._id;
     // End Get User ID

    // Update Status Production
    const [updateProductions] = useMutation(UPDATE_PRODUCTION , {
        onCompleted: ({updateProductions}) => {          
            if(updateProductions?.success){
                setCheckMessage("success")
                setMessage(updateProductions?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setAlert(true);
                setMessage(updateProductions?.message)                
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }
    });

    
    const handleUpdateProgress = () => {      
        updateProductions({
            variables: {
                id: editDataProduction?._id,
                productionsEdit: {
                    progress: "in progress",
                    qualityCheck: userId,
                }
            }
        })

    }

    return (

        <Dialog open={open} className="dialog-qaulity-check">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>                 
                        <Typography className='header-title' variant="h6" >
                            Start Progress Production
                        </Typography>             
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={() => handleClose()}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                    </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 

                        <Stack direction="row" spacing={5} width="100%">
                            <Typography variant='body1'>
                                Product : {editDataProduction?.production?.productId ? editDataProduction?.production?.productId?.productName : "---"}
                            </Typography>
                            <Typography variant='body1'>
                                Qty : {editDataProduction?.production?.productId ? editDataProduction?.qty : "---"}{editDataProduction?.production?.productId?.unit}
                            </Typography>                
                        </Stack>

                        <Box sx={{mt:2}}>
                            <Typography className='body-title' variant="body" >
                                Are you sure to produce this production?
                            </Typography>
                        </Box>
                                    
                        <Stack direction="row" spacing={5} sx={{mt:3}}>
                            <Box sx={{flexGrow:1}}></Box>
                            <Button variant="contained" onClick={handleClose} color="error">Cancel</Button> 
                            <Button variant="contained" onClick={handleUpdateProgress}>Ok</Button> 
                        </Stack> 
                    
            </DialogContentText>
        </DialogContent>       
    </Dialog>
    )
}