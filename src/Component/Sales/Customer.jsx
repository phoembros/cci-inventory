import * as React from "react";
import { Box ,Paper, Button ,Stack , IconButton,Typography, TextField, InputAdornment, Modal, Pagination} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './customer.scss';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CustomerSetup from "./CustomerSetup";
import CustomerAction from "./CustomerAction";
import ViewCustomer from "../../Component/Sales/ViewCustomer";
import AlertMessage from "../../Component/AlertMessage/AlertMessage";
import {GET_CUSTOMER_PAGINATION} from "../../Schema/sales";
import {useQuery} from "@apollo/client";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import CustomerOwe from "./CustomerOwe";  
import {GET_USER_LOGIN} from "../../Schema/user"
import PermissionContent from "../Permission/PermissionContent";
import DescriptionIcon from '@mui/icons-material/Description';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from '@mui/material/styles';


export default function Customer() {

    const theme = useTheme();

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN)
    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    const [shortID,setShortID] = React.useState( JSON.parse(window.localStorage.getItem("shortIDCustomer")) );
    const [shortName,setShortName] = React.useState( JSON.parse(window.localStorage.getItem("shortNameCustomer")) );
    const [shortOwe,setShortOwe] = React.useState(false);
    const [valueShort,setValueShort] = React.useState( JSON.parse(window.localStorage.getItem("shortValueCustomer")) )  

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

     //Alert message
     const [alert, setAlert] = React.useState(false);
     const [message, setMessage] = React.useState('');
     const [checkMessage, setCheckMessage]= React.useState('')
    // useQuery 
    const [pageShow, setShowPage] = React.useState(1);
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(10)
    const [keyword, setKeyword] = React.useState("")
    
    const [loading,setLoading] = React.useState(true);
    //view
    const [DetailsData, setDetailsData] = React.useState([])

    const { data, refetch } = useQuery(GET_CUSTOMER_PAGINATION, {
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

    });

    React.useEffect(()=>{
        refetch();
        setShowPage(page);
    },[ page, keyword , valueShort , shortID , shortName ])

    
    return (
      <div className="customer-setup-page">
        <Stack direction="row" spacing={2}>
          <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
          <Stack direction="column" justifyContent="center">
            <Stack direction="row" spacing={1}>             
              <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >Customer</Typography>
            </Stack>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            className="stack-btn"
            justifyContent="right"
            spacing={1}
          >
            <Box className="btn-text-field">
              <TextField
                onChange={ (event)=> setKeyword(event?.target?.value)}
                className="text-field"
                fullWidth
                id="input-with-sx"
                placeholder="Customer Name"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon  sx={{color: "gray"}}/>
                    </InputAdornment>
                  ),                 
                }}
              />
            </Box>            
          </Stack>
          {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createCustomer ?
              <Button
                onClick={handleOpen}
                startIcon={<AddIcon />}
                className="btn-add"
              >
                <Typography className="btn-text">Add</Typography>
              </Button>
            : null
          }
          
          {/* <Modal open={open}> */}
            <CustomerSetup
              setRefetch={refetch}
              setKeyword={setKeyword}
              open={open}
              setAlert={setAlert}
              setMessage={setMessage}
              setCheckMessage={setCheckMessage}
              handleClose={handleClose}
              
            />
          {/* </Modal> */}

        </Stack>

      {
        loading ?
            <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center" , mt:10}} >
                <CircularProgress />
            </Box>

        :        
          <>
              {
                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getCustomerPagination ?
                  <>
                      <Box className="container">
                          <TableContainer className="table-container">
                            <Table className="table" aria-label="simple table">
                              <TableHead>
                                <TableRow className="header-row">
                                  <TableCell className="header-title">
                                      <Stack direction="row" spacing={1} >
                                          <Stack direction="column" justifyContent="center">
                                              <Typography className="title">ID</Typography>
                                          </Stack>
                                          <IconButton  onClick={ () => {
                                              if(shortID !== undefined && shortID !== false) {
                                                  setShortID(false)
                                                  setValueShort({ sortName : "cusId" , sortValue : -1 })
                                                  window.localStorage.setItem("shortIDCustomer", JSON.stringify(false) )
                                                  window.localStorage.setItem("shortValueCustomer", JSON.stringify({ sortName : "cusId" , sortValue : -1 }) )
                                              } else {
                                                  setShortID(true) 
                                                  setValueShort({ sortName : "cusId" , sortValue : 1 })
                                                  window.localStorage.setItem("shortIDCustomer", JSON.stringify(true) )
                                                  window.localStorage.setItem("shortValueCustomer", JSON.stringify({ sortName : "cusId" , sortValue : 1 }) )
                                              } 
                                          }}>
                                              <FilterListIcon  className={ shortID !== undefined && shortID !== false ? "icon-flip-back" : "icon-flip"}/>
                                          </IconButton>
                                      </Stack>
                                  </TableCell>
                                  <TableCell className="header-title">
                                      <Stack direction="row" spacing={1} >
                                          <Stack direction="column" justifyContent="center">
                                              <Typography className="title">Name</Typography>
                                          </Stack>
                                          <IconButton  onClick={ () => {
                                              if(shortName !== undefined && shortName !== false) {
                                                  setShortName(false)
                                                  setValueShort({ sortName : "name" , sortValue : -1 })
                                                  window.localStorage.setItem("shortNameCustomer", JSON.stringify(false) )
                                                  window.localStorage.setItem("shortValueCustomer", JSON.stringify({ sortName : "name" , sortValue : -1 }) )
                                              } else {
                                                  setShortName(true) 
                                                  setValueShort({ sortName : "name" , sortValue : 1 })
                                                  window.localStorage.setItem("shortNameCustomer", JSON.stringify(true) )
                                                  window.localStorage.setItem("shortValueCustomer", JSON.stringify({ sortName : "name" , sortValue : 1 }) )
                                              } 
                                          }}>
                                              <FilterListIcon  className={ shortName !== undefined && shortName !== false ? "icon-flip-back" : "icon-flip"}/>
                                          </IconButton>
                                      </Stack>
                                  </TableCell>
                                  <TableCell className="header-title">Phone Number</TableCell>
                                  <TableCell className="header-title">Email</TableCell>
                                  <TableCell className="header-title">Address</TableCell>
                                  <TableCell className="header-title" align="center">
                                    {
                                      dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getOweCustomer ?
                                        <>
                                          <Stack direction="row" justifyContent="center" spacing={1} >
                                              <Stack direction="column" justifyContent="center">
                                                  <Typography className="title">Owe</Typography>
                                              </Stack>
                                              {/* <IconButton  onClick={ () => {
                                                  if(shortOwe) {
                                                      setShortOwe(false)
                                                      setValueShort({ sortName : "name" , sortValue : -1 })
                                                  } else {
                                                      setShortOwe(true) 
                                                      setValueShort({ sortName : "name" , sortValue : 1 })
                                                  } 
                                              }}>
                                                  <FilterListIcon  className={ shortOwe ? "icon-flip-back" : "icon-flip"}/>
                                              </IconButton> */}
                                          </Stack>
                                        </>
                                      :
                                        null
                                    }                              
                                  </TableCell>
                                  <TableCell className="header-title" align="center"></TableCell>
                                </TableRow>
                              </TableHead>    

                        {
                          data?.getCustomerPagination?.customers?.length !== 0 ?
                            <>
                            { data?.getCustomerPagination?.customers?.map((row, index) => (
                                  <TableBody
                                      key={index}
                                      component={Paper}
                                      className={index % 2 === 0 || theme.palette.mode === 'dark' ? "body" : "body-odd"}
                                  >
                                    <TableRow className="body-row">
                                      <TableCell
                                        onClick={()=>{handleOpenView(); setDetailsData(row)}}
                                        className="body-title"
                                        component="th"
                                        width="10%"
                                      >
                                        {row?.cusId}
                                      </TableCell>
                                      <TableCell
                                        onClick={()=>{handleOpenView(); setDetailsData(row)}}
                                        className="body-title"
                                        component="th"
                                        width="25%"
                                      >
                                        {row?.name}
                                      </TableCell>
                                      <TableCell
                                        onClick={()=>{handleOpenView(); setDetailsData(row)}}
                                        className="body-title"
                                        component="th"
                                        scope="row"
                                        width="15%"
                                      >
                                      {row.phoneNumber}
                                      </TableCell>
                                      <TableCell
                                        onClick={()=>{handleOpenView(); setDetailsData(row)}}
                                        className="body-title"
                                        component="th"
                                        scope="row"
                                        width="15%"
                                      >
                                        {row.email}
                                      </TableCell>
                                      <TableCell
                                        onClick={()=>{handleOpenView(); setDetailsData(row)}}
                                        className="body-title"
                                        width="25%"
                                      >
                                        {row.address}
                                      </TableCell>
                                      <TableCell
                                        onClick={()=>{handleOpenView(); setDetailsData(row)}}
                                        className="body-title"
                                        width="45%"
                                      >
                                        {
                                          dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getOweCustomer ?
                                            <>
                                                <CustomerOwe  dataOwe={row?._id}/>
                                            </>
                                          :
                                            null
                                        }                                      

                                      </TableCell>
                                      <TableCell className="body-title" align="right">
                                        <CustomerAction 
                                          dataUserLogin={dataUserLogin}
                                          setRefetch={refetch}
                                          DataCustomer={row}
                                          setAlert={setAlert}
                                          setMessage={setMessage}
                                          setCheckMessage={setCheckMessage}
                                          handleClose={handleClose}
                                          />
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                  ))} 
                            </>
                          :
                            <>
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
                            </>
                        }                    

                              
                              
                            </Table>
                          </TableContainer>


                          <Stack direction="row" justifyContent="right" spacing={2}>
                            <IconButton
                                disabled={
                                  data?.getCustomerPagination?.paginator?.next === null
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                    setPage(data?.getCustomerPagination?.paginator?.next)
                                }
                            >
                              <ArrowBackIosNewIcon />
                            </IconButton>
                            <Stack direction="column" justifyContent="center">
                              <Pagination
                                  page={pageShow}
                                  hideNextButton={true}
                                  hidePrevButton={true}
                                  count={data?.getCustomerPagination?.paginator?.totalPages}
                                  variant="outlined"
                                  color="primary"
                                  onChange={(event) =>
                                      setPage(parseInt(event?.target?.textContent))
                                  }
                              />
                            </Stack>

                            <IconButton
                                disabled={
                                  data?.getCustomerPagination?.paginator?.prev === null
                                    ? true
                                    : false
                                }
                                onClick={() =>
                                    setPage(data?.getCustomerPagination?.paginator?.prev)
                                }
                            >
                              <ArrowForwardIosIcon />
                            </IconButton> 
                          </Stack>
                          

                        </Box>
                  </>
                :
                  <PermissionContent />
              }
          </>        
      }
            

        {/* <Modal open={openView}> */}
          <ViewCustomer open={openView} handleCloseView={handleCloseView} DetailsData={DetailsData} />
        {/* </Modal> */}

        <AlertMessage
          alert={alert}
          checkMessage={checkMessage}
          message={message}
          setAlert={setAlert}
        />
      </div>
    );
}
