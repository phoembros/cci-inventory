import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, Stack, Table, TableContainer, TextField, Typography } from "@mui/material";
import * as React from "react";
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined';
import './modalqualitycheck.scss';
import { UPDATE_PRODUCTION , COMPLETE_PRODUCTION } from "../../Schema/production"
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from '../../Schema/user';
import { GET_PRODUCTION_UNIT, GET_PRODUCT_UNIT } from "../../Schema/product";
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ListProductGroup from "./ListProductGroup";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ModalAlert from "../Permission/ModalAlert";

export default function ModalQualityCheck({
    handleClose,
    open,
    editDataProduction,
    setAlert,
    setMessage,
    setCheckMessage,
    setRefetch,    
}) {

    console.log(editDataProduction)

    // Alert Message before close form
    const [openFormAlert,setOpenFormAlert] = React.useState(false);
    const handleOpenFormAlert = () => setOpenFormAlert(true);
    const handleCloseFormAlert = () => setOpenFormAlert(false);

    const [loading,setLoading] = React.useState(false);

    // Get User ID  
    const { data: userLoginData } = useQuery(GET_USER_LOGIN);  
    const userId =  userLoginData?.getuserLogin?._id;    

    // Get Unit Product
    const [unitProduct,setUnitProduct] = React.useState([])
    const { data: getUnitProduct } = useQuery(GET_PRODUCTION_UNIT,{
        onCompleted: ({getCompletedProductsUnits}) => {
            setUnitProduct(getCompletedProductsUnits)
        }
    });

    console.log("modalCheck" , editDataProduction)

    // Handle Message Error TextField
    const [errorMessage, setErrorMessage] = React.useState(["Over than remain" , "Input invalid value" , "is required!"]);
    const [errorAlert,setErrorAlert] = React.useState(false);
    const [valueOver,setValueOver] = React.useState(false);
    const [touched, setTouched] = React.useState(false);
    const handleTouch = () =>  setTouched(true);
    

    const [create,setCreate] = React.useState(false);

    // ProductGroup List ===============================================================================
    const [currentItem, setCurrentItem] = React.useState({ productGroupId: '' , label: "" , unitQtyGroup: 0 , qtyOfUM: 0 , key: ""})
    const [item, setItem] = React.useState([]);

    const addItem = () => {     
        const newItem = currentItem;
        if (newItem.productGroupId !== "") {
            const items = [
                ...item,
                newItem
            ];
            setItem([... items])
            setCurrentItem({ productGroupId: '' , label: "" , unitQtyGroup: 0  , qtyOfUM: 0 , key: "" })
        }
    }

    const handleAdd = () => {
        setCurrentItem({ productGroupId: 'Name' , label: "" , unitQtyGroup: 0 , qtyOfUM: 0 , key: Date.now() });
    }

    React.useEffect(() => {
        if (currentItem?.productGroupId !== "") {
            addItem();
        }
    }, [currentItem])

    React.useMemo( async () => {
        await handleAdd();
        await addItem();
    },[])

    
    // Esstimate ==============================================================================
    const [showValueEsstimate,setShowValueEsstimate] = React.useState(0);
    const [valueEsstimate,setValueEsstimate] = React.useState(0);

    const handleValueEsstimate = () => {
        const items = item;
        var totalEsstimate = 0;

        items?.map(i => {         
            // console.log(i)    
            if(i?.productGroupId === undefined ) {
                totalEsstimate += 0; 
            } else {
                totalEsstimate += i.qtyOfUM*i.unitQtyGroup; 
            }            
        })

        if(valueEsstimate-totalEsstimate >= 0){           
            setShowValueEsstimate(valueEsstimate-totalEsstimate);
            setErrorAlert(false);
        } else {
            setErrorAlert(true);   
        }      
            
    }
    
    React.useEffect( () => {         
        setValueEsstimate(editDataProduction?.qty)  
    },[editDataProduction])

    React.useEffect( () => {
        handleValueEsstimate()
    },[valueEsstimate, item])

    // End Esstimate ==============================================================================

    const deleteItem = (key) => {
        const filteredItems = item?.filter(t => t.key !== key);
        setItem(filteredItems);
        handleValueEsstimate();
    }

    const setProductGroupLabel = (label,key) => {
        const items = item;
        items.map(i=>{      
          if(i.key===key){
            i.label= label;                     
          }
        })
        setItem([...items]) 
    }


    const setProductGroupId = (productGroupId, unitQtyGroup ,key) => {
        const items = item;
        var newShowValueEsstimate = showValueEsstimate;
        items.map(i=>{      
            if(i.key===key){                
                i.productGroupId= productGroupId;                 
                i.unitQtyGroup = unitQtyGroup;                
                i.qtyOfUM = parseFloat(newShowValueEsstimate/unitQtyGroup); 
            }
        })        
        setItem([...items]) 
        handleValueEsstimate();        
    }

    const setQtyOfUM = (qtyOfUM,key) => {
        const items = item;
        var newShowValueEsstimate = showValueEsstimate;
        items.map(i=>{      
          if(i.key===key){
                i.qtyOfUM= parseFloat(qtyOfUM);   
                setValueOver(false);   
          }
          if(parseFloat(qtyOfUM) > newShowValueEsstimate/i.unitQtyGroup){
                setValueOver(true)
          }
        })       
        setItem([...items]) 
        handleValueEsstimate(); 
    }

    // End List ==============================================================================
   

    // Update Status Production
    const [completeProduction] = useMutation(COMPLETE_PRODUCTION , {
        onCompleted: ({completeProduction}) => {          
            if(completeProduction?.success){
                setCheckMessage("success")
                setMessage(completeProduction?.message)
                setAlert(true);
                handleClose();
                setRefetch();
                setLoading(false);
                setItem([{ productGroupId: '' , label: "" , unitQtyGroup: 0 , qtyOfUM: 0 , key: "" }])

            } else {
                setLoading(false)
                setCheckMessage("error")
                setAlert(true);
                setMessage(completeProduction?.message)                
            }
        },
        onError: (error) => { 
            setLoading(false)           
            setCheckMessage("error")
            setAlert(true);
            setMessage(error.message);            
        }
    });


    const [unitSelect,setUnitSelect] = React.useState("");
    const [completedQty,setCompletedQty] = React.useState(1);
    const [completedRemark,setCompletedRemark] = React.useState("")
    
    const resetForm = () => {

    }

    const handleUpdateProgress = () => { 
        setLoading(true)  
        // console.log("clikc")    
        
        if(item?.length !== 0) {
            const items = item;
            items.map( i => {                  
                if( i.qtyOfUM !== 0 && !isNaN(i?.qtyOfUM) && i.label !== undefined && i.label !== "" ) {
                    setCreate(false);
                } else {
                    setLoading(false)
                    setCreate(true)
                    return
                }                  
            })

        } else {
            setLoading(false)
            setCreate(true)
            return
        }

        if(!create) {
            completeProduction({
                variables: {
                    id: editDataProduction?._id,
                    completedInput: {
                        progress: "completed",
                        completedQtyUM: item,
                        completedRemark: completedRemark,
                        qualityCheck: userId,
                    }
                }
            })  
        }
              
    }

    const handleBeforeCloseModal = () => {

        if(item?.length !== 0) {
            const items = item;
            items.map( i => {                  
                if( i.qtyOfUM !== 0 || !isNaN(i?.qtyOfUM) || i.label !== undefined || i.label !== "" ) {
                    handleOpenFormAlert();
                } else {
                    handleClose();  
                }                  
            })

        } else {
            handleClose();            
        }                   
  
    }


    return (
    <>
    <Dialog open={open} className="dialog-qaulity-check">
            <DialogTitle id="alert-dialog-title">
                <Stack direction="row" spacing={5}>                 
                    <Typography className='header-title' variant="h6" >
                        Check Quantity Production
                    </Typography>             
                    <Box sx={{flexGrow:1}}></Box>
                    <IconButton onClick={() => handleBeforeCloseModal()}>
                        <DoDisturbOnOutlinedIcon sx={{color:"red"}}/>
                    </IconButton>    
                </Stack> 
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description"> 

                {
                    editDataProduction?.production?.productId ?
                        <>
                            <Stack direction="row" spacing={5} width="100%">
                                <Typography variant='body1'>
                                    Product : {editDataProduction?.production?.productId?.productName}
                                </Typography>
                                <Typography variant='body1'>
                                    Qty : {editDataProduction?.qty}-{editDataProduction?.production?.productId?.unit?.unitName}
                                </Typography>                
                            </Stack>
                        </>
                    :
                        <>
                            <Stack direction="row" spacing={5} width="100%">
                                <Typography variant='body1'>
                                    Product :  ---
                                </Typography>
                                <Typography variant='body1'>
                                    Qty :  ---
                                </Typography>                
                            </Stack>
                        </>
                }
                    
                    <Stack direction="row" sx={{mt:2,mb:2}}>
                        <Stack direction="column" justifyContent="center">
                            <Typography className='body-title' variant="body">
                                Complete Production
                            </Typography>
                        </Stack>                                      
                        <Box sx={{flexGrow:1}}></Box>
                        <IconButton onClick={handleAdd}>
                            <AddCircleOutlineRoundedIcon  sx={{ color: "green" }}/>
                        </IconButton>
                    </Stack>
                    

                    <Stack direction="row" spacing={2} width="100%" sx={{mt:2}}>    
                        <Stack direction="column" justifyContent="center" width="260px">           
                            <Typography variant='body1' >
                                Remain Quantity :
                            </Typography>  
                        </Stack> 
                        <Box  width="300px">
                            <TextField  
                                // onChange={(e) => setCompletedQty(parseFloat(e.target.value))}
                                placeholder="Qty" 
                                disabled
                                fullWidth 
                                size="small" 
                                type="number"
                                value={ showValueEsstimate ? showValueEsstimate : 0 }
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">                                             
                                            {editDataProduction?.production?.productId?.unit?.unitName}                                           
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                
                            /> 
                        </Box>                

                    </Stack>


                    <TableContainer>
                        <Table className="table" aria-label="simple table">
                            <ListProductGroup
                                items={item}
                                deleteItem={deleteItem}
                                setProductGroupId={setProductGroupId}
                                setQtyOfUM={setQtyOfUM}
                                productId={editDataProduction?.production?.productId?._id} 
                                setProductGroupLabel={setProductGroupLabel}                               

                                errorMessage={errorMessage}
                                errorAlert={errorAlert}
                                touched={touched}  
                                handleTouch={handleTouch}    
                                create={create}      
                                setCreate={setCreate}                         
                                valueOver={valueOver}  
                            />
                        </Table>
                    </TableContainer>



                    

                    {/* <Stack direction="row" spacing={2} width="100%" sx={{mt:2}}>    
                        <Stack direction="column" justifyContent="center" width="260px">           
                            <Typography variant='body1' >
                                Completed Qty V/M :
                            </Typography>  
                        </Stack> 
                        <Box  width="300px">
                            <TextField  
                                onChange={(e) => setCompletedQty(parseFloat(e.target.value))}
                                placeholder="Qty" 
                                fullWidth 
                                size="small" 
                                type="number"
                                value={completedQty}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">                                             
                                            {editDataProduction?.production?.productId?.unit}                                           
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 1 },
                                }}
                                onFocus={handleTouch}
                                error={touched && Boolean(completedQty < 1) || touched && Boolean(completedQty > editDataProduction?.qty) }
                                helperText={Boolean(completedQty < 1) && errorMessage[0] || Boolean(completedQty > editDataProduction?.qty) && errorMessage[0]}
                            /> 
                        </Box>                

                    </Stack> */}

                    <Stack direction="row" spacing={2} width="100%" sx={{mt:2}}>    
                        {/* <Stack direction="column" justifyContent="center" width="260px">           
                            <Typography variant='body1' >
                                Completed Qty U/M:
                            </Typography>  
                        </Stack> 
                        <Box  width="300px">
                            <TextField  
                                onChange={(e) => setCompletedQty(parseFloat(e.target.value))}
                                placeholder="Qty" 
                                fullWidth 
                                autoFocus
                                size="small" 
                                type="number"
                                value={completedQty}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">                                             
                                            {editDataProduction?.production?.productId?.completedUnit}                                           
                                        </InputAdornment>
                                    ),
                                    inputProps: { min: 0.01 },
                                }}
                                onFocus={handleTouch}
                                error={touched && Boolean(completedQty < 0.01) || touched && Boolean(completedQty > editDataProduction?.qty) }
                                helperText={Boolean(completedQty < 0.01) && errorMessage[0] || Boolean(completedQty > editDataProduction?.qty) && errorMessage[0]}
                            /> 
                        </Box> */}
                        {/* <Box width="250px">
                            <FormControl fullWidth size="small">                      
                                <Select 
                                    onChange={(e) => setUnitSelect(e.target.value) }
                                >
                                    {
                                        unitProduct?.map( (item,index) => (
                                            <MenuItem value={`${item}`}>{item}</MenuItem>
                                        ))
                                    }                           
                                    
                                </Select>
                            </FormControl>  
                        </Box>    */}

                    </Stack>




                    <Stack direction="row" spacing={5} width="100%" sx={{mt:2}}>      
                        <TextField 
                            placeholder="Remark"  
                            fullWidth   
                            multiline  
                            rows={2} 
                            size="small" 
                            onChange={(e) => setCompletedRemark(e.target.value)}
                        />
                    </Stack>
                    
                    <Stack direction="row" spacing={5} sx={{mt:3}}>
                        <Box sx={{flexGrow:1}}></Box>
                        <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button> 
                        {
                            // completedQty > editDataProduction?.qty || completedQty < 0.01 ?
                            //     <Button variant="contained">Ok</Button>
                            // :
                                loading ?
                                    <Button variant="contained">Loading...</Button>
                                :             
                                    create ?
                                        <Button variant="contained">Ok</Button>
                                    :
                                        <Button variant="contained" onClick={handleUpdateProgress}>Ok</Button>
                        }   
                        
                    </Stack> 

            </DialogContentText>
        </DialogContent>       
    </Dialog>

    <ModalAlert resetForm={resetForm}  handleClose={handleCloseFormAlert} handleCloseModalCreate={handleClose} open={openFormAlert} modalTitle="Production" />
    </>
    );
}