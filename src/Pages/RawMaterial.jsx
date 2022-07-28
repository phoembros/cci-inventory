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
import "./rawmaterial.scss";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import CreateRawMaterial from "../Component/RawMaterial/CreateRawMaterial";
import RawMaterialAction from "../Component/RawMaterial/RawMaterialAction";
import { useNavigate } from "react-router-dom";
import ViewRawMaterial from "../Component/RawMaterial/ViewRawMaterial";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { GET_RAW_MATERAIL_PAGINATION } from "../Schema/rawmaterial" ;
import { useQuery, useMutation } from "@apollo/client";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from "@mui/material/CircularProgress";
import { GET_USER_LOGIN } from "../Schema/user";
import PermissionContent from "../Component/Permission/PermissionContent";
import DescriptionIcon from '@mui/icons-material/Description';

export default function RawMaterial() {

  const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
      pollInterval: 10000,
  })
  // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

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
  const [loading,setLoading] = React.useState(true)
  
  //Query
  const { data, refetch } = useQuery(GET_RAW_MATERAIL_PAGINATION, {
      variables: {
        page: page,
        limit: limit,
        keyword: keyword,
        pagination: true,
      },
      onCompleted: () => {
          setLoading(false)
      },
      pollInterval: 10000,
  });

  // console.log(data, "test");

  React.useEffect(() => {
    refetch();
    setPageShow(page);
  }, [page, keyword]);


  return (
    <div className="rawmaterial-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color">Materials</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" spacing={2} className="btn-search">
          <Box className="btn-text-field">
            <TextField
              onChange={(event)=>setKeyword(event.target.value)}
              className="text-field"
              fullWidth
              id="input-with-sx"
              placeholder="Raw Material Name"
              size="small"
              // variant="standard"
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

        <Stack direction="row" spacing={2} className="btn">

          {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createRawMaterialCategory ? 
              <>
                <Button
                  onClick={() => navigate("/raw-material/categories")}
                  className="btn-add"
                  startIcon={<AddIcon />}
                >
                  <Typography className="style-add">Category</Typography>
                </Button>
              </>
            :
              null
          }
          
          {/* Create Raw Material */}

          {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createRawMaterial ? 
              <>
                <Button
                  onClick={handleOpenRawMaterial}
                  className="btn-add"
                  startIcon={<AddIcon />}
                >
                  <Typography className="style-add">Add</Typography>
                </Button>
              </>
            :
              null
          }
          

          {/* <Modal open={openAddRawMaterial} onClose={handleCloseRawMaterial}> */}
            <CreateRawMaterial
                open={openAddRawMaterial}
                handleClose={handleCloseRawMaterial}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                checkStatus={"create"}
                btnTitle={"Create"}
                setRefetch={refetch}
            />
          {/* </Modal> */}
          {/* Create Raw Material */}
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
                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getRawMaterialPagination ?
                  <>
                    <Box className="container">
                        <TableContainer>
                            <Table className="table" aria-label="simple table">
                                <TableHead>
                                    <TableRow className="header-row">
                                        <TableCell className="header-title" colSpan={2}>Name</TableCell>
                                        <TableCell className="header-title">Category</TableCell>                            
                                        <TableCell className="header-title">Unit Price</TableCell>
                                        <TableCell className="header-title">Unit</TableCell>
                                        <TableCell className="header-title">Remark</TableCell>
                                        <TableCell className="header-title"> </TableCell>
                                    </TableRow>
                                </TableHead>
                        {
                            data?.getRawMaterialPagination?.rawMaterial?.length !== 0 ?
                          <>
                          {data?.getRawMaterialPagination?.rawMaterial?.map((row, index) => (
                              <TableBody
                                  component={Paper}
                                  className={index % 2 === 0 ? "body" : "body-odd"}
                                >
                              <TableRow className="body-row">
                                <TableCell onClick={()=>{handleOpenView(); setDataRow(row)}}
                                  className="body-title"
                                  component="th"
                                  scope="row"
                                  width="3%"
                                  
                                >

                                  {index + 1}-{" "}
                                </TableCell>
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
                                  width="15%"
                                >
                                  {row?.category?.categoryName}
                                </TableCell>
                                {/* <TableCell
                                
                                    className="body-title"
                                    width="20%"
                                  >
                                    Supplies A
                                  </TableCell> */}

                                <TableCell
                                    onClick={()=>{handleOpenView(); setDataRow(row)}}
                                    className="body-title"
                                    align="left"
                                    width="20%"
                                >
                                  ${row?.unitPrice}
                                </TableCell>
                                <TableCell
                                  onClick={()=>{handleOpenView(); setDataRow(row)}}
                                  className="body-title"
                                  align="left"
                                  width="10%"
                                >
                                  {row?.unit}
                                </TableCell>
                                <TableCell
                                  onClick={()=>{handleOpenView(); setDataRow(row)}}
                                  className="body-title"
                                  align="left"
                                  width="30%"
                                >
                                  {row?.remark}
                                </TableCell>
                                <TableCell className="body-title" align="right">
                                  <RawMaterialAction
                                    dataUserLogin={dataUserLogin}
                                    DataRow={row}
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
                                onChange={(event) => setPage(parseInt(event?.target?.textContent))}
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
                <PermissionContent />
            }

          </>        
    }

    

      {/* <Modal open={openView}> */}
        <ViewRawMaterial open={openView} handleClose={handleCloseView} DataRow={DataRow} />
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

