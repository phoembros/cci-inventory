import * as React from "react";
import { Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './deleteUser.scss'

//query
import {DELETE_USER} from "../../Schema/user";
import { useMutation } from "@apollo/client";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 5,
  p: 4,
};

function DeleteUser({
    DataUser,
    setRefech,
    setAlert,
    setMessage,
    setCheckMessage,
    handleCloseDel,
}) {
  const [valueVoid,setValueVoid] = React.useState("");

  const [deleteUser] = useMutation(DELETE_USER, {
       onCompleted: ({deleteUser}) => {
            // console.log(deleteUser, 'del')
            if(deleteUser?.success){
                setCheckMessage("success")
                setMessage(deleteUser?.message)
                setAlert(true);
                handleCloseDel();
                setRefech();
            } 
        },
        onError: (error) => {            
            setCheckMessage("error")
            setMessage(error.message);
            setAlert(true);
        }
  })

  const handleDelete = () =>{
      deleteUser({
          variables:{
              id:DataUser?._id
          }
      })
  }

  return (
        <Box className="delete-user" sx={style} >
          <Stack direction="row" spacing={5}>                 
                <Typography className='title' variant="h6" >
                    Delete User
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleCloseDel()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant="subtitle1" >
                    Do you want to delete this user?
                </Typography>               
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mt:4 }}>                 
                <Typography variant="subtitle1">
                    Please type
                </Typography>
                <Typography className='body-void' variant="subtitle1" >
                    user
                </Typography>
                <Typography variant="subtitle1">
                    to delete
                </Typography>                
            </Stack>

            <Stack direction="row" justifyContent="center" spacing={1} width="100%" sx={{mb:4}}>                 
                <TextField size="small" fullWidth onChange={(e) => setValueVoid(e.target.value)}/>                
            </Stack>   
            
            <Stack direction="row" spacing={5}>       
                { valueVoid === "USER" ?
                    <Button className="btn-void" variant="outlined" fullWidth onClick={handleDelete}> delete now </Button> 
                :
                    <Button variant="outlined" fullWidth> delete </Button>
                }         
                
            </Stack> 
        </Box>
  );
}

export default DeleteUser;
