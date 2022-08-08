import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createproduction.scss';
import { Autocomplete, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
//icon progress
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// Schema
import { useLazyQuery, useQuery } from "@apollo/client";
import { useMutation } from '@apollo/client';
import { GET_STORAGE_ROOM_PAGINATION } from "../../Schema/starageroom";
import { GET_PRODUCT_WITH_PAGINATION , GET_PRODUCT_BYID } from '../../Schema/product';
import { CREATE_PRODUCTION } from '../../Schema/production';
// getuser Login
import { GET_USER_LOGIN } from '../../Schema/user';
import { GET_STORAGE_ROOM_PRODUCT } from '../../Schema/starageroom';
import { GET_CUSTOMER_PAGINATION } from "../../Schema/sales";

import moment from "moment"

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { sendMessage } from '../TelegrameClient/TelegrameClient';

import { ESTIMATE_PRODUCTION } from '../../Schema/production';

export default function CreateProduction({
    nameRequest,
    handleClose,
    open,
    btnTitle,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {
   
    const [loading,setLoading] = React.useState(false);

    const [estimateSuccess,setEstimateSuccess] = React.useState(false);
    const [estimateUnit,setEstimateUnit] = React.useState(false);

    const [estimateProduction , { data: dataEsstimate } ] = useMutation(ESTIMATE_PRODUCTION,{
        onCompleted: ({estimateProduction}) => {
            setEstimateSuccess(true);
            // console.log(estimateProduction)
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    const [createProductions] = useMutation(CREATE_PRODUCTION , {
        onCompleted: async ({createProductions}) => { 
            console.log(createProductions)         
            if(createProductions?.success){
                setCheckMessage("success")
                setMessage(createProductions?.message)
                setAlert(true);
                handleClose();
                setRefetch();   
                resetForm();
                setLoading(false)
                
                // await sendMessage({content: `<b>[Request Create Production]</b>\n👩‍🚀 <i>${nameRequest}</i>\n\n${createProductions?.data?.production?.productId?.productName} (x${createProductions?.data?.qty} ${createProductions?.data?.production?.productId?.unit})\n\n🗓 Date:${moment(createProductions?.data?.createdAt).format("DD/MMM/YYYY")}\n<code>For details info please kindly check system.</code>\n<a href="https://system.cci-cambodia.com/">system.cci-cambodia.com</a>`})

            } else {
                setLoading(false)
                setCheckMessage("error")
                setAlert(true);
                setMessage(createProductions?.message)                
            }
        },
        onError: (error) => {   
            setLoading(false)         
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

      
    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;


    // Get Product
    const [product,setProduct] = React.useState([]);
    const { data: dataProduct } = useQuery(GET_PRODUCT_WITH_PAGINATION , {
        variables: {           
            keyword: "",
            pagination: false,
        },
        pollInterval: 1000,
    })   

    React.useEffect( () => {
        if(dataProduct?.getProductPagination?.products){
            // console.log(dataProduct?.getProductPagination?.products)
            let rows = [];
            dataProduct?.getProductPagination?.products?.forEach( (element) => {
                const allrow = {
                    label: element?.productName,
                    qtyOnHand: element?.totalStockAmount,
                    _id: element?._id,
                    unit: element?.unit,
                };
                rows.push(allrow);
            });
            setProduct(rows);
        }
    },[dataProduct?.getProductPagination?.products])    
    

    
    // get Product Infor by ID  
    const [productById,setProductById] = React.useState({})
    const [getProductById, { data: dataProductById }] = useLazyQuery(GET_PRODUCT_BYID);


    const [dataIngredientView,setDataIngredientView] = React.useState([])

    React.useEffect( () => {
        console.log(dataProductById?.getProductById)
        if(dataProductById?.getProductById){
            setProductById(dataProductById?.getProductById)
            // setDataIngredientView(productById?.ingredients)
        }
    },[dataProductById?.getProductById])   
   
    React.useEffect( () => {
        setProductById({})
    },[])


    // Get Storage Room
    const [storageRoom,setStorageRoom] = React.useState([])
    const { data , refetch } = useQuery(GET_STORAGE_ROOM_PRODUCT,{
        pollInterval: 1000,
    })

    React.useEffect( () => {
        if(data?.getStorageRoomProducts){
            // console.log(data?.getStorageRoomProducts, "Storage Room")
            let rows = [];
            data?.getStorageRoomProducts?.forEach((element) => {
                const allrow = {
                    label: element?.name,
                    _id: element?._id,
                };
                rows.push(allrow);
            });
            setStorageRoom(rows);
        }
    },[data?.getStorageRoomProducts])    
    


    // Get Customer Data
    const [customerId,setCustomerId] = React.useState(null);
    const [customer,setCustomer] = React.useState([]);
    const { data: dataCustomer } = useQuery(GET_CUSTOMER_PAGINATION , {
        variables: {
            keyword: "",
            pagination: false,
        },
        pollInterval: 1000,        
    })

    React.useEffect( () => {
        if(dataCustomer?.getCustomerPagination?.customers){            
            let rows = [];
            dataCustomer?.getCustomerPagination?.customers?.forEach((element) => {
                const allrow = {
                    label: element?.name,
                    _id: element?._id,
                };
                rows.push(allrow);
            });
            setCustomer(rows);
        }
    },[dataCustomer?.getCustomerPagination?.customers]) 
    
   
    // Formik
    const createProduction = Yup.object().shape({        
        storageRoomId: Yup.string().required("Storage Room is required!"),
        customerId: Yup.string().required("Customer is required!"),
        startDate: Yup.date(),
        dueDate: Yup.date(),
        priority: Yup.string(),
        qty: Yup.number().min(1 , "Can't under 1"),
        productName: Yup.string(),
        productId: Yup.string().required("Product is required!"),
        qtyOnHand: Yup.number(),
        progress: Yup.string(),
        comment: Yup.string(),
        remark: Yup.string(),
    });
    
    const formik = useFormik({
        initialValues: {            
            storageRoomId: "",  
            customerId: "",
            startDate: new Date(),
            dueDate: new Date(),
            priority: "urgent",
            qty: 1,
            productId: "",
            productName: "",
            qtyOnHand: 0,
            progress: "not started",
            comment: "",
            remark: "",
        },

        validationSchema: createProduction,
        onSubmit: async (values, { setSubmitting, resetForm }) => {

            setLoading(true);
                        
            const newValue = {
                storageRoomId: values?.storageRoomId,
                startDate: values?.startDate,
                dueDate: values?.dueDate,
                productionsBy: userId,
                customerId: values?.customerId,
                workOrders: values?.customerId !== null ? true : false,
                // approveBy: "",                
                status: "pending",
                // progress: values?.progress,
                remark: values?.remark,
                priority: values?.priority,              
                production: {
                    productId: values?.productId,
                    productName: values?.productName,
                    qtyOnHand: parseInt(values?.qtyOnHand),
                },    
                completedQtyUM: null,
                qty: parseInt(values?.qty),  
                comment: values?.comment,             
            }

            // console.log(newValue)
        
            createProductions({
                variables: {
                    newProductions: {
                        ...newValue,
                    }
                }
            })
                 
                   
        },

    });  
    
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;
    // End Formik

       
  return (
        <Dialog open={open} className="dialog-production-create">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>             
                        <Typography className='header-title' variant="h6" >
                            Production
                        </Typography>            
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={() => handleClose()}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                    </Stack>   
                    <Stack direction="row" spacing={5} sx={{mt:-1 , mb:2}}>             
                        <Typography variant="body2" >
                            Please input each field:
                        </Typography>           
                    </Stack>  
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 

                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>    
                                                          
                                <Stack direction="row" spacing={2} sx={{ mt:1 , mb:1 }}>
                                    <Box sx={{width:"170px"}}>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={storageRoom}                        
                                            onChange={(e, value) => setFieldValue("storageRoomId", value?._id)}
                                            renderInput={(params) => 
                                                <TextField  
                                                    fullWidth
                                                    {...params} size="small" label="Storage Room" 
                                                    error={Boolean(touched.storageRoomId && errors.storageRoomId)}
                                                    helperText={touched.storageRoomId && errors.storageRoomId}
                                                />
                                            }
                                        />                    
                                    </Box>
                                    <Box sx={{flexGrow:1}}/>
                                    <Box sx={{width:"170px"}}>
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={customer}                        
                                            onChange={ (e, value) => setFieldValue("customerId",value?._id) }
                                            renderInput={(params) => 
                                                <TextField fullWidth  {...params}  size="small"  label="Customer" 
                                                    error={Boolean(touched.customerId && errors.customerId)}
                                                    helperText={touched.customerId && errors.customerId}
                                                />
                                            }
                                        />                    
                                    </Box>
                                </Stack>
                                                
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
                                                        
                                                        <Autocomplete
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={product}                        
                                                            onChange={(e, value) => {
                                                                setFieldValue( "productId" , value?._id )
                                                                setFieldValue( "productName" , value?.label)
                                                                setFieldValue( "qtyOnHand" , value?.qtyOnHand )   
                                                                getProductById({ variables: { productId: value?._id } })  
                                                                estimateProduction({ variables: {  productId: value?._id } }) 
                                                                setEstimateUnit(value?.unit)  
                                                                if(value?.label === undefined){
                                                                    setEstimateSuccess(false);
                                                                }         
                                                            }}
                                                            renderInput={(params) => <TextField {...params}
                                                                    placeholder="Product Name" size="small"
                                                                    error={Boolean(touched.productId && errors.productId)}
                                                                    helperText={touched.productId && errors.productId}
                                                            />}
                                                        /> 
                                                    
                                                    </TableCell>
                                                    <TableCell className="body-title"></TableCell>
                                                    <TableCell className="body-title" component="th" align='center' width="15%" >
                                                        <TextField 
                                                            size='small' 
                                                            type="number"
                                                            fullWidth
                                                            InputProps={{                                 
                                                                inputProps: { min: 1 },
                                                            }}
                                                            {...getFieldProps("qty")}
                                                            error={Boolean(touched.qty && errors.qty)}
                                                            helperText={touched.qty && errors.qty}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="body-title"></TableCell>
                                                    <TableCell className="body-title" width="15%" align='center'>
                                                        {
                                                            productById?.durationProduce ?
                                                                <TextField value={`${productById?.durationProduce*values?.qty}min`} size='small' fullWidth />
                                                            : 
                                                                <TextField disabled  size='small' fullWidth />
                                                        }                                        
                                                    </TableCell>                                                      
                                                </TableRow>
                                            </TableBody>                       
                                        </Table>
                                    </TableContainer>

                                {
                                    estimateSuccess ?
                                        <TableContainer >
                                            <Table className="table-top" aria-label="simple table">
                                                <TableHead >
                                                    <TableRow className="header-row">
                                                        <TableCell className="header-title-warning" colSpan={5}>
                                                            You can produce this product only {dataEsstimate?.estimateProduction} {estimateUnit}, Base on raw materail.
                                                        </TableCell> 
                                                    </TableRow>
                                                </TableHead>
                                            </Table>
                                        </TableContainer>
                                    : null
                                }
                                    

                                    <TableContainer >
                                        <Table className="table" aria-label="simple table">
                                            <TableHead >
                                                <TableRow className="header-row">
                                                    <TableCell className="header-title">Raw Materail</TableCell>                            
                                                    <TableCell className="header-title">QTY</TableCell>  
                                                    <TableCell className="header-title"></TableCell>                                                       
                                                </TableRow>
                                            </TableHead>
                                        {
                                            values?.productId !== "" ?
                                                <>
                                                    { productById?.ingredients?.map((row , index) => (
                                                        <TableBody key={index} component={Paper} className="body" >                        
                                                            <TableRow  className="body-row">                                
                                                                <TableCell className="body-title" component="th" scope="row" > {row?.rawMaterialId?.materialName} </TableCell>
                                                                <TableCell className="body-title" >{ (row?.amount*values?.qty)?.toFixed(2)} {row?.rawMaterialId?.unit}</TableCell>    
                                                                <TableCell className="body-title" ></TableCell>                                                   
                                                            </TableRow>
                                                        </TableBody>                        
                                                    ))}
                                                </>
                                            :
                                                null
                                        }                                                                                    
                                            
                                        </Table>
                                    </TableContainer>

                                    
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
                                                        <FormControl fullWidth size="small">                                    
                                                            <Select                                                        
                                                                {...getFieldProps("progress")}
                                                                error={Boolean(touched.progress && errors.progress)}
                                                                helperText={touched.progress && errors.progress} 
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
                                                        <FormControl fullWidth size="small">                                    
                                                            <Select                                              
                                                                {...getFieldProps("priority")}
                                                                error={Boolean(touched.priority && errors.priority)}
                                                                helperText={touched.priority && errors.priority} 
                                                            >
                                                                <MenuItem value="urgent">
                                                                    <Stack direction="row" spacing={1}>
                                                                        <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                                                                        <Typography>Urgent</Typography>
                                                                    </Stack>
                                                                </MenuItem>
                                                                {/* <MenuItem value="important">
                                                                    <Stack direction="row" spacing={1}>
                                                                        <PriorityHighIcon sx={{color:"red", width:"17px"}} />
                                                                        <Typography>Important</Typography>
                                                                    </Stack>                                            
                                                                </MenuItem> */}
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
                                                        <LocalizationProvider className="date-controll" dateAdapter={AdapterDateFns} >
                                                            <DatePicker  
                                                                onChange={(e)=> setFieldValue("startDate", e)}
                                                                renderInput={(params) => (
                                                                    <TextField size='small' {...params} type="date" fullWidth />
                                                                )}                       
                                                                value={values.startDate}
                                                            />
                                                        </LocalizationProvider>                                        
                                                    </TableCell>   
                                                    <TableCell className="body-title" width="25%" align='center'>
                                                        <LocalizationProvider className="date-controll" dateAdapter={AdapterDateFns} >
                                                            <DatePicker  
                                                                onChange={(e)=> setFieldValue("dueDate", e)}
                                                                renderInput={(params) => (
                                                                    <TextField size='small' {...params} type="date" fullWidth />
                                                                )}                       
                                                                value={values.dueDate}
                                                            />
                                                        </LocalizationProvider>
                                                    </TableCell>                                                   
                                                </TableRow>
                                            </TableBody>                       
                                        </Table>
                                    </TableContainer>
                                </Box> 

                                <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Remark
                                    </Typography>
                                    <TextField 
                                        multiline
                                        size='small' 
                                        fullWidth
                                        placeholder='Remark'
                                        {...getFieldProps("remark")}
                                        error={Boolean(touched.remark && errors.remark)}
                                        helperText={touched.remark && errors.remark}
                                    />            
                                </Stack>

                                {/* <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Manager Comment
                                    </Typography>
                                    <TextField 
                                        multiline
                                        size='small' 
                                        fullWidth
                                        placeholder='Comment'
                                        {...getFieldProps("comment")}
                                        error={Boolean(touched.comment && errors.comment)}
                                        helperText={touched.comment && errors.comment}
                                    />            
                                </Stack> */}

                                
                                        
                                {/* <Stack direction="row" spacing={2} sx={{mt:2}}>
                                    <Stack direction="column" spacing={1} width="40%">
                                        <Typography className='header-title'>
                                            Create By
                                        </Typography>
                                        <Typography> Mr. CHANDA </Typography>     
                                    </Stack>   
                                    <Box sx={{flexGrow:1}}/>
                                    <Stack direction="column" spacing={1} width="40%">
                                        <Typography className='header-title'>
                                            Approve By
                                        </Typography>
                                        <Typography> Mr. CHANDA </Typography>      
                                    </Stack>                          
                                </Stack> */}
                                <Stack direction="row" spacing={2} sx={{mt:2}}>
                                    {
                                        loading ?
                                        <Button className="btn-create" sx={{boxShadow: "none"}} variant='contained' fullWidth>Loading...</Button>                                            
                                    :
                                        <Button className="btn-create" sx={{boxShadow: "none"}} type='submit' variant='contained' fullWidth>{btnTitle}</Button>                                        
                                    }
                                
                                </Stack>
                                
                            
                        </Form>
                    </FormikProvider>    

            </DialogContentText>
        </DialogContent>       
    </Dialog>  

  );
}