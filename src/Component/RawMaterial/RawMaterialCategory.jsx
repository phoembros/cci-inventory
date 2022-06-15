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



export default function RawMaterialCategory() {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    // get Data 
    const [pageShow,setPageShow]= React.useState(null)
    const [page,setPage] = React.useState(1);
    const [limit,setLimit] = React.useState(8);
    const [keyword,setKeyword] = React.useState("");

    const { loading, error, data , refetch } = useQuery(GET_RAW_GETEGORY_PAGINATION, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
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
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Stack direction="row" spacing={1}>
                        <Link to="/raw-material" style={{textDecoration: "none"}}>
                            <Typography className="color">Raw Materials</Typography>
                        </Link>
                        <Typography className="color">/ Categories</Typography>
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

                    <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text">Add</Typography>
                    </Button>     
                    <Modal open={open}>
                        <CreateCategoryMaterial 
                            handleClose={handleClose} 
                            checkStatus={"create"}
                            btnTitle={"Create"}
                            setAlert={setAlert}
                            setMessage={setMessage}
                            setCheckMessage={setCheckMessage}
                            setRefetch={refetch}
                        />
                    </Modal>               
                            
                </Stack>
            </Stack>

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
                        {data?.getRawMaterialCategoryPagination?.rawMaterialCategory?.map((row , index) => (
                            <TableBody key={index} component={Paper} className={index % 2 === 0 ? "body" : "body-odd" }>                        
                                <TableRow  className="body-row">
                                    <TableCell className="body-title" component="th" scope="row" width="5%" > {index+1}- </TableCell>
                                    <TableCell className="body-title" component="th" scope="row" width="25%"> {row?.categoryName} </TableCell>                                                                      
                                    <TableCell className="body-title" >{row?.remark}</TableCell>                                                                       
                                    <TableCell className="body-title" align="right">
                                        <CategoryMaterialAction                                             
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

            <AlertMessage alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>

        </div>
    );
}