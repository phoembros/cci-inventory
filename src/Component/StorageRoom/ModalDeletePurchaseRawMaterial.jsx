import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeletepurchaserawmaterial.scss';
import { DELETE_PURCHASE_RAW_MATERIAL , UPDATE_PURCHASE_RAW_MATERIAL } from "../../Schema/rawmaterial";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from "../../Schema/user";



export default function ModalDeletePurchaseRawMaterial({
    handleClose,
    setCheckMessage,
    setMessage,
    setAlert,
    setRefetch,
    editData,
}) {

    const [valueVoid,setValueVoid] = React.useState("");

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
            }
        }, 
        onError:(error) =>{
            // console.log(error.message)
            setAlert(true)
            setCheckMessage('error')
            setMessage(error.message)
        }
    })


    const handleVoid = () => {
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
        <Box className="delete-raw-material" >
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

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                <Typography variant="subtitle1">
                    Please type
                </Typography>
                <Typography className='body-void' variant="subtitle1" >
                    purchase material
                </Typography>
                <Typography variant="subtitle1">
                    to void
                </Typography>                
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
            </Stack>   
            
            <Stack direction="row" spacing={5} >       
                { valueVoid === "purchase material" ?
                    <Button 
                        onClick={handleVoid}
                        sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                        className="btn-void" 
                        variant="outlined" 
                        fullWidth 
                    >void now</Button> 
                :
                    <Button variant="outlined" fullWidth >void</Button>
                }         
                
            </Stack> 

        </Box>
    )
}