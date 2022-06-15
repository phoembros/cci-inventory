import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './purchaserawmaterial.scss';
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Autocomplete, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import ListRawMaterialUpdate from './ListRawMaterialUpdate';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useQuery , useMutation } from '@apollo/client';
import { useFormik, Form, FormikProvider } from "formik";
import * as Yup from "yup";
import { UPDATE_PURCHASE_RAW_MATERIAL } from "../../Schema/rawmaterial";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { GET_USER_LOGIN } from '../../Schema/user';
import { useLocation } from 'react-router-dom';
  

export default function PurchaseRawMaterialUpdate({
  handleClose, 
  btnTitle,
  setCheckMessage,
  setMessage,
  setAlert,  
  setRefetch,
  editData,
}) {
  // Update
  const [updatePurchaseRawMaterial] = useMutation(UPDATE_PURCHASE_RAW_MATERIAL,{
    onCompleted: ({updatePurchaseRawMaterial}) => {
      console.log(updatePurchaseRawMaterial?.message, "message");
      if(updatePurchaseRawMaterial?.success){
        setCheckMessage('success')
        setMessage(updatePurchaseRawMaterial?.message);
        setAlert(true);
        handleClose();
        setRefetch();
      } else {
        setCheckMessage('error')
        setAlert(true)
        setMessage("Invalit Input!");
      }
    },
    onError: (error) => {     
      setAlert(true)
      setCheckMessage('error')
      setMessage(error?.message)
    },
  });
       
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

  // List RawMaterial have to purchase===========================================================================================
    const [currentItem, setCurrentItem] = React.useState({ rawName: '', rawMaterialId: '', newQty: 0 , unitPrice : 0 , suppliersName: '' , suppliersId: '', key: ''})
    const [item, setItem] = React.useState([]);

    
    React.useMemo( () => {
      
      if(editData?.productsItems.length !== 0){            
          let rows = [];
           editData?.productsItems.forEach((element) => {             
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
              rawName: '', rawMaterialId: '' , newQty: 0 , unitPrice : 0 ,suppliersName: '' , suppliersId: '' , key: ''
            })
        }
    }

    const handleAddMaterail = () => {
        setCurrentItem({ rawName: "Material Name" , rawMaterialId: "", newQty: 0 , unitPrice : 0 , suppliersName: '' , suppliersId: '' , key: Date.now() });
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
    }

    const setUpdateSuppliesId = (suppliersId,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){           
            i.suppliersId= suppliersId;
          }
        })
        setItem([...items]) 
    }
    // End Supplies

  
    const setUpdateQty = (newQty,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){          
            i.newQty= newQty;
          }
        })
        setItem([...items]) 
    }

    const setUpdateUnitPrice = (unitPrice,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){          
            i.unitPrice= unitPrice;
          }
        })
        setItem([...items]) 
    }   
    // End List Purchase =======================================================================================
    

    const SalesAdd = Yup.object().shape({       
        purchaseDate: Yup.date(),
        priority: Yup.string(),
        remark: Yup.string(),
    });
    
    const formik = useFormik({
      initialValues: {         
          purchaseDate: editData?.purchaseDate,
          priority: editData?.priority,
          remark: editData?.remark,
      },

      validationSchema: SalesAdd,
      onSubmit: async (values, { setSubmitting, resetForm }) => {          
          const newValue = {
              purchaseDate: values?.purchaseDate,              
              purchaseBy: userId,
              approveBy: null,
              status: "pending",
              priority: values?.priority,
              storageRoom: roomId,
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


    return (
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Box className="raw-material-purchase-creates">

            <Stack direction="row" spacing={5}>
              <Typography className="header-title" variant="h6">
                Update Purchase Raw Material
              </Typography>
              <Box sx={{ flexGrow: 1 }}></Box>
              <IconButton onClick={() => handleClose()}>
                <DoDisturbOnOutlinedIcon sx={{ color: "red" }} />
              </IconButton>
            </Stack>

            <Stack direction="row" spacing={1} sx={{mt:-1}}>
              <Typography variant="body2">
                Please Select Raw Material that you need to purchase
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{mt:2}}>
              <Stack direction="column" justifyContent="center">
                  <Typography className="header-title">
                    Priority:
                  </Typography>
              </Stack>               
              <Box sx={{width:"150px"}}>
                  <FormControl fullWidth size="small" >
                    <Select                   
                      {...getFieldProps("priority")}
                      error={Boolean(touched.priority && errors.priority)}
                      helperText={touched.priority && errors.priority}
                    >                    
                      <MenuItem value="urgent">urgent</MenuItem>
                      <MenuItem value="medium">medium</MenuItem>
                      <MenuItem value="low">low</MenuItem>
                    </Select>
                  </FormControl>
              </Box>
               
              <Box sx={{ flexGrow: 1 }}></Box>
              <Stack direction="column" justifyContent="center">
                  <Typography className="header-title">
                    Date:
                  </Typography>
              </Stack>
              <Box sx={{width:"150px"}}>
                  <LocalizationProvider className="date-controll" dateAdapter={AdapterDateFns} >
                        <DatePicker  
                            onChange={(e)=> setFieldValue("purchaseDate", e)}
                            renderInput={(params) => (
                                <TextField className="select-date" size='small' {...params} type="date" fullWidth />
                            )}                       
                            value={values.purchaseDate}
                        />
                  </LocalizationProvider>
              </Box>              
            </Stack>
                                 

            <Box className="container">
              <TableContainer>
                <Table className="table" aria-label="simple table">
                  <TableHead>
                    <TableRow className="header-row">
                      <TableCell className="header-title">
                        Raw Materail
                      </TableCell>
                       
                      <TableCell className="header-title" align="center">
                        QTY
                      </TableCell>
                      
                      <TableCell className="header-title" align="center">
                        UnitPrice
                      </TableCell>
                     
                      <TableCell className="header-title" align="center">
                        Supplies
                      </TableCell>
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


            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
              <Typography className="header-title">Remark</Typography>
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
            <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
              <Button variant="contained" type='submit'>{btnTitle}</Button>
            </Stack>
          </Box>
        </Form>
      </FormikProvider>
    );
}