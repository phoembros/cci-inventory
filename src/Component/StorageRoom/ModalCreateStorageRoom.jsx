import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./modalcreatestorageroom.scss";
import {
  FormControl,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { CREATE_STORAGE_ROOM, UPDATE_STORAGE_ROOM} from "../../Schema/starageroom";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

export default function ModalCreateStorageRoom({
  handleClose,
  btnTitle,
  row,
  setAlert,
  checkStatus,
  setMessage,
  setCheckMessage,
  setRefetch,
}) {

  const [createStorageRoom] = useMutation(CREATE_STORAGE_ROOM,{
    onCompleted: ({createStorageRoom}) => {
      // console.log(createStorageRoom?.message, "message");
      if(createStorageRoom?.success){
        setCheckMessage('success')
        setMessage(createStorageRoom?.message)
        setAlert(true)
        handleClose()
        setRefetch();
      }
    },
    onError: (error) => {
      // console.log(error.message);
      setAlert(true)
      setCheckMessage('error')
      setMessage(error?.message)
    },
  });

  //Update
  const [updateStorageRoom] = useMutation(UPDATE_STORAGE_ROOM, {
    onCompleted: ({updateStorageRoom}) => {
      console.log(updateStorageRoom?.message, 'up')
      if(updateStorageRoom?.success){
        setAlert(true)
        setCheckMessage('success')
        setMessage(updateStorageRoom?.message)
        handleClose()
        setRefetch()
      }
    },
    onError: (error) => {
      // console.log(error.message);
      setCheckMessage('error')
      setMessage(error?.message)
    },
  });
  
  // Formik
  const CreateStorage = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    remark: Yup.string(),
    address: Yup.string(),
    type: Yup.string().required("Room Type is required!"),
  });

  const formik = useFormik({
    initialValues: {
      remark: row?.remark,
      name: row?.name,
      address: row?.address,
      type: row?.type,
    },

    validationSchema: CreateStorage,
    onSubmit: async (values, { setSubmitting, resetForm }) => {

      if(checkStatus === 'create'){
        createStorageRoom({
          variables:{
            newStorage: {
              ...values,
            }
          }
        })
      }

      if(checkStatus === 'update'){
        const newValue = {
          remark: values?.remark,
          name: values?.name,
          address: values?.address,
          type: row?.type,
        }
        updateStorageRoom({
          variables:{
            id:row?._id,
            storageEdit: {
              ...newValue,
            }
          }
        })
      }
    },
  });
  const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm,} = formik;
  // End Formik

  return (
    <Box className="create-storage-room">
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack direction="row" spacing={5}>
            <Typography className="header-title" variant="h6">
              Create Storage Room
            </Typography>
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton onClick={() => handleClose()}>
              <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={5} width="100%">
            <Box sx={{ width: "45%" }}>
              <FormControl fullWidth size="small">
                <InputLabel>Room Type</InputLabel>
                <Select
                    label="Room Type"                   
                    {...getFieldProps("type")}
                    error={Boolean(touched.type && errors.type)}
                    helperText={touched.type && errors.type}
                  >
                  <MenuItem value="Raw Materials">
                    <Typography>Raw Materials</Typography>
                  </MenuItem>
                  <MenuItem value="Products">
                    <Typography>Products</Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>

          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            <Typography className="header-title">Room Name</Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="room name"
              {...getFieldProps("name")}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />
          </Stack>

          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            <Typography className="header-title">Location</Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="location"
              {...getFieldProps("address")}
              error={Boolean(touched.address && errors.address)}
              helperText={touched.address && errors.address}
            />
          </Stack>

          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            <Typography className="header-title">Remark</Typography>
            <TextField
              size="small"
              fullWidth
              placeholder="remark"
              {...getFieldProps("remark")}
              error={Boolean(touched.remark && errors.remark)}
              helperText={touched.remark && errors.remark}
            />
          </Stack>

          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
            <Button sx={{boxShadow: "none"}} variant="contained" type="submit" >
                {btnTitle}
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}
