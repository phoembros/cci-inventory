import * as React from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './deleteSales.scss';
import { DELETE_SALE } from "../../Schema/sales";
import { useMutation } from "@apollo/client";
import { VOID_INVOICE } from "../../Schema/sales";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function DeleteSales({
    handleCloseDel,
    setAlert,
    open,
    setMessage,
    setCheckMessage,
    setRefetch,
    DataSale,
}) {
    
  const [valueVoid,setValueVoid] = React.useState("");


  const [voidInvoice] = useMutation(VOID_INVOICE, {

        onCompleted: ({ voidInvoice }) => {          
            if(voidInvoice?.success){
                setCheckMessage('success')
                setMessage(voidInvoice?.message)
                setAlert(true)
                setRefetch()
                handleCloseDel();
            } else {
                setCheckMessage('error')
                setMessage(voidInvoice?.message)
                setAlert(true)
            }        
        },

        onError: ({error}) => {
            setMessage(error?.message);
            setCheckMessage('error');
            setAlert(true);
        },
    })

    const handleDelete = () => {
        // console.log(DataSale?._id)
        voidInvoice({
            variables:{
                id: DataSale?._id, 
            }
        })
    }

  return (


    <Dialog open={open} className="dialog-delete-sale">
        <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>                 
                    <Typography className='title' variant="h6" >
                        Void Sale
                    </Typography>             
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => handleCloseDel()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack> 
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description"> 
 
                <Stack direction="row" spacing={1} width="100%">
                    <Typography variant="subtitle1" >
                        Do you want to void this sale?
                    </Typography>               
                </Stack>

                <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:2 }}>                 
                    <Typography variant="subtitle1">
                        Please type
                    </Typography>
                    <Typography className='body-void' variant="subtitle1" >
                        sale
                    </Typography>
                    <Typography variant="subtitle1">
                        to void
                    </Typography>                
                </Stack>

                <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:3}}>                 
                    <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
                </Stack>   
                
                <Stack direction="row" spacing={5}>       
                    { valueVoid === "sale" ?
                        <Button 
                            sx={{":hover":{ backgroundColor:"red", border:"none"}}}  
                            className="btn-void" 
                            variant="outlined" 
                            fullWidth 
                            onClick={() =>  handleDelete() }
                        > 
                            void now 
                        </Button> 
                    :
                        <Button variant="outlined" fullWidth > void </Button>
                    }         
                    
                </Stack> 
               
            </DialogContentText>
        </DialogContent>       
    </Dialog> 
  );
}

export default DeleteSales;
