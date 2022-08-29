import * as React from "react";
import { Box ,Paper, Button,Stack , IconButton,Typography, TextField, InputAdornment, Modal, Pagination,} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './rawmaterialcategory.scss';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CreateCategoryMaterial from "./CreateCategoryMaterial";
import CategoryMaterialAction from './CategoryMaterialAction';
import AlertMessage from "../AlertMessage/AlertMessage";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { GET_RAW_GETEGORY_PAGINATION } from "../../Schema/rawmaterial";
import { useQuery } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import { GET_USER_LOGIN } from "../../Schema/user";
import PermissionContent from "../Permission/PermissionContent";
import DescriptionIcon from '@mui/icons-material/Description';
import { useTheme } from '@mui/material/styles';


export default function RawMaterialCategory() {

    const theme = useTheme();

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN)
//   console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

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

    const { error , data , refetch } = useQuery(GET_RAW_GETEGORY_PAGINATION, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
        },
        onCompleted: () => {
            setLoading(false)
        }
    });
    // console.log(data?.getRawMaterialCategoryPagination, 'tt')

    React.useEffect( () => {
        refetch()
        setPageShow(page)
    },[page,keyword])

  
    
    return(
        <div className="raw-material-categories-page">
            <Stack direction="row" spacing={2}>
                <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Stack direction="row" spacing={1}>
                        <Link to="/raw-material" style={{textDecoration: "none"}}>
                            <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" }>Materials</Typography>
                        </Link>
                        <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >/ Categories</Typography>
                    </Stack>                  
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title-mobile">
                    <Stack direction="row" spacing={1}>                        
                        <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >Categories</Typography>
                    </Stack>                  
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>   
                     <Box className="btn-text-field" >                       
                        <TextField 
                            onChange={(event) => setKeyword(event?.target?.value)}
                            className="text-field"
                            fullWidth
                            id="input-with-sx" 
                            placeholder="Category Name"                           
                            size="small"                           
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{color:"gray"}}/>
                                    </InputAdornment>
                                ),                               
                            }}
                        />
                    </Box>                             
                </Stack>

                <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                    <Typography className="btn-text">Add</Typography>
                </Button>     
                {/* <Modal open={open}> */}
                    <CreateCategoryMaterial 
                        handleClose={handleClose} 
                        open={open}
                        checkStatus={"create"}
                        btnTitle={"Create"}
                        setAlert={setAlert}
                        setMessage={setMessage}
                        setCheckMessage={setCheckMessage}
                        setRefetch={refetch}
                    />
                {/* </Modal>  */}

            </Stack>

        {
            loading ?

            <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center" , mt:10}} >
                <CircularProgress />
            </Box>

            :
            <>
                {
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getRawMaterialCategoryPagination ?

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
                            { data?.getRawMaterialCategoryPagination?.rawMaterialCategory?.length !== 0 ?
                                    <>
                                        {data?.getRawMaterialCategoryPagination?.rawMaterialCategory?.map((row , index) => (
                                        <TableBody 
                                            key={index} 
                                            component={Paper} 
                                            className={index % 2 === 0 || theme.palette.mode === 'dark' ? "body" : "body-odd" }
                                        >                        
                                            <TableRow  className="body-row">
                                                <TableCell className="body-title" component="th" scope="row" width="5%" > {index+1}- </TableCell>
                                                <TableCell className="body-title" component="th" scope="row" width="25%"> {row?.categoryName} </TableCell>                                                                      
                                                <TableCell className="body-title" >{row?.remark}</TableCell>                                                                       
                                                <TableCell className="body-title" align="right">
                                                    <CategoryMaterialAction  
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
                                        <TableBody component={Paper} className={theme.palette.mode === 'dark' ? "body" : "body-odd"}>                        
                                            <TableRow  className="body-row">
                                                <TableCell className="body-title" align="center" colSpan={7} rowSpan={5}>
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
                            <IconButton 
                                disabled={ data?.getRawMaterialCategoryPagination?.paginator?.prev === null ? true : false }
                                onClick={() => setPage(data?.getRawMaterialCategoryPagination?.paginator?.prev)}
                            >
                                <ArrowBackIosNewIcon  sx={{":hover" : {color:"#0969A0"}}}/>
                            </IconButton>
                            <Stack direction="column" justifyContent="center">
                                <Pagination 
                                    page={pageShow}
                                    hideNextButton="true"
                                    hidePrevButton="true"
                                    count={data?.getRawMaterialCategoryPagination?.paginator?.totalPages} 
                                    variant="outlined" 
                                    color="primary"
                                    onChange={(event) => setPage(parseInt(event?.target?.textContent))}
                                />
                            </Stack>
                            <IconButton 
                                disabled={ data?.getRawMaterialCategoryPagination?.paginator?.next === null ? true : false }
                                onClick={() => setPage(data?.getRawMaterialCategoryPagination?.paginator?.next)}
                            >
                                <ArrowForwardIosIcon sx={{":hover" : {color:"#0969A0"}}}/>
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