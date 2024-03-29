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
import ViewAdjustProductGroup from "./ViewAdjustProductGroup";
import { useTheme } from '@mui/material/styles';


export default function ProductDetails() {

    const theme = useTheme();

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

    // Open View 
    const [productGroupView,setProductGroupView] = React.useState(null)
    const [openView,setOpenView] = React.useState(false);
    const handleOpenView = (e) => {
        setProductGroupView(e);
        setOpenView(true);
    }
    const handleCloseView = () => setOpenView(false);

    const [dataProduct,setDataProduct] = React.useState(null);

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [productId, setProductId] = React.useState(params.get("id"));
    const [getPage,setGetPage] = React.useState(params.get("page"))

    React.useEffect( () => {
        setProductId(params.get("id"));   
        setGetPage(params.get("page"));     
    }, [location.search]);
    // End get Id Storage Room


    const { data , refetch} = useQuery(GET_PRODUCT_BYID,{
        variables: {
            productId: params.get("id"),
        },
        onCompleted: ({getProductById}) => {
            // console.log(getProductById);
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
        refetchProductGroup() 
        if(productGroups?.getProductGroupByProductId) {
            setProductGroupData(productGroups?.getProductGroupByProductId);            
        }                
    },[productGroups?.getProductGroupByProductId , productId])

    // console.log(dataProduct)

    return (
        <div className="product-details-page">
            <Stack direction="row" spacing={2}>                
                <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />            
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Link to={`/product?page=${getPage}`} style={{textDecoration: "none"}}>
                        <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >Product</Typography>
                    </Link>
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >/ Details</Typography>
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title-mobile">
                    <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >Details</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />                
            </Stack>

   
            <Box className="container">    
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={12} md={6} lg={6} className="content">

                        <Box sx={{width: "100%"}}>
                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">                                     
                                    <Typography className="header-title">Type</Typography>                                   
                                </Box> 
                                <Box className={ theme.palette.mode === 'dark' ? "right-dark" : "right"}>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.category?.categoryName}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Product ID</Typography>
                                </Box> 
                                <Box className={ theme.palette.mode === 'dark' ? "right-dark" : "right"}>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.productId}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Product Name</Typography>
                                </Box> 
                                <Box className={ theme.palette.mode === 'dark' ? "right-dark" : "right"}>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.productName}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>

                            <Stack direction='row' justifyContent="center" sx={{mt:2}}>
                                <Box className="left">
                                    <Typography className="header-title">Unit</Typography>
                                </Box> 
                                <Box className={ theme.palette.mode === 'dark' ? "right-dark" : "right"}>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1">{dataProduct?.unit?.unitName}</Typography>
                                    </Stack>
                                </Box> 
                            </Stack>                       
                            <Stack direction='row' justifyContent="center" sx={{mt:6}}>
                                <Stack direction="column" justifyContent="center"> 
                                    <Avatar src={DurationImage} sx={{width: 180 , height: 180}}/>
                                    <Typography sx={{mt:1}}>Duration to produce {dataProduct?.durationProduce}min.</Typography>
                                </Stack>
                            </Stack>                             
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6} className="content-right">
                        <Box width="100%">                                
                            <Stack direction='row' justifyContent="center" sx={{mt:2}}> 
                                <Box className={ theme.palette.mode === 'dark' ?  "right-content-dark" : "right-content" }>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight:"bold"}}>Ingredients</Typography>
                                    </Stack>                                
                                </Box>                                 
                            </Stack> 
                            {
                                dataProduct?.ingredients?.map( (row,index) => (         
                                    <Stack key={index} direction='column' className={ theme.palette.mode === 'dark' ? "top-dark" : "top" } justifyContent="center" sx={{mt:2}}>                         
                                        <Stack direction='row' justifyContent="center">
                                            <Box sx={{width:"10%"}}>                                           
                                                <Typography className="header-title">
                                                    {index+1}-
                                                </Typography>
                                            </Box> 
                                            <Box sx={{width:"40%"}}>
                                                <Stack direction="row" spacing={2}>
                                                    <Typography variant="body1">
                                                        Material:
                                                    </Typography>
                                                    <Typography variant="body1">
                                                        {row?.rawName}
                                                    </Typography>
                                                </Stack>  
                                            </Box> 

                                            <Box sx={{flexGrow:1}}></Box> 
                                            <Stack direction="row" spacing={2} width="150px">                                 
                                                <Typography variant="body1">
                                                    Need:
                                                </Typography> 
                                                <Box sx={{flexGrow:1}}></Box>
                                                <Typography variant="body1">
                                                    {row?.percentage} %
                                                </Typography>
                                            </Stack>                                                                                                                    
                                        </Stack> 
                                    </Stack>                                     
                                ))
                            }   
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{mt:5}}>   
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h6" sx={{fontWeight: "bold"}}>Group Product</Typography>
                        <Box sx={{flexGrow:1}}></Box>
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
                                    productUnit={dataProduct?.unit?.unitName}
                                />
                            {/* </Modal> */}
                        </Stack>
                    </Stack>
                </Box>

                <Box className={ theme.palette.mode === 'dark' ? "list-product-group-dark" : "list-product-group" } >                    
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
                                        Unit
                                    </TableCell>
                                    
                                    <TableCell className="header-title" align="center">
                                        Unit Price
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
                                        <TableRow key={index} component={Paper} className="header-row" >
                                            <TableCell className="body-title" onClick={ () => handleOpenView(row)}>
                                                <Typography variant="body1">{index+1} -</Typography>
                                            </TableCell>
                                            <TableCell className="body-title" onClick={ () => handleOpenView(row)}>
                                                <Typography variant="body1">{row?.name}</Typography>
                                            </TableCell>
                                            <TableCell className="body-title" onClick={ () => handleOpenView(row)}>
                                                <Typography variant="body1">{row?.quantityPerStockUM}</Typography>
                                            </TableCell>  
                                             
                                            <TableCell className="body-title" onClick={ () => handleOpenView(row)}>
                                                <Typography variant="body1">{row?.unit?.unitName}</Typography>
                                            </TableCell>

                                            <TableCell className="body-title" onClick={ () => handleOpenView(row)}>                                                
                                                <Stack direction="row" justifyContent="center" >
                                                    <Stack direction="row" justifyContent="center" spacing={4} width="50%">
                                                        <Box  width="50%" display="flex" justifyContent="center">
                                                            <Typography>$</Typography>
                                                        </Box>                                            
                                                        <Box  width="50%" display="flex" justifyContent="right">
                                                            <Typography> {(row?.unitPrice)?.toFixed(2)} </Typography>
                                                        </Box>
                                                    </Stack>       
                                                </Stack>
                                            </TableCell>    
                                     
                                           

                                            <TableCell className="body-title" align="right">
                                                <ProductGroupAction 
                                                    setAlert={setAlert}
                                                    setMessage={setMessage}
                                                    setCheckMessage={setCheckMessage}  
                                                    setRefetch={refetchProductGroup}
                                                    editData={row} 
                                                    productUnit={dataProduct?.unit?.unitName} 
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
                       
        {/* <ViewAdjustProductGroup handleClose={handleCloseView} open={openView} productGroupView={productGroupView}/> */}

        <AlertMessage alert={alert} setAlert={setAlert} message={message} setMessage={setMessage} checkMessage={checkMessage} />
    
    </div>
    );
}