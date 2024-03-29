import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeletepurchaserawmaterial.scss';
import { DELETE_PURCHASE_RAW_MATERIAL , UPDATE_PURCHASE_RAW_MATERIAL } from "../../Schema/rawmaterial";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from "../../Schema/user";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalDeletePurchaseRawMaterial({
    handleClose,
    open,
    setCheckMessage,
    setMessage,
    setAlert,
    setRefetch,
    editData,
}) {

    const [valueVoid,setValueVoid] = React.useState("");
    const [loading,setLoading] = React.useState(false);

    // const [deletePurchaseRawMaterial] = useMutation(DELETE_PURCHASE_RAW_MATERIAL, {
    //     onCompleted:({deletePurchaseRawMaterial})=>{        
    //         if(deletePurchaseRawMaterial?.success){
    //         setCheckMessage('success')
    //         setMessage(deletePurchaseRawMaterial?.message)
    //         setAlert(true)
    //         setRefetch();
    //         handleClose()
    //         }
    //     }, 
    //     onError:(error) =>{
    //         // console.log(error.message)
    //         setAlert(true)
    //         setCheckMessage('error')
    //         setMessage(error.message)
    //     }
    // })

    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;
    // End Get User ID


    const [updatePurchaseRawMaterial] = useMutation(UPDATE_PURCHASE_RAW_MATERIAL, {
        onCompleted:({updatePurchaseRawMaterial})=>{        
            if(updatePurchaseRawMaterial?.success){
                setCheckMessage('success')
                setMessage(updatePurchaseRawMaterial?.message)
                setAlert(true)
                setRefetch();
                handleClose()
                setLoading(false)
            } else {
                setLoading(false);
                setCheckMessage('error')
                setMessage(updatePurchaseRawMaterial?.message)
                setAlert(true)
            }
        }, 
        onError:(error) =>{
            // console.log(error.message)
            setLoading(false);
            setAlert(true)
            setCheckMessage('error')
            setMessage(error.message)
        }
    })


    const handleVoid = () => {
        setLoading(true);
        updatePurchaseRawMaterial({
            variables: {
                id: editData?._id,
                purchaseRawMaterialEdit: {
                    status: "voided",
                    approveBy: userId,
                }
            }
        })
    }

    return (

        <Dialog open={open} className="dialog-delete-storageRoom">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>                 
                    <Typography className='header-title' variant="h6" >
                        Void Purchase
                    </Typography>             
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => handleClose()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack> 

                <Stack direction="row" spacing={5} width="100%">
                    <Typography variant="subtitle1" >
                        Do you want to void this purchase?
                    </Typography>               
                </Stack>

            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">      
                                
                    <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                        <Typography variant="subtitle1">
                            Please type
                        </Typography>
                        <Typography className='body-void' variant="subtitle1" >
                            material
                        </Typography>
                        <Typography variant="subtitle1">
                            to void
                        </Typography>                
                    </Stack>

                    <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                        <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
                    </Stack>   
                    
                    <Stack direction="row" spacing={5}>       
                        { valueVoid === "material" ?

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
                                    onClick={handleVoid}
                                    sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                                    className="btn-void" 
                                    variant="outlined" 
                                    fullWidth 
                                >
                                    void now
                                </Button> 
                        :
                            <Button variant="outlined" fullWidth >void</Button>
                        }         
                        
                    </Stack> 
                                   
                </DialogContentText>
            </DialogContent>       
        </Dialog>
        
    )
}