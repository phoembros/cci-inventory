import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createproduction.scss';
import { FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DatePicker from "@mui/lab/DatePicker";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
//icon progress
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// schema
import { GET_PRODUCT_BYID } from "../../Schema/product";
import { UPDATE_PRODUCTION , APPROVE_PRODUCTION } from "../../Schema/production"
import { useQuery, useMutation } from "@apollo/client"
import { GET_USER_LOGIN } from '../../Schema/user';
import moment from "moment";

// 
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DateRangeIcon from '@mui/icons-material/DateRange';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function ViewProduction({
    dataUserLogin,
    handleClose, 
    open,
    ViewData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    // console.log( "ViewData::",ViewData)

    const [startDate,setStartDate] = React.useState(new Date());   
    const [endDate,setEndDate] = React.useState(new Date()); 

     // Get User ID  
     const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
     const userId =  userLoginData?.getuserLogin?._id;
     // End Get User ID
    
    // Get Product Byid
    const [dataIngredients,setDataIngredients] = React.useState([])

    const { data , refetch } = useQuery(GET_PRODUCT_BYID , {
        variables: {
            productId: ViewData?.production?.productId?._id,
        },        
        onError: (error) => {
            console.log(error.message);
        }
    })
    
    React.useEffect( () => {
        if(data?.getProductById?.ingredients){
            setDataIngredients(data?.getProductById?.ingredients)
        }        
    },[data?.getProductById?.ingredients])
    // End Get

    // console.log(dataIngredients, 'row')    

    // Update Status Production
    const [approveProductions] = useMutation(APPROVE_PRODUCTION , {
        onCompleted: ({approveProductions}) => {          
            if(approveProductions?.success){
                setCheckMessage("success")
                setMessage(approveProductions?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setAlert(true);
                setMessage(approveProductions?.message)                
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    const [comment,setComment] = React.useState("");
    const handleUpdateStatus = (e) => {
       
        approveProductions({
            variables: {
                id: ViewData?._id,
                approveInput: {
                    status: e?.status,
                    approveOrRejectBy: userId,                   
                    comment: comment,
                }
            }
        })
    }

  return (  
    
    <Dialog open={open} className="dialog-production-create">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={2}>    
                    <Stack direction="column" justifyContent="center">
                        <Typography className='header-title' variant="h6" >
                            Production ID: {moment(ViewData?.createdAt).format("YYMM")}-{ViewData?.productionsId?.padStart(2, '0')}
                        </Typography>    
                    </Stack>     
                    {
                        ViewData?.warning ?                                               
                            <Tooltip title={`${ViewData?.remarkWarning}`}>
                                <IconButton>
                                    <WarningAmberIcon sx={{color:"orange"}}/>
                                </IconButton>
                            </Tooltip>                                                       
                        :
                            null
                    }   
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => handleClose()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   

                    
                <Stack direction="row" spacing={5} width="100%">
                    
                    <Typography variant='body2'>
                        Storage Room: {ViewData?.storageRoomId?.name}
                    </Typography>

                    {
                        ViewData?.qualityCheck ?
                            <Typography variant='body2' sx={{color:"red"}}>
                                Quantity Check:  {ViewData?.qualityCheck?.first_name+' '+ViewData?.qualityCheck?.last_name}
                            </Typography>
                        :
                            null
                    }
                    
                    {
                        ViewData?.workOrders ?
                            <Typography variant='body2'>
                                WorkOrder For: {ViewData?.customerId?.name}
                            </Typography>
                        :
                            null
                    }
                </Stack> 
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 
                        
                        <Box sx={{mt:2 , mb:2}}>
                            <Typography className='header-title'>
                                Remark
                            </Typography>     
                            <TextField disabled size='small' multiline rows={2} value={ViewData?.remark} fullWidth/>        
                            
                        </Box>

                        <Box className="container">
                            <TableContainer >
                                <Table className="table-top" aria-label="simple table">
                                    <TableHead >
                                        <TableRow className="header-row">
                                            <TableCell className="header-title">Product</TableCell>  
                                            <TableCell className="header-title" width="3%"></TableCell>                            
                                            <TableCell className="header-title" align='center' >QTY</TableCell>  
                                            <TableCell className="header-title" width="3%"></TableCell>
                                            <TableCell className="header-title" align='center' >Duration</TableCell>                                                       
                                        </TableRow>
                                    </TableHead>                    
                                    <TableBody component={Paper} className="body" >                        
                                        <TableRow  className="body-row">
                                            <TableCell className="body-title" component="th" scope="row" width="50%" >
                                                <TextField size='small' fullWidth value={ViewData?.production?.productId ? ViewData?.production?.productId?.productName : "Product is deleted."}/>
                                            </TableCell>
                                            <TableCell className="body-title"></TableCell>
                                            <TableCell className="body-title" component="th" align='center' width="15%" >
                                                <TextField size='small' fullWidth value={ ViewData?.production?.productId ? ViewData?.qty+' '+ViewData?.production?.productId?.unit : ""}/>
                                            </TableCell>
                                            <TableCell className="body-title"></TableCell>
                                            <TableCell className="body-title" width="15%" align='center'>
                                                    {
                                                        data?.getProductById?.durationProduce ?
                                                            <TextField value={`${data?.getProductById?.durationProduce*ViewData?.qty}min`} size='small' fullWidth />
                                                        : 
                                                            <TextField disabled  size='small' fullWidth />
                                                    } 
                                            </TableCell>                                                      
                                        </TableRow>
                                    </TableBody>                       
                                </Table>
                            </TableContainer>

                            <TableContainer >
                                <Table className="table" aria-label="simple table">
                                    <TableHead >
                                        <TableRow className="header-row">
                                            <TableCell className="header-title">Raw Materail</TableCell>                            
                                            <TableCell className="header-title">QTY</TableCell>  
                                            <TableCell className="header-title"></TableCell>                                                       
                                        </TableRow>
                                    </TableHead>
                                    {dataIngredients?.map((row , index) => (
                                        <TableBody key={index} component={Paper} className="body">                        
                                            <TableRow  className="body-row">                                
                                                <TableCell className="body-title" component="th" scope="row"> {row?.rawName} </TableCell>
                                                <TableCell className="body-title" >{(row?.amount*ViewData?.qty)?.toFixed(2)} {row?.rawMaterialId?.unit}</TableCell>    
                                                <TableCell className="body-title" ></TableCell>                                                   
                                            </TableRow>
                                        </TableBody>                        
                                    ))}
                                </Table>
                            </TableContainer>

                        {
                            ViewData?.completedQtyUM ?
                                <TableContainer >
                                    <Table className="table" aria-label="simple table">
                                        <TableHead >
                                            <TableRow className="header-row">
                                                <TableCell className="header-title-complete">Completed Stock U/M</TableCell>                            
                                                <TableCell className="header-title-complete">Stock U/M</TableCell> 
                                                                                                
                                            </TableRow>
                                        </TableHead>
                                        {ViewData?.completedQtyUM?.map( (row , index) => (
                                            <TableBody key={index} component={Paper} className="body">                        
                                                <TableRow  className="body-row">                                
                                                    <TableCell className="body-title" component="th" scope="row" width="50%"> {row?.label} </TableCell>
                                                    <TableCell className="body-title" >{(row?.qtyOfUM)} - U/M</TableCell>    
                                                                                                    
                                                </TableRow>
                                            </TableBody>                        
                                        ))}
                                    </Table>
                                </TableContainer>
                            :
                                null
                        }                
                            
                            


                            <TableContainer >
                                <Table className="table-buttom" aria-label="simple table">
                                    <TableHead >
                                        <TableRow className="header-row">
                                            {/* <TableCell className="header-title">Progress</TableCell> */}
                                            <TableCell className="header-title">Prirority</TableCell>  
                                            <TableCell className="header-title">Start Date</TableCell>  
                                            <TableCell className="header-title">Due Date</TableCell>                                                    
                                        </TableRow>
                                    </TableHead>                    
                                    <TableBody component={Paper} className="body" >                        
                                        <TableRow  className="body-row">
                                            {/* <TableCell className="body-title" component="th" scope="row" width="25%" >
                                                <FormControl fullWidth size="small" disabled>                                    
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"           
                                                        defaultValue={ViewData?.progress}                             
                                                    >   
                                                        <MenuItem value="not started">
                                                            <Stack direction="row" spacing={1}>
                                                                <PanoramaFishEyeIcon sx={{color:"gray", width:"17px"}} />
                                                                <Typography>Not started</Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                        <MenuItem value="in progress">
                                                            <Stack direction="row" spacing={1}>
                                                                <WifiProtectedSetupIcon sx={{color:"green", width:"17px"}} />
                                                                <Typography>In Progress</Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                        <MenuItem value="completed">
                                                            <Stack direction="row" spacing={1}>
                                                                <CheckCircleIcon sx={{color:"#0969A0", width:"17px"}} />
                                                                <Typography>Completed</Typography>
                                                            </Stack>
                                                        </MenuItem>                                        
                                                    </Select>
                                                </FormControl>
                                            </TableCell> */}
                                            <TableCell className="body-title" component="th" align='center' width="25%" >
                                                <FormControl fullWidth size="small" disabled>                                    
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"    
                                                        defaultValue={ViewData?.priority}                                    
                                                    >
                                                        <MenuItem value="urgent">
                                                            <Stack direction="row" spacing={1}>
                                                                <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                                                                <Typography>Urgent</Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                        <MenuItem value="important">
                                                            <Stack direction="row" spacing={1}>
                                                                <PriorityHighIcon sx={{color:"red", width:"17px"}} />
                                                                <Typography>Important</Typography>
                                                            </Stack>                                            
                                                        </MenuItem>
                                                        <MenuItem value="medium">
                                                            <Stack direction="row" spacing={1}>
                                                                <FiberManualRecordIcon sx={{color:"green", width:"17px"}} />
                                                                <Typography>Medium</Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                        <MenuItem value="low">
                                                            <Stack direction="row" spacing={1}>
                                                                <ArrowDownwardIcon sx={{color:"blue", width:"17px"}} />
                                                                <Typography>Low</Typography>
                                                            </Stack>
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell className="body-title" width="25%" align='center'>
                                                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker   
                                                        disabled   
                                                        value={ViewData?.startDate}                                                       
                                                        renderInput={(params) => (
                                                            <TextField size='small' {...params} type="date" fullWidth />
                                                        )}
                                                    />
                                                </LocalizationProvider> */}
                                                <LocalizationProvider className="date-controll" dateAdapter={AdapterMoment}>
                                                    <MobileDatePicker    
                                                        inputFormat="DD/MM/yyyy"                                 
                                                        value={ViewData?.startDate}   
                                                        disabled                              
                                                        renderInput={(params) => (
                                                            <TextField {...params}  
                                                                size="small"
                                                                className="select-date"
                                                                fullWidth
                                                                InputProps={{                                                 
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <DateRangeIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider> 

                                            </TableCell>   
                                            <TableCell className="body-title" width="25%" align='center'>
                                                {/* <LocalizationProvider dateAdapter={AdapterDateFns} >
                                                    <DatePicker      
                                                        disabled
                                                        value={ViewData?.dueDate}                                                        
                                                        renderInput={(params) => (
                                                            <TextField size='small' {...params} type="date" fullWidth />
                                                        )}
                                                    />
                                                </LocalizationProvider> */}
                                                <LocalizationProvider className="date-controll" dateAdapter={AdapterMoment}>
                                                    <MobileDatePicker    
                                                        inputFormat="DD/MM/yyyy"                                 
                                                        value={ViewData?.dueDate}   
                                                        disabled                              
                                                        renderInput={(params) => (
                                                            <TextField {...params}  
                                                                size="small"
                                                                className="select-date"
                                                                fullWidth
                                                                InputProps={{                                                 
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <DateRangeIcon />
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider> 
                                            </TableCell>                                                   
                                        </TableRow>
                                    </TableBody>                       
                                </Table>
                            </TableContainer>
                        </Box> 

                        <Stack direction="column" spacing={1} sx={{mt:3}}>
                            <Typography className='header-title'>
                                Manager Comment
                            </Typography>

                            {
                                ViewData?.status !== "pending" ?

                                <TextField disabled size='small' multiline rows={2} value={ViewData?.comment} fullWidth/>   
                                
                            :
                                <TextField
                                    size='small'
                                    fullWidth
                                    multiline
                                    rows={3}
                                    placeholder="Comment"                   
                                    onChange={(e) =>  setComment(e.target.value)}
                                />
                            }
                            
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{mt:3}}>  
                            <Box sx={{flexGrow:1}} className='create-by-title'/>           
                            <Stack direction="row" spacing={1} className='create-by-title-mobile'>
                                <Typography className='header-title'>
                                    Create By :
                                </Typography>   
                                <Typography variant='body1'>
                                    {ViewData?.productionsBy?.first_name+' '+ViewData?.productionsBy?.last_name}
                                </Typography>              
                            </Stack> 
                        </Stack>

                        <Stack direction="row" spacing={1} sx={{mt:3}}>             
                            <Stack direction="row" spacing={1} className='create-by-title'>
                                <Typography className='header-title'>
                                    Create By :
                                </Typography>   
                                <Typography variant='body1'>
                                    {ViewData?.productionsBy?.first_name+' '+ViewData?.productionsBy?.last_name}
                                </Typography>              
                            </Stack>              
                                    
                            <Box sx={{flexGrow:1}} className='create-by-title'/>

                        {
                            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.approveProductions ?
                                <>
                                    {
                                        ViewData?.status === "pending" ?
                                            <Stack direction="row" spacing={2} >
                                                <Button 
                                                    sx={{boxShadow: "none"}} 
                                                    variant='contained' 
                                                    color='error'
                                                    onClick={()=>{handleUpdateStatus({status: "reject" , progress: "not started"})}}
                                                >
                                                    reject
                                                </Button>
                                                <Button 
                                                    sx={{boxShadow: "none"}} 
                                                    variant='contained'
                                                    className="btn-reject"
                                                    onClick={()=>{handleUpdateStatus({status: "approve" , progress: "in progress" })}}                
                                                >
                                                    Approve
                                                </Button> 
                                            </Stack>
                                        :
                                            null 
                                    }
                                </>
                            :
                                null
                        }
                            
                            
                            {
                                ViewData?.status === "approve" ?
                                    <Stack direction="row" spacing={1}>
                                        <Typography className='header-title'>
                                            Approve By :
                                        </Typography>   
                                        <Typography variant='body1'>
                                            {ViewData?.approveOrRejectBy?.first_name+' '+ViewData?.approveOrRejectBy?.last_name}
                                        </Typography>              
                                    </Stack>      
                                :
                                    null 
                            }

                            {
                                ViewData?.status === "reject" ?
                                    <Stack direction="row" spacing={1}>
                                        <Typography className='header-title'>
                                            Reject By :
                                        </Typography>   
                                        <Typography variant='body1'>
                                            {ViewData?.approveOrRejectBy?.first_name+' '+ViewData?.approveOrRejectBy?.last_name}
                                        </Typography>              
                                    </Stack>      
                                :
                                    null 
                            }

                                            
                        </Stack>
                                            
                       
            </DialogContentText>
        </DialogContent>       
    </Dialog>     
  );
}