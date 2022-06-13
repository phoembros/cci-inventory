import * as React from 'react'
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewsale.scss';


export default function EditSale({handleClose}) {
    
  return (
     
    <Box className='sales-page'>
        <Stack direction="row" spacing={5} className="view">                 
            <Typography className='title' variant="h6" >
                Edit Details
            </Typography>             
            <Box sx={{flexGrow:1}}></Box>
            <IconButton onClick={() => handleClose()}>
                <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
            </IconButton>    
        </Stack>

        <Stack direction="row" spacing={2}>                 
            <Typography variant="body1" >
                Something write ...
            </Typography>             
        </Stack>
    </Box>   
  );
}
