import * as React from 'react'
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './paymentmodal.scss';
import { UPDATE_SALE } from '../../Schema/sales';
import { useMutation } from '@apollo/client';
import { UPDATE_PURCHASE_RAW_MATERIAL } from '../../Schema/rawmaterial';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PaymentModal({
    handleClose,
    open,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    editData,
}) {

    // console.log(editData)
    // 
    const [paidAmount,setPaidAmount] = React.useState(0);
    const [checkStatus,setCheckStatus] = React.useState(editData?.paymentStatus);

    const [pay,setPay] = React.useState(false)
    
    // Update 
    // Update
    const [updatePurchaseRawMaterial] = useMutation(UPDATE_PURCHASE_RAW_MATERIAL,{
        onCompleted: ({updatePurchaseRawMaterial}) => {
        // console.log(updatePurchaseRawMaterial?.message, "message");
        if(updatePurchaseRawMaterial?.success){
            setCheckMessage('success')
            setMessage(updatePurchaseRawMaterial?.message);
            setAlert(true);
            handleClose();
            setRefetch();
        } else {
            setCheckMessage('error')        
            setMessage(updatePurchaseRawMaterial?.message);
            setAlert(true)
        }
        },
        onError: (error) => {     
            setAlert(true)
            setCheckMessage('error')
            setMessage(error?.message)
        },
    });


    // console.log(editData)
    // console.log(editData?.totalPayment-editData?.paidAmount-paidAmount)

    React.useEffect( () => {
        if( (editData?.totalPayment-editData?.paidAmount-paidAmount) > 0 ) {
            setPay(true);
            setCheckStatus("owe");
        } 
        if( (editData?.totalPayment-editData?.paidAmount-paidAmount) === 0 ) {
            setPay(true);
            setCheckStatus("paid");
        }
        if( (editData?.totalPayment-editData?.paidAmount-paidAmount) < 0 ) {
            setPay(false);            
        }

    },[paidAmount])


    const handleUpdatePayment = () => {
        updatePurchaseRawMaterial({
            variables: {
                id: editData?._id,
                purchaseRawMaterialEdit: {
                    paidAmount: editData?.paidAmount+parseFloat(paidAmount),   
                    paymentStatus: checkStatus,                 
                }
            }
        })
    }


  return (
    <Dialog open={open} className="dialog-payment-purchase">
        <DialogTitle id="alert-dialog-title">
            <Stack direction="row" spacing={5} className="view">                 
                <Typography className='header-title' variant="h6" >
                    Make Payment
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack>
            <Stack direction="row" spacing={2}>                 
                <Typography variant="body1">
                    Please update payment.
                </Typography>             
            </Stack>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">      
                            
                <Stack direction="row" spacing={3} sx={{ mt: 2 }}>            
                    <Stack direction="column" justifyContent="center"  width="150px">
                        <Typography className="type-field"> Total Amount: </Typography>
                    </Stack>
                    <Box sx={{width:"200px"}}>
                        <TextField 
                            disabled
                            size="small"                              
                            placeholder="0" 
                            value={editData?.totalPayment}
                            fullWidth 
                            InputProps={{                  
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disableRipple={true} size="small">
                                        $
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </Box>
                </Stack>

                <Stack direction="row" spacing={3} sx={{ mt: 2 }}>            
                    <Stack direction="column" justifyContent="center"  width="150px">
                        <Typography className="type-field"> Paid Amount: </Typography>
                    </Stack>
                    <Box sx={{width:"200px"}}>
                        <TextField 
                            disabled
                            size="small"                              
                            placeholder="0" 
                            value={editData?.paidAmount}
                            fullWidth 
                            InputProps={{                  
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disableRipple={true} size="small">
                                        $
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        />
                    </Box>
                </Stack>


                <Stack direction="row" spacing={3} sx={{ mt: 2 }}> 
                            
                    <Stack direction="column" justifyContent="center" width="150px">
                        <Typography className="type-field"> To Pay Amount: </Typography>
                    </Stack>          
                    <Box sx={{width:"200px"}}>
                        <TextField 
                            autoFocus
                            type="number"
                            size="small"                              
                            placeholder="0" 
                            onChange={(e)=> setPaidAmount(e.target.value) }
                            fullWidth 
                            InputProps={{                  
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton disableRipple={true} size="small">
                                        $
                                    </IconButton>
                                </InputAdornment>
                            ),
                            inputProps: { min : 0 }
                        }}
                        />
                    </Box>
                </Stack>

                {
                    pay === true ?
                        <Button
                            sx={{ mt: 2 ,boxShadow: "none"}}
                            className="btn-create"
                            size="large"
                            type="submit"                            
                            onClick={handleUpdatePayment}
                        >
                            payment
                        </Button>
                    :
                        <Button
                            disabled
                            sx={{ mt: 2 }}
                            className="btn-create"
                            size="large"
                            type="submit"                                       
                        >
                            payment
                        </Button>
                }
                
                  
                
            </DialogContentText>
        </DialogContent>       
    </Dialog>     
    
  );
}
