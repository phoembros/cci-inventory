import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './viewproduct.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterial from './ListRawMaterial';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from "moment"

import { GET_ADJUST_PRODUCT_GROUP } from '../../Schema/product';
import { useQuery } from '@apollo/client';

export default function ViewAdjustProductGroup({ handleClose , open , productGroupView }) {

    const [limit,setLimit] = React.useState(5);

    const { data , refetch } = useQuery(GET_ADJUST_PRODUCT_GROUP, {
        variables: {
            productGroupId: productGroupView?._id ? productGroupView?._id : "",
            limit: limit,
        },
        onError: (error) => {
            console.log(error.message)
        },
        onCompleted: ({getAdjustProductGroupById}) => {
            console.log("getAdjustProductGroupById" , getAdjustProductGroupById)
        }
    })

    React.useEffect( () => {
        refetch()
    },[productGroupView?._id, limit])

    
    return (  
        <Dialog open={open} className="dialog-view-product">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>        
                    <Typography className='header-title' variant="h6" >
                        Adjust Product Group History
                    </Typography>
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => { handleClose(); setLimit(5);}}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   
                
                <Stack direction="row" width="100%" sx={{mt:-1}}>
                    <Typography variant='body2'>
                        Detail information's.
                    </Typography>            
                </Stack>  
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">  

                <Stack direction="column" spacing={1} sx={{mt:1 , width: "100%"}} >
                        <Typography variant='body1' className='header-title' sx={{ mb:2 }}>
                            Name:  {productGroupView?.name}
                        </Typography>   

                {
                    data?.getAdjustProductGroupById?.length !== 0 ?
                    <>
                    {
                        data?.getAdjustProductGroupById?.map( (item,index) => (
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
                data?.getAdjustProductGroupById?.length === limit ? 
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