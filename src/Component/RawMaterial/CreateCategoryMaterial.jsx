import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createcategorymaterial.scss';
import { IconButton, InputLabel , Stack, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { CREATE_RAW_CATEGORY , UPDATE_RAW_CATEGORY } from "../../Schema/rawmaterial";
import { useMutation } from "@apollo/client";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function CreateCategoryMaterial({
    editData,
    open,
    handleClose,
    btnTitle ,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    checkStatus,
}) {

    const [loading,setLoading] = React.useState(false);
        
    const [createRawMaterialCategory ] = useMutation(CREATE_RAW_CATEGORY , {
        onCompleted: ({createRawMaterialCategory}) => {
            // console.log(createRawMaterialCategory)
            if(createRawMaterialCategory?.success){
                setCheckMessage("success")
                setMessage(createRawMaterialCategory?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false);
                resetForm();
            } else {
                setLoading(false);
                setCheckMessage("error")
                setMessage(createRawMaterialCategory?.message)
                setAlert(true);
            }
        },
        onError: (error) => {     
            setLoading(false);       
            setCheckMessage("error")
            setMessage(error.message);
            
        }

    });


    const [updateRawMaterialCategory ] = useMutation(UPDATE_RAW_CATEGORY , {
        onCompleted: ({updateRawMaterialCategory}) => {
            // console.log(updateRawMaterialCategory)
            if(updateRawMaterialCategory?.success){
                setCheckMessage("success")
                setMessage(updateRawMaterialCategory?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false);
                resetForm();
            } else {
                setLoading(false);
                setCheckMessage("error")
                setMessage(updateRawMaterialCategory?.message)
                setAlert(true);
            }
        },
        onError: (error) => { 
            setLoading(false);           
            setCheckMessage("error")
            setMessage(error.message);
            setAlert(true);
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
            setLoading(true);
            console.log(values);
            
            if(checkStatus === "create") {
                createRawMaterialCategory({
                    variables: {
                        newRawMaterialCategory: {
                            ...values,
                        }                    
                    }                               
                })
            }

            if(checkStatus === "update") {
                updateRawMaterialCategory({
                    variables: {
                        id: editData?._id,
                        rawMaterialCategoryEdit: {
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

        <Dialog open={open} className="dialog-category-create-material">
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
                        <Typography variant='body2'>Please input each field below</Typography>
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
                                    placeholder='Name'
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
                                    placeholder='remark'
                                    {...getFieldProps("remark")}
                                    error={Boolean(touched.remark && errors.remark)}
                                    helperText={touched.remark && errors.remark}
                                />            
                            </Stack>
                            <Stack direction="column" spacing={1} sx={{mt:2}}>           
                               {
                                loading ?
                                    <Button  className="btn-update" sx={{boxShadow: "none"}} variant="contained">Loading...</Button>
                                :
                                    <Button  className="btn-update" sx={{boxShadow: "none"}} type='submit' variant="contained">{btnTitle}</Button>
                               }
                            </Stack>
                        </Form>    
                    </FormikProvider>
                    
            </DialogContentText>
        </DialogContent>       
    </Dialog>  
    );
}