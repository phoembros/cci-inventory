import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewrawmaterial.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GET_ADJUST_RAW_MATERIAL } from '../../Schema/rawmaterial';
import { useQuery } from '@apollo/client';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment"
import QtyOnHand from './QtyOnHand';


export default function ViewRawMaterial({handleClose, open , DataRow ,setRefetchQty, refetchQty, storageRoomId}) {

    // console.log(DataRow, 'row')
    const [limit,setLimit] = React.useState(5)
    const { data , refetch } = useQuery(GET_ADJUST_RAW_MATERIAL,{
        variables: {
            rawMaterialId: DataRow?._id ? DataRow?._id : "",
            limit: limit,
        },
        onCompleted: ({getAdjustRawMaterialById}) => {
            console.log(getAdjustRawMaterialById);
        },
        onError: (error) => {
            console.log(error?.message);
        }
    })

    React.useState( () => {
        refetch()
    },[DataRow?._id,limit])


    return (
   
        <Dialog open={open} className="dialog-view-raw-material">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>        
                    <Typography className='header-title' variant="h6" >
                        Raw Material Detail
                    </Typography>
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => { handleClose(); setLimit(5); }}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   
                    
                <Stack direction="row" spacing={5} sx={{mt:-1}}>                 
                    <Typography variant='body2'>
                        Information Detials Raw Material
                    </Typography>     
                </Stack>   
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">   

                    <Stack direction="row" spacing={1} sx={{mt:2}}>
                        <Stack direction="row" spacing={1} width="50%">                 
                            <Typography className='header-title' variant='body1'>
                                Category:
                            </Typography>   
                            <Typography variant='body1'>
                                {DataRow?.category?.categoryName}
                            </Typography>  
                        </Stack> 
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="row" spacing={1} width="50%">
                            <Typography className='header-title'>
                                Name:
                            </Typography>  
                            <Typography variant='body1'>
                                {DataRow?.materialName}
                            </Typography>                      
                        </Stack>
                    </Stack> 

                    {/* <Stack direction="row" spacing={1} sx={{mt:2}}>                        
                        <Stack direction="row" spacing={1}  width="50%">
                            <Typography className='header-title'>
                                Unit:
                            </Typography>  
                            <Typography variant='body1'>
                                {DataRow?.unit}
                            </Typography>                      
                        </Stack>      
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="row" spacing={1}  width="50%">
                            <Typography className='header-title'>
                                UnitPrice:
                            </Typography>  
                            <Typography variant='body1'>
                                ${DataRow?.unitPrice}
                            </Typography>                      
                        </Stack>

                    </Stack> */}
                        
                        
                    {/* <Stack direction="column" spacing={1} sx={{mt:2 , width: "100%"}} >
                        <Typography className='header-title'>
                            Remark:
                        </Typography>  
                        <Typography variant='body1'>
                            {DataRow?.remark}
                        </Typography>                      
                    </Stack>  */}

                    <Stack direction="row" spacing={1} sx={{mt:2 , width: "100%"}} >
                        <Typography className='header-title'>
                            Qauntity On Hand:
                        </Typography>  
                        <Typography variant='body1'>

                            {/* {(DataRow?.totalStockAmount-DataRow?.usedStockAmount)?.toFixed(4)} -{DataRow?.unit} */}                            
                            <QtyOnHand 
                                setRefetchQty={setRefetchQty} 
                                refetchQty={refetchQty} 
                                storageRoomId={storageRoomId} 
                                rawMaterialId={DataRow?._id} 
                                unit={DataRow?.unit?.unitName}
                            />
                        </Typography>                      
                    </Stack>  

                    <Stack direction="column" spacing={1} sx={{mt:4 , width: "100%"}} >
                        <Typography variant='body1' className='header-title'>
                            Adjust Quantity History:
                        </Typography> 

                {   data?.getAdjustRawMaterialById?.length !== 0 ?
                    <>
                    {
                        data?.getAdjustRawMaterialById?.map( (item,index) => (
                            <Stack key={index} direction="row" spacing={1} width="100%" >
                                <AccountCircleIcon />
                                <Stack direction="column" width="100%">
                                    <Stack direction="row">
                                        <Typography variant='body2' sx={{fontWeight: "bold"}}>
                                            {item?.fistName+" "+item?.lastName}
                                        </Typography>
                                        <Box sx={{flexGrow:1}}></Box>
                                        <Typography variant='body2'>
                                            {moment(item?.createdAt).format("LLLL")}
                                        </Typography>
                                    </Stack>
                                    <Stack 
                                        direction="column" justifyContent="center"
                                        sx={{
                                            borderRadius: "15px",
                                            backgroundColor: "#F1F1F1", 
                                            height: item?.remark || item?.remark !== "" ?  "fit-Content" : "30px" , 
                                            padding:"10px" ,
                                        }} 
                                    >
                                        <Typography variant='body2'>
                                            {"Adjust "+ item?.oldQtyValue+" to "+item?.newQtyValue+", "}  {item?.remark}
                                        </Typography>
                                    </Stack>
                                </Stack>                             
                            </Stack>
                        ))
                    }
                    </>
                :
                    <Stack direction="row" spacing={1} width="100%" >
                        <Typography variant='body2'>No Remark</Typography>                       
                    </Stack>
                }
                                                                   
                    </Stack>

                {
                data?.getAdjustRawMaterialById?.length === limit ? 
                    <Stack direction="row" justifyContent="center" spacing={1} sx={{mt:1 , width: "100%"}} >                    
                        <Button variant="text" onClick={() => setLimit(limit+3)}>see more</Button>
                    </Stack>
                :
                    null
                }
                    
          
            </DialogContentText>
        </DialogContent>       
    </Dialog>    
  );
}