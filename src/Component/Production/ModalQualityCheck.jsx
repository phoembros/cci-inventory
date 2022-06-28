import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalqualitycheck.scss';
import { UPDATE_PRODUCTION , COMPLETE_PRODUCTION } from "../../Schema/production"
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from '../../Schema/user';
import { GET_PRODUCT_UNIT } from "../../Schema/product";

export default function ModalQualityCheck({
    handleClose,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    // console.log(editDataProduction?.production?.productId?.unit)

    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;    

    // Get Unit Product
    const [unitProduct,setUnitProduct] = React.useState([])
    const { data: getUnitProduct } = useQuery(GET_PRODUCT_UNIT,{
        onCompleted: ({getProductsUnits}) => {
            setUnitProduct(getProductsUnits)
        }
    });
   
    // Handle Message Error TextField
    const [errorMessage, setErrorMessage] = React.useState(["Input invalid Qty"]);
    const [touched, setTouched] = React.useState(false);
    const handleTouch = () =>  setTouched(true);

    // Update Status Production
    const [completeProduction] = useMutation(COMPLETE_PRODUCTION , {
        onCompleted: ({completeProduction}) => {          
            if(completeProduction?.success){
                setCheckMessage("success")
                setMessage(completeProduction?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setAlert(true);
                setMessage(completeProduction?.message)                
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }
    });

    const [unitSelect,setUnitSelect] = React.useState("");
    const [completedQty,setCompletedQty] = React.useState(1);
    const [completedRemark,setCompletedRemark] = React.useState("")
    
    const handleUpdateProgress = () => {   
        // console.log("clikc")     
        completeProduction({
            variables: {
                id: editDataProduction?._id,
                completedInput: {
                    progress: "completed",
                    completedQty: completedQty,
                    completedRemark: completedRemark,
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
                    Complete Production
                </Typography>
            </Box>

            <Stack direction="row" spacing={2} width="100%" sx={{mt:2}}>    
                <Stack direction="column" justifyContent="center" width="260px">           
                    <Typography variant='body1' >
                        Completed Qty :
                    </Typography>  
                </Stack> 
                 
                <TextField  
                    onChange={(e) => setCompletedQty(parseFloat(e.target.value))}
                    placeholder="Qty" 
                    fullWidth 
                    size="small" 
                    type="number"
                    value={completedQty}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">                                             
                                {editDataProduction?.production?.productId?.unit}                                           
                            </InputAdornment>
                        ),
                        inputProps: { min: 1 },
                    }}
                    onFocus={handleTouch}
                    error={touched && Boolean(completedQty < 1) || touched && Boolean(completedQty > editDataProduction?.qty) }
                    helperText={Boolean(completedQty < 1) && errorMessage[0] || Boolean(completedQty > editDataProduction?.qty) && errorMessage[0]}
                /> 
                
                {/* <Box width="280px">
                    <FormControl fullWidth size="small">                      
                        <Select 
                            onChange={(e) => setUnitSelect(e.target.value) }
                        >
                            {
                                unitProduct?.map( (item,index) => (
                                    <MenuItem value={`${item}`}>{item}</MenuItem>
                                ))
                            }                           
                            
                        </Select>
                    </FormControl>  
                </Box>    */}

            </Stack>

            <Stack direction="row" spacing={5} width="100%" sx={{mt:2}}>      
                <TextField 
                    placeholder="Remark"  
                    fullWidth   
                    multiline  
                    rows={2} 
                    size="small" 
                    onChange={(e) => setCompletedRemark(e.target.value)}
                />
            </Stack>
            
            <Stack direction="row" spacing={5} sx={{mt:3}}>
                <Box sx={{flexGrow:1}}></Box>
                <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button> 
                {
                    completedQty > editDataProduction?.qty || completedQty < 1 ?
                        <Button variant="contained">Ok</Button>
                    :
                        <Button variant="contained" onClick={handleUpdateProgress}>Ok</Button>
                }
                 
            </Stack> 

        </Box>
    )
}