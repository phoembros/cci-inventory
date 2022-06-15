import { Box, Button, IconButton, InputAdornment, Modal, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import './product.scss';
import ProductAction from "../Component/Product/ProductAction";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CreateProduct from "../Component/Product/CreateProduct";
import { Link } from "react-router-dom";
import ViewProduct from "../Component/Product/ViewProduct";
import {useQuery} from "@apollo/client";
import { GET_PRODUCT_WITH_PAGINATION } from "../Schema/product";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";


export default function Product() {

    const [dataRowPruduct,setDataRowPruduct] = React.useState([]);
    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    // 
    const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
    const handleOpenCreateProduct = () => setOpenCreateProduct(true);
    const handleCloseCreateProduct = () => setOpenCreateProduct(false);
    // 
    const [openView,setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    // GET Product 
    const [productData,setProductData] = React.useState([]);   
    const [pageShow, setPageShow] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(8);
    const [keyword, setKeyword] = React.useState("");
    const [loading,setLoading] = React.useState(true)

    const { data , refetch , error } = useQuery(GET_PRODUCT_WITH_PAGINATION , {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
        },
        onCompleted: () => {
            setLoading(false);
        }
    })
    // console.log(data?.getProductPagination?.products, 'p')

    React.useEffect( () => {
        refetch()
        setPageShow(page)
        if(data?.getProductPagination?.products){
            setProductData(data?.getProductPagination?.products);
        }
    },[data?.getProductPagination?.products, page, keyword])
    // End Get

    return(
        <div className="product-page">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Typography className="color">Product</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="btn-search"  justifyContent="right" spacing={1}> 
                    <Box className="btn-text-field" >                       
                        <TextField 
                            onChange={(event) => setKeyword(event?.target?.value)}
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Search Dashboard"                           
                            size="small"                           
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                // endAdornment: (
                                //     <InputAdornment position="end">
                                //         <IconButton disableRipple={true} size="small">
                                //             <TuneIcon />
                                //         </IconButton>
                                //     </InputAdornment>
                                // ),
                            }}
                        />
                    </Box>  
                                        
                    <Button startIcon={<AddIcon/>} className="btn-add">     
                        <Link to="/product/categories" className="btn-link" style={{textDecoration: "none"}}>               
                            <Typography className="btn-text">Category</Typography>
                        </Link>    
                    </Button>

                    <Button onClick={handleOpenCreateProduct} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text">Add Item</Typography>
                    </Button>
                    <Modal open={openCreateProduct} >                           
                        <CreateProduct  
                            handleClose={handleCloseCreateProduct} 
                            btnTitle={"Create"}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}
                            setRefetch={refetch}
                        />                      
                    </Modal>

                </Stack>
            </Stack>



        {
            loading ?
                <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center" , mt:10}} >
                    <CircularProgress />
                </Box>
            :
                <>
                <Box className="container">
                    <TableContainer >
                        <Table className="table" aria-label="simple table">
                            <TableHead >
                                <TableRow className="header-row">
                                    <TableCell className="header-title" colSpan={2}>Name</TableCell>
                                    <TableCell className="header-title" >Category</TableCell>
                                    <TableCell className="header-title">Duration</TableCell>
                                    <TableCell className="header-title">Remark</TableCell>                                   
                                    <TableCell className="header-title" align="center"></TableCell>                        
                                </TableRow>
                            </TableHead>
                            
                            {productData?.map((row , index) => (
                                <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                    <TableRow  className="body-row">
                                        <TableCell onClick={() => { handleOpenView(); setDataRowPruduct(row) }} className="body-title" component="th" scope="row" width="2%" > {index+1}- </TableCell>
                                        <TableCell onClick={() => { handleOpenView(); setDataRowPruduct(row) }} className="body-title" component="th" scope="row" width="25%"> {row?.productName} </TableCell>
                                        <TableCell onClick={() => { handleOpenView(); setDataRowPruduct(row) }} className="body-title" width="15%">{row?.category?.categoryName}</TableCell>
                                        <TableCell onClick={() => { handleOpenView(); setDataRowPruduct(row) }} className="body-title" align="left" width="10%">{row.durationProduce}s</TableCell>
                                        <TableCell onClick={() => { handleOpenView(); setDataRowPruduct(row) }} className="body-title" >{row.remark}</TableCell>                                                                       
                                        <TableCell className="body-title" align="right">
                                            <ProductAction 
                                                editData={row}
                                                setAlert={setAlert}
                                                setMessage={setMessage}
                                                setCheckMessage={setCheckMessage}
                                                setRefetch={refetch}
                                            />
                                        </TableCell>                            
                                    </TableRow>
                                </TableBody>                        
                                ))}
                        </Table>

                    </TableContainer>
                </Box> 
                <Stack direction="row" justifyContent="right" spacing={2}>
                    <IconButton disabled={data?.getProductPagination?.paginator?.prev === null ? true : false}
                                onClick={()=>setPage(data?.getProductPagination?.paginator?.prev)}
                    >
                            <ArrowBackIosNewIcon  sx={{":hover" : {color:"#0969A0"}}}/>
                    </IconButton>
                        <Stack direction='column' justifyContent='center'>
                            <Pagination
                                page={pageShow}
                                hidePrevButton={true}
                                hideNextButton={true}
                                variant="outlined"
                                color="primary"
                                count={data?.getProductPagination?.paginator?.totalPages}
                                onChange={(event)=>setPage(parseInt(event?.target?.textContent))}
                                />
                        </Stack>
                    <IconButton disabled={data?.getProductPagination?.paginator?.next === null ? true : false}
                                onClick={()=>setPage(data?.getProductPagination?.paginator?.next)}
                    >
                        <ArrowForwardIosIcon  sx={{":hover" : {color:"#0969A0"}}}/>
                    </IconButton>
                </Stack> 
                </>
        }
              
           
            <Modal open={openView} >
                    <ViewProduct handleClose={handleCloseView} dataRowPruduct={dataRowPruduct}/>
            </Modal>

            <AlertMessage alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>

        </div>
    );
}