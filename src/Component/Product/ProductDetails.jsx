import * as React from "react";
import { Button, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AlertMessage from "../AlertMessage/AlertMessage"
import AddIcon from '@mui/icons-material/Add';
import "./productdetails.scss";
import CreateProductGroup from "./CreateProductGroup";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BYID } from "../../Schema/product";
import ProductGroupAction from "./ProductGroupAction";

export default function ProductDetails() {

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
            productId: productId,
        }
    })

    React.useEffect( () => {
        if(data?.getProductById){
            setDataProduct(data?.getProductById)
        }
    },[data?.getProductById])

    console.log(dataProduct);

    const arrayData = [1,2,3,4,5]

    return (
        <div className="product-details-page">
            <Stack direction="row" spacing={2}>                
                <Box className="slash" />            
                <Stack direction="column" justifyContent="center">
                    <Link to="/product" style={{textDecoration: "none"}}>
                        <Typography className="color">Product</Typography>
                    </Link>
                </Stack>
                <Stack direction="column" justifyContent="center">
                    <Typography className="color">/ Details</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>  
                    <Button onClick={handleOpen} startIcon={<AddIcon className="icon"/>} className="btn-add">
                        <Typography className="btn-text"> Add </Typography>
                    </Button>                
                    {/* <Modal open={open}> */}
                        <CreateProductGroup 
                            handleClose={handleClose} 
                            open={open}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}
                            btnTitle="Create"
                            // setRefetch={refetch}
                        />
                    {/* </Modal> */}
                </Stack>
            </Stack>

   
            <Box className="container">    
                <Grid container spacing={5}>
                    <Grid item className="content-left">
                        <Stack direction="column" spacing={2}>
                            <Box className="background" >
                                <Typography className="header-title">Type</Typography>
                            </Box>   
                            <Box className="background" >
                                <Typography className="header-title">Product ID</Typography>
                            </Box> 
                            <Box className="background" >
                                <Typography className="header-title">Product Name</Typography>
                            </Box>
                            <Box className="background" >
                                <Typography className="header-title">Unit</Typography>
                            </Box>
                            <Box className="background" >
                                <Typography className="header-title">Type</Typography>
                            </Box>                                             
                        </Stack>
                    </Grid>
                    <Grid item className="content-right">
                        <Stack direction="column" spacing={2}>
                            <Box className="background-radius">
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body1">Type</Typography>
                                </Stack>
                            </Box>    
                            <Box className="background-radius">
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body1">{dataProduct?.productId}</Typography>
                                </Stack>
                            </Box>
                            <Box className="background-radius">
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body1">{dataProduct?.productName}</Typography>
                                </Stack>
                            </Box>
                            <Box className="background-radius">
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body1">{dataProduct?.unit}</Typography>
                                </Stack>
                            </Box>
                            <Box className="background-radius">
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body1">Type</Typography>
                                </Stack>
                            </Box>                       
                                                     
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
                                        Other
                                    </TableCell>
                                    <TableCell className="header-title" align="right">
                                        Action
                                    </TableCell>
                                </TableRow>  
                            </TableHead>

                            <TableBody>
                            {
                                arrayData?.map( (row,index) => (
                                    <TableRow className="header-row">
                                        <TableCell className="body-title">
                                           <Typography variant="body1">{index+1} -</Typography>
                                        </TableCell>
                                        <TableCell className="body-title">
                                            <Typography variant="body1">Name</Typography>
                                        </TableCell>
                                        <TableCell className="body-title">
                                            <Typography variant="body1">Quantity/StockUM</Typography>
                                        </TableCell>
                                        <TableCell className="body-title">
                                            <Typography variant="body1">Other</Typography>
                                        </TableCell>
                                        <TableCell className="body-title" align="right">
                                            <ProductGroupAction />
                                        </TableCell>
                                    </TableRow>     
                                ))
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