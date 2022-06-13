import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleterawmaterial.scss';
import { DELETE_CATEGORY } from "../../Schema/rawmaterial"
import { useMutation } from "@apollo/client";

export default function ModalDeleteCategoryMaterial({
    handleClose,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {
    
    const [valueVoid,setValueVoid] = React.useState("");
    
    // delete
    const [deleteRawMaterialCategory ] = useMutation(DELETE_CATEGORY, {
        onCompleted: ({deleteRawMaterialCategory}) => {
            // console.log(deleteRawMaterialCategory)
            if(deleteRawMaterialCategory?.success){
                setCheckMessage("success")
                setMessage(deleteRawMaterialCategory?.message)
                setAlert(true);
                handleClose();
                setRefetch()
            } 
        },
        onError: (error) => {            
            setCheckMessage("error")
            setMessage(error.message);
            setAlert(true);
        }
    });

    const handleDelete = () => {
        deleteRawMaterialCategory({
            variables: {
                id: editData?._id
            }
        })
    }

    return (
        <Box className="delete-raw-material" >
            <Stack direction="row" spacing={5}>                 
                <Typography className='header-title' variant="h6" >
                    Delete Category Material
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant="subtitle1" >
                    Do you want to delete this category?
                </Typography>               
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                <Typography variant="subtitle1">
                    Please type
                </Typography>
                <Typography className='body-void' variant="subtitle1" >
                    {editData?.categoryName}
                </Typography>
                <Typography variant="subtitle1">
                    to void
                </Typography>                
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
            </Stack>   
            
            <Stack direction="row" spacing={5}>       
                { valueVoid === editData?.categoryName ?
                    <Button 
                        onClick={handleDelete}
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

        </Box>
    )
}