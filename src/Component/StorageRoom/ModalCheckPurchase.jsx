import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalcheckpurchase.scss';
import { UPDATE_PRODUCTION } from "../../Schema/production"
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from '../../Schema/user';
import { UPDATE_PURCHASE_RAW_MATERIAL } from "../../Schema/rawmaterial";

export default function ModalCheckPurchase({
    handleClose,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

     // Get User ID  
     const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
     const userId =  userLoginData?.getuserLogin?._id;
     // End Get User ID

    // Update
    const [updatePurchaseRawMaterial] = useMutation(UPDATE_PURCHASE_RAW_MATERIAL,{
        onCompleted: ({updatePurchaseRawMaterial}) => {
            // console.log(updatePurchaseRawMaterial?.message, "message");
            if(updatePurchaseRawMaterial?.success){
                setCheckMessage('success')
                setMessage(updatePurchaseRawMaterial?.message);
                setAlert(true);
                handleClose();
                setRefetch();
            }
        },
        onError: (error) => {     
            setAlert(true)
            setCheckMessage('error')
            setMessage(error?.message)
        },
    });


    const [qualityChecks,setQualityCheck] = React.useState("completed");

    const handleUpdateStatus = (e) => {
        updatePurchaseRawMaterial({
            variables: {
                id: editData?._id,
                purchaseRawMaterialEdit: {
                    status: "completed",
                    approveBy: userId,
                }
            }
        })
    }

    return (
        <Box className="purchase-check">
            <Stack direction="row" spacing={5}>                 
                <Typography className='header-title' variant="h6" >
                    Comfirm Purchase Completed.
                </Typography>             
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={() => handleClose()}>
                    <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                </IconButton>    
            </Stack> 

            <Box className="container">
                <TableContainer >
                    <Table className="table" aria-label="simple table">
                    <TableHead>
                        <TableRow className="header-row">
                        <TableCell className="header-title">
                            Raw Materail
                        </TableCell>
                        
                        <TableCell className="header-title" align="center">
                            QTY
                        </TableCell>
                        
                        <TableCell className="header-title" align="center">
                            UnitPrice
                        </TableCell>
                        
                        <TableCell className="header-title" align="center">
                            Supplies
                        </TableCell>
                        
                        </TableRow>
                    </TableHead>
                        {editData?.productsItems.map((row , index) => (
                            <TableBody key={index} component={Paper} className="body" >                        
                                <TableRow  className="body-row">                                
                                    <TableCell className="body-title" component="th" scope="row">{row?.rawMaterialId?.materialName}</TableCell>
                                    <TableCell className="body-title"  align="center" width="20%">{row?.newQty}</TableCell>  
                                    <TableCell className="body-title"  align="center" width="20%" >{row?.rawMaterialId?.unitPrice} </TableCell>
                                    <TableCell className="body-title"  align="center" width="20%">{row?.suppliersName}</TableCell> 
                                    <TableCell className="body-title" ></TableCell>
                                    <TableCell className="body-title" ></TableCell>                                                  
                                </TableRow>
                            </TableBody>                        
                        ))}                        

                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{mt:2}}>
                <Typography className='body-title' variant="body" >
                    Update Status
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

            
            
            <Stack direction="row" spacing={5} sx={{mt:3}}>
                <Box sx={{flexGrow:1}}></Box>
                <Button variant="contained" color="error">Cancel</Button> 
                <Button variant="contained" onClick={handleUpdateStatus}>Ok</Button> 
            </Stack> 

        </Box>
    )
}