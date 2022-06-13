import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalqualitycheck.scss';
import { UPDATE_PRODUCTION } from "../../Schema/production"
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from '../../Schema/user';

export default function ModalQualityCheck({
    handleClose,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

     // Get User ID  
     const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
     const userId =  userLoginData?.getuserLogin?._id;
     // End Get User ID

    // Update Status Production
    const [updateProductions] = useMutation(UPDATE_PRODUCTION , {
        onCompleted: ({updateProductions}) => {          
            if(updateProductions?.success){
                setCheckMessage("success")
                setMessage(updateProductions?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setAlert(true);
                setMessage(updateProductions?.message)                
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }
    });

    const [qualityChecks,setQualityCheck] = React.useState("completed");

    const handleUpdateProgress = () => {
        console.log(qualityChecks)
        updateProductions({
            variables: {
                id: editDataProduction?._id,
                productionsEdit: {
                    progress: qualityChecks,
                    qualityCheck: userId,
                }
            }
        })

    }

    return (
        <Box className="qaulity-check">
            <Stack direction="row" spacing={5}>                 
                <Typography className='header-title' variant="h6" >
                    Check Quality Production
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Stack direction="row" spacing={5} width="100%">
                <Typography variant='body1'>
                    Product : {editDataProduction?.production?.productName}
                </Typography>
                <Typography variant='body1'>
                    Qty : {editDataProduction?.qty}{editDataProduction?.production?.productId?.unit}
                </Typography>                
            </Stack>

            <Box sx={{mt:2}}>
                <Typography className='body-title' variant="body" >
                    Check Quality Production
                </Typography>
            </Box>
            
            <FormControl fullWidth size="small" >         
                <Select                     
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"  
                    defaultValue={"completed"}                  
                    onChange={(e) => setQualityCheck("completed")}
                >
                    {/* <MenuItem value="in progress">
                        <Typography>In progress</Typography>                        
                    </MenuItem> */}
                    <MenuItem value="completed">
                        <Typography>Completed</Typography>                                           
                    </MenuItem>                    
                </Select>
            </FormControl>

            {/* <Box sx={{mt:2}}>
                <Typography className='body-title' variant="body" >
                    Note
                </Typography>
                <TextField                     
                    fullWidth
                    size="small"
                    multiline
                    rows={4}
                    placeholder="comment something here"
                />
            </Box> */}
            
            <Stack direction="row" spacing={5} sx={{mt:3}}>
                <Box sx={{flexGrow:1}}></Box>
                <Button variant="contained" color="error">Cancel</Button> 
                <Button variant="contained" onClick={handleUpdateProgress}>Ok</Button> 
            </Stack> 

        </Box>
    )
}