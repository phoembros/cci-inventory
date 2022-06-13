import React from 'react';
import {Box, Typography, Stack, IconButton} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewsupplies.scss';


function ViewSupplies({ handleCloseView , rowSupplies }) {

  return (
    <Box className='view-supplies'>
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

            <Stack direction="column" spacing={1}>
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

        
    </Box>

  )
}

export default ViewSupplies