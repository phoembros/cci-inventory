import React from 'react'
import { Typography, Stack, Box, Grid, Paper, Button, TextField, Autocomplete, InputAdornment, IconButton, Table, TableBody,TableHead, TableCell, TableRow ,TableContainer,} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useFormik, Form, FormikProvider } from "formik";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import './salesCreated.scss';

import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { GET_CUSTOMER_PAGINATION } from '../../Schema/sales';
//Date
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PercentIcon from '@mui/icons-material/Percent';
import ListCreateSales from '../../Component/Sales/ListCreateSales';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
// Schema
import { CREATE_SALE } from "../../Schema/sales";
import { useMutation, useQuery } from "@apollo/client";


export default function SalesCreated({
  handleClose,
  setAlert,
  setMessage,
  setCheckMessage,
  setRefetch,
}) {

    // Create 
    const [createSale] = useMutation(CREATE_SALE , {
        onCompleted: ({createSale}) => {
            // console.log(createSale)
            if(createSale?.success){
                setCheckMessage("success")
                setMessage(createSale?.message)
                setAlert(true);
                handleClose();
                setRefetch();
            } 
        },
        onError: (error) => {            
            setCheckMessage("error")
            setMessage(error.message);
            
        }

    });


    //Get Customer 
    const [getSetupCustomer, setSetupCustomer] = React.useState([])
    const { data } = useQuery(GET_CUSTOMER_PAGINATION, {
        variables:{
          keyword: "",
          pagination: false,
        }
    })

    React.useEffect(() => {
      if (data) {
          let rows = [];
          data?.getCustomerPagination?.customers.forEach((element) => {
              const allrow = {
                label: element?.name,
                _id: element?._id
              };
              rows.push(allrow);
          });
          setSetupCustomer(rows);
      }
    }, [data]);
    // End get  Customer

    // List Product to Sell
    const [currentItem, setCurrentItem] = React.useState({ itemName: '' , productId: '', qty:'' , unitPrice:'', amount: 0 , key: 0 ,})
    const [item, setItem] = React.useState([])

    const addItem = () => {     
        const newItem = currentItem;
        if (newItem.itemName !== "") {
            const items = [
                ...item,
                newItem
            ];
            setItem([... items])
            setCurrentItem({
                itemName: '' , productId: '', qty:'' , unitPrice:'', amount: 0 , key: 0
            })
        }
    }

    const handleAddSales = () => {
        setCurrentItem({ itemName: 'product' , productId: '', qty:'' , unitPrice:'', amount: 0 , key: Date.now() });
    }

    React.useEffect(() => {
        if (currentItem?.itemName !== "") {
            addItem();
        }
    }, [currentItem])

    React.useMemo( async () => {
        await handleAddSales();
        await addItem();        
    },[])

    const deleteItem = (key) => {
        const filteredItems = item?.filter(t => t.key !== key);
        setItem(filteredItems, 'rate')
    }

    // get Total Amount    
    const [finalAmount,setFinalAmount] = React.useState(0)
    const [totalPaidAmount,setTotalPaidAmount] = React.useState(0);
    const [vatAmount,setVatAmount] = React.useState(0);
    const [paidAmount,setPaidAmount] = React.useState(0);

    const setTotalAmount = () => {       
        let totalPaidAmounts = 0;
        item?.map(i => { 
            totalPaidAmounts+= i?.amount;
        })
        setTotalPaidAmount(totalPaidAmounts)
    }
    React.useEffect( () => {
        setFinalAmount(totalPaidAmount+vatAmount);
    },[vatAmount,totalPaidAmount])

    // End Get

    const setUpdateItemName = (itemName,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.itemName= itemName;
          }
        })
        setItem([...items]) 
    }  

    const setUpdateProductId = (productId, key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.productId= productId;
          }
        })
        setItem([...items]) 
    }


    const setUpdateQty = (qty,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){            
            i.qty= parseFloat(qty);
          }
        })
        setItem([...items]) 
        setTotalAmount();
    }

    const setUpdateRate = (unitPrice,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.unitPrice= parseFloat(unitPrice);
          }
        })
        setItem([...items]) 
        setTotalAmount();
    }

    const setUpdateAmount = (amount,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){            
            i.amount= parseFloat(amount);
          }
        })
        setItem([...items]) 
        setTotalAmount();
    }  
    // End Setup
    
  
    const SalesAdd = Yup.object().shape({
      billToName: Yup.string(),
      billToID: Yup.string(),
      date: Yup.date(),  
      vat: Yup.number(),
      tin: Yup.string(),
      remark: Yup.string(),
    });

    const formik = useFormik({
      initialValues: {
        billToName: "",
        billToID: "",
        date: new Date(),     
        vat: 0,
        tin: "",
        remark: "",
      },

    validationSchema: SalesAdd,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
                  
          const newValue = {        
              tin: values?.tin,
              date: values?.date,
              billTo: {
                label: values?.billToName,
                customerId: values?.billToID,
              },
              vat: parseFloat(values?.vat),              
              items: item, 
              remark: values?.remark,   
              totalAmount: finalAmount, 
              paidAmount: parseFloat(paidAmount),   
          } 
          // console.log(newValue)

          createSale({
              variables: {
                  newSale: {
                    ...newValue,
                  }
              }
          })
        
      },
    });

    const { errors, touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm, } = formik;


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box className="sales-page" sx={{ spacing: 2 }}>
          <Grid container className="title">
            Create Sales
            <Box sx={{ flexGrow: 1 }}></Box>
            <IconButton onClick={() => handleClose()}>
              <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
            </IconButton>
          </Grid>

          <Typography variant="body2"> Please Input each field: </Typography>

          <Box sx={{ width: "100%" }}>
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Stack direction="column" justifyContent="center">
                <Typography className="type-field"> Bill To: </Typography>
              </Stack>
              <Autocomplete
                id="combo-box-demo"
                disablePortal
                sx={{ width: 220 }}
                options={getSetupCustomer}
                onChange={(event, value) => {
                    setFieldValue("billToName" , value?.label);
                    setFieldValue("billToID" , value?._id);
                }}
                renderInput={(params) => ( <TextField {...params} placeholder="customer" size="small" /> )}
              />
             
              <Box sx={{flexGrow:1}}></Box>

              <Stack direction="column" justifyContent="center">
                  <Typography className="type-field"> Date: </Typography>
              </Stack>
              <Box sx={{width:"150px"}}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker     
                      onChange={(e)=> setFieldValue("date", e)}
                      value={values.date}  
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          {...params}
                          type="date"                      
                        />
                      )}
                    />
                  </LocalizationProvider>
              </Box>
            </Stack>
          </Box>

          <TableContainer  sx={{mt:2}}>
            <Table className="table">
              <TableHead >
                <TableRow className="header-row">
                    <TableCell className="header-title" width="30%">
                      Product
                    </TableCell>
                    <TableCell className="header-title" align="center" width="20%">
                      Qty
                    </TableCell>
                    <TableCell className="header-title" align="center" width="20%">
                      Rate
                    </TableCell>
                    <TableCell className="header-title" align="center" width="20%">
                      Amount
                    </TableCell>
                    <TableCell className="header-title" width="3%"></TableCell>
                    <TableCell className="header-title" align="right">
                      <IconButton onClick={handleAddSales}>
                        <AddCircleIcon sx={{ color: "green" }} />
                      </IconButton>
                    </TableCell>  
                </TableRow>    
              </TableHead>

              <ListCreateSales
                  items={item}
                  deleteItem={deleteItem}
                  setUpdateProductId={setUpdateProductId}
                  setUpdateQty={setUpdateQty}
                  setUpdateRate={setUpdateRate}
                  setUpdateAmount={setUpdateAmount}
                  setUpdateItemName={setUpdateItemName}
              />

            </Table>                           
          </TableContainer>         

          <Stack direction='row' spacing={2} width="100%">
              <Box sx={{ width: "40%" }}>
                  <Stack direction="column" sx={{ mt: 2 }}>
                    <Typography className="type-field"> Additional:</Typography>
                    <TextField
                      multiline
                      rows={4}
                      size="large"
                      placeholder="remark"
                      fullWidth
                      {...getFieldProps("remark")}
                      error={Boolean(touched.remark && errors.remark)}
                      helperText={touched.remark && errors.remark}
                    />
                  </Stack>
              </Box>
              <Box sx={{ width: "60%" }}>
                  <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="column" justifyContent="center">
                            <Typography className="type-field"> VAT : </Typography>
                        </Stack>
                        <Box sx={{width:"100px"}}>
                          <TextField                      
                                fullWidth
                                type="number"
                                id="input-with-sx"
                                placeholder="0"
                                size="small"  
                                onChange={(e) => {
                                    let vatAmount = totalPaidAmount* parseFloat(e.target.value)/100;
                                    setVatAmount(vatAmount);
                                    setFieldValue("vat" , e.target.value)
                                }}                                   
                                InputProps={{                  
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton disableRipple={true} size="small">
                                            %
                                        </IconButton>
                                      </InputAdornment>
                                    ),
                                }}                      
                          />
                        </Box>
                  </Stack>

                  <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="column" justifyContent="center">
                            <Typography className="type-field"> Paid Amount : </Typography>
                        </Stack>
                        <Box sx={{width:"150px"}}>
                            <TextField 
                              size="small"                              
                              placeholder="0" 
                              onChange={(e)=> setPaidAmount(e.target.value) }
                              fullWidth 
                              InputProps={{                  
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton disableRipple={true} size="small">
                                      $
                                    </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                          />
                        </Box>
                  </Stack>


                  <Stack direction="row" spacing={3} sx={{ mt: 2 }}>
                        <Box sx={{flexGrow:1}}></Box>
                        <Stack direction="column" justifyContent="center">
                            <Typography className="type-field"> Total Amount : </Typography>
                        </Stack>
                        <Box sx={{width:"150px"}}>
                            <TextField 
                              size="small" 
                              value={finalAmount} 
                              placeholder="0" 
                              fullWidth 
                              InputProps={{                  
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton disableRipple={true} size="small">
                                      $
                                    </IconButton>
                                  </InputAdornment>
                                ),
                            }}
                          />
                        </Box>
                  </Stack>

              </Box>
          </Stack>
                   

          <Button
            sx={{ mt: 2 }}
            className="btn-create"
            size="large"
            type="submit"
            variant="contained"
          >
            Create
          </Button>

        </Box>

      </Form>
    </FormikProvider>
  );
}
