import { Avatar, Box, Button, IconButton , Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./useractions.scss";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from "@mui/material/CircularProgress";
import { InputAdornment } from "@mui/material";
//component
import TableUser from "../Component/User/TableUser";
import ModalUserAdd from "../Component/User/ModalUserAdd";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// Aleret Message
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { useQuery } from "@apollo/client";
import { GET_USER_LOGIN, GET_USER_ACTION } from "../Schema/user";
import PermissionContent from "../Component/Permission/PermissionContent";
import IconSticker from "../Assets/scared.png";
import FemalSticker from "../Assets/female.png";
import MaleSticker from "../Assets/male.png";
import moment from "moment";
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import LoadingPage from "../Component/Permission/LoadingPage";
import DescriptionIcon from '@mui/icons-material/Description';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import DateRangeIcon from "@mui/icons-material/DateRange";

export default function UserActions() {    
    
    const [loading,setLoading] = React.useState(true);

    // select Datae    
    const [toDate,setToDate] = React.useState(null);

    // Filter Data Table
    const [valueShort,setValueShort] = React.useState({});    
    const [shortDate,setShortDate] = React.useState(false);   
    const [shortName,setShortName] = React.useState(false);  

    //get Pagegination
    const [dataAction,setDataAction] = React.useState([]);
    const [pageShow, setPageShow] = React.useState(null)
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(8);
    const [keyword, setKeyword] = React.useState("");

    const {data , refetch } = useQuery(GET_USER_ACTION,{
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
            sortField: [valueShort],
            // dateFilter: toDate !== null ? moment(toDate).format("YYYY-MM-DD") : null ,
            dateFilter: toDate,
        },
        onCompleted: ({getUserActionWithPagination}) => {
            console.log(getUserActionWithPagination)
            setDataAction(getUserActionWithPagination?.userAction);
            setLoading(false);
        },
        onError: (error) => {
            console.log(error.message)
        },
        pollInterval: 10000,
        fetchPolicy: 'network-only',
    })

    
    React.useEffect( () => {
        refetch();
        setPageShow(page);
    }, [page,keyword,valueShort,toDate])

    console.log(toDate);
    // console.log(moment(toDate).format("YYYY-MM-DD"))

  return (
    <div className="user-action-page">
        <Stack direction="row" spacing={2}>            
            <Box className="slash" />
            <Stack direction="column" justifyContent="center">
                <Typography className="color">Actions</Typography>
            </Stack>
            <Box sx={{flexGrow: 1}} />      
            <Stack direction="row" spacing={2} className="btn">
                <Box className="btn-text-field" >
                    <TextField
                        onChange={ (event) => setKeyword(event?.target?.value)}
                        className="text-field"
                        fullWidth
                        id="input-with-sx"
                        placeholder="Date, Action Type..."
                        size="small"                       
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),                            
                        }}
                    />
                </Box>  
            </Stack>
            
            <Stack direction="row" spacing={2}>                
                <Box className="select-date-filter">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            // label="Basic example"
                            value={toDate}
                            onChange={(e) => setToDate(e)}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    size="small"
                                    className="text-field"
                                    fullWidth
                                />
                            }
                        />
                    </LocalizationProvider>
                    {/* <LocalizationProvider  className="date-controll" dateAdapter={AdapterMoment} >
                        <MobileDatePicker
                            inputFormat="DD/MM/yyyy"
                            value={toDate}
                            onChange={(e) => setToDate(e)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                className="text-field"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <DateRangeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            )}
                        />
                    </LocalizationProvider>    */}
                </Box>             
            </Stack>
            
        </Stack>

        

    {
        loading ?  <LoadingPage />
    :  
        <Box className="container">    
            <TableContainer>
            <Table sx={{ minWidth: 450 }} className='table-head'>
                <TableHead >
                    <TableRow className='table-row'>
                        <TableCell className="header-title" width="30%">
                            <Stack direction="row" spacing={1}>                          
                                <Stack direction="column" justifyContent="center">
                                    <Typography className="title">Name</Typography>
                                </Stack>
                                {/* <IconButton  onClick={ () => {
                                    if(shortName) {
                                        setShortName(false)
                                        // setValueShort( {sortName : "createdBy.first_name" , sortValue : -1 } )
                                    } else {
                                        setShortName(true) 
                                        // setValueShort( {sortName : "createdBy.first_name" , sortValue : 1 } )
                                    } 
                                }}>
                                    <FilterListIcon  className={ shortName ? "icon-flip-back" : "icon-flip"}/>
                                </IconButton>  */}
                            </Stack>   
                        </TableCell>
                        <TableCell className="header-title" width="25%">  
                            <Stack direction="row" spacing={1}>                          
                                <Stack direction="column" justifyContent="center">
                                    <Typography className="title">Date</Typography>
                                </Stack>
                                <IconButton  onClick={ () => {
                                    if(shortDate) {
                                        setShortDate(false)
                                        setValueShort( {sortName : "createdAt" , sortValue : -1 } )
                                    } else {
                                        setShortDate(true) 
                                        setValueShort( {sortName : "createdAt" , sortValue : 1 } )
                                    } 
                                }}>
                                    <FilterListIcon  className={ shortDate ? "icon-flip-back" : "icon-flip"}/>
                                </IconButton>  
                            </Stack>                        
                        </TableCell>
                        <TableCell align="center" className="header-title" width="15%">
                            Action Type
                        </TableCell>
                        <TableCell className="header-title" width="30%">
                            Action Event
                        </TableCell>                  
                    </TableRow>
                </TableHead>
            

            {
                dataAction?.length !== 0 ? 
                <>
                { dataAction?.map( (row,index) => (

                    <TableBody key={index} className='body'>
                        <TableRow className='body-row'>                       
                            <TableCell className='body-title-shadow'>
                                <Stack direction="row" spacing={3}>
                                    <Avatar alt="Remy Sharp" src={row?.createdBy?.gender === "Male" ? MaleSticker : FemalSticker} />
                                    <Stack direction="column" justifyContent="center">
                                            <Typography variant="body1">
                                                { row?.createdBy?.first_name+" "+row?.createdBy?.last_name}
                                            </Typography>
                                            <Typography variant="body2">
                                                { row?.createdBy?.role_and_permission?.role }
                                            </Typography>
                                    </Stack>     
                                </Stack>                       
                            </TableCell>
                            <TableCell className='body-title'>
                                <Stack direction="row" spacing={1}>
                                    <PlayArrowIcon sx={{color: "rgb(28, 150, 249)"}}/>
                                    <Stack direction="column" justifyContent="center">
                                        <Typography variant="body1">
                                            {moment(row?.createdAt).format("LLLL")}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </TableCell>
                            <TableCell className='body-title' align="center">
                                <Typography variant="body1" className={`style-${row?.actionType}`}>{row?.actionType}</Typography>
                            </TableCell>
                            <TableCell className='body-title' >
                                <Typography variant="body1">{row?.action}</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>  

                ))}  
                </>
            :
            <>
                {
                    loading ?                          
                        <LoadingPage />                           
                    :                           
                        <TableBody component={Paper} className="body-odd">                        
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
                        
                    }                      
                </>
            }


            </Table>
            </TableContainer>

            <Stack direction="row" justifyContent="right" spacing={2} sx={{mt:2}} >
                <IconButton 
                    disabled={ data?.getUserActionWithPagination?.paginator?.prev === null ? true : false }
                    onClick={() => setPage(data?.getUserActionWithPagination?.paginator?.prev)}
                >
                        <ArrowBackIosNewIcon sx={{":hover" : {color:"#0969A0"}}}/>
                </IconButton>
                <Stack direction="column" justifyContent="center" spacing={2} >
                    <Pagination
                        page={pageShow}
                        component="div"
                        hideNextButton={true}
                        hidePrevButton={true}
                        count={data?.getUserActionWithPagination?.paginator?.totalPages}
                        variant="outlined"
                        color="primary"                                            
                        onChange={(event)=> setPage(parseInt(event?.target?.textContent))}
                    />
                </Stack>
                <IconButton disabled ={ data?.getUserActionWithPagination?.paginator?.next === null ? true : false}
                    onClick={()=>setPage(data?.getUserActionWithPagination?.paginator?.next )}
                        >
                        <ArrowForwardIosIcon sx={{":hover" : {color:"#0969A0"}}}/>
                </IconButton>
            </Stack>     

        </Box>
    }
                    
    
    </div>
  );
}
