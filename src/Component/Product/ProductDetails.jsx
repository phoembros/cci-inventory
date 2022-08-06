import * as React from "react";
import { Avatar, Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AlertMessage from "../AlertMessage/AlertMessage"
import AddIcon from '@mui/icons-material/Add';
import "./productdetails.scss";
import CreateProductGroup from "./CreateProductGroup";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BYID } from "../../Schema/product";
import ProductGroupAction from "./ProductGroupAction";
import { GET_PRODUCT_GROUP_BYPRODUCT_ID } from "../../Schema/product";
import DurationImage from "../../Assets/clock.gif";
import LoadingPage from "../Permission/LoadingPage";
import { GET_USER_LOGIN } from "../../Schema/user";

export default function ProductDetails() {

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
        pollInterval: 10000,
    })

    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    const [loading,setLoading] = React.useState(true)
    //Alert message
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [checkMessage, setCheckMessage]= React.useState('');

    // Open Create
    const [open,setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [dataProduct,setDataProduct] = React.useState(null);

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [productId, setProductId] = React.useState(params.get("id"));

    React.useEffect( () => {
        setProductId(params.get("id"));         
    }, [location.search]);
    // End get Id Storage Room


    const { data , refetch} = useQuery(GET_PRODUCT_BYID,{
        variables: {
            productId: params.get("id"),
        }
    })

    React.useEffect( () => {
        if(data?.getProductById){
            setDataProduct(data?.getProductById)
        }
    },[data?.getProductById])

    // productDetails
    const [productGroupData,setProductGroupData] = React.useState();

    const { data : productGroups , refetch: refetchProductGroup } = useQuery(GET_PRODUCT_GROUP_BYPRODUCT_ID,{
        variables: {
            productId: productId
        },
        onCompleted: ({getProductGroupByProductId}) => {
            // setLoading(false);
            console.log(getProductGroupByProductId)
            setTimeout( () => {
                setLoading(false);
            },500)
        }
    })
   
    React.useEffect( () => {      
        if(productGroups?.getProductGroupByProductId) {
            setProductGroupData(productGroups?.getProductGroupByProductId);            
        }                
    },[productGroups?.getProductGroupByProductId , productId])

    // console.log(dataProduct)

    return (
        <div className="product-details-page">
            <Stack direction="row" spacing={2}>                
                <Box className="slash" />            
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Link to="/product" style={{textDecoration: "none"}}>
                        <Typography className="color">Product</Typography>
                    </Link>
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Typography className="color">/ Details</Typography>
                </Stack>

                <Stack direction="column" justifyContent="center" className="page-title-mobile">
                    <Typography className="color">Details</Typography>
                </Stack>

                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>
                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createProductGroup ?
                        <Button onClick={handleOpen} startIcon={<AddIcon className="icon"/>} className="btn-add">
                            <Typography className="btn-text"> Add </Typography>
                        </Button> 
                    :
                        null
                }   

                                   

                    {/* <Modal open={open}> */}
                        <CreateProductGroup 
                            handleClose={handleClose} 
                            open={open}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}
                            btnTitle="Create"
                            checkStatus="create"
                            setRefetch={refetchProductGroup}
                            productUnit={dataProduct?.unit}
                        />
                    {/* </Modal> */}
                </Stack>
            </Stack>

   
            <Box className="container">    
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} className="content">

                        <Box sx={{width: "100%"}}>
                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">                                     
                                    <Typography className="header-title">Type</Typography>                                   
                                </Box> 
                                <Box className="right">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.category?.categoryName}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Product ID</Typography>
                                </Box> 
                                <Box className="right">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.productId}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Product Name</Typography>
                                </Box> 
                                <Box className="right">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.productName}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Unit</Typography>
                                </Box> 
                                <Box className="right">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.unit}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            {/* <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Unit Price</Typography>
                                </Box> 
                                <Box className="right">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">${dataProduct?.unitPrice}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>  */}
                            
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} >
                        <Stack direction="row" justifyContent="center" height="100%">
                            <Stack direction="column" justifyContent="center"> 
                                <Avatar src={DurationImage} sx={{width: 180 , height: 180}}/>
                                <Typography sx={{mt:1}}>Duration to produce {dataProduct?.durationProduce}min.</Typography>
                            </Stack>
                        </Stack>
                    </Grid>


                </Grid>

                <Box sx={{mt:5}}> 
                    <Typography variant="h6" sx={{fontWeight: "bold"}}>Group Product</Typography>
                </Box>

                <Box className="list-product-group">                    
                    <TableContainer>
                        <Table className="table">
                            <TableHead>
                                <TableRow className="header-row">
                                    <TableCell className="header-title">
                                        No
                                    </TableCell>
                                    <TableCell className="header-title">
                                        Name
                                    </TableCell>
                                    <TableCell className="header-title">
                                        Quantity/StockUM
                                    </TableCell>  
                                    <TableCell className="header-title">
                                        Unit Price
                                    </TableCell>    
                                    <TableCell className="header-title">
                                        Qty On Hand
                                    </TableCell>                                 
                                    <TableCell className="header-title" align="right">
                                        Action
                                    </TableCell>
                                </TableRow>  
                            </TableHead>


                            <TableBody>
                            {
                                loading ?  
                                <TableRow className="header-row">
                                    <TableCell className="body-title" colSpan={6}>
                                        <LoadingPage /> 
                                    </TableCell>
                                </TableRow>
                            : 
                                <>
                                {
                                    productGroupData?.map( (row,index) => (
                                        <TableRow key={index} className="header-row">
                                            <TableCell className="body-title">
                                                <Typography variant="body1">{index+1} -</Typography>
                                            </TableCell>
                                            <TableCell className="body-title">
                                                <Typography variant="body1">{row?.name}</Typography>
                                            </TableCell>
                                            <TableCell className="body-title">
                                                <Typography variant="body1">{row?.quantityPerStockUM}</Typography>
                                            </TableCell>  
                                            <TableCell className="body-title">
                                                <Typography variant="body1">${row?.unitPrice}</Typography>
                                            </TableCell>     
                                            <TableCell className="body-title">
                                                <Typography variant="body1">{row?.totalStockAmount-row?.totalSold} - U/M</Typography>
                                            </TableCell>                                 
                                            <TableCell className="body-title" align="right">
                                                <ProductGroupAction 
                                                    setAlert={setAlert}
                                                    setMessage={setMessage}
                                                    setCheckMessage={setCheckMessage}  
                                                    setRefetch={refetchProductGroup}
                                                    editData={row} 
                                                    productUnit={dataProduct?.unit} 
                                                    dataRole= {dataUserLogin?.getuserLogin?.role_and_permission?.permissions}                                        
                                                />
                                            </TableCell>
                                        </TableRow>     
                                    ))
                                } 
                                </>       
                            }                          

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

            </Box>
                       
       

        <AlertMessage alert={alert} setAlert={setAlert} message={message} setMessage={setMessage} checkMessage={checkMessage} />
    
    </div>
    );
}