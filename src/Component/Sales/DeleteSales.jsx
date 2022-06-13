import * as React from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './deleteSales.scss';
import { DELETE_SALE } from "../../Schema/sales";
import { useMutation } from "@apollo/client";

function DeleteSales({
    handleCloseDel,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    DataSale,
}) {
    
  const [valueVoid,setValueVoid] = React.useState("");

  const [deleteSale] = useMutation(DELETE_SALE, {
        onCompleted: ({ deleteSale }) => {
          
            if(deleteSale?.success){
                setCheckMessage('success')
                setMessage(deleteSale?.message)
                setAlert(true)
                setRefetch()
                handleCloseDel();
            } else {
                setCheckMessage('error')
                setMessage(deleteSale?.message)
                setAlert(true)
            }
        
        },
        onError: ({ error }) => {
            setMessage(error?.message)
            setAlert(true)
        },
    })

    const handleDelete = () =>{
        deleteSale({
            variables:{
                id: DataSale?._id, 
            }
        })
    }

  return (
        <Box className="delete-sale" >
          <Stack direction="row" spacing={5}>                 
                <Typography className='title' variant="h6" >
                    Delete Sale
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleCloseDel()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant="subtitle1" >
                    Do you want to delete this sale?
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
                    to delete
                </Typography>                
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:3}}>                 
                <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
            </Stack>   
            
            <Stack direction="row" spacing={5}>       
                { valueVoid === "SALE" ?
                    <Button 
                        sx={{":hover":{ backgroundColor:"red", border:"none"}}}  
                        className="btn-void" 
                        variant="outlined" 
                        fullWidth 
                        onClick={handleDelete}
                    > 
                        delete now 
                    </Button> 
                :
                    <Button variant="outlined" fullWidth > delete </Button>
                }         
                
            </Stack> 
        </Box>
  );
}

export default DeleteSales;
