import * as  React from 'react';
import {Stack, Grid, Typography, Box, IconButton, TextField, Button} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import './customersetup.scss';
import {useMutation} from "@apollo/client";
import {CREATE_SET_UP_CUSTOMER} from "../../Schema/sales";

export default function CustomerSetup({
  setRefetch,
  handleClose,
  setAlert,
  setMessage,
  setCheckMessage,
}) {

  //useMutation 
    const [createCustomer] = useMutation(CREATE_SET_UP_CUSTOMER, {
    onCompleted: ({ createCustomer }) => {
      // console.log(createCustomer.message, "mgs");

      if(createCustomer?.success){
          setCheckMessage('success')
          setMessage(createCustomer?.message)
          setAlert(true)
          setRefetch()
          handleClose();
      } else {
          setCheckMessage('error')
          setMessage(createCustomer?.message)
          setAlert(true)
      }
     
    },
    onError: ({ error }) => {
      setMessage(error?.message)
        setAlert(true)
    },
  });
//end

  const SetupAdd = Yup.object().shape({
    name: Yup.string().required("name is required!"),
    email: Yup.string().required("email is required!"),
    address: Yup.string().required("address is required!"),
    phoneNumber: Yup.number().required("phone is required!"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phoneNumber:""
    },

    validationSchema: SetupAdd,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values, "value");
      createCustomer({
        variables: {
          newCustomer: {
            ...values,
          }
        },
      });
    },
  });

  const { errors, touched,
    values,
    isSubmitting,
    checkProp,
    handleSubmit,
    getFieldProps,
    setFieldValue,
    resetForm,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Box spacing={5} className="customer">
          <Stack direction="row" spacing={2}>
            <Typography variant="h6" className="title">
              Customer
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton onClick={() => handleClose()}>
              <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>
          <Stack direction="column" spacing={2}>
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
              <Button variant="contained" fullWidth type="submit">
                Add
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Form>
    </FormikProvider>
  );
}
