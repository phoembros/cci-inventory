import * as React from "react";
import { Stack, Grid, Box, Paper, Button, IconButton, Typography, TextField, OutlinedInput, FormHelperText, InputAdornment, } from "@mui/material";
import "./modaluserAdd.scss";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik, Form, FormikProvider } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useMutation } from '@apollo/client';
import { CREATE_USER } from "../../Schema/user";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
// firebase 
import { deleteObject  } from "@firebase/storage";
//upload image
import {storage} from "../../firebase";
import { getDownloadURL , ref  } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


const Input = styled("input")({
  display: "none",
});

// upload Image
const newDate = moment(new Date()).format('MMdYYYY');
const uploadFiles = async ( file, newValue ) => {
    //
    if(!file) return;    
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    const compressedFile = await imageCompression(file, options)
    const config = {
        headers: { 'content-type': 'multipart/form-data' }
    }

    let newName = `${uuidv4()}${newDate}${file.name.split('.').pop()}`;
    var newFile = new File([compressedFile], `${newName}.png`, { type: 'image/png' });

    // const storageRef = ref(storage, `files/${newFile}`);
    // console.log(newFile , "New File");

    // tO firbase
    const storageRef = ref(storage, `files/${newFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef , compressedFile);

    uploadTask.on("state_changed", (snapshot) => {
        const prog = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
        // setProgress(prog);
    }, (err) => console.log(err) , 
        () => {
        getDownloadURL(uploadTask.snapshot.ref).then( (url)=> 
            {                 
                console.log(url);    
                

            })
        }
    );
    
};
//End Upload Image



function ModalUserAdd({handleClose, setAlert, setMessage, setCheckMessage , setLoading}) {
  //
  const [dob,setDob] = React.useState(new Date());
  //show password function
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // Upload Image
  const [imageFile, setImageFile] = React.useState(null);

  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
      onCompleted: ({createUser}) => {
          if(createUser?.success){
            setCheckMessage('success')
            setMessage(createUser?.message)
            setAlert(true);
            setLoading(true);
            handleClose()
          } else {
            setCheckMessage('error')
            setMessage(createUser?.message)
            setAlert(true);
          }
      },
      onError: (error) => {
        setCheckMessage('error')
        setMessage(error?.message)
        setAlert(true);      
      }

  });


  const UserAdd = Yup.object().shape({
      first_name: Yup.string().required('Required!'),
      last_name: Yup.string().required('Required!'),      
      gender: Yup.string().required('Required!'),
      phone_number: Yup.string().required("phone number is required!"),
      birthOfDate: Yup.date(),
      email: Yup.string().email('Invalid email format').required('Required'),    
      password:Yup.string().min( 6,"Password must be more than 6 characters!"),
      confirm_password: Yup.string().oneOf([Yup.ref("password")], "Password must be the same!"), 
  });

  const formik = useFormik({
    initialValues: {
        first_name: "",
        last_name: "",
        gender: "male",
        email: "",
        password: "",
        confirm_password: "",
        phone_number: "",
        birthOfDate: new Date(),
        image_name: "",
        image_src: "",
        role_and_permission: "6290a3e5f5b317b1b7fbc296",
    },

    validationSchema: UserAdd,
    onSubmit: async (values, { setSubmitting, resetForm }) => { 
        // console.log(values)
        createUser({
          variables:{
            newUser: {
              ...values,
            }
          }
        })
    },
  });

  const {errors,touched, values,  isSubmitting, checkProp, handleSubmit,getFieldProps,setFieldValue,resetForm,} = formik;
  

  return (
    <Stack className="modal-user" direction="row" spacing={2}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="modal-box">

            <Stack direction="row" spacing={2}>
                <Stack direction="column" justifyContent="center" spacing={2}>
                    <Typography className='header-title' variant="h6" >
                        Create User
                    </Typography>
                </Stack>                
                <Box sx={{flexGrow:1}}></Box>
                <IconButton onClick={handleClose} >
                    <DoDisturbOnOutlinedIcon sx={{color:'red'}} />
                </IconButton>
            </Stack>
          
            <Grid item container className="title">

              <Paper className="make-paper">
                  <label htmlFor="icon-button-file">
                      <Input accept="image/*" id="icon-button-file" type="file" />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        className="icon-camara"
                      >
                        <PhotoCamera />
                      </IconButton>
                  </label>                
              </Paper>


            </Grid>
            
            <Stack direction="row" justifyContent="center" spacing={2} sx={{mt:1 , mb:2}}>
                <Typography className='header-title' variant="h6" >
                    Profile
                </Typography>
            </Stack>                 

            <Grid item container spacing={1}>
              <Grid item xs={6} md={6}>                
                <Typography className='header-title' variant="body1" >
                  FirstName: 
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="firstname"
                  {...getFieldProps("first_name")}
                  error={Boolean(touched.first_name && errors.first_name)}
                  helperText={touched.first_name && errors.first_name}
                />
              </Grid>
              <Grid item xs={6} md={6}>                
                <Typography className='header-title' variant="body1" >
                  LastName:
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="lastname"
                  {...getFieldProps("last_name")}
                  error={Boolean(touched.last_name && errors.last_name)}
                  helperText={touched.last_name && errors.last_name}
                />
              </Grid>

              <Grid item xs={4} md={4}>
                <Typography className='header-title' variant="body1" >
                    Gender:
                </Typography>
                <FormControl sx={{ minWidth: 100 }} size="small" >
                  <Select                   
                    {...getFieldProps("gender")}
                    error={Boolean(touched.gender && errors.gender)}
                    helperText={touched.gender && errors.gender}
                  >                    
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={8} md={8}>                
                <Typography className='header-title' variant="body1" >
                  Birth Of Date:
                </Typography>
                <LocalizationProvider className="date-controll" dateAdapter={AdapterDateFns} >
                    <DatePicker  
                        onChange={(e)=> setFieldValue("birthOfDate", e)}
                        renderInput={(params) => (
                            <TextField className="select-date" size='small' {...params} type="date" fullWidth />
                        )}                       
                        value={values.birthOfDate}
                    />
                </LocalizationProvider>             
              </Grid>

              <Grid item xs={12} md={12}>                
                <Typography className='header-title' variant="body1" >
                  Phone Number:
                </Typography>
                <TextField
                    size="small"
                    fullWidth
                    placeholder="phone number"
                    {...getFieldProps("phone_number")}
                    error={Boolean(touched.phone_number && errors.phone_number)}
                    helperText={touched.phone_number && errors.phone_number}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Typography className='header-title' variant="body1" >
                  Email:
                </Typography>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="email"
                  {...getFieldProps("email")}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>

              <Grid item xs={12} md={12}>                
                <Typography className='header-title' variant="body1" >
                  Password:
                </Typography>

                <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        {...getFieldProps("password")}
                        placeholder="Enter Password"
                        error={Boolean( touched.password && errors.password )}
                        helperText={touched.password && errors.password}
                        endAdornment={
                            <InputAdornment position="end">
                                  <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleShowPassword}
                                      edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                            </InputAdornment>
                        }
                    />
                    {/*show request error*/}
                    {!!errors.password && (
                    <FormHelperText error id="outlined-adornment-password">
                        {errors.password}
                    </FormHelperText>
                    )}
                </FormControl>
               
              </Grid>

              <Grid item xs={12} md={12}>               
                <Typography className='header-title' variant="body1" >
                  Comfirm Password:
                </Typography>
                <TextField
                    type="password"
                    size="small"
                    fullWidth
                    placeholder="comfirm password"
                    autoComplete="current-password"                 
                    {...getFieldProps("confirm_password")}
                    error={Boolean(touched.confirm_password && errors.confirm_password)}
                    helperText={touched.confirm_password && errors.confirm_password}
                />
              </Grid>

              <Grid item xs={12} md={12} mt={2}>
                <Button
                    className="btn-create"
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Create
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      </FormikProvider>
    </Stack>
  );
}

export default ModalUserAdd;
