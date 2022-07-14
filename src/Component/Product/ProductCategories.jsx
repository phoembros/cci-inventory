import * as React from "react";
import { Box ,Paper, Button, Stack ,Pagination, IconButton,Typography, TextField, InputAdornment, Modal,} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './productcategories.scss';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CreateCategory from './CreateCategory';
import CategoryAction from "./CategoryAction";
import AlertMessage from "../../Component/AlertMessage/AlertMessage";
import { GET_PRODUCT_CATEGORY } from "../../Schema/product";
import { useQuery } from "@apollo/client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import { GET_USER_LOGIN } from "../../Schema/user";
import PermissionContent from "../Permission/PermissionContent";


export default function ProductCategories() {

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN)
  console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [loading,setLoading] = React.useState(true);

    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    // get Data 
    const [pageShow,setPageShow]= React.useState(null)
    const [page,setPage] = React.useState(1);
    const [limit,setLimit] = React.useState(8);
    const [keyword,setKeyword] = React.useState("");

    const {data , refetch } = useQuery(GET_PRODUCT_CATEGORY,{
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
        },
        onCompleted: () => {
            setLoading(false);
        }
    });

    // console.log(data?.getProductCategoryPagination?.paginator?.totalPages, 'tt')
    React.useEffect(()=>{
        refetch()
        setPageShow(page)
    }, [page, keyword])
           
    return(
        <div className="product-categories-page">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Stack direction="row" spacing={1}>
                        <Link to="/product" style={{textDecoration: "none"}}>
                            <Typography className="color">Product</Typography>
                        </Link>
                        <Typography className="color">/ Categories</Typography>
                    </Stack>                  
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title-mobile">
                    <Stack direction="row" spacing={1}>                         
                        <Typography className="color">Categories</Typography>
                    </Stack>                  
                </Stack>

                <Box sx={{flexGrow: 1}} />


                <Stack direction="row" className="btn-search"  justifyContent="right" spacing={1}>   

                     <Box className="btn-text-field" >                       
                        <TextField 
                            onChange={(event)=>setKeyword(event.target.value)}
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Category Name"                           
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

                    <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text">Add</Typography>
                    </Button>
                    {/* <Modal open={open}> */}
                        <CreateCategory 
                            handleClose={handleClose} 
                            open={open}
                            btnTitle={"Create"}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}    
                            setRefetch={refetch}    
                            checkStatus={"create"}                    
                        />
                    {/* </Modal> */}
                            
                </Stack>
            </Stack>

        {
            loading ?

            <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center" , mt:10}} >
                <CircularProgress />
            </Box>
        :
            <>
                {
                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getProductCategoryPagination ?
                    <>
                    <Box className="container">
                        <TableContainer >
                            <Table className="table" aria-label="simple table">
                                <TableHead >
                                    <TableRow className="header-row">
                                        <TableCell className="header-title">No</TableCell>
                                        <TableCell className="header-title" >Category Name</TableCell>                                
                                        <TableCell className="header-title">Remark</TableCell>                                   
                                        <TableCell className="header-title" align="center"></TableCell>                        
                                    </TableRow>
                                </TableHead>
                                {data?.getProductCategoryPagination?.ProductCategory?.map((row , index) => (
                                    <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                        <TableRow  className="body-row">
                                            <TableCell className="body-title" component="th" scope="row" width="5%" > {index+1}- </TableCell>
                                            <TableCell className="body-title" component="th" scope="row" width="25%"> {row?.categoryName} </TableCell>                                                                      
                                            <TableCell className="body-title" >{row?.remark}</TableCell>                                                                       
                                            <TableCell className="body-title" align="right">
                                                <CategoryAction 
                                                    dataUserLogin={dataUserLogin}
                                                    setAlert={setAlert}
                                                    setMessage={setMessage}
                                                    setCheckMessage={setCheckMessage}    
                                                    setRefetch={refetch}
                                                    editData={row}
                                                />
                                            </TableCell>                            
                                        </TableRow>
                                    </TableBody>                        
                                ))}
                            </Table>
                        </TableContainer>
                    </Box> 
                    
                    <Stack direction='row' justifyContent='right' spacing={2}>
                        <IconButton disabled={data?.getProductCategoryPagination?.paginator?.prev === null ? true : false }
                            onClick={() => setPage(data?.getProductCategoryPagination?.paginator?.prev)}>
                            <ArrowBackIosNewIcon sx={{':hover':{color:'#0969A0'}}}/>
                        </IconButton>

                        <Stack direction='column' justifyContent='center'>
                            <Pagination 
                                    page={pageShow}
                                    hidePrevButton={true}
                                    hideNextButton={true}
                                    variant="outlined" 
                                    color="primary" 
                                    count={data?.getProductCategoryPagination?.paginator?.totalPages}
                                    onChange={(event)=>setPage(parseInt(event?.target?.textContent))} />
                        </Stack>
                        <IconButton
                            disabled={data?.getProductCategoryPagination?.paginator?.next === null ? true : false }
                            onClick={() => setPage(data?.getProductCategoryPagination?.paginator?.next )}>
                            <ArrowForwardIosIcon sx={{':hover':{color:'#0969A0'}}}/>
                        </IconButton>
                    </Stack>
                    </>
                :
                    <PermissionContent />
                }            
            </>
        }

            <AlertMessage alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>

        </div>
    );
}