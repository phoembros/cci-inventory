import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeletepurchaserawmaterial.scss';
import {useMutation}  from "@apollo/client";
import {DELETE_STORAGE_ROOM} from "../../Schema/starageroom";
 

export default function ModalDeleteStorageRoom({
    handleClose,
    row,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch
}) {

    const [valueVoid, setValueVoid] = React.useState("");

    const [deleteStorageRoom] = useMutation(DELETE_STORAGE_ROOM, {
        onCompleted:({deleteStorageRoom})=>{
            // console.log(deleteStorageRoom?.message, 'room')
              if(deleteStorageRoom?.success){
                setCheckMessage('success')
                setMessage(deleteStorageRoom?.message)
                setAlert(true)
                setRefetch();
                handleClose()
              }
            }, 
            onError:(error) =>{
                console.log(error.message)
                setCheckMessage('error')
                // setMessage(error.message)
            }
        })
    
        const handleDelete = () =>{
            deleteStorageRoom({
                variables:{
                    id:row?._id, 
                }
            })
        }

    return (
        <Box className="delete-raw-material">
            <Stack direction="row" spacing={5}>                 
                <Typography className='header-title' variant="h6" >
                    Delete Storage Room
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant="subtitle1" >
                    Do you want to void this room?
                </Typography>               
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                <Typography variant="subtitle1">
                    Please type
                </Typography>
                <Typography className='body-void' variant="subtitle1" >
                    {row?.name}
                </Typography>
                <Typography variant="subtitle1">
                    to void
                </Typography>                
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
            </Stack>   
            
            <Stack direction="row" spacing={5} >       
                { valueVoid === row?.name ?
                    <Button
                        onClick={handleDelete}
                        sx={{":hover":{ backgroundColor:"red", border:"none"}}} 
                        className="btn-void" 
                        variant="outlined" 
                        fullWidth 
                    >void now</Button> 
                :
                    <Button variant="outlined" fullWidth onClick={handleDelete} >void</Button>
                }         
                
            </Stack> 

        </Box>
    )
}