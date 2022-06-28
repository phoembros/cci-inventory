import * as React from 'react'
import { Box, Button, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './viewsale.scss';
import { UPDATE_SALE } from '../../Schema/sales';
import { useMutation } from '@apollo/client';

export default function PaymentModal({
    handleClose,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    DataSale,
}) {

    // 
    const [paidAmount,setPaidAmount] = React.useState(0);
    const [checkStatus,setCheckStatus] = React.useState(DataSale?.status);

    const [pay,setPay] = React.useState(false)
    
    // Update 
    const [updateSale] = useMutation(UPDATE_SALE , {
        onCompleted: ({updateSale}) => {
            // console.log(updateSale)
            if(updateSale?.success){
                setCheckMessage("success")
                setMessage(updateSale?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } 
        },
        onError: (error) => {            
            setCheckMessage("error")
            setMessage(error.message);
            
        }
    });

    // console.log(DataSale)
    // console.log(DataSale?.totalAmount-DataSale?.paidAmount-paidAmount)

    React.useEffect( () => {
        if( (DataSale?.totalAmount-DataSale?.paidAmount-paidAmount) > 0 ) {
            setPay(true);
            setCheckStatus("owe");
        } 
        if( (DataSale?.totalAmount-DataSale?.paidAmount-paidAmount) === 0 ) {
            setPay(true);
            setCheckStatus("paid");
        }
        if( (DataSale?.totalAmount-DataSale?.paidAmount-paidAmount) < 0 ) {
            setPay(false);            
        }

    },[paidAmount])


    const handleUpdatePayment = () => {
        updateSale({
            variables: {
                id: DataSale?._id,
                saleEdit: {
                    paidAmount: DataSale?.paidAmount+parseFloat(paidAmount),   
                    status: checkStatus,                 
                }
            }
        })
    }


  return (
     
    <Box className='sales-page'>
        <Stack direction="row" spacing={5} className="view">                 
            <Typography className='title' variant="h6" >
                Make Payment
            </Typography>             
            <Box sx={{flexGrow:1}}></Box>
            <IconButton onClick={() => handleClose()}>
                <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
            </IconButton>    
        </Stack>
        <Stack direction="row" spacing={2} sx={{mt:-1}}>                 
            <Typography variant="body1">
                Please update payment.
            </Typography>             
        </Stack>

        <Stack direction="row" spacing={3} sx={{ mt: 2 }}>            
            <Stack direction="column" justifyContent="center"  width="150px">
                <Typography className="type-field"> Total Amount : </Typography>
            </Stack>
            <Box sx={{width:"200px"}}>
                <TextField 
                    disabled
                    size="small"                              
                    placeholder="0" 
                    value={DataSale?.totalAmount}
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
                <Typography className="type-field"> Paid Amount : </Typography>
            </Stack>
            <Box sx={{width:"200px"}}>
                <TextField 
                    disabled
                    size="small"                              
                    placeholder="0" 
                    value={DataSale?.paidAmount}
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
                <Typography className="type-field"> To Pay Amount : </Typography>
            </Stack>          
            <Box sx={{width:"200px"}}>
                <TextField 
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
                    variant="contained"
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
                    variant="contained"               
                >
                    payment
                </Button>
        }
        
       
    </Box>   
  );
}
