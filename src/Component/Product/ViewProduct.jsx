import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewproduct.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterial from './ListRawMaterial';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ViewProduct({ handleClose , open , dataRowPruduct }) {

    return (  
        <Dialog open={open} className="dialog-view-product">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>        
                    <Typography className='header-title' variant="h6" >
                        Product Detail
                    </Typography>
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => handleClose()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   
                
                <Stack direction="row" width="100%" sx={{mt:-1}}>
                    <Typography variant='body2'>
                        Detail information's product.
                    </Typography>            
                </Stack>  
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">  
                             
                    <Stack direction="row" spacing={8} width="100%" sx={{mt:2}}>
                        <Stack direction="column" spacing={1} >
                            <Typography className='header-title'>
                                Product Name :
                            </Typography>
                            <Typography variant='body'>
                                {dataRowPruduct?.productName}
                            </Typography>     
                        </Stack>       
                                    
                        <Stack direction="column" spacing={1}>
                            <Typography className='header-title'>
                                Unit Price :
                            </Typography>
                            <Typography variant='body'>
                                $ {dataRowPruduct?.unitPrice}
                            </Typography>     
                        </Stack> 
                        <Stack direction="column" spacing={1} className="duration">
                            <Typography className='header-title'>
                                Duration :
                            </Typography>
                            <Typography variant='body'>
                                {dataRowPruduct?.durationProduce}s
                            </Typography>     
                        </Stack>
                    </Stack>

                    {/* responsive */}
                    <Stack direction="row" spacing={8} width="100%" sx={{mt:2}} className="duration-mobile">
                        <Stack direction="column" spacing={1}>
                            <Typography className='header-title'>
                                Duration :
                            </Typography>
                            <Typography variant='body'>
                                {dataRowPruduct?.durationProduce}s
                            </Typography>     
                        </Stack>
                    </Stack>
                    {/* responsive */}

                    <Stack direction="row" spacing={8} width="100%" sx={{mt:2}}>            
                        <Stack direction="column" spacing={1}>
                            <Typography className='header-title'>
                                Unit :
                            </Typography>
                            <Typography variant='body'>
                                {dataRowPruduct?.unit}
                            </Typography>     
                        </Stack> 
                        <Stack direction="column" spacing={1}>
                            <Typography className='header-title'>
                                Stock U/M :
                            </Typography>
                            <Typography variant='body'>
                                {dataRowPruduct?.completedUnit}
                            </Typography>     
                        </Stack> 
                        
                    </Stack>


                    <Box className="container">                
                        <TableContainer >
                            <Table className="table" aria-label="simple table">
                                <TableHead >
                                    <TableRow className="header-row">
                                        <TableCell className="header-title">Raw Materail</TableCell>  
                                        <TableCell className="header-title" width="3%"></TableCell>                          
                                        <TableCell className="header-title" align='center'>QTY</TableCell>  
                                        <TableCell className="header-title" width="3%"></TableCell>  
                                        <TableCell className="header-title" align='right'> </TableCell>                                                       
                                    </TableRow>
                                </TableHead>

                                {dataRowPruduct?.ingredients?.map((row , index) => (
                                    <TableBody key={index} component={Paper} className="body" >                        
                                        <TableRow  className="body-row">                                
                                            <TableCell className="body-title" component="th" scope="row" > {row?.rawMaterialId?.materialName} </TableCell>
                                            <TableCell className="header-title" width="3%"></TableCell>
                                            <TableCell className="body-title" align='center'>{row?.amount}-{row?.rawMaterialId?.unit}</TableCell>   
                                            <TableCell className="header-title" width="3%"></TableCell> 
                                            <TableCell className="body-title" ></TableCell>                                                   
                                        </TableRow>
                                    </TableBody>                        
                                ))}

                            </Table>
                        </TableContainer>

                    </Box> 

                    <Stack direction="column" spacing={1} sx={{mt:2}}>
                        <Typography className='header-title'>
                            Remark
                        </Typography>
                        <Typography className='body2'>
                            {dataRowPruduct?.remark}
                        </Typography>   
                    </Stack>     
                        
                     
            </DialogContentText>
        </DialogContent>       
    </Dialog>   
  );
}