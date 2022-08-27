import * as React from "react";
import { Box ,Paper, Button ,Stack , IconButton,Typography, TextField, InputAdornment, Modal, Pagination} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './viewvoid.scss';
import { Link, useNavigate } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CustomerSetup from "./CustomerSetup";
import CustomerAction from "./CustomerAction";
import ViewCustomer from "../../Component/Sales/ViewCustomer";
import AlertMessage from "../../Component/AlertMessage/AlertMessage";
import {GET_CUSTOMER_PAGINATION, GET_SALE_WITH_PAGINATION} from "../../Schema/sales";
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
import SalesAction from "./SalesAction";
import ViewSale from "./ViewSale";
import moment from "moment";
import Filter from "./Filter";


export default function ViewVoid() {

    const theme = useTheme();

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN)
    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    const navigate = useNavigate();
    const [RowData, setRowData] = React.useState([])

    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);
  
    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");
  
    //get Pagegination
    const [pageShow, setPageShow] = React.useState(null);
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(8);
    const [keyword, setKeyword] = React.useState("");
    const [loading,setLoading] = React.useState(true)
    const [status,setStatus] = React.useState("");
  
    const { data, refetch } = useQuery(GET_SALE_WITH_PAGINATION, {
        variables: {
            page: keyword !== "" ? 1 : page,
            limit: limit,
            keyword: keyword,
            pagination: true,
            status: status,
            voidStatus: true,
        },
        onCompleted: ({getSaleWithPagination}) => {
            setLoading(false);
            // console.log(getSaleWithPagination);
        },
        onError: (error) => {
          console.log(error.message)
        },
        pollInterval: 10000,
    });
  
    React.useEffect(()=>{
        refetch()
        setPageShow(page)
    }, [ page, limit , keyword , status ])
  
    // console.log(data?.getSaleWithPagination?.sales , "data")
    
    return (
      <div className="view-void-pages">
        <Stack direction="row" spacing={2}>
          <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
          <Stack direction="row" spacing={1} className="page-title">
              <Stack direction="column" justifyContent="center">
                <Stack direction="row" spacing={1}>   
                    <Link to="/sales" style={{textDecoration: "none"}} >      
                        <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" }>Sales</Typography>
                    </Link>    
                </Stack>
              </Stack>
              <Stack direction="column" justifyContent="center">
                <Stack direction="row" spacing={1}>             
                  <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" }>/ Void</Typography>
                </Stack>
              </Stack>
          </Stack>
          <Stack direction="column" justifyContent="center" className="page-title-mobile">
              <Stack direction="row" spacing={1}>             
                <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >Void</Typography>
              </Stack>
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack direction="row" spacing={2} className="btn">
              <Box className="btn-text-field" >
                  <TextField
                        onChange={(event) => setKeyword(event?.target?.value)}
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
                            endAdornment: (
                              <InputAdornment position="end">
                                  <Filter  setStatus={setStatus} />
                              </InputAdornment>
                            ),
                        }}
                  />
              </Box>                                
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
                  dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getSalePagination ?
                    <>
                      <Box className="container">
                          <TableContainer className="materail">
                              <Table className="table-head">
                                <TableHead className="header-title">
                                      <TableRow className="header-row">
                                        <TableCell className="header-title">Created</TableCell>
                                        <TableCell className="header-title">Invoice No</TableCell>
                                        <TableCell className="header-title">Customer</TableCell>
                                        <TableCell className="header-title">Total Amount</TableCell>   
                                        <TableCell className="header-title">Paid Amount</TableCell>                    
                                        <TableCell className="header-title">VAT</TableCell>                            
                                        <TableCell className="header-title">Status</TableCell>
                                        <TableCell className="header-title"></TableCell>
                                      </TableRow>
                                </TableHead>
                          {
                            data?.getSaleWithPagination?.sales?.length !== 0 ?
                              <>
                              {data?.getSaleWithPagination?.sales?.map((row, index) => (
                                  <TableBody key={index} component={Paper} className={index%2 === 0 || theme.palette.mode === 'dark' ? "body" : "body-odd" }>
                                    <TableRow className="body-row" >
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" width="10%">{moment(row?.date).format("DD/MM/YYYY")}</TableCell>
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" component="th" scope="row" width="15%">
                                        { row?.invoiceNo }                                        
                                      </TableCell>
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" component="th" scope="row" width="20%">{row?.billTo?.label}</TableCell>
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" width="20%">{row?.totalAmount?.toFixed(2)}$</TableCell>      
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" width="20%">{row?.paidAmount}$</TableCell>                
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" width="10%">{row?.vat}%</TableCell>                    
                                      <TableCell onClick={()=>{handleOpenView(); setRowData(row)}} className="body-title" >
                                          {
                                              row?.voided !== true ?
                                                <Typography  className={`status-${row?.status}`} >{row?.status}</Typography> 
                                              : 
                                                <Typography  className={`status-voided`} >void</Typography> 
                                          }
                                          
                                      </TableCell>
                                      <TableCell className="body-title" >
                                          <SalesAction 
                                              dataUserLogin={dataUserLogin}
                                              setAlert={setAlert}
                                              setMessage={setMessage}
                                              setCheckMessage={setCheckMessage}
                                              setRefetch={refetch}
                                              DataSale={row}
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
                                    <TableCell className="body-title" align="center" colSpan={8} rowSpan={5}>
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
                                disabled={ data?.getSaleWithPagination?.paginator?.prev === null ? true: false}
                                onClick={() =>setPage(data?.getSaleWithPagination?.paginator?.prev)}
                            >
                                <ArrowBackIosNewIcon sx={{":hover" :{color:'primary'}}}/>
                            </IconButton>
                            <Stack direction="column" justifyContent="center">
                              <Pagination
                                  page={pageShow}
                                  hideNextButton={true}
                                  hidePrevButton={true}
                                  variant="outlined"
                                  color="primary"
                                  count={data?.getSaleWithPagination?.paginator?.totalPages}
                                  onChange={(event) =>
                                    setPage(parseInt(event?.target?.textContent))
                                  }
                                />
                              </Stack>
                              <IconButton
                                    disabled={data?.getSaleWithPagination?.paginator?.next === null ? true: false}
                                    onClick={() =>setPage(data?.getSaleWithPagination?.paginator?.next)}
                              >
                                <ArrowForwardIosIcon sx={{":hover" :{color:'primary'}}}/>
                              </IconButton>
                          </Stack>
                    </>
                :
                  <PermissionContent />
              }      
               
          </>        
      }
            

        {/* <Modal open={openView}> */}
          <ViewSale open={openView} handleCloseView={handleCloseView} RowData={RowData}/>
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
