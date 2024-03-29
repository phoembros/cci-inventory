import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createproduct.scss';
import { Autocomplete, FormControl, FormHelperText, Icon, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterialUpdate from './ListRawMaterialUpdate';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { GET_PRODUCTION_UNIT, GET_PRODUCT_CATEGORY } from "../../Schema/product";
import { useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { GET_PRODUCT_UNIT , UPDATE_PRODUCT } from "../../Schema/product";
import { useMutation } from '@apollo/client';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModalAlert from '../Permission/ModalAlert';
import { GET_UNIT_PAGINATION } from '../../Schema/unit';


export default function UpdateProduct({
    handleClose,
    open,
    btnTitle,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    checkStatus,
}) {

    // Alert Message before close form
    const [openFormAlert,setOpenFormAlert] = React.useState(false);
    const handleOpenFormAlert = () => setOpenFormAlert(true);
    const handleCloseFormAlert = () => setOpenFormAlert(false);


    const [loading,setLoading] = React.useState(false);
    const [checkPercent,setCheckPercent] = React.useState(false);

    //Create Production
    const [updateProduct] = useMutation(UPDATE_PRODUCT , {
        onCompleted: ({updateProduct}) => {          
            if(updateProduct?.success){
                setCheckMessage("success")
                setMessage(updateProduct?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false)
            } else {
                setLoading(false)
                setCheckMessage("error")
                setMessage("Material invalid value!")
                setAlert(true);
            }
        },
        onError: (error) => {  
            setLoading(false)          
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });
    // End Create

    // Get Product Unit 
    const [unit,setUnit] = React.useState([])
    const { data: productUnit } = useQuery(GET_UNIT_PAGINATION, {
      variables: {
        keyword: "",
        pagination: false,
      }
    });

    React.useEffect( () => {        
      if(productUnit?.getUnitPagination){
        setUnit(productUnit?.getUnitPagination?.units);
      }      
    },[productUnit?.getUnitPagination])
    // End

     // Get Product Unit 
     const [stockUnit,setStockUnit] = React.useState([])
     const { data: productStockUnit } = useQuery(GET_PRODUCTION_UNIT);
 
     React.useEffect( () => {        
       setStockUnit(productStockUnit?.getCompletedProductsUnits);
     },[stockUnit])
     // End

    
    // Get product Categroy
    const [categoryProduct,setCategoryProduct] = React.useState([]);
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
                  const allrow = { label: element?.categoryName , _id: element?._id };
                  rows.push(allrow);
              });
              setCategoryProduct(rows);
          }
      }, [data?.getProductCategoryPagination?.ProductCategory]);
    // End Get 
    
    

    // Setup ingrideian
    const [currentItem, setCurrentItem] = React.useState({ rawName:'' , rawMaterialId: '', amount: 1 , percentage: 0, unitRawMaterial: "" , key: 0 })
    const [item, setItem] = React.useState([])

    React.useMemo( async () => {
        if(editData?.ingredients){            
            let rows = [];
            editData?.ingredients.forEach((element) => {
                const allrow = {
                    rawName: element?.rawMaterialId?.materialName,
                    rawMaterialId: element?.rawMaterialId?._id,
                    amount: element?.amount,
                    key: element?.key,
                    unitRawMaterial: element?.unitRawMaterial,
                    percentage: element?.percentage,
                };
                rows.push(allrow);
            });
            setItem(rows)
        } else {
            setItem([])
        }

    },[editData?.ingredients])


    const addItem = () => {     
        const newItem = currentItem;
        if (newItem.rawName !== "") {
            const items = [
                ...item,
                newItem
            ];
            setItem([... items])
            setCurrentItem({
                rawName:'' , rawMaterialId:'' , amount: 1, percentage: 0, unitRawMaterial: "" , key: 0
            })
        }
    }

    const handleAddMaterail = () => {
        setCurrentItem({ rawName:'Material Name' ,  rawMaterialId: '' , amount: 1 , percentage: 0 ,  unitRawMaterial: "" , key: Date.now() });
    }

    React.useEffect(() => {
        if (currentItem?.rawName !== "") {
            addItem();
        }
    }, [currentItem])

   
    const checkPercenteage = () => {
        const items = item;
        let newPercent = 0;
        items.map( i => {             
          newPercent += i.percentage;         
        })

        console.log(newPercent)

        if(newPercent > 100) {
            setCheckPercent(true);           
        }
    }

    React.useEffect( () => {
        setCheckPercent(false)
        checkPercenteage();
    },[item])


    const deleteItem = (key) => {
        const filteredItems = item?.filter(t => t.key !== key);
        setItem(filteredItems)
    }

    const setUpdateText = (rawMaterialId,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){
            console.log(i.key +"  "+key)
            i.rawMaterialId= rawMaterialId;
          }
        })
        setItem([...items]) 
    }

    const setUpdateQty = (amount,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){
            // console.log(i.key +"  "+key)
            i.amount= parseFloat(amount);
          }
        })
        setItem([...items]) 
    }

    const setUpdatePercent = (percentage,key) => {
        const items = item;
        setCheckPercent(false)
        items.map( i => {      
          if(i.key===key) {           
            i.percentage= parseFloat(percentage);
          }
        })
        setItem([...items]);
        checkPercenteage();
    }

    const setUpdateRawName = (rawName,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){
            console.log(i.key +"  "+key)
            i.rawName= rawName;
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
    // End Setup

    // Get Category From EditData
    const [categorySelect,setCategorySelect] = React.useState({
        label: editData?.category?.categoryName,
        _id: editData?.category?._id, 
    })

    // Formik
    const CreateProductes = Yup.object().shape({
        productName: Yup.string().required("Product's Name is required!"),
        productId: Yup.string().required("Product's ID is required!"),
        remark: Yup.string(),  
        unitPrice: Yup.number(),     
        unit: Yup.string().required("Unit is required!"),  
        completedUnit : Yup.string(),
        durationProduce: Yup.number(),
        category: Yup.string().required("Category is required!"),      
    });
    
    const formik = useFormik({
        initialValues: {
            productName: editData?.productName,
            productId: editData?.productId,
            remark: editData?.remark,
            unitPrice: editData?.unitPrice,
            unit: editData?.unit,
            completedUnit: editData?.completedUnit,
            category: editData?.category?._id,
            durationProduce: editData?.durationProduce,
        },
    
        validationSchema: CreateProductes,
        onSubmit: async (values, { setSubmitting, resetForm }) => {        
            setLoading(true)
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
            // console.log(newValue)   
            updateProduct({
                variables: {
                    id: editData?._id,
                    productEdit: {
                        ...newValue,
                    }
                }
            }) 
            
        },

    });  
    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm } = formik;
    // End Formik

    React.useEffect( () => {        
        setFieldValue("productName" , editData?.productName)
        setFieldValue("productId" , editData?.productId)
        setFieldValue("remark" , editData?.remark)
        setFieldValue("unitPrice" , editData?.unitPrice)
        setFieldValue("unit" ,  editData?.unit?._id)
        setFieldValue("completedUnit" , editData?.completedUnit)
        setFieldValue("category" , editData?.category?._id)
        setFieldValue("durationProduce" , editData?.durationProduce)      
    },[editData])


    const handleBeforeCloseModal = () => {
        if(
            values?.productName !== editData?.productName ||
            values?.productId !== editData?.productId ||           
            values?.category !== editData?.category?._id ||
            values?.unit !== editData?.unit ||
            values?.durationProduce !== editData?.durationProduce 
        ) 
        {            
            handleOpenFormAlert();
        } else {
            handleClose();
        }
    }
      
    return (
        <>
        <Dialog open={open} className="dialog-product-create">
            <DialogTitle id="alert-dialog-title">
                    <Stack direction="row" spacing={5}>        
                        <Typography className='header-title' variant="h6" >
                            Update Product
                        </Typography>
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={() => handleBeforeCloseModal()}>
                            <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
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
                            
                                <Stack direction="row" spacing={5} width="100%" sx={{mt:2}}>
                                    <Box className='auto-selete-category'>               
                                        <Autocomplete
                                            disablePortal
                                            id="combo-box-demo"
                                            options={categoryProduct}                           
                                            value={categorySelect}
                                            getOptionSelected={(option, value) => option._id === value._id } 
                                            onChange={(e, value) => {
                                                setFieldValue( "category" , value?._id ); 
                                                setCategorySelect(value)
                                            }}
                                            renderInput={(params) => 
                                                <TextField 
                                                    {...params} size="small" label="Category"
                                                    error={Boolean(touched.category && errors.category)}                        
                                                    helperText={touched.category && errors.category}
                                                />
                                            }
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
                                    <TableContainer >
                                        <Table className="table-top" aria-label="simple table">
                                            <TableHead >
                                                <TableRow className="header-row">
                                                    <TableCell className="header-title">Product Name</TableCell>  
                                                    <TableCell className="header-title" width="3%"></TableCell>  
                                                    <TableCell className="header-title">Unit</TableCell>  
                                                    <TableCell className="header-title" width="3%"></TableCell>  
                                                    {/* <TableCell className="header-title">Stock U/M</TableCell>   */}
                                                    {/* <TableCell className="header-title" width="3%"></TableCell>                        */}
                                                    <TableCell className="header-title" align='center' >Duration</TableCell>                                                       
                                                </TableRow>
                                            </TableHead>                    
                                            <TableBody component={Paper} className="body" >                        
                                                <TableRow  className="body-row">
                                                    <TableCell className="body-title" component="th" scope="row" width="50%" >
                                                        <TextField 
                                                            size='small' 
                                                            fullWidth
                                                            {...getFieldProps("productName")}
                                                            error={Boolean(touched.productName && errors.productName)}
                                                            helperText={touched.productName && errors.productName}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="body-title"></TableCell>  
                                                    <TableCell className="body-title" width="20%">
                                                        <FormControl fullWidth size='small'>                                            
                                                            <Select                                                                                     
                                                                {...getFieldProps("unit")}
                                                                error={Boolean(touched.unit && errors.unit)}
                                                                helperText={touched.unit && errors.unit}
                                                            >                                               
                                                                {
                                                                    unit?.map( (item,index) => (
                                                                        <MenuItem key={index} value={`${item?._id}`}>{item?.unitName}</MenuItem>
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
                                                    <TableCell className="body-title"></TableCell>

                                                    {/* <TableCell className="body-title" width="20%">
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
                                                    </TableCell> */}

                                                    {/* <TableCell className="body-title"></TableCell>                 */}
                                                    <TableCell className="body-title" width="20%" align='center'>
                                                        <TextField 
                                                            size='small' 
                                                            fullWidth
                                                            {...getFieldProps("durationProduce")}
                                                            error={Boolean(touched.durationProduce && errors.durationProduce)}
                                                            helperText={touched.durationProduce && errors.durationProduce}
                                                            InputProps={{                                  
                                                                endAdornment: (
                                                                    <InputAdornment position="end">                                             
                                                                        min                                         
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

                                    <TableContainer >
                                        <Table className="table" aria-label="simple table">
                                            <TableHead >
                                                <TableRow className="header-row">
                                                    <TableCell className="header-title">Raw Materail</TableCell>  
                                                                            
                                                    <TableCell className="header-title" align='center'>Quantity</TableCell>  
                                                    
                                                    <TableCell className="header-title" align='right'>
                                                        <IconButton onClick={handleAddMaterail}> 
                                                            <AddCircleOutlineRoundedIcon sx={{color:"green"}}/>
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

                                            <ListRawMaterialUpdate 
                                                items={item}
                                                deleteItem={deleteItem}
                                                setUpdateText={setUpdateText}
                                                setUpdateQty={setUpdateQty}
                                                setUpdateRawName={setUpdateRawName}
                                                setUpdateUnitRawMaterial={setUpdateUnitRawMaterial}
                                                setUpdatePercent={setUpdatePercent}
                                                checkPercent={checkPercent}
                                            />

                                        </Table>
                                    </TableContainer>

                                </Box> 

                                {/* <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                                    <Typography className="header-title">Unit Price</Typography>
                                    <Box sx={{width:"300px"}}>
                                        <TextField               
                                            size="small"
                                            type="number"
                                            fullWidth
                                            placeholder="unitPrice"
                                            {...getFieldProps("unitPrice")}
                                            error={Boolean(touched.unitPrice && errors.unitPrice || touched.unitPrice && isNaN(values.unitPrice) )}
                                            helperText={touched.unitPrice && errors.unitPrice || isNaN(values.unitPrice) &&  errors.unitPrice }
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
                                </Stack> */}


                                <Stack direction="column" spacing={1} sx={{mt:2}}>
                                    <Typography className='header-title'>
                                        Remark
                                    </Typography>
                                    <TextField 
                                        multiline
                                        rows={3}
                                        size='small' 
                                        fullWidth
                                        placeholder='Remark'
                                        {...getFieldProps("remark")}
                                        error={Boolean(touched.remark && errors.remark)}
                                        helperText={touched.remark && errors.remark}
                                    />            
                                </Stack>
                                <Stack direction="column" spacing={1} sx={{mt:2}}>          
                                {
                                    loading ?
                                        <Button className="btn-update" sx={{boxShadow: "none"}} variant="contained">Loading...</Button>
                                    :
                                        checkPercent ?
                                            <Button className="btn-update" sx={{boxShadow: "none"}} variant="contained">{btnTitle}</Button>
                                        :    
                                            <Button className="btn-update" sx={{boxShadow: "none"}} type='submit' variant="contained">{btnTitle}</Button>
                                } 
                                   
                                </Stack>
                                                
                             
                        </Form>
                    </FormikProvider>    

            </DialogContentText>
        </DialogContent>       
    </Dialog>   

    <ModalAlert resetForm={resetForm} handleClose={handleCloseFormAlert} handleCloseModalCreate={handleClose} open={openFormAlert} modalTitle="Product" />
    </>
  );
}