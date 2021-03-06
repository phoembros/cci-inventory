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
  FormHelperText,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import "./modaluserAdd.scss";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik, Form, FormikProvider } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_USER } from "../../Schema/user";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { VisibilityOff, Visibility } from "@mui/icons-material";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
// firebase
import { deleteObject } from "@firebase/storage";
//upload image
import { storage } from "../../firebase";
import { getDownloadURL, ref } from "@firebase/storage";
import { uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { GET_ROLE_PERMISSION } from "../../Schema/role";

// upload image
import Axios from "axios";
import { Image } from "cloudinary-react";
import imageCompression from "browser-image-compression";

const Input = styled("input")({
  display: "none",
});

// upload Image
// const newDate = moment(new Date()).format('MMdYYYY');
// const uploadFiles = async ( file, newValue ) => {
//     //
//     if(!file) return;
//     const options = {
//         maxSizeMB: 1,
//         maxWidthOrHeight: 1920,
//         useWebWorker: true
//     }
//     const compressedFile = await imageCompression(file, options)
//     const config = {
//         headers: { 'content-type': 'multipart/form-data' }
//     }

//     let newName = `${uuidv4()}${newDate}${file.name.split('.').pop()}`;
//     var newFile = new File([compressedFile], `${newName}.png`, { type: 'image/png' });

//     // const storageRef = ref(storage, `files/${newFile}`);
//     // console.log(newFile , "New File");

//     // tO firbase
//     const storageRef = ref(storage, `files/${newFile.name}`);
//     const uploadTask = uploadBytesResumable(storageRef , compressedFile);

//     uploadTask.on("state_changed", (snapshot) => {
//         const prog = Math.round( (snapshot.bytesTransferred / snapshot.totalBytes) * 100 );
//         // setProgress(prog);
//     }, (err) => console.log(err) ,
//         () => {
//         getDownloadURL(uploadTask.snapshot.ref).then( (url)=>
//             {
//                 console.log(url);

//             })
//         }
//     );

// };
//End Upload Image

function ModalUserAdd({
  handleClose,
  open,
  setAlert,
  setMessage,
  setCheckMessage,
  setLoading,
  setRefech,
}) {
  const [roleDataAuto, setRoleDataAuto] = React.useState([]);
  const [rolePermissionSeleted, setRolePermissionSeleted] = React.useState({});

  const { data: RoleData } = useQuery(GET_ROLE_PERMISSION);

  React.useEffect(() => {
    // console.log(RoleData?.getRoleAndPermission);
    if (RoleData?.getRoleAndPermission) {
      let row = [];
      RoleData?.getRoleAndPermission?.forEach((element) => {
        const allRow = {
          _id: element?._id,
          label: element?.role,
        };
        row.push(allRow);
      });
      setRoleDataAuto(row);
    }
  }, [RoleData?.getRoleAndPermission]);

  const [dob, setDob] = React.useState(new Date());
  //show password function
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // Upload Image
  // const [imageFile, setImageFile] = React.useState(null);
  const [imageselected, setImageselected] = React.useState(null);
  const [imagedata, setImagedata] = React.useState(null);

  const uploadImage = async (file) => {
    try {

        const formData = new FormData();
        // Compression file
        const options = {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        var newFile = new File([compressedFile], `$(file?.name).png`, { type: "image/png", });

        formData.append("file", newFile);
        formData.append("upload_preset", "vc41aa9y");

        const res = await Axios.post( "https://api.cloudinary.com/v1_1/ccicambodia/image/upload",formData);
        return res?.data?.secure_url;

    } catch (err) {
        console.log(err);
        return undefined;
    }
  };

  
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      if (createUser?.success) {
        setCheckMessage("success");
        setMessage(createUser?.message);
        setAlert(true);
        setLoading(true);
        handleClose();
        setRefech();
      } else {
        setCheckMessage("error");
        setMessage(createUser?.message);
        setAlert(true);
      }
    },
    onError: (error) => {
      setCheckMessage("error");
      setMessage(error?.message);
      setAlert(true);
    },
  });

  const UserAdd = Yup.object().shape({
    first_name: Yup.string().required("Required!"),
    last_name: Yup.string().required("Required!"),
    gender: Yup.string().required("Required!"),
    phone_number: Yup.string().required("phone number is required!"),
    birthOfDate: Yup.date(),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().min(6, "Password must be more than 6 characters!"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password")],
      "Password must be the same!"
    ),
    role_and_permission: Yup.string(),
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
      role_and_permission: "",
    },

    validationSchema: UserAdd,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values)

      //condition
      const uploadedImage = await uploadImage(imageselected);
      if (!uploadedImage && imageselected) {
        return;
      }

      createUser({
        variables: {
          newUser: {
            image_name: "",
            image_src: uploadedImage ? uploadedImage : "",
            ...values,
          },
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
    <Dialog open={open} className="dialog-create-user">
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" spacing={2}>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <Typography className="header-title" variant="h6">
              Create User
            </Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }}></Box>
          <IconButton onClick={handleClose}>
            <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
              <Box className="modal-box">
                <Grid item container className="title">
                  <Paper className="make-paper">
                    <label htmlFor="icon-button-file">
                      <Input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        onChange={(event) => {
                          setImageselected(event.target.files[0]);
                        }}
                      />
                      <IconButton
                        color="primary"
                        aria-label="upload picture"
                        component="span"
                        className="icon-camara"
                      >
                        {imageselected ? (
                          <img
                            src={URL.createObjectURL(imageselected)}
                            alt="preview"
                            className="make-paper"
                          />
                        ) : null}

                        <PhotoCamera
                          sx={{ display: imageselected ? "none" : "block" }}
                        />

                        {imagedata && (
                          <Image
                            sx={{ display: "none" }}
                            cloudName="ccicambodia"
                            publicId={`https://res.cloudinary.com/ccicambodia/image/upload/v1657681905/${imagedata?.public_id}`}
                          />
                        )}
                      </IconButton>
                    </label>
                  </Paper>
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="center"
                  spacing={2}
                  sx={{ mt: 1, mb: 2 }}
                >
                  <Typography className="header-title" variant="h6">
                    Profile
                  </Typography>
                </Stack>

                <Grid item container spacing={1}>
                  <Grid item xs={6} md={6}>
                    <Typography className="header-title" variant="body1">
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
                    <Typography className="header-title" variant="body1">
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
                    <Typography className="header-title" variant="body1">
                      Gender:
                    </Typography>
                    <FormControl sx={{ minWidth: 100 }} size="small">
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
                    <Typography className="header-title" variant="body1">
                      Birth Of Date:
                    </Typography>
                    <LocalizationProvider
                      className="date-controll"
                      dateAdapter={AdapterMoment}
                    >
                      <MobileDatePicker
                        inputFormat="DD/MM/yyyy"
                        value={values?.birthOfDate}
                        onChange={(e) => setFieldValue("birthOfDate", e)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            className="select-date"
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <DateRangeIcon />
                                </InputAdornment>
                              ),
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>

                    {/* <LocalizationProvider className="date-controll" dateAdapter={AdapterDateFns} >
                                <DatePicker  
                                    onChange={(e)=> setFieldValue("birthOfDate", e)}
                                    renderInput={(params) => (
                                        <TextField className="select-date" size='small' {...params} type="date" fullWidth />
                                    )}                       
                                    value={values.birthOfDate}
                                />
                            </LocalizationProvider>  */}
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Typography className="header-title" variant="body1">
                      Phone Number:
                    </Typography>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="phone number"
                      {...getFieldProps("phone_number")}
                      error={Boolean(
                        touched.phone_number && errors.phone_number
                      )}
                      helperText={touched.phone_number && errors.phone_number}
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Typography className="header-title" variant="body1">
                      Role :
                    </Typography>
                    <Autocomplete
                      disablePortal
                      options={roleDataAuto}
                      value={rolePermissionSeleted}
                      getOptionLabel={(option) =>
                        option?.label ? option?.label : ""
                      }
                      getoptionseleted={(option, value) =>
                        option._id == value._id
                      }
                      onChange={(event, value) => {
                        setFieldValue("role_and_permission", value?._id);
                        setRolePermissionSeleted({
                          label: value?.label,
                          _id: values?._id,
                        });
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="choose name"
                          size="small"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography className="header-title" variant="body1">
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
                    <Typography className="header-title" variant="body1">
                      Password:
                    </Typography>

                    <FormControl
                      sx={{ width: "100%" }}
                      variant="outlined"
                      size="small"
                    >
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        {...getFieldProps("password")}
                        placeholder="Enter Password"
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                    <Typography className="header-title" variant="body1">
                      Comfirm Password:
                    </Typography>
                    <TextField
                      type="password"
                      size="small"
                      fullWidth
                      placeholder="comfirm password"
                      autoComplete="current-password"
                      {...getFieldProps("confirm_password")}
                      error={Boolean(
                        touched.confirm_password && errors.confirm_password
                      )}
                      helperText={
                        touched.confirm_password && errors.confirm_password
                      }
                    />
                  </Grid>

                  <Grid item xs={12} md={12} mt={2}>
                    <Button
                      className="btn-create"
                      size="large"
                      type="submit"
                      variant="contained"
                      sx={{ boxShadow: "none" }}
                      onClick={() => uploadImage(imageselected)}
                    >
                      Create
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </FormikProvider>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}

export default ModalUserAdd;
