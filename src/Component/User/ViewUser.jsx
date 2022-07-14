import *as React from 'react';
import {Stack, Typography, Box, IconButton, Avatar} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewuser.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import moment from 'moment';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ViewUser({handleCloseView, open , UserData}) {
  return (
    <Dialog open={open} className="dialog-view-user">
        <DialogTitle id="alert-dialog-title">
            <Stack direction='row' spacing={2} className="title">
                <Typography className='title'> User Details</Typography>
                    <Box sx={{flexGrow:1}}/>
                    <IconButton onClick={handleCloseView} sx={{color:'red'}}>
                        <DoDisturbOnOutlinedIcon />
                    </IconButton>
            </Stack>
            <Typography variant='body2'>Details your profile access login</Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">     
                     
                <Stack direction="row" spacing={2} justifyContent="center" className="profile-image-mobile" sx={{mt:1}}>                    
                        <Avatar src="/static/images/avatar/1.jpg"sx={{ width: 100, height: 100 }}/>                                      
                </Stack>

                <TableContainer className="main-table">
                <Table  sx={{ minWidth: 150 }}>
                    <TableHead className="head-row">
                        <TableRow className="head-title">
                            <TableCell className="head-title profile-image" width='20%' >
                                <Stack direction='column' spacing={2} className="view-user">
                                    <Avatar src="/static/images/avatar/1.jpg"sx={{ width: 100, height: 100 }}/>
                                </Stack>
                                <caption style={{alignItems: 'center' }}>Persional</caption>
                            </TableCell>

                            <TableCell className="head-title" width='70%' sx={{mt:3}} >

                            <Stack direction='column' spacing={2} >
                                <Stack direction='row' spacing={2} >
                                    <Typography  className='sub-title'> Name: </Typography>
                                    <Typography  className='text-subTitle'>{UserData?.first_name+""+UserData?.last_name}</Typography>
                                </Stack>

                                <Stack direction='row' spacing={2}>
                                    <Typography className='sub-title'> Gender: </Typography>
                                    <Typography className='text-subTitle'>{UserData?.gender}</Typography>
                                </Stack> 
                                
                                <Stack direction='row' spacing={2} className="view-user">
                                    <Typography className='sub-title'>Birth: </Typography>
                                    <Typography className='text-subTitle'>{moment(UserData?.birthOfDate).format("DD-MMM-YYYY") }</Typography>
                                </Stack> 

                                <Typography className='sub-title'> Email: {UserData?.email}  </Typography>
                            </Stack> 
                            
                            </TableCell>

                        </TableRow>
                </TableHead>
                </Table>
                </TableContainer>
                                
            </DialogContentText>
        </DialogContent>       
    </Dialog>     

  );
}
