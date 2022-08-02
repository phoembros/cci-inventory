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
import { UPDATE_PURCHASE_RAW_MATERIAL , APPROVE_PURCHASE } from "../../Schema/rawmaterial"
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_LOGIN } from '../../Schema/user';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function ViewProduct({
    dataUserLogin,
    handleClose, 
    open,
    PurchaseData,
    setCheckMessage,
    setMessage,
    setAlert,
    setRefetch,
}) {

    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;
     

    // Update
    const [approvePurchaseRawMaterial] = useMutation(APPROVE_PURCHASE,{
        onCompleted: ({approvePurchaseRawMaterial}) => {
            // console.log(approvePurchaseRawMaterial?.message, "message");
            if(approvePurchaseRawMaterial?.success){
                setCheckMessage('success')
                setMessage(approvePurchaseRawMaterial?.message);
                setAlert(true);
                handleClose();
                setRefetch();
            }
        },
        onError: (error) => {     
            setAlert(true)
            setCheckMessage('error')
            setMessage(error?.message)
        },
    });

    
    const handleUpdateStatus = (e) => {
        approvePurchaseRawMaterial({
            variables: {
                id: PurchaseData?._id,
                approveInput: {
                    status: e.status,
                    approveBy: userId,
                }
            }
        })
    }

    // console.log(PurchaseData)

return (

    <>
        <Dialog open={open} className="dialog-view-purchase">
                <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>        
                        <Typography className='header-title' variant="h6" >
                            {
                                PurchaseData?.purchaseId ? 
                                <>
                                    Purchase ID: {Moment(PurchaseData?.createdAt).format('YYMM')}-{PurchaseData?.purchaseId?.padStart(2, '0')}
                                </>
                            :
                                null
                            }
                        </Typography>
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={() => handleClose()}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                    </Stack>
                    <Stack direction="row" spacing={4} sx={{mt:1}}>           
                        <Typography variant="body2">
                            Purchase By: {PurchaseData?.purchaseBy?.first_name+' '+PurchaseData?.purchaseBy?.last_name}
                        </Typography>
                    </Stack>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">                          
                        <Stack direction="row" spacing={1} sx={{mt:2, mb:1}}>
                            <Stack direction="column" justifyContent="center">
                                <Typography className="sub-header-title">
                                    Priority:
                                </Typography>
                            </Stack> 
                            <Box sx={{width:'100px'}}>

                                { PurchaseData?.priority === "urgent" ? 
                                    <Stack direction="row" spacing={1}>
                                        <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                                        <Typography variant='body'>Urgent</Typography>
                                    </Stack>                                       
                                : null }
                                { PurchaseData?.priority === "medium" ? 
                                    <Stack direction="row" spacing={1}>
                                        <FiberManualRecordIcon sx={{color:"green", width:"17px"}} />
                                        <Typography variant='body'>Medium</Typography>
                                    </Stack>                                        
                                : null }
                                { PurchaseData?.priority === "low" ? 
                                    <Stack direction="row" spacing={1}>
                                    <ArrowDownwardIcon sx={{color:"blue", width:"17px"}} />
                                    <Typography variant='body'>Low</Typography>
                                </Stack>                                       
                                : null }


                            </Box>          
                            <Box sx={{ flexGrow: 1 }}></Box>
                            <Stack direction="column" justifyContent="center">
                                <Typography className="sub-header-title">
                                    Date: 
                                </Typography>
                            </Stack>
                            <Box sx={{width:'100px'}}>
                                <Typography variant='body'> {Moment(PurchaseData?.date).format('DD/MM/YYYY')}</Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={1} sx={{mt:2, mb:1}}>                            
                            <Stack direction="column" justifyContent="center">
                                <Typography className="sub-header-title">
                                    Supplier: 
                                </Typography>
                            </Stack>
                            <Box>
                                <Typography variant='body'>{PurchaseData?.supplierID?.name}</Typography>
                            </Box>
                        </Stack>

                        <Box className="container">
                            <TableContainer >
                                <Table className="table" aria-label="simple table">
                                <TableHead>
                                    <TableRow className="header-row">
                                        <TableCell className="header-title">
                                            Raw Materail
                                        </TableCell>
                                        
                                        <TableCell className="header-title" align="center">
                                            Quantity
                                        </TableCell>
                                        
                                        <TableCell className="header-title" align="center">
                                            Unit Price
                                        </TableCell>
                                        
                                        {/* <TableCell className="header-title" align="center">
                                            Supplier
                                        </TableCell>                                     */}
                                    </TableRow>
                                </TableHead> 
                                    {PurchaseData?.productsItems?.map((row , index) => (
                                        <TableBody key={index} component={Paper} className="body" >                        
                                            <TableRow  className="body-row">                                
                                                <TableCell className="body-title" component="th" scope="row" width="250px">{row?.rawMaterialId?.materialName}</TableCell>
                                                <TableCell className="body-title"  align="center" width="20%">{row?.newQty}</TableCell>  
                                                <TableCell className="body-title"  align="center" width="20%" >${row?.unitPrice} </TableCell>
                                                {/* <TableCell className="body-title"  align="center" width="20%">{row?.suppliersName}</TableCell>  */}
                                                <TableCell className="body-title" ></TableCell>
                                                <TableCell className="body-title" ></TableCell>                                                  
                                            </TableRow>
                                        </TableBody>                        
                                    ))}                        

                                </Table>
                            </TableContainer>
                        </Box> 


                        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                            <Box sx={{flexGrow:1}}></Box>
                            <Typography className="sub-header-title">Total Amount:</Typography>              
                            <Typography>${PurchaseData?.totalPayment?.toFixed(2)}</Typography>                
                        </Stack>

                        <Stack direction='row' spacing={2} sx={{ mt: 2 }}> 
                            <Stack direction="column">
                                <Typography className="sub-header-title"> Remark: </Typography>
                            </Stack>
                            <Typography variant='body'> {PurchaseData?.remark}</Typography>
                        </Stack>
       

                        {
                            PurchaseData?.status === "approved" ? 
                                <Stack direction="row" spacing={1} sx={{mt:2}}>  
                                    <Box sx={{flexGrow:1}}></Box>
                                    <Typography variant='body1' className="header-title">
                                        Approved By:
                                    </Typography>  
                                    <Typography variant='body1'>
                                        {PurchaseData?.approveBy?.first_name+' '+PurchaseData?.approveBy?.last_name}
                                    </Typography>  
                                </Stack>
                            :
                                null
                        }

                        {
                            PurchaseData?.status === "reject" ? 
                                <Stack direction="row" spacing={1} sx={{mt:2}}>  
                                    <Box sx={{flexGrow:1}}></Box>
                                    <Typography variant='body1' className="header-title">
                                        Reject By:
                                    </Typography>  
                                    <Typography variant='body1'>
                                        {PurchaseData?.approveBy?.first_name+' '+PurchaseData?.approveBy?.last_name}
                                    </Typography>  
                                </Stack>
                            :
                                null
                        }


                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.approvePurchaseRawMaterial ?
                                <>
                                {
                                    PurchaseData?.status === "pending" ? 
                                        <Stack direction="row" spacing={1} sx={{mt:2}}>  
                                            <Box sx={{flexGrow:1}}></Box>
                                            <Button 
                                                variant="contained" 
                                                color='error'
                                                onClick={() => handleUpdateStatus({status: "reject"}) }
                                            >
                                                reject
                                            </Button>       
                                            <Button 
                                                variant="contained"
                                                onClick={() => handleUpdateStatus({status: "approved"}) }
                                            >Approve</Button>
                                        </Stack>
                                    :
                                        null
                                } 
                                </>
                            :
                                null
                        }

                                     

                        {
                            PurchaseData?.status === "completed" ? 
                            <Stack direction="row" spacing={1} sx={{mt:2}}>  
                                    <Box sx={{flexGrow:1}}></Box>
                                    <Typography variant='body1' className="header-title">
                                        Completed By:
                                    </Typography>  
                                    <Typography variant='body1'>
                                        {PurchaseData?.completedBy?.first_name+' '+PurchaseData?.completedBy?.last_name}
                                    </Typography>  
                                </Stack>
                        :
                            null
                        }
                
        
        

                        
                    </DialogContentText>
                </DialogContent>      
                <DialogActions>
                
                </DialogActions> 
            </Dialog>
    
    </>  
           
  );
}