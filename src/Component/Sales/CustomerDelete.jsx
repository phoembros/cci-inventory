import * as React from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './deleteSales.scss';
import {DELETE_SETUP_CUSTOMER} from '../../Schema/sales';
import {useMutation} from '@apollo/client';

function CustomerDelete({
    setRefetch,
    handleCloseDel,
    DataCustomer,
    setAlert,
    setMessage,
    setCheckMessage,
}) {
    
       
    const [valueDel, setValueDel] = React.useState("");

    const [deleteCustomer] = useMutation(DELETE_SETUP_CUSTOMER, {
        onCompleted: ({ deleteCustomer }) => {
            console.log(deleteCustomer.message, "mgs");
      
            if(deleteCustomer?.success){
                setCheckMessage('success')
                setMessage(deleteCustomer?.message)
                setAlert(true)
                setRefetch()
                handleCloseDel();
            } else {
                setCheckMessage('error')
                setMessage(deleteCustomer?.message)
                setAlert(true)
            }
           
          },
          onError: ({ error }) => {
            setMessage(error?.message)
              setAlert(true)
          },
    })

    const handleDelete = () =>{
            deleteCustomer({
                variables:{
                    id:DataCustomer?._id, 
                }
            })
    }
  return (
        <Box className="delete-sale">
          <Stack direction="row" spacing={5}>                 
                <Typography className='title' variant="h6" >
                    Delete Customer
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleCloseDel()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant="subtitle1" >
                    Do you want to delete this customer?
                </Typography>               
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:2 }}>                 
                <Typography variant="subtitle1">
                    Please type
                </Typography>
                <Typography className='body-void' variant="subtitle1" >
                    {DataCustomer?.name}
                </Typography>
                <Typography variant="subtitle1">
                    to delete
                </Typography>                
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:3}}>                 
                <TextField size="small" fullWidth onChange={(e)=>setValueDel(e.target.value)}/>                
            </Stack>   
            
            <Stack direction="row" spacing={5}>       
                { valueDel ===  DataCustomer?.name ?
                    <Button
                        onClick={handleDelete}
                        className="btn-void" 
                        sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                        variant="outlined" 
                        fullWidth 
                    >
                        Delete now
                    </Button> 
                :
                    <Button variant="outlined" fullWidth> Delete</Button>
                }        
            </Stack> 
        </Box>
  );
}

export default CustomerDelete;
