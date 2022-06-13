import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleterawmaterial.scss';
import {DELETE_RAW_MATERAIL} from '../../Schema/rawmaterial';
import { useMutation } from "@apollo/client";

export default function ModalDeleteRawMaterial({
  handleClose,
  setAlert,
  setMessage,
  setCheckMessage,
  DataRow,
  setRefetch,
}) {
  const [valueVoid, setValueVoid] = React.useState("");
  const [deleteRawMaterial] = useMutation(DELETE_RAW_MATERAIL,{
    onCompleted:({deleteRawMaterial})=>{
        // console.log(deleteRawMaterial?.message, '')
          if(deleteRawMaterial?.success){
            setCheckMessage('success')
            setMessage(deleteRawMaterial?.message)
            setAlert(true)
            handleClose();
            setRefetch()
          }
        }, 
        onError:(error) =>{
            console.log(error.message)
            setCheckMessage('error')
            // setMessage(error.message)
        }
    })

    const handleDelete = () =>{
        deleteRawMaterial({
            variables:{
                id:DataRow?._id, 
            }
        })
    }


  return (
    <Box className="delete-raw-material">
      <Stack direction="row" spacing={5}>
        <Typography className="header-title" variant="h6">
          Delete Raw Material
        </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <IconButton onClick={() => handleClose()}>
          <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
        </IconButton>
      </Stack>

      <Stack direction="row" spacing={5} width="100%">
        <Typography variant="subtitle1">
          Do you want to delete this material?
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        width="100%"
        sx={{ mt: 4 }}
      >
        <Typography variant="subtitle1">Please type</Typography>
        <Typography className="body-void" variant="subtitle1">
          {DataRow?.materialName}
        </Typography>
        <Typography variant="subtitle1">to void</Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="center"
        spacing={1}
        width="100%"
        sx={{ mb: 4 }}
      >
        <TextField
          size="small"
          fullWidth
          onChange={(e) => setValueVoid(e.target.value)}
        />
      </Stack>

      <Stack direction="row" spacing={5}>
        {valueVoid === DataRow?.materialName ? (
          <Button
            onClick={handleDelete}
            sx={{ ":hover": { backgroundColor: "red", border: "none" } }}
            className="btn-void"
            variant="outlined"
            fullWidth
          >
            void now
          </Button>
        ) : (
          <Button variant="outlined" fullWidth>
            void
          </Button>
        )}
      </Stack>
    </Box>
  );
}