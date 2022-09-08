import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewrawmaterial.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GET_ADJUST_RAW_MATERIAL } from '../../Schema/rawmaterial';
import { useQuery } from '@apollo/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment"


export default function ViewRawMaterialDetials({handleClose, open , DataRow}) {

    // console.log(DataRow, 'row')

    return (
   
        <Dialog open={open} className="dialog-view-raw-material">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>        
                    <Typography className='header-title' variant="h6" >
                        Raw Material Detail
                    </Typography>
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => { handleClose();}}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   
                    
                <Stack direction="row" spacing={5} sx={{mt:-1}}>                 
                    <Typography variant='body2'>
                        Information Detials Raw Material
                    </Typography>     
                </Stack>   
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">   

                    <Stack direction="row" spacing={1} sx={{mt:2}}>
                        <Stack direction="row" spacing={1} width="50%">                 
                            <Typography className='header-title' variant='body1'>
                                Category:
                            </Typography>   
                            <Typography variant='body1'>
                                {DataRow?.category?.categoryName}
                            </Typography>  
                        </Stack> 
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="row" spacing={1} width="50%">
                            <Typography className='header-title'>
                                Name:
                            </Typography>  
                            <Typography variant='body1'>
                                {DataRow?.materialName}
                            </Typography>                      
                        </Stack>
                    </Stack> 

                    <Stack direction="row" spacing={1} sx={{mt:2}}>                        
                        <Stack direction="row" spacing={1}  width="50%">
                            <Typography className='header-title'>
                                Unit:
                            </Typography>  
                            <Typography variant='body1'>
                                {DataRow?.unit?.unitName}
                            </Typography>                      
                        </Stack>      
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="row" spacing={1}  width="50%">
                            <Typography className='header-title'>
                                UnitPrice:
                            </Typography>  
                            <Typography variant='body1'>
                                ${DataRow?.unitPrice}
                            </Typography>                      
                        </Stack>

                    </Stack>
                        
                        
                    <Stack direction="column" spacing={1} sx={{mt:2 , width: "100%"}} >
                        <Typography className='header-title'>
                            Remark:
                        </Typography>  
                        <Typography variant='body1'>
                            {DataRow?.remark}
                        </Typography>                      
                    </Stack> 
                              
            </DialogContentText>
        </DialogContent>       
    </Dialog>    
  );
}