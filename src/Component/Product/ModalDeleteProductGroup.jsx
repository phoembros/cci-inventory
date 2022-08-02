import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleteproduct.scss';
import { DELETE_PRODUCT_GROUP } from "../../Schema/product";
import { useMutation } from "@apollo/client";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalDeleteProductGroup({
    editData,
    handleClose,
    open,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    const [valueVoid,setValueVoid] = React.useState("");

    const [deleteProductGroup] = useMutation(DELETE_PRODUCT_GROUP , {
        onCompleted: ({deleteProductGroup}) => {          
            if(deleteProductGroup?.success){
                setCheckMessage("success")
                setMessage(deleteProductGroup?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } 
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    const handleDelete = () => {
        deleteProductGroup({
            variables: {
                id: editData?._id,
            }
        })
    }

    return (

        <Dialog open={open} className="dialog-delete-category-product">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>                 
                        <Typography className='header-title' variant="h6" >
                            Delete Product Group
                        </Typography>             
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={() => handleClose()}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                    </Stack> 
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 
                    
                        <Stack direction="row" spacing={5} width="100%">
                            <Typography variant="subtitle1" >
                                Do you want to delete?
                            </Typography>               
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                            <Typography variant="subtitle1">
                                Please type
                            </Typography>
                            <Typography className='body-void' variant="subtitle1" >
                                product group
                            </Typography>
                            <Typography variant="subtitle1">
                                to delete 
                            </Typography>                 
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                            <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
                        </Stack>   
                        
                        <Stack direction="row" spacing={5}>       
                            { valueVoid === "PRODUCT GROUP" ?
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
                                <Button variant="outlined" fullWidth >delete</Button>
                            }         
                            
                        </Stack> 
                    
            </DialogContentText>
        </DialogContent>       
    </Dialog> 

    )
}