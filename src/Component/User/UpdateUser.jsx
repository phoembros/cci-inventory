import * as React from "react";
import {
  Stack,
  Grid,
  Box,
  Paper,
  Button,
  IconButton,
  Typography,
  TextField,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import "./modaluserAdd.scss";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import { useQuery, useMutation} from '@apollo/client';
import { GET_USER, UPDATE_USER } from "../../Schema/user";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const Input = styled("input")({
  display: "none",
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#fff",
  borderRadius: 5,
  boxShadow: 5,
  p: 4,
};

function UpdateUser(
  {
    handleClose,
    DataUser,
    setRefech,
    setAlert,
    setMessage,
    checkMessage,
    setCheckMessage,
  }) {

  
  //show password function
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
 
  // Upload Image
  const [imageFile, setImageFile] = React.useState(null);

 //query 
  const [updateUser] = useMutation(UPDATE_USER,{
    onCompleted:({updateUser}) => {
      // console.log(updateUser, 'up')
      setAlert(true)
      setCheckMessage('success')
      setMessage(updateUser?.message)
      setRefech()
      handleClose()
    },
    onError:(error) => {
      // console.log(error.message, 'error')
      setAlert(true)
      setCheckMessage('error')
      setMessage(error.message)

    }
  })

  const Update_user = Yup.object().shape({
      first_name: Yup.string().required('Required!'),
      last_name: Yup.string().required('Required!'),      
      gender: Yup.string().required('Required!'),
      phone_number: Yup.string().required("phone number is required!"),
      birthOfDate: Yup.date(),      
  });

  const formik = useFormik({
    initialValues: {
        first_name:DataUser?.first_name,
        last_name: DataUser?.last_name,
        gender: DataUser?.gender,
        phone_number: DataUser?.phone_number,        
        birthOfDate: DataUser?.birthOfDate,
        role_and_permission: DataUser?.role_and_permission?._id,
        image_name: "",
        image_src: "",
    },

    validationSchema: Update_user,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values, 'console')
      updateUser({
        variables:{
          id: DataUser?._id,
          userUpdate: {
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
                        Edite User
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
                <FormControl sx={{ minWidth: 100 }}>
                  <Select                 
                    size="small"         
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
            

              <Grid item xs={12} md={12} mt={2}>
                <Button
                  className="btn-create"
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              </Grid>
            </Grid>



          </Box>
        </Form>
      </FormikProvider>
    </Stack>
  );
}

export default UpdateUser;
