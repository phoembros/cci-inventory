import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './purchasematerial.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Autocomplete, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, InputAdornment, Tooltip } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterialUpdate from './ListRawMaterialUpdate';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useQuery , useMutation, useLazyQuery } from '@apollo/client';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { GET_PO_NUMBER, GET_PO_NUMBER_CHANGE, UPDATE_PURCHASE_RAW_MATERIAL } from "../../Schema/rawmaterial";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { GET_USER_LOGIN } from '../../Schema/user';
import { useLocation } from 'react-router-dom';
  
// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import DateRangeIcon from '@mui/icons-material/DateRange';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { GET_SUPPLIERS_BY_PAGINATION } from '../../Schema/supplies';
import { sendMessage } from '../TelegrameClient/TelegrameClient';

import moment from "moment";
import { GET_STORAGE_ROOM_PAGINATION } from '../../Schema/starageroom';
import ModalAlert from '../Permission/ModalAlert';

export default function PurchaseRawMaterialUpdate({
  nameRequest,
  handleClose, 
  open,
  btnTitle,
  setCheckMessage,
  setMessage,
  setAlert,  
  setRefetch,
  editData,
}) {

  // Alert Message before close form
  const [openFormAlert,setOpenFormAlert] = React.useState(false);
  const handleOpenFormAlert = () => setOpenFormAlert(true);
  const handleCloseFormAlert = () => setOpenFormAlert(false);


  const [loading,setLoading] = React.useState(false);
  const [openWarning,setOpenWarning]  = React.useState(false);

  const [storageRoomSelected,setStorageRoomSelected] = React.useState({
    label: editData?.storageRoom?.name,
    _id: editData?.storageRoom?._id,
  })
  // Get Storage Room  ===========================================================================================
  const [storageRoomData,setStorageRoomData] = React.useState([]);
  const { data, refetch } = useQuery(GET_STORAGE_ROOM_PAGINATION, {
    variables: {        
        keyword: "",
        pagination: false,
    },
    pollInterval: 10000,
  });

  React.useEffect( () => {
      if(data?.getStorageRoomWithPagination){
          // console.log(data?.getStorageRoomWithPagination?.storageRoom, "Storage Room")
          let rows = [];
          data?.getStorageRoomWithPagination?.storageRoom?.forEach( (element) => {              
              if(element?.type !== "Products") {
                  const allrow = {
                      label: element?.name,
                      _id: element?._id,
                  };
                  rows.push(allrow);
              }              
          });
          setStorageRoomData(rows);
      }
  },[data?.getStorageRoomWithPagination])  
  // Get Storage Room ===========================================================================================


  // Get PO NUmber ======================================================================================================
  const { data: poNumber } = useQuery(GET_PO_NUMBER,{
    onCompleted: ({getPOId}) => {
        // console.log(getPOId)
    }
  });
  
  const [checkExistingPoId, {data: poNumberChange}] = useLazyQuery(GET_PO_NUMBER_CHANGE,{
    onCompleted: ({checkExistingPoId}) => {
        // console.log(checkExistingPoId)
    }
  });
  // Get PO NUmber ======================================================================================================


  // Update
  const [updatePurchaseRawMaterial] = useMutation(UPDATE_PURCHASE_RAW_MATERIAL,{
    onCompleted: async ({updatePurchaseRawMaterial}) => {
      console.log(updatePurchaseRawMaterial, "message");
      if(updatePurchaseRawMaterial?.success){
        setCheckMessage('success')
        setMessage(updatePurchaseRawMaterial?.message);
        setAlert(true);
        handleClose();
        setRefetch();
        setLoading(false);

        var ListRawMaterils = "";
        updatePurchaseRawMaterial?.data?.productsItems?.map( i => (
          ListRawMaterils+= `\n👉 ${i?.rawMaterialId?.materialName} (x${i?.newQty} ${i?.rawMaterialId?.unit})` 
        ))

        await sendMessage({content: `<b>[Request Purchase RawMaterial]</b>\n👩‍🚀 <i>${nameRequest}</i>\n${ListRawMaterils}\n\n🗓 Date:${moment(updatePurchaseRawMaterial?.data?.purchaseDate).format("DD/MMM/YYYY")}\n<code>For details info please kindly check system.</code>\n<a href="https://system.cci-cambodia.com/">system.cci-cambodia.com</a>`})


      } else {
        setLoading(false);
        setCheckMessage('error')        
        setMessage("Material & Supplier invalid value!");
        setAlert(true)
      }
    },
    onError: (error) => {     
      setLoading(false)
      setAlert(true)
      setCheckMessage('error')
      setMessage(error?.message)
    },
  });
       

  const [btnCheckSubmit,setBtnCheckSubmit] = React.useState(false);

  //get Storage Room ID by Url 
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [roomId, setRoomId] = React.useState(null);
  React.useEffect( () => {
      setRoomId(params.get("storageId"));        
  }, [location.search]);
  // End get Id Storage Room

  // Get User ID  
  const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
  const userId =  userLoginData?.getuserLogin?._id;
  // End Get User ID

  //End Get Supplies
  const [supplierAutoComplete,setSupplierAutoComplete] = React.useState({
      label: editData?.supplierID?.name,
      _id: editData?.supplierID?._id,
  })

  React.useEffect( () => {
      if(editData){
        setSupplierAutoComplete({
            label: editData?.supplierID?.name,
            _id: editData?.supplierID?._id,
        })
      }
  },[editData])

  const [suppliers, setSuppliers] = React.useState([]);
  const {data: suppliesData} = useQuery(GET_SUPPLIERS_BY_PAGINATION,{
      variables: {
          keyword: "",
          pagination: false,
      },
  })

  React.useEffect(() => {
      if (suppliesData) {
          let rows = [];
          suppliesData?.getSuppliersPagination?.suppliers?.forEach((element) => {
              const allrow = { label: element?.name, _id: element?._id };
              rows.push(allrow);
          });
          setSuppliers(rows);
      }
  }, [suppliesData]);
  //End Get Supplies


  // List RawMaterial have to purchase===========================================================================================
    const [currentItem, setCurrentItem] = React.useState({ rawName: '', rawMaterialId: '', newQty: 0 , unitPrice : 0 , suppliersName: '' , suppliersId: '', key: ''})
    const [item, setItem] = React.useState([]);

    
    React.useMemo( () => {
      
      if(editData?.productsItems.length !== 0){            
          let rows = [];
           editData?.productsItems?.forEach((element) => {             
              const allrow = {
                  rawName: element?.rawMaterialId?.materialName,
                  rawMaterialId: element?.rawMaterialId?._id,
                  newQty: element?.newQty,
                  unitPrice: element?.unitPrice,
                  suppliersName: element?.suppliersId?.name,
                  suppliersId: element?.suppliersId?._id,
                  key: element?.key,
              };
              rows.push(allrow);
          });
          setItem(rows)            
      } else {
          setItem([])
      }
     
    },[editData?.productsItems])


    const addItem = () => {     
        const newItem = currentItem;
        if (newItem.rawName !== "") {
            const items = [
                ...item,
                newItem
            ];
            setItem([... items])
            setCurrentItem({
              rawName: '', rawMaterialId: '' , newQty: 1 , unitPrice : 0.01 ,suppliersName: '' , suppliersId: '' , key: ''
            })
        }
    }

    const handleAddMaterail = () => {
        setCurrentItem({ rawName: "Material Name" , rawMaterialId: "", newQty: 1 , unitPrice : 0.01 , suppliersName: '' , suppliersId: '' , key: Date.now() });
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

    // Update Raw material Data
    const setUpdateRawId = (rawMaterialId,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.rawMaterialId= rawMaterialId;
            i.suppliersName= supplierAutoComplete?.label;
            i.suppliersId= supplierAutoComplete?._id;
          }
        })
        setItem([...items]) 
    }
    const setUpdateRawName = (rawName,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.rawName= rawName;
            i.suppliersName= supplierAutoComplete?.label;
            i.suppliersId= supplierAutoComplete?._id;
          }
        })
        setItem([...items]) 

        //Check Submit
        if(rawName === undefined) {
            setBtnCheckSubmit(true);
        } else {
            setBtnCheckSubmit(false);
        }
    }
    // ENd Raw


    // Update Supplies Data
    const setUpdateSuppliersName = (suppliersName,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.suppliersName= suppliersName;
          }
        })
        setItem([...items]) 

        //Check Submit
        if(suppliersName === undefined) {
          setBtnCheckSubmit(true);
        } else {
          setBtnCheckSubmit(false);
        }
    }

    const setUpdateSuppliesId = (suppliersId,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.suppliersId= suppliersId;
          }
        })
        setItem([...items]) 

        //Check Submit
        if(suppliersId ===  undefined) {
          setBtnCheckSubmit(true);
        } else {
          setBtnCheckSubmit(false);
        }

    }
    // End Supplies

  
    const setUpdateQty = (newQty,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){          
            i.newQty= newQty;
            i.suppliersName= supplierAutoComplete?.label;
            i.suppliersId= supplierAutoComplete?._id;
          }
        })
        setItem([...items]) 

        //Check Submit
        if(newQty === 0 || isNaN(newQty) ) {
          setBtnCheckSubmit(true);
        } else {
          setBtnCheckSubmit(false);
        }
    }

    const setUpdateUnitPrice = (unitPrice,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){          
            i.unitPrice= unitPrice;
            i.suppliersName= supplierAutoComplete?.label;
            i.suppliersId= supplierAutoComplete?._id;
          }
        })
        setItem([...items]) 

        //Check Submit
        if(unitPrice < 0.01 || isNaN(unitPrice) ) {
          setBtnCheckSubmit(true);
        } else {
          setBtnCheckSubmit(false);
        }
    }   

    React.useEffect( () => {
      if(supplierAutoComplete?.label !== "") {
        const items = item;
        items.map( i => {                
          i.suppliersName= supplierAutoComplete?.label;
          i.suppliersId= supplierAutoComplete?._id;          
        })
        setItem([...items]) 
      }
      
    },[supplierAutoComplete])

    // End List Purchase =======================================================================================
    

    const SalesAdd = Yup.object().shape({       
        purchaseDate: Yup.date(),
        priority: Yup.string().required(),
        remark: Yup.string(),
        supplierID: Yup.string().required(),
        storageRoom: Yup.string().required(),
        purchaseId: Yup.string().required(),
    });
    
    const formik = useFormik({
      initialValues: {         
          purchaseDate: editData?.purchaseDate,
          priority: editData?.priority,
          remark: editData?.remark,
          supplierID: editData?.supplierID?._id,
          storageRoom: editData?.storageRoom?._id,
          purchaseId: editData?.purchaseId,
      },

      validationSchema: SalesAdd,
      onSubmit: async (values, { setSubmitting, resetForm }) => {          
          setLoading(true)
          const newValue = {
              purchaseId: values?.purchaseId,
              purchaseDate: values?.purchaseDate,              
              purchaseBy: userId,
              approveBy: null,
              status: "pending",
              supplierID: values?.supplierID,
              priority: values?.priority,
              storageRoom: values?.storageRoom,
              productsItems: item,
              remark: values?.remark,
          }
          console.log(newValue)

          updatePurchaseRawMaterial({
              variables: {
                  id: editData?._id,
                  purchaseRawMaterialEdit: {
                      ...newValue,
                  }
              }
          })

      },
    });
    
    const { errors,  touched, values, isSubmitting, checkProp, handleSubmit, getFieldProps, setFieldValue, resetForm, } = formik;
    
    React.useEffect( () => {
      setFieldValue("supplierID" , editData?.supplierID?._id)
    },[editData])

    React.useEffect( () => {
      if(values.purchaseId){
        // console.log("onChange")
        setOpenWarning(true)
        checkExistingPoId({
            variables: {
                poId : values.purchaseId,
            }
        })
      }      
    },[values.purchaseId])


    const handleBeforeCloseModal = () => {      
        if(
            values?.storageRoom !== editData?.storageRoom?._id ||           
            values?.supplierID !== editData?.supplierID?._id ||
            values?.priority !== editData?.priority ||
            values?.purchaseId !== editData?.purchaseId ||
            values?.purchaseDate !== editData?.purchaseDate
        ) 
        {            
            handleOpenFormAlert();
        } else {
            handleClose();
        }
    }

    
    return (
      <>
      <Dialog open={open} className="dialog-create-purchase">
          <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>
                    <Typography className="header-title" variant="h6">
                        Update Purchase Raw Material
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <IconButton onClick={() => handleBeforeCloseModal()}>
                        <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
                    </IconButton>
                </Stack>
                <Stack direction="row" spacing={1} sx={{mt:-1}}>
                    <Typography variant="body2">
                      Please Select Raw Material that you need to purchase
                    </Typography>
                </Stack>
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">      
                              
                  <FormikProvider value={formik}>
                      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        
                          <Stack direction="row" spacing={1} sx={{mt:2}}>                        
                              <Stack direction="column" justifyContent="center" width="65px"> 
                                  <Typography className="sub-header-title">
                                    Room:
                                  </Typography>
                              </Stack>
                              <Box sx={{width:"170px"}}>
                                  <Autocomplete
                                      disablePortal
                                      id="combo-box-demo"
                                      options={storageRoomData}  
                                      value={storageRoomSelected}     
                                      getOptionSelected={(value,option) => value?._id === option?._id }                 
                                      onChange={(e, value) => {
                                        setStorageRoomSelected(value)
                                        setFieldValue("storageRoom", value?._id)
                                      }}
                                      renderInput={(params) => 
                                          <TextField  
                                              fullWidth
                                              {...params} size="small" 
                                              error={Boolean(touched.storageRoom && errors.storageRoom)}
                                              helperText={touched.storageRoom && errors.storageRoom}
                                          />
                                      }
                                  />  
                              </Box>
                          </Stack>



                          <Stack direction="row" spacing={1} sx={{mt:2}}>
                            <Stack direction="column" justifyContent="center" width="65px"> 
                                <Typography className="sub-header-title">
                                  PO ID:
                                </Typography>
                            </Stack>
                            <Box sx={{width:"170px"}}>
                                <Tooltip  
                                    open={ openWarning ? true : false}  
                                    onOpen={ () => {
                                      setTimeout( () => {
                                        setOpenWarning(false)
                                      },20000)
                                    }}   
                                    arrow                                                             
                                    title={poNumberChange?.checkExistingPoId}                               
                                    PopperProps={{                                 
                                      modifiers: [
                                            {
                                                name: "offset",
                                                options: {
                                                    offset: [25, -10],
                                                },
                                            },
                                        ],
                                    }}
                                    componentsProps={{                                  
                                      tooltip: {
                                        sx: {
                                          bgcolor: 'orange',          
                                          '& .MuiTooltip-arrow': {
                                            color: 'orange',
                                          },                                   
                                        },
                                      },
                                    }}
                                >
                                    <TextField                             
                                      size="small"
                                      fullWidth                                
                                      placeholder="PO Number"
                                      {...getFieldProps("purchaseId")}
                                      error={Boolean(touched.purchaseId && errors.purchaseId)}
                                      helperText={touched.purchaseId && errors.purchaseId}
                                    />
                                </Tooltip>
                            </Box>
                                                        
                            <Box sx={{ flexGrow: 1 }}></Box>

                            <Stack direction="column" justifyContent="center" className='date-select'>
                                <Typography className="sub-header-title">
                                  Date:
                                </Typography>
                            </Stack>
                            <Box sx={{width:"170px"}} className='date-select'>
                                <LocalizationProvider className="date-controll" dateAdapter={AdapterDateFns} >
                                      <DatePicker  
                                          onChange={(e)=> setFieldValue("purchaseDate", e)}
                                          renderInput={(params) => (
                                              <TextField className="select-date" size='small' {...params} type="date" fullWidth />
                                          )}                       
                                          value={values?.purchaseDate}
                                      />
                                </LocalizationProvider>
                            </Box>              
                          </Stack>

                          {/* responsive mobile */}
                          <Stack direction="row" spacing={1} sx={{mt:2}} className='date-select-mobile'>                        
                              <Stack direction="column" justifyContent="center" width="65px">
                                  <Typography className="header-title">
                                    Date:
                                  </Typography>
                              </Stack>
                              <Box sx={{width:"170px"}}>
                                  <LocalizationProvider dateAdapter={AdapterMoment}>
                                      <MobileDatePicker                                      
                                          inputFormat="DD/MM/yyyy"
                                          value={values?.purchaseDate}                                      
                                          onChange={(e)=> setFieldValue("purchaseDate", e)}
                                          renderInput={(params) => (
                                              <TextField {...params}  
                                                  size="small"
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
                              </Box>              
                          </Stack>
                          {/* responsive mobile */}

                          <Stack direction="row" spacing={1} sx={{mt:2}}>                        
                              <Stack direction="column" justifyContent="center" width="65px">
                                  <Typography className="sub-header-title">
                                    Supplier:
                                  </Typography>
                              </Stack>
                              <Box sx={{width:"170px"}}>
                                  <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        value={supplierAutoComplete}
                                        options={suppliers}   
                                        getOptionSelected={(option , value) => option._id === value._id}
                                        getOptionLabel={ (option) => option.label ? option.label : "" } 
                                        onChange={(e,value) => {
                                          setFieldValue("supplierID" , value?._id)
                                          setSupplierAutoComplete({
                                              label: value?.label,
                                              _id: value?._id,
                                          })
                                        }}                            
                                        renderInput={(params) => 
                                            <TextField 
                                                {...params} size="small" className='text-field'                                             
                                                error={Boolean(touched.supplierID && errors.supplierID)}
                                                helperText={touched.supplierID && errors.supplierID}                                             
                                            />
                                        }
                                    />
                              </Box>   
                              <Box sx={{ flexGrow: 1 }}></Box>
                              <Stack direction="column" justifyContent="center" width="65px" className='priority'> 
                                  <Typography className="sub-header-title">
                                    Priority:
                                  </Typography>
                              </Stack>
                              <Box sx={{width:"170px"}} className='priority'>
                                  <FormControl fullWidth size="small" >
                                    <Select                   
                                      {...getFieldProps("priority")}
                                      error={ Boolean(touched.priority && errors.priority)}
                                      helperText={touched.priority && errors.priority}
                                    >                    
                                      <MenuItem value="urgent">
                                          <Stack direction="row" spacing={1}>
                                              <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                                              <Typography>Urgent</Typography>
                                          </Stack>
                                      </MenuItem>
                                      <MenuItem value="medium">
                                          <Stack direction="row" spacing={1}>
                                              <FiberManualRecordIcon sx={{color:"green", width:"17px"}} />
                                              <Typography>Medium</Typography>
                                          </Stack>
                                      </MenuItem>
                                      <MenuItem value="low">
                                          <Stack direction="row" spacing={1}>
                                              <ArrowDownwardIcon sx={{color:"blue", width:"17px"}} />
                                              <Typography>Low</Typography>
                                          </Stack>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                              </Box>           
                          </Stack>

                          {/* Responsive _================================================================= */}
                          <Stack direction="row" spacing={1} sx={{mt:2}} className='priority-mobile'>                       
                              <Stack direction="column" justifyContent="center" width="65px"> 
                                  <Typography className="sub-header-title">
                                    Priority:
                                  </Typography>
                              </Stack>
                              <Box sx={{width:"170px"}}>
                                  <FormControl fullWidth size="small" >
                                    <Select                   
                                      {...getFieldProps("priority")}
                                      error={ Boolean(touched.priority && errors.priority)}
                                      helperText={touched.priority && errors.priority}
                                    >                    
                                      <MenuItem value="urgent">
                                          <Stack direction="row" spacing={1}>
                                              <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                                              <Typography>Urgent</Typography>
                                          </Stack>
                                      </MenuItem>
                                      <MenuItem value="medium">
                                          <Stack direction="row" spacing={1}>
                                              <FiberManualRecordIcon sx={{color:"green", width:"17px"}} />
                                              <Typography>Medium</Typography>
                                          </Stack>
                                      </MenuItem>
                                      <MenuItem value="low">
                                          <Stack direction="row" spacing={1}>
                                              <ArrowDownwardIcon sx={{color:"blue", width:"17px"}} />
                                              <Typography>Low</Typography>
                                          </Stack>
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                              </Box>
                          </Stack>
                            {/* Responsive _================================================================= */} 


                          <Box className="container">
                            <TableContainer>
                              <Table className="table" aria-label="simple table">
                                <TableHead>
                                  <TableRow className="header-row">
                                    <TableCell className="header-title">
                                      Raw Materail
                                    </TableCell>
                                    
                                    <TableCell className="header-title" align="center">
                                      Quantity
                                    </TableCell>
                                    
                                    <TableCell className="header-title" align="center">
                                      Unit Price
                                    </TableCell>
                                  
                                    {/* <TableCell className="header-title" align="center">
                                      Supplier Raw Material
                                    </TableCell> */}
                                    <TableCell className="header-title" align="right" width="5%">
                                      <IconButton onClick={handleAddMaterail}>
                                        <AddCircleOutlineRoundedIcon
                                          sx={{ color: "green" }}
                                        />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                </TableHead>

                                <ListRawMaterialUpdate
                                    items={item}
                                    deleteItem={deleteItem}
                                    setUpdateRawName={setUpdateRawName}
                                    setUpdateRawId={setUpdateRawId}
                                    setUpdateSuppliersName={setUpdateSuppliersName}
                                    setUpdateSuppliesId={setUpdateSuppliesId}
                                    setUpdateQty={setUpdateQty}
                                    setUpdateUnitPrice={setUpdateUnitPrice}
                                />

                              </Table>
                            </TableContainer>
                          </Box>

                          <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                              <Box sx={{flexGrow:1}}></Box>
                              <Typography className="sub-header-title">Total Amount:</Typography>              
                              <Typography>$52.02</Typography>                
                          </Stack>                 

                          <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                            <Typography className="sub-header-title">Remark</Typography>
                            <TextField
                              multiline
                              rows={3}
                              size="small"
                              fullWidth
                              placeholder="remark"
                              {...getFieldProps("remark")}
                              error={Boolean(touched.remark && errors.remark)}
                              helperText={touched.remark && errors.remark}
                            />
                          </Stack>

                          {
                              btnCheckSubmit ?
                                  
                                  <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                                    <Button sx={{boxShadow: "none"}} className="btn-submit" >{btnTitle}</Button>
                                  </Stack>
                              :
                                  loading ?
                                    <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                                      <Button sx={{boxShadow: "none"}} className="btn-submit">Loading...</Button>
                                    </Stack> 
                                  :
                                    <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
                                      <Button sx={{boxShadow: "none"}} className="btn-submit" type='submit'>{btnTitle}</Button>
                                    </Stack>                    
                          }
                        
                      </Form>
                    </FormikProvider> 
                  
              </DialogContentText>
          </DialogContent>       
      </Dialog>

      <ModalAlert resetForm={resetForm} handleClose={handleCloseFormAlert} handleCloseModalCreate={handleClose} open={openFormAlert} modalTitle="Production" /> 
      </>
    );
}