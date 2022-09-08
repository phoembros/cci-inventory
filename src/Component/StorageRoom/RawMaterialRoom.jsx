import * as React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import "./rawmaterialroom.scss";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import MaterialAction from "../RawMaterial/MaterialAction";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ViewRawMaterial from "../RawMaterial/ViewRawMaterial";
import AlertMessage from "../AlertMessage/AlertMessage";
import { GET_RAW_MATERAIL_PAGINATION } from "../../Schema/rawmaterial" ;
import { useQuery, useMutation } from "@apollo/client";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from "@mui/material/CircularProgress";
import { GET_USER_LOGIN } from "../../Schema/user";
import PermissionContent from "../Permission/PermissionContent";
import DescriptionIcon from '@mui/icons-material/Description';
import LoadingPage from "../Permission/LoadingPage";
import QtyOnHand from "../RawMaterial/QtyOnHand";
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTheme } from '@mui/material/styles';
 

export default function RawMaterialRoom() {

  const theme = useTheme();

  const [loading,setLoading] = React.useState(true);
  const [loadingData,setLoadingData] = React.useState(true);

  //get Storage Room ID by Url 
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [roomId, setRoomId] = React.useState(params.get("storageId"));
  const [roomName, setRoomName] = React.useState(params.get("name"));

  React.useEffect( () => {
      setRoomId(params.get("storageId"));       
      setRoomName(params.get("name")); 
  }, [location.search]);
  // ENd get ID

  const [refetchQty,setRefetchQty] = React.useState(true);

  // Filter  
  const [shortUnitPrice,setShortUnitPrice] = React.useState( JSON.parse(window.localStorage.getItem("shortUnitPriceRawMaterial")) );
  const [shortName,setShortName] = React.useState( JSON.parse(window.localStorage.getItem("shortNameRawMaterial")) ); 

  const [valueShort,setValueShort] = React.useState( JSON.parse(window.localStorage.getItem("valueShortRawMaterial")) )    


  const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
      pollInterval: 10000,
  })
  // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

  React.useState( ()=> {
    if(dataUserLogin?.getuserLogin?.role_and_permission?.permissions){
      setLoading(false)
    }
  },[dataUserLogin?.getuserLogin?.role_and_permission?.permissions])

  const navigate = useNavigate();

  const [openAddRawMaterial, setOpenAddRawMaterial] = React.useState(false);
  const handleOpenRawMaterial = () => setOpenAddRawMaterial(true);
  const handleCloseRawMaterial = () => setOpenAddRawMaterial(false);

  const [openView, setOpenView] = React.useState(false);
  const handleOpenView = () => setOpenView(true);
  const handleCloseView = () => setOpenView(false);

  // View details on table
  const [DataRow, setDataRow] = React.useState([])

  //Alert message
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [checkMessage, setCheckMessage] = React.useState("");

  const [pageShow, setPageShow] = React.useState();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const [keyword, setKeyword] = React.useState("");
 
  
  //Query
  const { data, refetch } = useQuery(GET_RAW_MATERAIL_PAGINATION, {
      variables: {
        storageId: roomId,
        page: keyword !== "" ? 1 : page,
        limit: limit,
        keyword: keyword,
        pagination: true,
        sortField: valueShort === undefined || valueShort === null ? [{}] : [valueShort] 
      },  
      onCompleted: () =>  setLoadingData(false),  
      pollInterval: 10000,
  });

  // console.log(data, "test");

  React.useEffect(() => {
    refetch();
    setLoadingData(true);
    setPageShow(page);
  }, [page, keyword , valueShort , shortName , shortUnitPrice ]);

  React.useEffect( () => {
    if(data?.getRawMaterialPagination?.rawMaterial){
        setLoadingData(false);
    }
  },[data?.getRawMaterialPagination?.rawMaterial])


  return (
    <div className="rawmaterial-room-page">
      <Stack direction="row" spacing={2}>
        <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
        <Stack direction="column" justifyContent="center" className="page-titles">
            <Stack direction="row" spacing={1}>
                <Link to="/storage-room" style={{textDecoration: "none"}}>
                    <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >Storage Room</Typography>
                </Link>
                <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >/ {roomName}</Typography>
            </Stack>                  
        </Stack>                                
        <Stack direction="column" justifyContent="center" className="page-titles-mobile">
            <Stack direction="row" spacing={1}>                       
                <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >{roomName}</Typography>
            </Stack>                         
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} className="btn-search">
          <Box className="btn-text-field">
            <TextField
              onChange={ (event) => setKeyword(event.target.value) }
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Raw Material Name"
              size="small"
              // variant="standard"
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

      </Stack>
    

    {
        loadingData ? <LoadingPage /> :
      <>      
        {
          dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getRawMaterialPagination ?
            <>
              <Box className="container">
                  <TableContainer>
                      <Table className="table" aria-label="simple table">
                          <TableHead>
                              <TableRow className="header-row">
                                  <TableCell className="header-title">
                                      <Stack direction="row" spacing={1}>
                                          <Stack direction="column" justifyContent="center">
                                              <Typography className="title">Name</Typography>
                                          </Stack>
                                          <IconButton  onClick={ () => {
                                              if(shortName !== undefined && shortName !== false) {
                                                  setShortName(false)
                                                  setValueShort( {sortName : "materialName" , sortValue : -1 } )
                                                  window.localStorage.setItem("valueShortRawMaterial" , JSON.stringify({sortName : "materialName" , sortValue : -1 }))
                                                  window.localStorage.setItem("shortNameRawMaterial" , JSON.stringify(false) )
                                              } else {
                                                  setShortName(true) 
                                                  setValueShort( {sortName : "materialName" , sortValue : 1 } )
                                                  window.localStorage.setItem("valueShortRawMaterial" , JSON.stringify({sortName : "materialName" , sortValue : 1 }))
                                                  window.localStorage.setItem("shortNameRawMaterial" , JSON.stringify(true) )
                                              } 
                                          }}>
                                              <FilterListIcon  className={ shortName !== undefined && shortName !== false ? "icon-flip-back" : "icon-flip"}/>
                                          </IconButton>
                                      </Stack>
                                  </TableCell>
                                  <TableCell className="header-title">
                                      <Stack direction="row" spacing={1} >
                                          <Stack direction="column" justifyContent="center">
                                              <Typography className="title">Unit Price</Typography>
                                          </Stack>
                                          <IconButton  onClick={ () => {
                                              if(shortUnitPrice !== undefined && shortUnitPrice !== false) {
                                                  setShortUnitPrice(false)
                                                  setValueShort({sortName : "unitPrice" , sortValue : -1 })
                                                  window.localStorage.setItem("valueShortRawMaterial" , JSON.stringify({sortName : "unitPrice" , sortValue : -1 }))
                                                  window.localStorage.setItem("shortUnitPriceRawMaterial" , JSON.stringify(false) )
                                              } else {
                                                  setShortUnitPrice(true) 
                                                  setValueShort({sortName : "unitPrice" , sortValue : 1 })
                                                  window.localStorage.setItem("valueShortRawMaterial" , JSON.stringify({sortName : "unitPrice" , sortValue : 1 }))
                                                  window.localStorage.setItem("shortUnitPriceRawMaterial" , JSON.stringify(true) )
                                              } 
                                          }}>
                                              <FilterListIcon  className={ shortUnitPrice !== undefined && shortUnitPrice !== false ? "icon-flip-back" : "icon-flip"}/>
                                          </IconButton>
                                      </Stack>
                                  </TableCell> 
                                  {/* <TableCell className="header-title">Category</TableCell>                            */}
                                  <TableCell className="header-title" align="center" >Qty On Hand</TableCell>
                                                                    
                                  <TableCell className="header-title"> </TableCell>
                              </TableRow>
                          </TableHead>
                  {
                      data?.getRawMaterialPagination?.rawMaterial?.length !== 0 ?
                    <>
                        {data?.getRawMaterialPagination?.rawMaterial?.map((row, index) => (
                            <TableBody
                                key={index}
                                component={Paper}
                                className={index % 2 === 0 || theme.palette.mode === 'dark' ? "body" : "body-odd"}
                              >
                            <TableRow className="body-row">                                
                              <TableCell
                                onClick={()=>{handleOpenView(); setDataRow(row)}}
                                className="body-title"
                                component="th"
                                scope="row"
                                width="20%"
                              >
                                {row?.materialName}
                              </TableCell>

                              

                              <TableCell
                                  onClick={()=>{handleOpenView(); setDataRow(row)}}
                                  className="body-title"
                                  align="left"
                                  width="20%"
                              >
                                ${row?.unitPrice}
                              </TableCell>
                              
                              {/* <TableCell
                                onClick={()=>{handleOpenView(); setDataRow(row)}}
                                className="body-title"
                                width="15%"
                              >
                                {row?.category?.categoryName}
                              </TableCell> */}
                            
                              <TableCell
                                onClick={()=>{handleOpenView(); setDataRow(row)}}
                                className="body-title"
                                align="center"
                                width="20%"
                              >
                                  
                                <QtyOnHand setRefetchQty={setRefetchQty} refetchQty={refetchQty} storageRoomId={roomId} rawMaterialId={row?._id} unit={row?.unit?.unitName}/>
                               
                              </TableCell>
                              
                              
                              <TableCell className="body-title" align="right">
                                <MaterialAction
                                    dataUserLogin={dataUserLogin}
                                    DataRow={row}
                                    setAlert={setAlert}
                                    setMessage={setMessage}
                                    setCheckMessage={setCheckMessage}
                                    setRefetch={refetch}
                                    storageRoomId={roomId}
                                    setRefetchQty={setRefetchQty}
                                />
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
                            <TableBody component={Paper} className={ theme.palette.mode === 'dark' ? "body" : "body-odd" }>                        
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
              </Box>

              <Stack direction="row" justifyContent="right" spacing={2}>
                  <IconButton
                    disabled={data?.getRawMaterialPagination?.paginator?.prev === null? true: false}
                    onClick={() =>setPage(data?.getRawMaterialPagination?.paginator?.prev)}
                  >
                    <ArrowBackIosNewIcon sx={{":hover" : {color:"#0969A0"}}}/>
                  </IconButton>

                    <Stack direction='column' justifyContent="center">
                        <Pagination
                          page={pageShow}
                          hideNextButton={true}
                          hidePrevButton={true}
                          count={data?.getRawMaterialPagination?.paginator?.totalPages}
                          variant="outlined" 
                          color="primary" 
                          onClick={ (event) => setPage(parseInt(event?.target?.textContent))}
                        />
                    </Stack>
                    <IconButton
                      disabled={data?.getRawMaterialPagination?.paginator?.next === null? true : false}
                      onClick={() =>setPage(data?.getRawMaterialPagination?.paginator?.next)}
                    >
                      <ArrowForwardIosIcon sx={{":hover" : {color:"#0969A0"}}}/>
                    </IconButton>
              </Stack>
            </>
          :
              loading ?
                <LoadingPage />
              : 
                <PermissionContent />
        }

      </>
      
    }
  
    

      {/* <Modal open={openView}> */}
        <ViewRawMaterial 
          open={openView} 
          handleClose={handleCloseView} 
          DataRow={DataRow}
          setRefetchQty={setRefetchQty} 
          refetchQty={refetchQty}
          storageRoomId={roomId}
        />
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

