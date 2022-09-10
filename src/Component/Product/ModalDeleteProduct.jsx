import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleteproduct.scss';
import { DELETE_PRODUCT } from "../../Schema/product";
import { useMutation } from "@apollo/client";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalDeleteProduct({
    handleClose,
    open,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    const [loading,setLoading] = React.useState(false);

    const [valueVoid,setValueVoid] = React.useState("");

    const [deleteProduct] = useMutation(DELETE_PRODUCT , {
        onCompleted: ({deleteProduct}) => {          
            if(deleteProduct?.success){
                setCheckMessage("success")
                setMessage(deleteProduct?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false);
            } else {
                setAlert(true);
                setCheckMessage("error")
                setMessage(deleteProduct?.message)
                setLoading(false);             
            }
        },
        onError: (error) => { 
            setLoading(false)           
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    const handleDelete = () => {
        setLoading(true)
        deleteProduct({
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
                        Delete Product
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
                                Do you want to delete this product?
                            </Typography>               
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                            <Typography variant="subtitle1">
                                Please type
                            </Typography>
                            <Typography className='body-void' variant="subtitle1" >
                                product
                            </Typography>
                            <Typography variant="subtitle1">
                                to delete 
                            </Typography>                 
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                            <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
                        </Stack>   
                        
                        <Stack direction="row" spacing={5}>       
                            { valueVoid === "PRODUCT" ?

                                loading ?
                                <Button                                      
                                    sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                                    className="btn-void" 
                                    variant="outlined" 
                                    fullWidth 
                                >
                                    Loading...
                                </Button> 
                                :
                                <Button 
                                    onClick={handleDelete}
                                    sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                                    className="btn-void" 
                                    variant="outlined" 
                                    fullWidth 
                                >
                                    Delete now
                                </Button> 
                            :
                                <Button variant="outlined" fullWidth >Delete</Button>
                            }         
                            
                        </Stack> 
                       
            </DialogContentText>
        </DialogContent>       
    </Dialog> 
    );
}