import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleteunit.scss';
import { DELETE_UNIT } from '../../Schema/unit';
import { useMutation } from "@apollo/client";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ModalDeleteUnit({
  handleClose,
  open,
  setAlert,
  setMessage,
  setCheckMessage,
  DataUnit,
  setRefetch,
}) {

  const [loading,setLoading] = React.useState(false);

  const [valueVoid, setValueVoid] = React.useState("");

  const [deleteUnit] = useMutation(DELETE_UNIT,{
    onCompleted:({deleteUnit})=>{
        // console.log(deleteUnit?.message, '')
          if(deleteUnit?.success){
            setCheckMessage('success')
            setMessage(deleteUnit?.message)
            setAlert(true)
            handleClose();
            setRefetch();
            setLoading(false);
          } else {
            setLoading(false)
            setCheckMessage('error')
            setMessage(deleteUnit?.message)
            setAlert(true)
          }
        }, 
        onError:(error) => {
            setLoading(false)
            console.log(error.message)
            setCheckMessage('error')
            // setMessage(error.message)
        }
    })

    const handleDelete = () =>{
        setLoading(true)
        deleteUnit({
            variables:{
              unitId: DataUnit?._id, 
            }
        })
    }


  return (

      <Dialog open={open} className="dialog-delete-unit">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>
                    <Typography className="header-title" variant="h6">
                      Delete Unit
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <IconButton onClick={() => handleClose()}>
                      <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
                    </IconButton>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 

                    <Stack direction="row" spacing={5} width="100%">
                      <Typography variant="subtitle1">
                        Do you want to delete this unit?
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
                        {DataUnit?.unitName}
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
                      {valueVoid === DataUnit?.unitName ? (

                        loading? 
                            <Button                          
                              sx={{ ":hover": { backgroundColor: "red", border: "none" } }}
                              className="btn-void"
                              variant="outlined"
                              fullWidth
                            >
                            loading...
                            </Button>
                          :
                            <Button
                              onClick={handleDelete}
                              sx={{ ":hover": { backgroundColor: "red", border: "none" } }}
                              className="btn-void"
                              variant="outlined"
                              fullWidth
                            >                             
                              Delete Now
                            </Button>
                      ) : (
                        <Button variant="outlined" fullWidth>
                          {/* void */}
                          Delete
                        </Button>
                      )}
                    </Stack>
              
              </DialogContentText>
      </DialogContent>       
  </Dialog>   
  );
}