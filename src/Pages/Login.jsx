import * as React from "react";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Avatar,
  Button,
  InputAdornment,
} from "@mui/material";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
//src
import app from "../../src/firebase";
import "./login.scss";
import logiImage from "../Assets/ccilogin.svg";
import AlertMessage from "../Component/AlertMessage/AlertMessage";

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
    password: Yup.string()
      .required("Required")
      .min(6, "Password must be 6 characters!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("userCredential" , user);
          // ...
          // console.log("login success");
          setAlert(true);
          setCheckMessage("success");
          setMessage("Login successfull!");
          setTimeout( () => {
            navigate("/");            
          },1200)
        })
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
          setAlert(true);
          setCheckMessage("error");
          setMessage("Invalid Email/Passwork!");
        });

      //get User Date after login Success
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // const uid = user.uid;
          // console.log(user, "user");
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <div>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="login-page">
            <Box className="background-image" />
            <Box className="container">
              <Box className="box-logo">
                <Avatar
                  sx={{ width: 130, height: 130 }}
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
                    Sign In to continue
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
                    placeholder="email"
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
                  <TextField
                    className="text-field"
                    type="password"
                    size="small"
                    placeholder="password"
                    {...getFieldProps("password")}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsOutlinedIcon className="icon" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Link to="/forgotpassword" style={{ textDecorationColor: "#fff" }}>
                    <Typography
                      variant="subtitle2"
                      align="right"
                      color="#fff"
                      fontWeight="bold"
                    >
                      Are you forgot password?
                    </Typography>
                  </Link>
                  <Button
                    className="btn-sign-in"
                    type="submit"
                    sx={{ ":hover": { backgroundColor: "red" } }}
                  >
                    Sing In
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
