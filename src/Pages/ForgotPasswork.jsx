import * as React from "react";
import {
  Grid,
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
//src
import app from "../../src/firebase";
import "./forgotpasswork.scss";
import logiImage from "../Assets/ccilogin.svg";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Login() {

  const navigate = useNavigate();

  // Alert Message
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [checkMessage, setCheckMessage] = React.useState("");

  const auth = getAuth(app);
  // console.log("auth::", auth)

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          // Password reset email sent!
          setAlert(true)
          setCheckMessage("success")
          setMessage("Please check message in your email!")
        })
        .catch((error) => {
          setAlert(true)
          setCheckMessage("error")
          setMessage(error.message)
          // const errorMessage = error.message;
        });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="forgotpassword-page">
            <Box className="background-image" />
            <Stack direction="row" sx={{ml:10}} className="back-btn">      
                <Stack direction="column" justifyContent="center">
                  <IconButton id="back-button" onClick={ () => navigate('/login')} >
                        <ArrowBackIcon sx={{color: "white"}}/>
                  </IconButton>
                </Stack>
                <Stack direction="column" justifyContent="center" spacing={2} className="text-back">
                    <label for="back-button">
                      <Typography className="title-back" align="center">
                          Back
                      </Typography> 
                    </label>
                </Stack>                                                       
            </Stack>
            <Box className="container">
              <Box className="box-logo">
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  variant="square"
                  alt="logo"
                  src={logiImage}
                />
              </Box>
              <Box className="box-text" sx={{ mt: 1 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  spacing={1}
                  sx={{ width: "300px" }}
                >
                  <Typography className="title" variant="h6" align="center">
                    Welcome to CCI Management
                  </Typography>
                  <Typography
                    className="sub-title"
                    variant="body2"
                    align="center"
                  >
                    Please input your email to recieve a link in order to change
                    password!
                  </Typography>
                </Stack>
              </Box>

              <Box className="box-login" sx={{ mt: 3 }}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  spacing={2}
                  sx={{ width: "300px" }}
                >
                  <TextField
                    className="text-field"
                    size="small"
                    fullWidth
                    {...getFieldProps("email")}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon className="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    className="btn-sign-in"
                    type="submit"
                    sx={{ ":hover": { backgroundColor: "red" } }}
                  >
                    Send
                  </Button>
                </Stack>
              </Box>
            </Box>
            <Typography
              variant="body2"
              align="center"
              color="#fff"
              sx={{ mb: 3, letterSpacing: "2px" }}
            >
              @Copyright 2022, Stock Management
            </Typography>
          </Box>
        </Form>
      </FormikProvider>
      <AlertMessage
        alert={alert}
        setAlert={setAlert}
        message={message}
        checkMessage={checkMessage}
      />
    </div>
  );
}
