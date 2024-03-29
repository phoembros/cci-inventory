import { Box, Button, IconButton, InputAdornment, Modal, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import './product.scss';
import ProductAction from "../Component/Product/ProductAction";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CreateProduct from "../Component/Product/CreateProduct";
import { Link , useLocation, useNavigate } from "react-router-dom";
import ViewProduct from "../Component/Product/ViewProduct";
import {useQuery} from "@apollo/client";
import { GET_PRODUCT_WITH_PAGINATION } from "../Schema/product";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import TruncateMarkup from "react-truncate-markup";
import DescriptionIcon from '@mui/icons-material/Description';
import { GET_USER_LOGIN } from "../Schema/user";
import FilterListIcon from '@mui/icons-material/FilterList';
import LoadingPage from "../Component/Permission/LoadingPage";
import { useTheme } from '@mui/material/styles';
import PermissionContent from "../Component/Permission/PermissionContent";

export default function Product() {

    const theme = useTheme();

    const [loadingPages,setLoadingPages] = React.useState(true);

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
        onCompleted: () => setLoadingPages(false),
        pollInterval: 10000,
    })
    //   console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);   
    const [getPage,setGetPage] = React.useState(params.get("page"))

    React.useEffect( () => {     
        setGetPage(params.get("page"));     
    }, [location.search]);
    // End get Id Storage Room

    // Filter
    const [shortID,setShortID] = React.useState( JSON.parse(window.localStorage.getItem("shortIDProduct")) );
    const [shortName,setShortName] = React.useState( JSON.parse(window.localStorage.getItem("shortNameProduct")) );   
    const [valueShort,setValueShort] = React.useState( JSON.parse(window.localStorage.getItem("valueShortProduct"))  )    

    const navigate = useNavigate();

    const [dataRowPruduct,setDataRowPruduct] = React.useState([]);
    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    // 
    const [openCreateProduct, setOpenCreateProduct] = React.useState(false);
    const handleOpenCreateProduct = () => setOpenCreateProduct(true);
    const handleCloseCreateProduct = () => setOpenCreateProduct(false);
   
    // GET Product 
    const [productData,setProductData] = React.useState([]);   
    const [pageShow, setPageShow] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(8);
    const [keyword, setKeyword] = React.useState("");
    const [loading,setLoading] = React.useState(true);

    const { data , refetch , error } = useQuery(GET_PRODUCT_WITH_PAGINATION , {
        variables: {
            page: keyword !== "" ? 1 : page,
            limit: limit,
            keyword: keyword,
            pagination: true,
            sortField: valueShort === null || valueShort === undefined ? [{}] : [valueShort],
        },
        onCompleted: () => {
            setLoading(false);
        },        
        pollInterval: 10000,
    });

    // console.log(data?.getProductPagination?.products, 'p')

    React.useEffect( () => {  
        refetch()
        setPageShow(page)
        if(data?.getProductPagination?.products){
            setProductData(data?.getProductPagination?.products);
        }
        
    },[data?.getProductPagination?.products, page, keyword , valueShort , shortID , shortName , getPage ])

    React.useEffect( () => {
        if(getPage){
            setPage(parseInt(getPage))
        }
    },[getPage])
    // End Get

    // 
    const [openView,setOpenView] = React.useState(false);
    const handleOpenView = (e) => {
        // setOpenView(true);
        navigate(`/product/details?page=${pageShow}&id=${e}`)
    }   
    const handleCloseView = () => setOpenView(false);



    return(
        <div className="product-page">
            <Stack direction="row" spacing={2}>
                <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
                <Stack direction="column" justifyContent="center">
                    <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" }>Product</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="btn-search"  justifyContent="right" spacing={1}> 
                    <Box className="btn-text-field">                       
                        <TextField 
                            onChange={(event) => setKeyword(event?.target?.value)}
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Product Name"                           
                            size="small"                           
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{color: "gray"}}/>
                                    </InputAdornment>
                                ),                               
                            }}
                        />
                    </Box>  
                </Stack>
                <Stack direction="row" className="btn-group"  justifyContent="right" spacing={2}>     

                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createProductCategory ?
                        <Button startIcon={<AddIcon/>}  className="btn-add"  onClick={() => navigate("/product/categories")}>   
                            <Typography className="btn-text">Category</Typography>
                        </Button>
                    : null
                }                  
                    

                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createProduct ?
                        <Button onClick={handleOpenCreateProduct} startIcon={<AddIcon/>} className="btn-add">
                            <Typography className="btn-text">Add</Typography>
                        </Button>
                    :
                        null
                }
                    
                    
                {/* <Modal open={openCreateProduct} >  */}
                    <CreateProduct  
                        open={openCreateProduct}
                        handleClose={handleCloseCreateProduct} 
                        btnTitle={"Create"}
                        setAlert={setAlert}
                        setMessage={setMessage}
                        setCheckMessage={setCheckMessage}
                        setRefetch={refetch}
                    />                      
                {/* </Modal> */}

                </Stack>
            </Stack>



        {
            loading ?
                <LoadingPage />
            :
                <>
                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getProductPagination ? 
                        <>
                            <Box className="container">
                                <TableContainer >
                                    <Table className="table" aria-label="simple table">
                                        <TableHead >
                                            <TableRow className="header-row">
                                                <TableCell className="header-title">
                                                    <Stack direction="row" spacing={1}>
                                                        <Stack direction="column" justifyContent="center">
                                                            <Typography className="title">ID</Typography>
                                                        </Stack>
                                                        <IconButton  onClick={ () => {
                                                            if(shortID === -1 || shortID === undefined) {
                                                                setShortID(1)
                                                                setValueShort({ sortName : "productId" , sortValue: 1})
                                                                window.localStorage.setItem("shortIDProduct" , JSON.stringify(1) )
                                                                window.localStorage.setItem("valueShortProduct" , JSON.stringify({ sortName : "productId" , sortValue: 1}) )
                                                            } else {
                                                                setShortID(-1) 
                                                                setValueShort({ sortName : "productId" , sortValue: -1})
                                                                window.localStorage.setItem("shortIDProduct" , JSON.stringify(-1) )
                                                                window.localStorage.setItem("valueShortProduct" , JSON.stringify({ sortName : "productId" , sortValue: -1}) )
                                                            } 
                                                        }}>
                                                            <FilterListIcon  className={ shortID === -1 || shortID === undefined ? "icon-flip-back" : "icon-flip"}/>
                                                        </IconButton> 
                                                    </Stack>                                                   
                                                </TableCell>
                                                <TableCell className="header-title">
                                                    <Stack direction="row" spacing={1}>
                                                        <Stack direction="column" justifyContent="center">
                                                            <Typography className="title">Name</Typography>
                                                        </Stack>
                                                        <IconButton onClick={ () => {
                                                            if(shortName === -1 || shortName === undefined) {
                                                                setShortName(1)
                                                                setValueShort({ sortName : "productName" , sortValue: 1})
                                                                window.localStorage.setItem("shortNameProduct" , JSON.stringify(1) )
                                                                window.localStorage.setItem("valueShortProduct" , JSON.stringify({ sortName : "productName" , sortValue: 1}) )
                                                            } else {
                                                                setShortName(-1) 
                                                                setValueShort({ sortName : "productName" , sortValue: -1})
                                                                window.localStorage.setItem("shortNameProduct" , JSON.stringify(-1) )
                                                                window.localStorage.setItem("valueShortProduct" , JSON.stringify({ sortName : "productName" , sortValue: -1}) )
                                                            } 
                                                        }}>
                                                            <FilterListIcon className={ shortName === -1 || shortName === undefined ? "icon-flip-back" : "icon-flip"}/>
                                                        </IconButton>
                                                    </Stack> 
                                                </TableCell>                                                
                                                <TableCell className="header-title">Unit</TableCell>
                                                {/* <TableCell className="header-title">Unit Price</TableCell> */}
                                                <TableCell className="header-title">Category</TableCell>
                                                <TableCell className="header-title">Duration</TableCell>
                                                {/* <TableCell className="header-title">Qty On Hand</TableCell> */}
                                                <TableCell className="header-title">Remark</TableCell>
                                                <TableCell className="header-title" align="center"></TableCell>                        
                                            </TableRow>
                                        </TableHead>
                                {
                                    productData?.length !== 0 ?
                                        <>
                                        {productData?.map((row , index) => (
                                            <TableBody key={index} component={Paper} className={index % 2 === 0 || theme.palette.mode === 'dark' ? "body" : "body-odd" }>                        
                                                <TableRow  className="body-row">
                                                    <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" component="th" scope="row" width="15%" >{row?.productId}</TableCell>
                                                    <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" component="th" scope="row" width="20%">{row?.productName}</TableCell>
                                                    <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" width="8%">{row?.unit?.unitName}</TableCell>
                                                    {/* <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" width="10%">${row?.unitPrice}</TableCell> */}
                                                    <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" width="10%">{row?.category?.categoryName}</TableCell>
                                                    <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" align="left" width="10%">{row.durationProduce}min</TableCell>
                                                    {/* <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" width="12%">100</TableCell> */}
                                                    <TableCell onClick={() => { handleOpenView(row?._id); setDataRowPruduct(row) }} className="body-title" width="20%">                                            
                                                        <TruncateMarkup lines={2}>    
                                                            <div>{row.remark}</div>    
                                                        </TruncateMarkup>
                                                    </TableCell>                                                                       
                                                    <TableCell className="body-title" align="right" width="8%">
                                                        <ProductAction
                                                            dataUserLogin={dataUserLogin}
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
                                        </>
                                    :
                                        <>
                                            <TableBody component={Paper} className={theme.palette.mode === 'dark' ? "body" : "body-odd" }>                        
                                                <TableRow  className="body-row">
                                                    <TableCell className="body-title" align="center" colSpan={9} rowSpan={5}>
                                                        <Stack direction="row" justifyContent="center">                                                
                                                            <Stack direction="column" justifyContent="center" >
                                                                <IconButton>
                                                                    <DescriptionIcon sx={{color: "white"}}/>
                                                                </IconButton>
                                                                <Typography variant="body2" sx={{color: "white" }}>No Data</Typography>
                                                            </Stack>                                                
                                                        </Stack>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </>
                                }
                                        
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
                    :
                        loadingPages ?
                            <LoadingPage />
                        :
                            <PermissionContent />  
                }
                 
                </>
        }
              
           
            {/* <Modal open={openView} > */}
                    <ViewProduct open={openView} handleClose={handleCloseView} dataRowPruduct={dataRowPruduct}/>
            {/* </Modal> */}

            <AlertMessage alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>

        </div>
    );
}