import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createcategory.scss';
import { FormControl, Icon, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { CREATE_PRODUCT_GROUP , UPDATE_PRODUCT_GROUP } from "../../Schema/product";
import { useMutation } from '@apollo/client';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useLocation } from 'react-router-dom';


export default function ModalProductGroup({
    handleClose,
    open,
    btnTitle,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    checkStatus,
    productUnit,
}) {

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [productId, setProductId] = React.useState(params.get("id"));
   
    React.useEffect( () => {
        setProductId(params.get("id"));         
    }, [location.search]);
    // End get Id Storage Room


    const [createProductGroup] = useMutation(CREATE_PRODUCT_GROUP , {
        onCompleted: ({createProductGroup}) => {          
            if(createProductGroup?.success){
                setCheckMessage("success")
                setMessage(createProductGroup?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                resetForm();
            } 
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    const [updateProductGroup] = useMutation(UPDATE_PRODUCT_GROUP , {
        onCompleted: ({updateProductGroup}) => {         
            // console.log(updateProductGroup) 
            if(updateProductGroup?.success){
                setCheckMessage("success")
                setMessage(updateProductGroup?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                resetForm();
            } else {
                setCheckMessage("error")
                setMessage(updateProductGroup?.message)
                setAlert(true);
            } 

        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });



    // Formik
    const CreateCategory = Yup.object().shape({
        name: Yup.string().required("Name is required!"),
        quantityPerStockUM: Yup.number(),
        unitPrice: Yup.number().required("Unit Price is required!"),
        groupBy: Yup.string(),
    });
    
    const formik = useFormik({
        initialValues: {
            name: "",
            quantityPerStockUM: 0,
            unitPrice: 0,
            groupBy: productId,
        },
    
        validationSchema: CreateCategory,
        onSubmit: async (values, { setSubmitting, resetForm }) => {        
            console.log(values)

            if(checkStatus === "create") {
                createProductGroup({
                    variables: {
                        newProductGroup: {
                            ...values,
                        }
                    }
                })
            }            

            if(checkStatus === "update") {
                updateProductGroup({
                    variables: {
                        id: editData?._id,
                        productGroupEdit: {
                            ...values,
                        }
                    }
                })
            }            
            
        },

    });  
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;
    // End Formik

    React.useEffect( () => {
        if(editData){
            setFieldValue("name", editData?.name);
            setFieldValue("unitPrice", editData?.unitPrice);
            setFieldValue("quantityPerStockUM" , editData?.quantityPerStockUM);
        }        
    },[editData])


    return (
        <Dialog open={open} className="dialog-create-category-product">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>        
                        <Typography className='header-title' variant="h6" >
                            Product Group
                        </Typography>
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={() => handleClose()}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                    </Stack>   
                    
                    <Stack direction="row" spacing={5}>
                        <Typography variant='body2'>
                            Please input each field below
                        </Typography>
                    </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">  
    
                    <FormikProvider value={formik}>
                        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                           
                                <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Name
                                    </Typography>
                                    <TextField 
                                        size='small' 
                                        fullWidth
                                        placeholder='Name'
                                        {...getFieldProps("name")}
                                        error={Boolean(touched.name && errors.name)}
                                        helperText={touched.name && errors.name}
                                    />            
                                </Stack>

                                <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Quantity/StockUM
                                    </Typography>
                                    <TextField 
                                        size='small' 
                                        type="number"
                                        fullWidth
                                        placeholder='0'
                                        {...getFieldProps("quantityPerStockUM")}
                                        error={Boolean(touched.quantityPerStockUM && errors.quantityPerStockUM)}
                                        helperText={touched.quantityPerStockUM && errors.quantityPerStockUM}
                                        InputProps={{                                  
                                            endAdornment: (
                                                <InputAdornment position="end">                                             
                                                    {productUnit}                                         
                                                </InputAdornment>
                                            ),                                                                                           
                                        }}
                                    />            
                                </Stack>

                                <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Unit Price
                                    </Typography>
                                    <TextField 
                                        size='small' 
                                        type="number"
                                        fullWidth                                      
                                        {...getFieldProps("unitPrice")}
                                        error={Boolean(touched.unitPrice && errors.unitPrice)}
                                        helperText={touched.unitPrice && errors.unitPrice}
                                        InputProps={{                                  
                                            startAdornment: (
                                                <InputAdornment position="start">                                             
                                                    $                                         
                                                </InputAdornment>
                                            ),   
                                            inputProps: { min: 1 },                                                                                        
                                        }}
                                    />            
                                </Stack>

                                <Stack direction="column" spacing={1} sx={{mt:2}}>           
                                    <Button className="btn-update"  sx={{boxShadow: "none"}} type="submit" variant="contained">{btnTitle}</Button>
                                </Stack>               
                                           
                               
                        </Form>
                    </FormikProvider>   

                </DialogContentText>
            </DialogContent>       
        </Dialog> 
  );
}