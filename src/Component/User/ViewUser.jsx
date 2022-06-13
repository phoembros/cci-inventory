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


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    borderRadius: 5,
    p: 4,
  };

export default function ViewUser({handleCloseView, UserData}) {
  return (
    <Box sx={style} className="view-user">

        <Stack direction='row' spacing={2} className="title">
            <Typography className='title'> User Details</Typography>
                <Box sx={{flexGrow:1}}/>
                <IconButton onClick={handleCloseView} sx={{color:'red'}}>
                    <DoDisturbOnOutlinedIcon />
                </IconButton>
        </Stack>
        <caption style={{alignItems: 'center', display:'flex' }}>Details your profile access login</caption>

    <TableContainer className="main-table">
        <Table  sx={{ minWidth: 150 }}>
            <TableHead className="head-row">
                <TableRow className="head-title">
                    <TableCell className="head-title" width='20%'>
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
                            <Typography className='text-subTitle'>{UserData?.birthOfDate}</Typography>
                        </Stack> 

                        <Typography className='sub-title'> Email: {UserData?.email}  </Typography>
                    </Stack> 
                       
                    </TableCell>

                </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
    </Box>
  );
}
