import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createrawmaterial.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Autocomplete, FormHelperText} from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import {CREATE_RAW_MATERAIL, GET_RAW_GETEGORY_PAGINATION, UPDATE_RAW_MATERAIL} from "../../Schema/rawmaterial";
import {useMutation , useQuery} from "@apollo/client";
import { GET_RAW_MATERIAL_UNIT } from '../../Schema/rawmaterial';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function CreateRawMaterials({
  handleClose,
  open,
  btnTitle,
  setAlert,
  setMessage,
  setCheckMessage,
  DataRow,
  checkStatus,
  setRefetch,
}) {

  // Get Unit Material
  const [unitRawMaterial,setUnitRawMaterial] = React.useState([])
  const { data: unitRawData } = useQuery(GET_RAW_MATERIAL_UNIT,{
    onCompleted: ({getRawMaterialsUnits}) => {
        setUnitRawMaterial(getRawMaterialsUnits)
    }
  });

  // 
  const [categoryMaterail, setCategoryMaterail] = React.useState([]);
   
  const [valueTest,setValueTest] = React.useState({
    label: DataRow?.category?.categoryName,
    _id: DataRow?.category?._id, 
  })

  const { data } = useQuery(GET_RAW_GETEGORY_PAGINATION,{
    variables: {
      keyword: "",
      pagination: false,
    },
    pollInterval: 1000,
  });
  React.useEffect(() => {
    if (data) {
      let rows = []; 
      data?.getRawMaterialCategoryPagination?.rawMaterialCategory?.forEach((element) => {
        const allrow = {
          label: element?.categoryName,
          _id: element?._id,
        };
        rows.push(allrow);
      });
      setCategoryMaterail(rows);
    }
  }, [data]);

  // Create
  const [createRawMaterial] = useMutation(CREATE_RAW_MATERAIL, {
    onCompleted: ({ createRawMaterial }) => {
      if (createRawMaterial?.success) {
          setCheckMessage("success");
          setMessage(createRawMaterial?.message);
          setAlert(true);
          handleClose();
          setRefetch();
      } else {
          setCheckMessage("error");
          setMessage(createRawMaterial?.message);
          setAlert(true);
      }
    },
    onError: (error) => {
          setCheckMessage("error");
          setMessage(error.message);
    },
  });

  const [updateRawMaterial] = useMutation(UPDATE_RAW_MATERAIL,{
      onCompleted:({updateRawMaterial}) =>{
        if (updateRawMaterial?.success) {
          setCheckMessage("success");
          setMessage(updateRawMaterial?.message);
          setAlert(true);
          handleClose();
          setRefetch();
        } else {
          setCheckMessage("error");
          setMessage(updateRawMaterial?.message);
          setAlert(true);
        }
      },
      onError: (error) => {
        // console.log(error.message, "err");
        setCheckMessage("error");
        setMessage(error.message);
      },
  })


  // Formik
  const CreateCategory = Yup.object().shape({
    materialName: Yup.string().required("Material Name is required!"),
    remark: Yup.string(),
    unitPrice: Yup.number().min(0.01 , "Cant under zero!").required("is required"),
    unit: Yup.string().required("is required!"),   
    categoryId: Yup.string().required("Category is required!"),
  });

  const formik = useFormik({
    initialValues: {
      materialName: DataRow?.materialName,
      remark:  DataRow?.remark,
      unitPrice: DataRow?.unitPrice,
      unit: DataRow?.unit,  
      categoryId: DataRow?.category?._id,
    },

    validationSchema: CreateCategory,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // console.log(values, 'hhh')
      if(checkStatus === 'create'){
        createRawMaterial({
          variables: {
            newRawMaterial: {
              materialName: values?.materialName,
              category: values?.categoryId,
              totalStockAmount: 0,
              usedStockAmount: 0,
              unit: values?.unit,
              unitPrice: parseFloat(values?.unitPrice),
              remark: values?.remark,
            },
          },
        });
      } 

      if( checkStatus === 'update'){
        updateRawMaterial({
            variables: {
                id: DataRow?._id,
                rawMaterialEdit: {
                  materialName: values?.materialName,
                  category: values?.categoryId,
                  totalStockAmount: 0,
                  usedStockAmount: 0,
                  unit: values?.unit,
                  unitPrice: parseFloat(values?.unitPrice),
                  remark: values?.remark,
                }

            },
        });
      }

      resetForm();

    },
  });

  const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;

  return (

      <Dialog open={open} className="dialog-create-raw-material">
            <DialogTitle id="alert-dialog-title">
                  <Stack direction="row" spacing={5}>
                        <Typography className="header-title" variant="h6">
                          Raw Material
                        </Typography>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <IconButton onClick={() => handleClose()}>
                          <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
                        </IconButton>
                  </Stack> 
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">  

                      
                        <FormikProvider value={formik}>
                          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                            
                            
                            <Stack direction="row" spacing={5} width="100%">
                              <Box sx={{ width: "45%" }}>
                                {
                                  checkStatus === "create" ?
                                    <Autocomplete                      
                                        disablePortal
                                        sx={{ width: 300 }}
                                        options={categoryMaterail}                                                
                                        onChange={(event, value) =>  setFieldValue("categoryId" , value?._id) }
                                        renderInput={(params) => 
                                            <TextField 
                                                {...params} placeholder='category' size="small" 
                                                error={Boolean(touched.categoryId && errors.categoryId)}
                                                helperText={touched.categoryId && errors.categoryId}
                                            /> 
                                        }
                                    /> 
                                  :
                                    <Autocomplete                      
                                        disablePortal
                                        sx={{ width: 300 }}
                                        options={categoryMaterail}                
                                        value={valueTest}
                                        getOptionSelected={(option, value) => option._id === value._id }               
                                        onChange={(event, value) => {
                                            setValueTest(value);
                                            setFieldValue("categoryId" , value?._id)
                                        }}
                                        renderInput={(params) => 
                                            <TextField 
                                                {...params}  placeholder='category' size="small" 
                                                error={Boolean(touched.categoryId && errors.categoryId)}
                                                helperText={touched.categoryId && errors.categoryId}
                                            /> 
                                        }
                                    /> 
                                }
                                
                              </Box>
                            </Stack>

                            <Box className="container">
                              <TableContainer>
                                <Table className="table-top" aria-label="simple table">
                                  <TableHead>
                                    <TableRow className="header-row">
                                      <TableCell className="header-title">
                                          Material Name
                                      </TableCell>
                                      <TableCell className="header-title" width="3%"></TableCell>
                                      <TableCell className="header-title" align="center">
                                          UnitPrice
                                      </TableCell>
                                      <TableCell className="header-title" width="3%"></TableCell>
                                      <TableCell className="header-title" align="center">
                                          Unit
                                      </TableCell>
                                    </TableRow>
                                  </TableHead>

                                  <TableBody component={Paper} className="body">
                                    <TableRow className="body-row">
                                      <TableCell
                                        className="body-title"
                                        component="th"
                                        scope="row"
                                        width="40%"
                                      >
                                        <TextField
                                          size="small"
                                          fullWidth
                                          placeholder='materialName'
                                          {...getFieldProps("materialName")}
                                          error={Boolean(
                                            touched.materialName && errors.materialName
                                          )}
                                          helperText={touched.materialName && errors.materialName}
                                        />
                                      </TableCell>
                                      <TableCell className="body-title"></TableCell>
                                      <TableCell
                                        className="body-title"
                                        component="th"
                                        scope="row"
                                        width="15%"
                                      >
                                        <TextField
                                          size="small"
                                          type="number"
                                          fullWidth                        
                                          {...getFieldProps("unitPrice")}
                                          error={Boolean(touched.unitPrice && errors.unitPrice)}
                                          helperText={touched.unitPrice && errors.unitPrice}                      
                                          InputProps={{                                 
                                            inputProps: { min: 1 },
                                          }}
                                        />
                                      </TableCell>

                                      <TableCell className="body-title"></TableCell>
                                      <TableCell
                                        className="body-title"
                                        width="15%"
                                        align="center"
                                      >
                                        <FormControl fullWidth size="small">
                                          <Select  
                                            {...getFieldProps("unit")}    
                                            error={Boolean(touched.unit && errors.unit)}
                                            helperText={touched.unit && errors.unit}
                                          >
                                            {
                                              unitRawMaterial.map( (item) => (
                                                    <MenuItem value={item}>{item}</MenuItem> 
                                              ))
                                            }                                                  
                                          
                                          </Select>
                                        </FormControl>

                                        {!!errors.unit && (
                                            <FormHelperText error id="outlined-adornment-email">
                                                {errors.unit}
                                            </FormHelperText>
                                        )} 

                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Box>

                            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                              <Typography className="header-title">Remark</Typography>
                              <TextField
                                multiline
                                rows={3}
                                size="small"
                                fullWidth
                                type="text"
                                placeholder="remark"
                                {...getFieldProps("remark")}
                                error={Boolean(touched.remark && errors.remark)}
                                helperText={touched.remark && errors.remark}
                              />
                            </Stack>

                            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                              <Button sx={{boxShadow: "none"}} type="submit" className='btn-create'>
                                {btnTitle}
                              </Button>
                            </Stack>
                          </Form>
                        </FormikProvider>
                      
              </DialogContentText>
        </DialogContent>       
    </Dialog>    
  );
}