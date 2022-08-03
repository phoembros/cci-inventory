import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalvoidproduction.scss';
import { DELETE_PRODUCTION } from "../../Schema/production";
import { useMutation } from "@apollo/client";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalVoidProduction({
    handleClose,
    open,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    const [loading,setLoading] = React.useState(false);

    const [valueVoid,setValueVoid] = React.useState("");

    const [deleteProductions] = useMutation(DELETE_PRODUCTION , {
        onCompleted: ({deleteProductions}) => {  
            console.log(deleteProductions)        
            if(deleteProductions?.success){
                setCheckMessage("success")
                setMessage(deleteProductions?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false);
            } else {
                setLoading(false)
                setCheckMessage("error")
                setAlert(true);
                setMessage(deleteProductions?.message)                
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
        deleteProductions({
            variables: {
                id: editDataProduction?._id,
            }
        })
    }

    return (

        <Dialog open={open} className="dialog-production-void">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>                 
                        <Typography className='header-title' variant="h6" >
                            Delete Production
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
                                Do you want to delete this production?
                            </Typography>               
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                            <Typography variant="subtitle1">
                                Please type
                            </Typography>
                            <Typography className='body-void' variant="subtitle1" >
                                production
                            </Typography>
                            <Typography variant="subtitle1">
                                to delete
                            </Typography>                
                        </Stack>

                        <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                            <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
                        </Stack>   
                        
                        <Stack direction="row" spacing={5}>       
                            { valueVoid === "PRODUCTION" ?

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
                                        sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                                        className="btn-void" 
                                        variant="outlined" 
                                        fullWidth 
                                        onClick={handleDelete}
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
    )
}