import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewpurchase.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterial from './ListRawMaterial';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Moment from 'moment';
import { UPDATE_PURCHASE_RAW_MATERIAL } from "../../Schema/rawmaterial"
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_LOGIN } from '../../Schema/user';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ViewRoomDetail({
    handleClose, 
    open,
    DataView,
}) {

    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;
    // End Get User ID
   
    console.log(DataView)
    
return (
    <Dialog open={open} className="dialog-view-purchase">
        <DialogTitle id="alert-dialog-title">
            <Stack direction="row" spacing={2}>        
                <Typography className='header-title' variant="h6" >
                    Product
                </Typography>          
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack>   
            
            <Stack direction="row" spacing={4} sx={{mt:-1}}>           
                <Typography variant="body2">
                    Product's Information and Stock 
                </Typography>
            </Stack>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">      
                                  
                <Stack direction="row" spacing={2} sx={{mt:2}} className="desktop-show">        
                    <Typography className='sub-header-title'>
                        Product Name:
                    </Typography>          
                    <Typography>
                        {DataView?.productName}
                    </Typography>
                    <Box sx={{width:15}}></Box>
                    <Typography className='sub-header-title'>
                        In Stock:
                    </Typography>          
                    <Typography >
                        {DataView?.qtyInThisStorage} {DataView.completedUnit}
                    </Typography>
                </Stack> 

                {/* responsive mobile */}
                <Stack direction="column" spacing={2} sx={{mt:2}} className="desktop-show-mobile"> 
                    <Stack direction="row" spacing={2}>   
                        <Typography className='sub-header-title'>
                            Product Name:
                        </Typography>          
                        <Typography>
                            {DataView?.productName}
                        </Typography>
                    </Stack>    
                    <Stack direction="row" spacing={2}>   
                        <Typography className='sub-header-title'>
                            In Stock:
                        </Typography>          
                        <Typography >
                            {DataView?.qtyInThisStorage} {DataView.completedUnit}
                        </Typography>
                    </Stack>
                </Stack>
                {/* responsive mobile */}
                
                <Stack direction='row' spacing={2} sx={{ mt: 2 }}> 
                    <Stack direction="column">
                        <Typography className="sub-header-title"> Remark: </Typography>
                    </Stack>
                    <Typography variant='body'> {DataView?.remark}</Typography>
                </Stack>

                <Stack direction="row" spacing={1} sx={{mt:1}}>  
                    <Box sx={{flexGrow:1}}></Box>
                    <Typography variant='body1' className="sub-header-title">
                        Total:
                    </Typography>  
                    <Typography variant='body1'>
                    ${(DataView?.unitPrice*DataView?.qtyInThisStorage).toFixed(2)}
                    </Typography>   
                </Stack>        
                              
            </DialogContentText>
        </DialogContent>       
    </Dialog>    
          
  );
}