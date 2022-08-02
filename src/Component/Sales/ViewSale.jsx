import * as React from 'react'
import { Typography, Stack, Box, Grid, Paper, Button, TextField, Autocomplete, InputAdornment, IconButton, Table, TableBody,TableHead, TableCell, TableRow ,TableContainer,} from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewsale.scss';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Moment from 'moment';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ViewSale({handleCloseView, open , RowData}) {
  //format date
  const formatDate = Moment(RowData?.date).format('DD-MM-YYYY')
  // console.log(RowData, 'view')

  return (

    <Dialog open={open} className="dialog-view-sale">
        <DialogTitle id="alert-dialog-title">
              <Stack direction="row" spacing={5}>        
                  <Typography className='header-title' variant="h6" >
                      Sales Details: {RowData?.invoiceNo}
                  </Typography>
                  <Box sx={{flexGrow:1}}></Box>
                  <IconButton onClick={() => handleCloseView()}>
                      <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                  </IconButton>    
              </Stack>  
              <Stack direction="row">
                <Typography variant="body2"> Sale details: </Typography>
              </Stack> 
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">    
                
                <Box sx={{ width: "100%" }}>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Stack direction="column" justifyContent="center"  sx={{width:"60px"}}>
                            <Typography className="type-field">Bill To:</Typography>
                        </Stack>
                        <Typography variant='body' >{RowData?.billTo?.customerId?.name}</Typography>                          
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="column" justifyContent="center" className="date-view-sale" sx={{width:"60px"}}>
                            <Typography className="type-field"> Date: </Typography>
                        </Stack>
                        <Typography variant='body' className="date-view-sale">{formatDate}</Typography> 
                    </Stack>
                </Box>

                <Box sx={{ width: "100%" }} className="date-view-sale-mobile">
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>                       
                        <Stack direction="column" justifyContent="center" sx={{width:"60px"}}>
                            <Typography className="type-field"> Date: </Typography>
                        </Stack>
                        <Typography variant='body'> {formatDate}</Typography> 
                    </Stack>
                </Box>


                <Box sx={{ width: "100%" }}>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>                                
                        <Stack direction="column" justifyContent="center" sx={{width:"60px"}}>
                            <Typography className="type-field"> Tin: </Typography>
                        </Stack>
                        <Typography variant='body'> {RowData?.tin}</Typography> 
                    </Stack>
                </Box>

                <TableContainer className='table-containeres'  sx={{mt:2}}>
                    <Table className="table">
                      <TableHead >
                        <TableRow className="header-row">
                            <TableCell className="header-title" width="30%">
                              Product Name
                            </TableCell>
                            <TableCell className="header-title" align="center" width="20%">
                              Quantity
                            </TableCell>
                            <TableCell className="header-title" align="center" width="20%">
                              Unit Price
                            </TableCell>
                            <TableCell className="header-title" align="center" width="20%">
                              Amount
                            </TableCell>
                            <TableCell className="header-title" width="3%"></TableCell>
                            
                        </TableRow>    
                      </TableHead>
                    {RowData?.items?.map((row, index)=>(         
                      <TableBody key={index} component={Paper} className="body" >                        
                        <TableRow  className="body-row">                                
                            <TableCell className="body-title" component="th" scope="row">{row?.productId?.name}</TableCell>
                            <TableCell className="body-title"  align="center" width="20%">{row?.qty}</TableCell>  
                            <TableCell className="body-title"  align="center" width="20%" >${row?.productId?.unitPrice}</TableCell>
                            <TableCell className="body-title"  align="center" width="20%">${row?.amount?.toFixed(2)}</TableCell> 
                            <TableCell className="body-title" ></TableCell>
                            <TableCell className="body-title" ></TableCell>                                                      
                        </TableRow>
                    </TableBody>  
                    ))}
                    </Table>                           
                  </TableContainer> 


                  <Stack direction='row' spacing={2} width="100%">
                      <Box sx={{ width: "40%" }}>
                        <Stack direction="row" spacing={2}  sx={{ mt: 2 }} >
                          <Stack direction="column">
                            <Typography className="type-field"> Additional:</Typography>
                            <Typography variant='body'> {RowData?.remark} </Typography> 
                          </Stack>                
                        </Stack>
                      </Box>

                      
                      <Box sx={{ width: "60%" }}>
                          <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                                <Box sx={{flexGrow:1}}></Box>
                                <Stack direction="column" justifyContent="center">
                                    <Typography className="type-field"> VAT : </Typography>
                                </Stack>
                                <Typography variant='body'> {RowData?.vat}% </Typography>
                          </Stack>

                          <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                                <Box sx={{flexGrow:1}}></Box>
                                <Stack direction="column" justifyContent="center">
                                    <Typography className="type-field"> Paid Amount : </Typography>
                                </Stack>

                                <Typography variant='body'> {RowData?.paidAmount?.toFixed(2)} $ </Typography>
                              
                          </Stack>


                          <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                                <Box sx={{flexGrow:1}}></Box>
                                <Stack direction="column" justifyContent="center">
                                    <Typography className="type-field"> Total Amount : </Typography>
                                </Stack>
                                <Typography variant='body'> {RowData?.totalAmount?.toFixed(2)} $ </Typography>
                              
                          </Stack>

                      </Box>
                  </Stack>
                     
            </DialogContentText>
        </DialogContent>       
    </Dialog>  
    
  );
}
