import React from 'react';
import {Box, Typography, Stack, IconButton} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewsupplies.scss';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function ViewSupplies({ handleCloseView , open , rowSupplies }) {

  return (

    <Dialog open={open} className="dialog-view-supplies">
        <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>           
                    <Typography className='header-title' variant="h6" >
                        Supplies Details 
                    </Typography>            
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={handleCloseView}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   

                <Stack direction="row" spacing={5} sx={{mt:-1}}>
                    <Typography variant='body2'>
                        Information detials
                    </Typography>            
                </Stack>   
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">     

                    <Stack direction="row" spacing={1} sx={{mt:2}}>
                        <Typography className='header-title'>
                            Name : 
                        </Typography>
                        <Typography variant='p'>
                            {rowSupplies?.name}
                        </Typography> 
                    </Stack>      

                    <Stack direction="row" spacing={16} width="100%" sx={{mt:2}}>
                        <Stack direction="column" spacing={1} >                
                            <Typography className='header-title'>
                                Phone number:
                            </Typography>
                            <Typography variant='p'>
                                {rowSupplies?.phoneNumber}
                            </Typography>    
                        </Stack> 

                        <Stack direction="column" spacing={1} className="email-suppier">
                            <Typography className='header-title'>
                                Email:
                            </Typography>
                            <Typography variant='p'>
                                {rowSupplies?.email}
                            </Typography>     
                        </Stack>   
                            
                    </Stack>

                    <Stack direction="row" spacing={16} width="100%" sx={{mt:2}}>                       
                        <Stack direction="column" spacing={1} className="email-suppier-mobile">
                            <Typography className='header-title'>
                                Email:
                            </Typography>
                            <Typography variant='p'>
                                {rowSupplies?.email}
                            </Typography>     
                        </Stack>                               
                    </Stack>

                    
                    <Stack direction="column" spacing={1} sx={{mt:2}}>
                        <Typography className='header-title'>
                            Address:
                        </Typography>
                        <Typography variant='p'>
                            {rowSupplies?.address}
                        </Typography>     
                    </Stack> 

                    
                </DialogContentText>
        </DialogContent>       
    </Dialog>     

  )
}

export default ViewSupplies