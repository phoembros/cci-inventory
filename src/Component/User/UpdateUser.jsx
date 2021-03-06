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
  Autocomplete,
  Avatar,
} from "@mui/material";
import "./modaluserAdd.scss";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER, UPDATE_USER } from "../../Schema/user";
import { VisibilityOff, Visibility } from "@mui/icons-material";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

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
import Axios from "axios";
import { Image } from "cloudinary-react";

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

function UpdateUser({
  handleClose,
  open,
  DataUser,
  setRefech,
  setAlert,
  setMessage,
  checkMessage,
  setCheckMessage,
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

  React.useEffect(() => {
    if (DataUser) {
      setRolePermissionSeleted({
        label: DataUser?.role_and_permission?.role,
        _id: DataUser?.role_and_permission?._id,
      });
    }
  }, [DataUser]);

  //show password function
  const [showPassword, setShowPassword] = React.useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  // Upload Image
  const [imageFile, setImageFile] = React.useState(null);

  //query
  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: ({ updateUser }) => {
      // console.log(updateUser, 'up')
      if (updateUser?.success) {
        setAlert(true);
        setCheckMessage("success");
        setMessage(updateUser?.message);
        setRefech();
        handleClose();
      } else {
        setAlert(true);
        setCheckMessage("error");
        setMessage(updateUser?.message);
      }
    },
    onError: (error) => {
      // console.log(error.message, 'error')
      setAlert(true);
      setCheckMessage("error");
      setMessage(error.message);
    },
  });

  const Update_user = Yup.object().shape({
    first_name: Yup.string().required("Required!"),
    last_name: Yup.string().required("Required!"),
    gender: Yup.string().required("Required!"),
    phone_number: Yup.string().required("phone number is required!"),
    birthOfDate: Yup.date(),
    role_and_permission: Yup.string(),
  });

  // Update Profile
  // State Hook
  const [imageselected, setImageselected] = React.useState(null);
  const [imagedata, setImagedata] = React.useState(null);

  // Function
  const uploadImage = async (files) => {
    try {
      // Create object
      const formData = new FormData();
      formData.append("file", files);
      formData.append("upload_preset", "vc41aa9y");
      const res = await Axios.post(
        "https://api.cloudinary.com/v1_1/ccicambodia/image/upload",
        formData
      );

      return res?.data?.secure_url;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: DataUser?.first_name,
      last_name: DataUser?.last_name,
      gender: DataUser?.gender,
      phone_number: DataUser?.phone_number,
      birthOfDate: DataUser?.birthOfDate,
      role_and_permission: DataUser?.role_and_permission?._id,      
    },

    validationSchema: Update_user,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values, 'console')

      const uploadedImage = await uploadImage(imageselected);
      if (!uploadedImage && imageselected) {
        return;
      }

      console.log(uploadedImage , "image")

      updateUser({
        variables: {
          id: DataUser?._id,
          userUpdate: {
            image_name: "",
            image_src: uploadedImage ? uploadedImage : " ",
            ...values,
          },
        },
      });
    },
  });

  // console.log(DataUser?.image_src, "::Image");

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

  React.useEffect(() => {
    if (DataUser) {
      setFieldValue("gender", DataUser?.gender);
      setFieldValue("birthOfDate", DataUser?.birthOfDate);
    }
  }, [DataUser]);

  return (
    <Dialog open={open} className="dialog-create-user">
      <DialogTitle id="alert-dialog-title">
        <Stack direction="row" spacing={2}>
          <Stack direction="column" justifyContent="center" spacing={2}>
            <Typography className="header-title" variant="h6">
              Edite User
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
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            cursor: "pointer",
                            transition: "0.6s",
                            boxShadow: 3,
                            "&:hover": { boxShadow: 6, transition: "0.3s" },
                          }}
                          alt="Remy Sharp"
                          src={
                            imageselected
                              ? URL.createObjectURL(imageselected)
                              : DataUser?.image_src === ""
                              ? null
                              : DataUser?.image_src
                          }
                        />
                        {imagedata && (
                          <Image
                            sx={{ display: "none" }}
                            cloudName="dkwkcqpg6"
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
                    <FormControl sx={{ minWidth: 100 }}>
                      <Select
                        size="small"
                        {...getFieldProps("gender")}
                        error={Boolean(touched.gender && errors.gender)}
                        helperText={touched.gender && errors.gender}
                        defaultValue={values?.gender}
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
                      getOptionSeleted={(option, value) =>
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

                  <Grid item xs={12} md={12} mt={2}>
                    <Button
                      className="btn-create"
                      size="large"
                      type="submit"
                      sx={{ boxShadow: "none" }}
                      variant="contained"
                    >
                      Update
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

export default UpdateUser;
