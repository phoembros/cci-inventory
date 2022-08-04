import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modaldeleteproduct.scss';
import { ADJUST_QTY_RAW_MATERIAL } from '../../Schema/rawmaterial';
import { ADJUST_QTY_PRODUCT } from "../../Schema/product";
import { useMutation } from "@apollo/client";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AdjustQauntity({
  handleClose,
  open,
  setAlert,
  setMessage,
  setCheckMessage,
  editData,
  setRefetch,
}) {

  const [loading,setLoading] = React.useState(false);

  const [qtyAdjust,setQtyAdjust] = React.useState(0);
 
  const [adjustQtyProductGroup] = useMutation( ADJUST_QTY_PRODUCT , {
    onCompleted:({adjustQtyProductGroup})=> {
        // console.log(adjustQtyProductGroup?.message, '')
          if(adjustQtyProductGroup?.success){
            setCheckMessage('success')
            setMessage(adjustQtyProductGroup?.message)
            setAlert(true)
            handleClose();
            setRefetch();
            setLoading(false);
          } else {
            setLoading(false)
            setCheckMessage('error')
            setMessage(adjustQtyProductGroup?.message)
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

    // console.log(editData)

    const handleUpdateQty = () =>{
        setLoading(true)        
        adjustQtyProductGroup({
            variables: {              
                productId: editData?._id ,
                qtyAdjust: parseFloat(qtyAdjust),
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
                        Qunatity On Hand of Product.
                      </Typography>
                    </Stack>


                    <Stack
                      direction="row"                     
                      spacing={1}
                      width="100%"
                      sx={{ mb: 4 , mt: 4}}
                    >
                      <Stack direction="column" justifyContent="center">
                        <Typography variant="subtitle1"  className="header-title">
                          Quantity:
                        </Typography>                       
                      </Stack> 
                      <Box sx={{flexGrow:1}}></Box>
                      <Box sx={{width:"70%"}}>
                          <Typography variant="subtitle1">
                            {editData?.totalStockAmount-editData?.totalSold} - U/M
                          </Typography>     
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
                          Adjust To:
                        </Typography>
                      </Stack>
                      <Box sx={{flexGrow:1}}></Box>
                      <Box sx={{width:"70%"}}>
                        <TextField
                          size="small"
                          type="number"
                          fullWidth
                          onChange={ (e) => setQtyAdjust(e.target.value)}
                          InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {editData?.unit}
                                </InputAdornment>
                            ),   
                            inputProps: {
                              min: 1
                            }                            
                        }}

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
                            <Button
                              onClick={handleUpdateQty}                             
                              className='btn-create'
                              variant="outlined"
                              fullWidth
                            >                             
                                Update
                            </Button>                      
                      }
                    </Stack>
              
              </DialogContentText>
      </DialogContent>       
  </Dialog>   
  );
}