import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewrawmaterial.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt',24,"Cosmetic" ,  4.0),
    createData('Ice cream sandwich',37,"Cosmetic",   4.3),
    createData('Eclair',24,"Cosmetic" ,  6.0),
    createData('Cupcake',67,"Cosmetic" ,  4.3),    
];


export default function ViewRawMaterial({handleClose, DataRow}) {

    console.log(DataRow, 'row')
    return (
    
    <Box className='view-raw-material'>
        <Stack direction="row" spacing={5}>        
            <Typography className='header-title' variant="h6" >
                Raw Material Detail
            </Typography>
            <Box sx={{flexGrow:1}}></Box>
            <IconButton onClick={() => handleClose()}>
                <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
            </IconButton>    
        </Stack>   
          
        <Stack direction="row" spacing={5} sx={{mt:-1}}>                 
            <Typography variant='body2'>
                Information Detials Raw Material
            </Typography>     
        </Stack> 

        <Stack direction="row" spacing={1} sx={{mt:2}}>                 
            <Typography className='header-title' variant='body1'>
                Category:
            </Typography>   
            <Typography variant='body1'>
                {DataRow?.category?.categoryName}
            </Typography>  
        </Stack>         

        <Stack direction="row" spacing={5} sx={{mt:2}}>
            <Stack direction="row" spacing={1}>
                <Typography className='header-title'>
                    Name :
                </Typography>  
                <Typography variant='body1'>
                    {DataRow?.materialName}
                </Typography>                      
            </Stack>
            <Stack direction="row" spacing={1}>
                <Typography className='header-title'>
                    Unit :
                </Typography>  
                <Typography variant='body1'>
                    {DataRow?.unit}
                </Typography>                      
            </Stack>            
        </Stack>
        <Stack direction="row" spacing={1} sx={{mt:2}}>
            <Typography className='header-title'>
                UnitPrice :
            </Typography>  
            <Typography variant='body1'>
                {DataRow?.unitPrice}
            </Typography>                      
        </Stack>
        
        <Stack direction="column" spacing={1} sx={{mt:2}}>
            <Typography className='header-title'>
                Remark :
            </Typography>  
            <Typography variant='body1'>
                {DataRow?.remark}
            </Typography>                      
        </Stack>

                
        
        
    </Box>        
  );
}