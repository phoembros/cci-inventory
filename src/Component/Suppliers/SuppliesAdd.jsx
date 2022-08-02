import React from 'react'
import {Stack, Grid, Typography, Box, IconButton, TextField, Button} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import './suppliesadd.scss';
import {useMutation} from "@apollo/client";
import {CREATE_NEW_SUPPLIES} from "../../Schema/supplies";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function SuppliesAdd({
    setAlert,
    setMessage,
    setCheckMessage,
    open,
    handleClose,     
    setRefetch,
}) {

  const [createSupplier] = useMutation(CREATE_NEW_SUPPLIES,{
    onCompleted: ({createSupplier}) =>{
        // console.log(createSupplier)
        if(createSupplier?.success){
          setAlert(true)
          setCheckMessage('success');
          setMessage(createSupplier?.message);
          handleClose();   
          setRefetch();
        } else {
          setAlert(true)
          setCheckMessage('error');
          setMessage(createSupplier?.message);
        }      
    }, 
    onError: (error) => {
      // console.log(error.message)
      setCheckMessage('error')
      setMessage(error.message)
    }
    
  })
    const AddSupplies = Yup.object().shape({
        name: Yup.string().required("Name is required!"),        
        email: Yup.string().email('Must be a valid email'),
        phoneNumber: Yup.string(),
        address:Yup.string(),
      });
    
      const formik = useFormik({
        initialValues: {
            name:  "",           
            email: "",
            phoneNumber: "",
            address: "",
        },
    
        validationSchema: AddSupplies,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
          console.log(values,'value')
          createSupplier({
            variables:{
              newSupplier: {
                ...values,
              }
            }
          })

        },
      });
    
  const {errors,touched, values,  isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm,} = formik;    

  return (

    <Dialog open={open} className="dialog-create-supplies">
        <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={2}> 
                        <Typography variant='h6' className="title" > Supplier </Typography> 
                        <Box sx={{flexGrow:1}}/>
                        <IconButton onClick={handleClose}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                        </IconButton>    
                </Stack>

                <Stack direction="row" spacing={5} sx={{mb:1}}>
                    <Typography variant='body2'>Please input each field below</Typography>
                </Stack>  
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">   


                <FormikProvider value={formik}>
                    <Form noValidate autoComplete='off' onSubmit={handleSubmit} >                    
                          
                          <Stack direction="column" spacing={2} >
                              <Grid xs={12} md={12}>
                                  <Typography className="Sub-title">Name</Typography>
                                  <TextField
                                      size="small"
                                      fullWidth
                                      placeholder='Name'
                                      {...getFieldProps("name")}
                                      error={Boolean(touched.name && errors.name)}
                                      helperText={touched.name && errors.name}
                                  />
                              </Grid>                    
                              
                              <Grid xs={12} md={12}>
                                <Typography className="Sub-title">Email</Typography>
                                  <TextField
                                      size="small"
                                      fullWidth
                                      placeholder='Email'
                                      {...getFieldProps("email")}
                                      error={Boolean(touched.email && errors.email)}
                                      helperText={touched.email && errors.email}
                                  />
                              </Grid>

                              <Grid xs={12} md={12}>
                                <Typography className="Sub-title">Phone Number</Typography>
                                  <TextField
                                      size="small"
                                      fullWidth
                                      placeholder='Phone Number'
                                      {...getFieldProps("phoneNumber")}
                                      error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                      helperText={touched.phoneNumber && errors.phoneNumber}
                                  />
                              </Grid>

                              <Grid xs={12} >
                                <Typography className="Sub-title"> Address </Typography>
                                  <TextField
                                      size="small"
                                      fullWidth
                                      placeholder='address'
                                      {...getFieldProps("address")}
                                      error={Boolean(touched.address && errors.address)}
                                      helperText={touched.address && errors.address}
                                  />
                              </Grid>
                              
                              <Stack direction='row' spacing={2}>
                                  <Button className="btn-createsp" sx={{boxShadow: "none"}}  variant='contained' fullWidth type='submit'>
                                      Add    
                                  </Button>
                              </Stack>
                        </Stack>
                      
                  </Form>
                </FormikProvider>

            </DialogContentText>
        </DialogContent>       
    </Dialog>     

  )
}
