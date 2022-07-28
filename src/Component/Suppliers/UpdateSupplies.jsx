import React from 'react'
import {Stack, Grid, Typography, Box, IconButton, TextField, Button} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import './suppliesadd.scss';
import { useMutation } from '@apollo/client';
import {UPDATE_SUPPLIES} from '../../Schema/supplies';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function UpdateSupplies({
    setRefetch,
    handleClose,
    open,
    newData,
    setAlert,
    setMessage,
    setCheckMessage
  }) {
  
    // console.log(newData, 'list')
    const [updateSupplier] = useMutation(UPDATE_SUPPLIES,{
        onCompleted:({updateSupplier})=>{
            setAlert(true)
            setCheckMessage('success')
            setMessage(updateSupplier?.message)
            handleClose();
            setRefetch();
        }, 
        onError(error){
            setCheckMessage('error')
            setMessage(error?.message)
            setAlert(true)
        }
    })

    const SuppliesUpdate = Yup.object().shape({
        name: Yup.string().required("Name is required!"),        
        email: Yup.string().email('Must be a valid email'),
        phoneNumber: Yup.string(),
        address:Yup.string(),
    });
    
      const formik = useFormik({
        initialValues: {
            name: newData?.name,             
            email: newData?.email,
            phoneNumber: newData?.phoneNumber,
            address: newData?.address,                    
        },
    
        validationSchema: SuppliesUpdate,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
         console.log(values)
          updateSupplier({
            variables:{
              id: newData?._id,
              supplierEdit: {
               ...values,
              }
            }
            
          })
        },
      });
    
  const {errors,touched, values,  isSubmitting, checkProp, handleSubmit,getFieldProps,setFieldValue,resetForm,} = formik;

  return (

    <Dialog open={open} className="dialog-create-supplies">
        <DialogTitle id="alert-dialog-title">
              <Stack direction="row" spacing={2}> 
                  <Typography variant='h6' className="title" > Supplies </Typography> 
                  <Box sx={{flexGrow:1}}/>
                  <IconButton onClick={()=>handleClose()}>
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
                      
                          
                          
                          <Stack direction="column" spacing={2}>
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
                                <Typography className="Sub-title"> Email </Typography>
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
                                <Typography className="Sub-title"> Phone Number </Typography>
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
                                  <Button className="btn-create" sx={{boxShadow: "none"}}  variant='contained' fullWidth type='submit'>
                                      Update    
                                  </Button>
                              </Stack>
                        </Stack>
                       
                  </Form>
                </FormikProvider>
                
            </DialogContentText>
        </DialogContent>       
    </Dialog>
  );
}
