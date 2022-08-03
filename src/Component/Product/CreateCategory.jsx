import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createcategory.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { CREATE_PRODUCT_CATEGORY , UPDATE_PRODUCT_CATEGORY } from "../../Schema/product";
import { useMutation } from '@apollo/client';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function CreateCategory({
    handleClose,
    open,
    btnTitle,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    checkStatus,
}) {

    const [loading,setLoading] = React.useState(false);

    const [createProductCategory] = useMutation(CREATE_PRODUCT_CATEGORY , {
        onCompleted: ({createProductCategory}) => {          
            if(createProductCategory?.success){
                setCheckMessage("success")
                setMessage(createProductCategory?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                resetForm();
                setLoading(false);
            } else {
                setLoading(false);
                setCheckMessage("error")
                setMessage(createProductCategory?.message)
                setAlert(true);
            }
        },
        onError: (error) => {    
            setLoading(false)        
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    const [updateProductCategory] = useMutation(UPDATE_PRODUCT_CATEGORY , {
        onCompleted: ({updateProductCategory}) => {         
            // console.log(updateProductCategory) 
            if(updateProductCategory?.success){
                setCheckMessage("success")
                setMessage(updateProductCategory?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false)
            } else {
                setLoading(false)
                setCheckMessage("error")
                setMessage(updateProductCategory?.message)
                setAlert(true);
            } 

        },
        onError: (error) => {    
            setLoading(false)        
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });




    // Formik
    const CreateCategory = Yup.object().shape({
        categoryName: Yup.string().required("categoryName is required!"),
        remark: Yup.string(),
    });
    
    const formik = useFormik({
        initialValues: {
            categoryName: editData?.categoryName,
            remark: editData?.remark,
        },
    
        validationSchema: CreateCategory,
        onSubmit: async (values, { setSubmitting, resetForm }) => {    
            setLoading(true)    
            // console.log(values)
            if(checkStatus === "create") {
                createProductCategory({
                    variables: {
                        newProductCategory: {
                            ...values,
                        }
                    }
                })
            }            

            if(checkStatus === "update") {
                updateProductCategory({
                    variables: {
                        id: editData?._id,
                        productCategoryEdit: {
                            ...values,
                        }
                    }
                })
            }

            
        },

    });  
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;
    // End Formik



    return (
        <Dialog open={open} className="dialog-create-category-product">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>        
                        <Typography className='header-title' variant="h6" >
                            Category
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
                                        Category Name
                                    </Typography>
                                    <TextField 
                                        size='small' 
                                        fullWidth
                                        placeholder='Category Name'
                                        {...getFieldProps("categoryName")}
                                        error={Boolean(touched.categoryName && errors.categoryName)}
                                        helperText={touched.categoryName && errors.categoryName}
                                    />            
                                </Stack>


                                <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Remark
                                    </Typography>
                                    <TextField 
                                        multiline
                                        rows={3}
                                        size='small' 
                                        fullWidth
                                        placeholder='Remark'
                                        {...getFieldProps("remark")}
                                        error={Boolean(touched.remark && errors.remark)}
                                        helperText={touched.remark && errors.remark}
                                    />            
                                </Stack>
                                <Stack direction="column" spacing={1} sx={{mt:2}}>           
                                    {
                                        loading ?
                                        <Button className="btn-update"  sx={{boxShadow: "none"}} variant="contained">loading...</Button>
                                        :
                                        <Button className="btn-update"  sx={{boxShadow: "none"}} type="submit" variant="contained">{btnTitle}</Button>
                                    }
                                </Stack>               
                                           
                               
                        </Form>
                    </FormikProvider>   

                </DialogContentText>
            </DialogContent>       
        </Dialog> 
  );
}