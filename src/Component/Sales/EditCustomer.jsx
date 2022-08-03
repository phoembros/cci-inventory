import * as  React from 'react';
import {Stack, Grid, Typography, Box, IconButton, TextField, Button} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import './customersetup.scss';
import {UPDATE_SETUP_CUSTOMER} from '../../Schema/sales';
import {useMutation} from '@apollo/client';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function EditCustomer({
  setRefetch,
  handleClose,
  open,
  DataCustomer,
  setAlert,
  setMessage,
  setCheckMessage,
}) {

  const [loading,setLoading] = React.useState(false);

  // console.log(DataCustomer, 'da')
  const [updateCustomer] = useMutation(UPDATE_SETUP_CUSTOMER, {
    onCompleted: ({ updateCustomer }) => {
      console.log(updateCustomer?.message, "message");
      if(updateCustomer?.success){
        setCheckMessage('success')
        setMessage(updateCustomer?.message)
        setAlert(true)
        setRefetch()
        handleClose()
        setLoading(false)
    } else {
        setLoading(false)
        setCheckMessage('error')
        setMessage(updateCustomer?.message)
        setAlert(true)
    }
      
    },
    onError: (error) => {
      setLoading(false)    
      setCheckMessage('error')
      setMessage(error?.message)
      setAlert(true)
    },

  });
  const SetupAdd = Yup.object().shape({
    cusId: Yup.string().required("Customer ID is required!"),
    name: Yup.string().required("Name is required!"),
    email: Yup.string(),
    address: Yup.string(),
    phoneNumber: Yup.number(),
  });

  const formik = useFormik({
    initialValues: {
      name: DataCustomer?.name,
      email: DataCustomer?.email,
      address: DataCustomer?.address,
      phoneNumber:DataCustomer?.phoneNumber,
      cusId: DataCustomer?.cusId,
    },

    validationSchema: SetupAdd,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values, 'test')
      setLoading(true)

      updateCustomer({
        variables: {
          id: DataCustomer?._id,
          customerEdit:{
            ...values
          }
        },
      });
    },
  });

  const {
    errors,
    touched,
    values,
    isSubmitting,
    checkProp,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    resetForm,
  } = formik;

  return (


    <Dialog open={open} className="dialog-create-customer">
        <DialogTitle id="alert-dialog-title">
            <Stack direction="row" spacing={2}>
              <Typography variant="h6" className="title">                      
                Edit Customer
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={() => handleClose()}>
                <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
              </IconButton>
            </Stack>  
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">   

              <FormikProvider value={formik}>
                <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  
                    
                    <Stack direction="column" spacing={2}>

                      <Grid xs={12} md={12}>
                          <Typography className="field">ID</Typography>
                          <TextField                               
                              required
                              size="small"
                              fullWidth
                              placeholder="ID"
                              {...getFieldProps("cusId")}
                              error={Boolean(touched.cusId && errors.cusId)}
                              helperText={touched.cusId && errors.cusId}
                          />
                      </Grid>

                      <Grid xs={12} md={12}>
                        <Typography className="field"> Name</Typography>
                        <TextField
                          id="name"
                          required
                          size="small"
                          fullWidth
                          placeholder="name"
                          {...getFieldProps("name")}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>

                      <Grid xs={12} md={12}>
                        <Typography className="field"> Email</Typography>
                        <TextField
                          id="email"
                          required
                          size="small"
                          fullWidth
                          placeholder="email"
                          {...getFieldProps("email")}
                          error={Boolean(touched.email && errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>

                      <Grid xs={12} md={12}>
                        <Typography className="field"> Phone Number</Typography>
                        <TextField
                          id="phone"
                          required
                          size="small"
                          fullWidth
                          placeholder="phoneNumber"
                          {...getFieldProps("phoneNumber")}
                          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                          helperText={touched.phoneNumber && errors.phoneNumber}
                        />
                      </Grid>

                      <Grid xs={12} md={12}>
                        <Typography className="field"> Address</Typography>
                        <TextField
                          id="address"
                          required
                          size="small"
                          fullWidth
                          placeholder="address"
                          {...getFieldProps("address")}
                          error={Boolean(touched.address && errors.address)}
                          helperText={touched.address && errors.address}
                        />
                      </Grid>

                      <Stack direction="row" spacing={2}>
                        {
                          loading ?
                            <Button className="btn-update" sx={{boxShadow: "none"}} variant="contained" fullWidth >
                              Loading...
                            </Button>
                        :
                            <Button className="btn-update" sx={{boxShadow: "none"}} variant="contained" fullWidth type="submit">
                              Update
                            </Button>
                        }
                      </Stack>
                    </Stack>
                  
                </Form>
              </FormikProvider>
                        
            </DialogContentText>
        </DialogContent>       
    </Dialog>     

  );
}
