import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './createproduct.scss';
import { Autocomplete, FormControl, Icon, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterialUpdate from './ListRawMaterialUpdate';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { GET_PRODUCT_CATEGORY } from "../../Schema/product";
import { useQuery } from "@apollo/client";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { GET_PRODUCT_UNIT , UPDATE_PRODUCT } from "../../Schema/product";
import { useMutation } from '@apollo/client';


export default function UpdateProduct({
    handleClose,
    btnTitle,
    editData,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,
    checkStatus,
}) {

    //Create Production
    const [updateProduct] = useMutation(UPDATE_PRODUCT , {
        onCompleted: ({updateProduct}) => {          
            if(updateProduct?.success){
                setCheckMessage("success")
                setMessage(updateProduct?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } else {
                setCheckMessage("error")
                setMessage("Invaid Raw Material!")
                setAlert(true);
            }
        },
        onError: (error) => {            
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }

    });
    // End Create

    // Get Product Unit 
    const [unit,setUnit] = React.useState([])
    const { data: productUnit } = useQuery(GET_PRODUCT_UNIT);

    React.useEffect( () => {        
        setUnit(productUnit?.getProductsUnits);
    },[productUnit])
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
    const [currentItem, setCurrentItem] = React.useState({ rawName:'' , rawMaterialId: '', amount: 0 , unitRawMaterial: "" , key: 0 })
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
                rawName:'' , rawMaterialId:'' , amount: 0 , unitRawMaterial: "" , key: 0
            })
        }
    }

    const handleAddMaterail = () => {
        setCurrentItem({ rawName:'Material Name' ,  rawMaterialId: '' , amount: 0 , unitRawMaterial: "" , key: Date.now() });
    }

    React.useEffect(() => {
        if (currentItem?.rawName !== "") {
            addItem();
        }
    }, [currentItem])

   
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
        remark: Yup.string(),  
        unitPrice: Yup.number(),     
        unit: Yup.string(),   
        durationProduce: Yup.number(),
        category: Yup.string(),     
    });
    
    const formik = useFormik({
        initialValues: {
            productName: editData?.productName,
            remark: editData?.remark,
            unitPrice: editData?.unitPrice,
            unit: editData?.unit,
            category: editData?.category?._id,
            durationProduce: editData?.durationProduce,
        },
    
        validationSchema: CreateProductes,
        onSubmit: async (values, { setSubmitting, resetForm }) => {        
             
            const newValue = {
                productName: values?.productName,
                category: values?.category,                
                unit: values?.unit,
                unitPrice: values?.unitPrice,
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
   
    return (
    <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Box className='product-create'>
                <Stack direction="row" spacing={5}>        
                    <Typography className='header-title' variant="h6" >
                        Update Product
                    </Typography>
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => handleClose()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack>   

                <Stack direction="row" spacing={5} sx={{mt:-1}}>
                    <Typography variant="body2">
                        Please input each field below.
                    </Typography>              
                </Stack>
                
                <Stack direction="row" spacing={5} width="100%" sx={{mt:2}}>
                    <Box sx={{width:"45%"}}>               
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categoryProduct}
                            sx={{ width: 300 }}
                            value={categorySelect}
                            getOptionSelected={(option, value) => option._id === value._id } 
                            onChange={(e, value) => {
                                setFieldValue( "category" , value?._id ); 
                                setCategorySelect(value)
                            }}
                            renderInput={(params) => <TextField {...params} size="small" label="Category" />}
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
                                                defaultValue={"Unit"}                                              
                                                {...getFieldProps("unit")}
                                                error={Boolean(touched.unit && errors.unit)}
                                                helperText={touched.unit && errors.unit}
                                            >
                                                <MenuItem value="Unit">Unit</MenuItem>
                                                {
                                                    unit?.map( (item,index) => (
                                                        <MenuItem key={index} value={`${item}`}>{item}</MenuItem>
                                                    ))
                                                }                               
                                               
                                            </Select>
                                        </FormControl>
                                    </TableCell>
                                    <TableCell className="body-title"></TableCell>                      
                                    <TableCell className="body-title" width="15%" align='center'>
                                        <TextField 
                                            size='small' 
                                            fullWidth
                                            {...getFieldProps("durationProduce")}
                                            error={Boolean(touched.durationProduce && errors.durationProduce)}
                                            helperText={touched.durationProduce && errors.durationProduce}
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
                                                             
                                    <TableCell className="header-title" align='center'>QTY</TableCell>  
                                     
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
                    <Button sx={{boxShadow: "none"}} type='submit' variant="contained">{btnTitle}</Button>
                </Stack>
                                
            </Box>  
        </Form>
    </FormikProvider>      
  );
}