import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createproduct.scss';
import { Autocomplete, FormControl, FormHelperText, Icon, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterial from './ListRawMaterial';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { GET_PRODUCTION_UNIT, GET_PRODUCT_CATEGORY, GET_PRODUCT_WITH_PAGINATION } from "../../Schema/product";
import { useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { GET_PRODUCT_UNIT , CREATE_PRODUCT } from "../../Schema/product";
import { useMutation } from '@apollo/client';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function CreateProduct({
    handleClose,
    open,
    btnTitle,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    checkStatus,
}) {


     
    //Create Production
    const [createProduct] = useMutation(CREATE_PRODUCT , {
        onCompleted: ({createProduct}) => {          
            if(createProduct?.success){
                setCheckMessage("success")
                setMessage(createProduct?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setMessage("Material invalid value!")
                setAlert(true);
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });

    // Get Product Unit 
    const [unit,setUnit] = React.useState([])
    const { data: productUnit } = useQuery(GET_PRODUCT_UNIT);

    React.useEffect( () => {        
      if(productUnit?.getProductsUnits){
        setUnit(productUnit?.getProductsUnits);
      }      
    },[productUnit?.getProductsUnits])
    // End
    
    
    // Get Product Unit 
    const [stockUnit,setStockUnit] = React.useState([])
    const { data: productStockUnit } = useQuery(GET_PRODUCTION_UNIT);

    React.useEffect( () => {        
        if(productStockUnit?.getCompletedProductsUnits){
          setStockUnit(productStockUnit?.getCompletedProductsUnits); 
        }           
    },[productStockUnit?.getCompletedProductsUnits])    
    // End
    
    // Get product Categroy
    const [categoryProduct, setCategoryProduct] = React.useState([]);
    const { data } = useQuery(GET_PRODUCT_CATEGORY ,{
      variables:{
          keyword: "",
          pagination: false,
      }
    }); 

    React.useEffect(() => {
        if (data?.getProductCategoryPagination?.ProductCategory) {
            let rows = [];
            data?.getProductCategoryPagination?.ProductCategory?.forEach((element) => {
                const allrow = { 
                  label: element?.categoryName , 
                  _id: element?._id 
                };
                rows.push(allrow);
            });
            setCategoryProduct(rows);
        }
    }, [data?.getProductCategoryPagination?.ProductCategory]);
    // End Get 
    

    // setup ingrideian ====================================================================================================================

    const [currentItem, setCurrentItem] = React.useState({ rawName: '' , rawMaterialId: '', amount: 1 , unitRawMaterial: "" , key: ""})
    const [item, setItem] = React.useState([])

    const addItem = () => {     
        const newItem = currentItem;
        if (newItem.rawName !== "") {
            const items = [
                ...item,
                newItem
            ];
            setItem([... items])
            setCurrentItem({
                rawName: '' , rawMaterialId:'' , amount: 1 , unitRawMaterial: "" , key: "",
            })
        }
    }

    const handleAddMaterail = () => {
        setCurrentItem({ rawName: 'Material Name' , rawMaterialId: '' , amount: 1 , unitRawMaterial: "" ,  key: Date.now() });
    }

    React.useEffect(() => {
        if (currentItem?.rawName !== "") {
            addItem();
        }
    }, [currentItem])

    React.useMemo( async () => {
        await handleAddMaterail();
        await addItem();        
    },[])

    const deleteItem = (key) => {
        const filteredItems = item?.filter(t => t.key !== key);
        setItem(filteredItems)
    }

    const setUpdateText = (rawMaterialId,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){
            i.rawMaterialId= rawMaterialId;
          }
        })
        setItem([...items]) 
    }

    const setUpdateRawName = (rawName,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.rawName= rawName;
          }
        })
        setItem([...items]) 
    }    

    const setUpdateQty = (amount,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.amount= parseFloat(amount);
          }
        })
        setItem([...items]) 
    }

    const setUpdateUnitRawMaterial = (unitRawMaterial,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.unitRawMaterial= unitRawMaterial;
          }
        })
        setItem([...items]) 
    }
    // End Setup=============================================================================================================================


    // Formik
    const CreateProductes = Yup.object().shape({
        productName: Yup.string().required("Product's Name is required!"),
        productId: Yup.string().required("Product's ID is required!"),
        remark: Yup.string(),  
        unitPrice: Yup.number().min(0.01 , "Unit Price can't under 0"),     
        unit: Yup.string().required("Unit is required!"),  
        completedUnit:  Yup.string().required("Unit is required!"),
        durationProduce: Yup.number(),
        category: Yup.string().required("Category is required!"),     
    });
    
    const formik = useFormik({
        initialValues: {
            productName: "",
            productId: "",
            remark: "",
            unitPrice: 0,
            unit: "",
            completedUnit: "",
            category:"",
        },
    
        validationSchema: CreateProductes,
        onSubmit: async (values, { setSubmitting, resetForm }) => {        
            const newValue = {
                productName: values?.productName,
                productId: values?.productId,
                category: values?.category,                
                unit: values?.unit,
                completedUnit: values?.completedUnit,
                unitPrice: parseFloat(values?.unitPrice),
                ingredients: item,
                remark: values?.remark,  
                durationProduce: parseFloat(values?.durationProduce),              
            }       
            console.log(newValue)   
            createProduct({
                variables: {
                    newProduct: {
                        ...newValue,
                    }
                }
            }) 

            
            setItem([{ rawName: 'Material Name' , rawMaterialId: '' , amount: 1 , unitRawMaterial: "" ,  key: Date.now()}])                     
            resetForm();
        },

    });  
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;
    // End Formik
   

    return (

      <Dialog open={open} className="dialog-product-create">
            <DialogTitle id="alert-dialog-title">
                  <Stack direction="row" spacing={5}>
                      <Typography className="header-title" variant="h6">
                          Create Product
                      </Typography>
                      <Box sx={{ flexGrow: 1 }}></Box>
                      <IconButton onClick={() => handleClose()}>
                          <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
                      </IconButton>
                  </Stack>

                  <Stack direction="row" spacing={5} sx={{mt:-1}}>
                      <Typography variant="body2">
                        Please input each field below.
                      </Typography>              
                  </Stack>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">  

                    <FormikProvider value={formik}>
                      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        
                          <Stack direction="row" spacing={5} width="100%" sx={{mt:2 , mb:1}}>
                              <Box className='auto-selete-category'>
                                <Autocomplete
                                  disablePortal
                                  id="combo-box-demo"
                                  options={categoryProduct}                  
                                  onChange={(e, value) => setFieldValue("category", value?._id)}
                                  renderInput={(params) => (
                                    <TextField 
                                        {...params} size="small" label="Category" 
                                        error={Boolean(touched.category && errors.category)}                        
                                        helperText={touched.category && errors.category}
                                    />
                                  )}
                                />
                              </Box>
                              <Box sx={{flexGrow: 1}}></Box>
                              <Box className='product-id'>
                                <TextField 
                                    label="Product ID"
                                    type="text" 
                                    size='small' 
                                    {...getFieldProps("productId")}
                                    error={Boolean(touched.productId && errors.productId)}                          
                                    helperText={touched.productId && errors.productId}
                                />
                              </Box>
                          </Stack>


                          <Stack direction="row" spacing={5} sx={{mt:2 , mb:1}} className='product-id-mobile'>
                              <Box sx={{ width: "100%" }} >
                                <TextField 
                                    label="Product ID"
                                    type="text" 
                                    size='small' 
                                    {...getFieldProps("productId")}
                                    error={Boolean(touched.productId && errors.productId)}                          
                                    helperText={touched.productId && errors.productId}
                                />
                              </Box>
                          </Stack>

                          <Box className="container">
                            <TableContainer>
                              <Table className="table-top" aria-label="simple table">
                                <TableHead>
                                  <TableRow className="header-row">
                                    <TableCell className="header-title" >
                                      Product Name
                                    </TableCell>
                                    <TableCell
                                      className="header-title"
                                      width="3%"
                                    ></TableCell>
                                    <TableCell className="header-title">Unit</TableCell>
                                    <TableCell
                                      className="header-title"
                                      width="3%"
                                    ></TableCell>
                                    <TableCell className="header-title">Stock U/M</TableCell>
                                    <TableCell
                                      className="header-title"
                                      width="3%"
                                    ></TableCell>
                                    <TableCell className="header-title" align="center">
                                      Duration
                                    </TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody component={Paper} className="body">
                                  <TableRow className="body-row">
                                    <TableCell
                                      className="body-title"
                                      component="th"
                                      scope="row"
                                      width="37%"
                                    >
                                      <TextField
                                        size="small"
                                        fullWidth
                                        {...getFieldProps("productName")}
                                        error={Boolean(touched.productName && errors.productName)}                          
                                        helperText={touched.productName && errors.productName}
                                      />
                                    </TableCell>
                                    <TableCell className="body-title"></TableCell>
                                    <TableCell className="body-title" width="20%">
                                      <FormControl fullWidth size="small">
                                        <Select                           
                                          {...getFieldProps("unit")}
                                          error={Boolean(touched.unit && errors.unit)}
                                          helperText={touched.unit && errors.unit}
                                        >                            
                                          {unit?.map((item, index) => (
                                            <MenuItem value={`${item}`}>{item}</MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>

                                      {!!errors.unit && (
                                          <FormHelperText error id="outlined-adornment-email">
                                              {errors.unit}
                                          </FormHelperText>
                                      )} 

                                    </TableCell>
                                    <TableCell className="body-title"></TableCell>
                                    <TableCell className="body-title" width="20%">
                                      <FormControl fullWidth size="small">
                                        <Select                           
                                          {...getFieldProps("completedUnit")}
                                          error={Boolean(touched.completedUnit && errors.completedUnit)}
                                          helperText={touched.completedUnit && errors.completedUnit}
                                        >                            
                                          {stockUnit?.map((item, index) => (
                                            <MenuItem value={`${item}`}>{item}</MenuItem>
                                          ))}
                                        </Select>
                                      </FormControl>

                                      {!!errors.completedUnit && (
                                          <FormHelperText error id="outlined-adornment-email">
                                              {errors.completedUnit}
                                          </FormHelperText>
                                      )} 

                                    </TableCell>
                                    <TableCell className="body-title"></TableCell>
                                    <TableCell
                                      className="body-title"
                                      width="18%"
                                      align="center"
                                    >
                                      <TextField
                                          size="small"
                                          fullWidth
                                          type="number"
                                          {...getFieldProps("durationProduce")}
                                          error={Boolean(touched.durationProduce && errors.durationProduce)}
                                          helperText={touched.durationProduce && errors.durationProduce}
                                          InputProps={{                                  
                                            endAdornment: (
                                                <InputAdornment position="end">                                             
                                                    s                                         
                                                </InputAdornment>
                                            ), 
                                            inputProps: { min: 1 },                                               
                                          }}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  
                                </TableBody>
                              </Table>
                            </TableContainer>

                            <TableContainer>
                              <Table className="table" aria-label="simple table">
                                <TableHead>
                                  <TableRow className="header-row">
                                    <TableCell className="header-title">
                                      Raw Materail's Name
                                    </TableCell>
                                    
                                    <TableCell className="header-title" align="center">
                                      Quantity
                                    </TableCell>
                                    
                                    <TableCell className="header-title" align="right">
                                      <IconButton onClick={handleAddMaterail}>
                                        <AddCircleOutlineRoundedIcon
                                          sx={{ color: "green" }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>

                                {/* {rows.map((row , index) => (
                                              <TableBody key={index} component={Paper} className="body" >                        
                                                  <TableRow  className="body-row">                                
                                                      <TableCell className="body-title" component="th" scope="row" > {row.name} </TableCell>
                                                      <TableCell className="body-title" >{row.calories}Kg</TableCell>    
                                                      <TableCell className="body-title" ></TableCell>                                                   
                                                  </TableRow>
                                              </TableBody>                        
                                          ))} */}

                                <ListRawMaterial
                                  items={item}
                                  deleteItem={deleteItem}
                                  setUpdateText={setUpdateText}
                                  setUpdateQty={setUpdateQty}
                                  setUpdateRawName={setUpdateRawName}
                                  setUpdateUnitRawMaterial={setUpdateUnitRawMaterial}
                                />
                              </Table>
                            </TableContainer>
                          </Box>

                          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                            <Typography className="header-title">Unit Price</Typography>
                            <Box sx={{width:"300px"}}>
                                <TextField               
                                  size="small"
                                  type="number"
                                  fullWidth
                                  placeholder="unitPrice"
                                  {...getFieldProps("unitPrice")}
                                  error={Boolean(touched.unitPrice && errors.unitPrice)}
                                  helperText={touched.unitPrice && errors.unitPrice}
                                  InputProps={{                                  
                                      startAdornment: (
                                          <InputAdornment position="start">                                             
                                              $                                           
                                          </InputAdornment>
                                      ),                         
                                      inputProps: { min: 0 },                       
                                  }}
                                />
                            </Box>              
                          </Stack>

                          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                            <Typography className="header-title">Remark</Typography>
                            <TextField
                              multiline
                              rows={3}
                              size="small"
                              fullWidth
                              placeholder="Remark"
                              {...getFieldProps("remark")}
                              error={Boolean(touched.remark && errors.remark)}
                              helperText={touched.remark && errors.remark}
                            />
                          </Stack>
                          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                            <Button sx={{boxShadow: "none"}} type="submit" variant="contained">
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