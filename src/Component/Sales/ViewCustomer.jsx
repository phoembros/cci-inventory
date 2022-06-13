import React from 'react';
import {Box, Typography, Stack, IconButton} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewcustomer.scss';



function ViewCustomer({handleCloseView, DetailsData}) {

  return (
      
    <Box className='view-customer'>
        <Stack direction="row" spacing={5}>           
            <Typography className='header-title' variant="h6" >
                Supplies Details 
            </Typography>            
            <Box sx={{flexGrow:1}}></Box>
            <IconButton onClick={handleCloseView}>
                <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
            </IconButton>    
        </Stack>   

        <Stack direction="row" spacing={5} width="100%">
            <Typography variant='body2'>
                Customer: A
            </Typography>            
        </Stack>         

        <Stack direction="row" spacing={8} width="100%" sx={{mt:2}}>
            <Stack direction="column" spacing={1} >
                <Typography className='header-title'>
                    Name :
                </Typography>
                <Typography variant='p'>
                    {DetailsData?.name}
                </Typography>     
            </Stack>        
            <Stack direction="column" spacing={1}>
                <Typography className='header-title'>
                    Email:
                </Typography>
                <Typography variant='p'>
                    {DetailsData?.email}
                </Typography>     
            </Stack>                  
        </Stack>
        <Stack direction="column" spacing={1} sx={{mt:2}}>
            <Typography className='header-title'>
                Address:
            </Typography>
            <Typography variant='p'>
                {DetailsData?.address}
            </Typography>     
        </Stack>  
        
    </Box>

  )
}

export default ViewCustomer