import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleterawmaterial.scss';
import { ADJUST_QTY_RAW_MATERIAL } from '../../Schema/rawmaterial';
import { useMutation } from "@apollo/client";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QtyOnHand from "./QtyOnHand";


export default function AdjustQauntity({
  setRefetchQty,
  handleClose,
  open,
  setAlert,
  setMessage,
  setCheckMessage,
  DataRow,
  setRefetch,
  storageRoomId,
}) {

  const [loading,setLoading] = React.useState(false);

  // Handle Message Error TextField
  const [errorMessage, setErrorMessage] = React.useState(["Can't input 0" , "Invalid Value" , "Field is required!"]);
  const [touched, setTouched] = React.useState(false);
  const handleTouch = () =>  setTouched(true);


  const [remarkAdjust,setRemarkAdjust] = React.useState("");
  const [qtyAdjust,setQtyAdjust] = React.useState(" ");
 
  const [adjustQtyRawMaterial] = useMutation(ADJUST_QTY_RAW_MATERIAL ,{
    onCompleted:({adjustQtyRawMaterial}) => {
        // console.log(adjustQtyRawMaterial?.message, '')
          if(adjustQtyRawMaterial?.success){
            setCheckMessage('success')
            setMessage(adjustQtyRawMaterial?.message)
            setAlert(true)
            handleClose();
            setRefetch();
            setRefetchQty(true)
            setLoading(false);
          } else {
            setLoading(false)
            setCheckMessage('error')
            setMessage(adjustQtyRawMaterial?.message)
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

    // console.log(DataRow)

    const handleUpdateQty = () =>{
        setLoading(true);              
        adjustQtyRawMaterial({
            variables: {              
                storageRoomId: storageRoomId,
                rawMaterialId: DataRow?._id ,
                qtyAdjust: parseFloat(qtyAdjust),
                remark: remarkAdjust,
            }
        })
    }


  return (

      <Dialog open={open} className="dialog-delete-raw-material">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>
                    <Typography className="header-title" variant="h6">
                        Adjust Qty On Hand
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
                        Qunatity On Hand of Raw Material.
                      </Typography>
                    </Stack>

                    <Stack
                      direction="row"                     
                      spacing={1}
                      width="100%"
                      sx={{ mb: 2 , mt: 4}}
                    >
                      <Stack direction="column" justifyContent="center">
                        <Typography variant="subtitle1"  className="header-title">
                          Quantity:
                        </Typography>                       
                      </Stack> 
                      <Box sx={{flexGrow:1}}></Box>
                      <Box sx={{width:"70%"}}>
                          <Typography variant="subtitle1">
                              <QtyOnHand setRefetchQty={setRefetchQty}  storageRoomId={storageRoomId} rawMaterialId={DataRow?._id} unit={DataRow?.unit?.unitName} />
                          </Typography>     
                      </Box>            
                    </Stack>


                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={1}
                      width="100%"
                      sx={{ mb: 2 }}
                    >
                      <Stack direction="column" justifyContent="center">
                        <Typography variant="subtitle1" className="header-title">
                          Adjust To:
                        </Typography>
                      </Stack>
                      <Box sx={{flexGrow:1}}></Box>
                      <Box sx={{width:"70%"}}>
                        <TextField
                          size="small"
                          type="number"
                          fullWidth        
                          value={qtyAdjust}                  
                          onChange={ (e) => setQtyAdjust(e.target.value)}
                          InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {DataRow?.unit?.unitName}
                                </InputAdornment>
                            ),   
                            inputProps: {
                              min: 1
                            }                            
                          }}
                          
                          onFocus={handleTouch}
                          error={ touched && isNaN(qtyAdjust) || touched && qtyAdjust < 0 }
                          helperText={ 
                            touched && isNaN(qtyAdjust) && errorMessage[1] ||                            
                            touched && qtyAdjust < 0 && errorMessage[1]     
                          } 
                        />
                      </Box>
                    </Stack>

                    <Stack
                      direction="row"
                      justifyContent="center"
                      spacing={1}
                      width="100%"
                      sx={{ mb: 4 }}
                    >
                      <Stack direction="column" justifyContent="center">
                        <Typography variant="subtitle1" className="header-title">
                          Remark:
                        </Typography>
                      </Stack>
                      <Box sx={{flexGrow:1}}></Box>
                      <Box sx={{width:"70%"}}>
                        <TextField
                          multiline
                          size="small"                          
                          fullWidth
                          onChange={ (e) => setRemarkAdjust(e.target.value)}                         
                        />
                      </Box>
                    </Stack>


                    <Stack direction="row" spacing={5}>
                      { 
                        loading? 
                            <Button                         
                              className='btn-create'
                              variant="outlined"
                              fullWidth
                            >
                                loading...
                            </Button>
                          :
                            touched && !isNaN(qtyAdjust) && qtyAdjust >= 0 ?
                              <Button
                                onClick={ () => { handleUpdateQty(); }}                           
                                className='btn-create'
                                variant="outlined"
                                fullWidth
                              >                             
                                  Adjust
                              </Button>      
                            :
                              <Button                         
                                className='btn-create'
                                variant="outlined"
                                fullWidth
                              >
                                  Adjust
                              </Button>        
                      }
                    </Stack>
              
              </DialogContentText>
      </DialogContent>       
  </Dialog>   
  );
}