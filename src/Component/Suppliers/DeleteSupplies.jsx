import * as React from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './deletesupplies.scss'; 
import {useMutation} from '@apollo/client';
import {DELETE_SUPPLIES} from '../../Schema/supplies';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function DeleteSupplies({
    setRefetch,
    newData,   
    setAlert,
    setMessage,
    setCheckMessage,
    handleCloseDel,
    open,
}) {
    
  const [valueVoid, setValueVoid] = React.useState("");

    // console.log(newData?._id, 'data')

    const [deleteSupplier] = useMutation(DELETE_SUPPLIES,{
        onCompleted:({deleteSupplier})=>{
            // console.log(deleteSupplier?.message)
           if(deleteSupplier?.success){
                setAlert(true)
                setCheckMessage('success')
                setMessage(deleteSupplier?.message)
                handleCloseDel()
                setRefetch();
           } else {
                setAlert(true)
                setCheckMessage('error')
                setMessage(deleteSupplier?.message)
           }

        }, 
        onError:(error) =>{
            console.log(error.message)
            setAlert(true)
            setCheckMessage('error')
            setMessage(error.message)
        }
    })

    const handleDelete = () =>{
        deleteSupplier({
            variables:{
                id:newData?._id, 
            }
        })
    }
  return (

        <Dialog open={open} className="dialog-delete-supplies">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>                 
                        <Typography className='title' variant="h6" >
                            Delete Supplies
                        </Typography>             
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={handleCloseDel}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                    </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">   

                        <Stack direction="row" spacing={1} width="100%">
                            <Typography variant="subtitle1" >
                                Do you want to delete this supplies?
                            </Typography>               
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:2 }}>                 
                            <Typography variant="subtitle1">
                                Please type
                            </Typography>
                            <Typography className='body-void' variant="subtitle1" >
                                supplies
                            </Typography>
                            <Typography variant="subtitle1">
                                to delete
                            </Typography>                
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:3}}>                 
                            <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
                        </Stack>   
                        
                        <Stack direction="row" spacing={5}>       
                            { valueVoid === "SUPPLIES" ?
                                <Button sx={{":hover":{ backgroundColor:"red", border:"none"}}}  className="btn-void" variant="outlined" fullWidth onClick={handleDelete} > delete now </Button> 
                            :
                                <Button variant="outlined" fullWidth > delete </Button>
                            }         
                            
                        </Stack> 
                    

                </DialogContentText>
            </DialogContent>       
        </Dialog>     

  );
}

export default DeleteSupplies;
