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


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}
  
const rows = [
    createData('Frozen yoghurt',24,"Cosmetic" ,  4.0),
    createData('Ice cream sandwich',37,"Cosmetic",   4.3),
    createData('Eclair',24,"Cosmetic" ,  6.0),
    createData('Cupcake',67,"Cosmetic" ,  4.3),    
];


export default function CreateProduction({
    handleClose,
    btnTitle,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
}) {

    const [createProductions] = useMutation(CREATE_PRODUCTION , {
        onCompleted: ({createProductions}) => {          
            if(createProductions?.success){
                setCheckMessage("success")
                setMessage(createProductions?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setAlert(true);
                setMessage(createProductions?.message)                
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;
    // End Get User ID

    // Get Product
    const [product,setProduct] = React.useState([]);
    const { data: dataProduct } = useQuery(GET_PRODUCT_WITH_PAGINATION , {
        variables: {           
            keyword: "",
            pagination: false,
        }
    })   

    React.useEffect( () => {
        if(dataProduct?.getProductPagination?.products){
            let rows = [];
            dataProduct?.getProductPagination?.products?.forEach((element) => {
                const allrow = {
                    label: element?.productName,
                    qtyOnHand: element?.totalStockAmount,
                    _id: element?._id,
                };
                rows.push(allrow);
            });
            setProduct(rows);
        }
    },[dataProduct?.getProductPagination?.products])    
    // End Get Product

    // get Product Infor by ID  
    const [productById,setProductById] = React.useState({})
    const [getProductById, { data: dataProductById }] = useLazyQuery(GET_PRODUCT_BYID);

    React.useEffect( () => {
        console.log(dataProductById?.getProductById)
        if(dataProductById?.getProductById){
            setProductById(dataProductById?.getProductById)
        }
    },[dataProductById?.getProductById])   
    // ENd Get Info

    // Get Storage Room
    const [storageRoom,setStorageRoom] = React.useState([])
    const { data , refetch } = useQuery(GET_STORAGE_ROOM_PAGINATION, {
        variables: {          
          keyword: "",
          pagination: false,
        },
    })

    React.useEffect( () => {
        if(data?.getStorageRoomWithPagination?.storageRoom){
            // console.log(data?.getStorageRoomWithPagination?.storageRoom, "Storage Room")
            let rows = [];
            data?.getStorageRoomWithPagination?.storageRoom?.forEach((element) => {
                const allrow = {
                    label: element?.name,
                    _id: element?._id,
                };
                rows.push(allrow);
            });
            setStorageRoom(rows);
        }
    },[data?.getStorageRoomWithPagination?.storageRoom])    
    // End Get Storage Room

   
    // Formik
    const createProduction = Yup.object().shape({        
        storageRoomId: Yup.string(),
        startDate: Yup.date(),
        dueDate: Yup.date(),
        priority: Yup.string(),
        qty: Yup.number(),
        productName: Yup.string(),
        productId: Yup.string(),
        qtyOnHand: Yup.number(),
        progress: Yup.string(),
        comment: Yup.string(),
        remark: Yup.string(),
    });
    
    const formik = useFormik({
        initialValues: {            
            storageRoomId: "",
            startDate: new Date(),
            dueDate: new Date(),
            priority: "urgent",
            qty: 0,
            productId: "",
            productName: "",
            qtyOnHand: 0,
            progress: "not started",
            comment: "",
            remark: "",
        },

        validationSchema: createProduction,
        onSubmit: async (values, { setSubmitting, resetForm }) => {   
                     
            const newValue = {
                storageRoomId: values?.storageRoomId,
                startDate: values?.startDate,
                dueDate: values?.dueDate,
                productionsBy: userId,
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
                qty: parseInt(values?.qty),  
                comment: values?.comment,             
            }
            console.log(newValue)
        
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
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>    
            <Box className='production-create'>
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
            
                <Box sx={{width:"35%"}}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={storageRoom}                        
                        onChange={(e, value) => setFieldValue( "storageRoomId" , value?._id )}
                        renderInput={(params) => <TextField {...params} size="small" label="Storage Room" />}
                    />                    
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
                                        
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={product}                        
                                            onChange={(e, value) => {
                                                setFieldValue( "productId" , value?._id )
                                                setFieldValue( "productName" , value?.label)
                                                setFieldValue( "qtyOnHand" , value?.qtyOnHand )   
                                                getProductById({ variables: { productId: value?._id } })                 
                                            }}
                                            renderInput={(params) => <TextField {...params} size="small" label="Category" />}
                                        /> 
                                    
                                    </TableCell>
                                    <TableCell className="body-title"></TableCell>
                                    <TableCell className="body-title" component="th" align='center' width="15%" >
                                        <TextField 
                                            size='small' 
                                            fullWidth
                                            {...getFieldProps("qty")}
                                            error={Boolean(touched.qty && errors.qty)}
                                            helperText={touched.qty && errors.qty}
                                        />
                                    </TableCell>
                                    <TableCell className="body-title"></TableCell>
                                    <TableCell className="body-title" width="15%" align='center'>
                                        {
                                            productById?.durationProduce ?
                                                <TextField value={`${productById?.durationProduce*values?.qty}s`} size='small' fullWidth />
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
                            {productById?.ingredients?.map((row , index) => (
                                <TableBody key={index} component={Paper} className="body" >                        
                                    <TableRow  className="body-row">                                
                                        <TableCell className="body-title" component="th" scope="row" > {row?.rawMaterialId?.materialName} </TableCell>
                                        <TableCell className="body-title" >{row?.amount*values?.qty}{row?.rawMaterialId?.unit}</TableCell>    
                                        <TableCell className="body-title" ></TableCell>                                                   
                                    </TableRow>
                                </TableBody>                        
                            ))}
                        </Table>
                    </TableContainer>

                    
                    <TableContainer >
                        <Table className="table-buttom" aria-label="simple table">
                            <TableHead >
                                <TableRow className="header-row">
                                    <TableCell className="header-title">Progress</TableCell>                            
                                    <TableCell className="header-title">Prirority</TableCell>  
                                    <TableCell className="header-title">Start Date</TableCell>  
                                    <TableCell className="header-title">Due Date</TableCell>                                                    
                                </TableRow>
                            </TableHead>                    
                            <TableBody component={Paper} className="body" >                        
                                <TableRow  className="body-row">
                                    <TableCell className="body-title" component="th" scope="row" width="25%" >
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
                                                {/* <MenuItem value="in progress">
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
                                                </MenuItem>                                         */}
                                            </Select>
                                        </FormControl>
                                    </TableCell>
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
                    <Button type='submit' variant='contained' fullWidth>{btnTitle}</Button>                                            
                </Stack>
                
            </Box>   
        </Form>
    </FormikProvider>     
  );
}