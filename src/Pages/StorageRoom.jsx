import * as React from "react";
import {
  Typography,
  Stack,
  Box,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
  Modal,
} from "@mui/material";
import "./storageroom.scss";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import ModalCreateStorageRoom from "../Component/StorageRoom/ModalCreateStorageRoom";
import StorageRoomAction from "../Component/StorageRoom/StorangeRoomAction";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';
//pagination
import Pagination from "@mui/material/Pagination";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import { GET_STORAGE_ROOM_PAGINATION} from "../Schema/starageroom";
import { useQuery } from "@apollo/client";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import { GET_USER_LOGIN } from "../Schema/user";
import PermissionContent from "../Component/Permission/PermissionContent";

export default function StorageRoom() {

  
  const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
    pollInterval: 10000,
  })
  // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

  
  const dataForloading = [1,2,3];

  const navigate = useNavigate();
  const [loading,setLoading] = React.useState(true);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //Alert message
  const [alert, setAlert] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [checkMessage, setCheckMessage] = React.useState("");

  //get Pagegination
  const [pageShow, setPageShow] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(8);
  const [keyword, setKeyword] = React.useState("");

  const [dataStorageRoom,setDataStorageRoom] = React.useState([])

  const { data, refetch } = useQuery(GET_STORAGE_ROOM_PAGINATION, {
    variables: {
        page: page,
        limit: limit,
        keyword: keyword,
        pagination: true,
    },
    onCompleted: ({getStorageRoomWithPagination}) => {
      // console.log(getStorageRoomWithPagination ,"storageRoom")
      setDataStorageRoom(getStorageRoomWithPagination?.storageRoom)
      setLoading(false)
    },
    onError: (error) => {
       // token-expired     
        // setMessage(error?.message);
        // setCheckMessage("error");
        // setAlert(true);
        // if(error?.message === "token-expired") {
        //     signOut(auth).then( () => {    
        //       setTimeout( () => {                
        //         navigate("/login")
        //       },1500)
        //     }).catch( (error) => {                
        //         console.log(error)
        //     });
        // }      
      // End
    },
    pollInterval: 10000,

  });


  React.useEffect(() => {
      refetch();
      setPageShow(page);
  }, [page, keyword]);


  

  return (
    <div className="storageroom-page">
      <Stack direction="row" spacing={2}>
        <Box className="slash" />
        <Stack direction="column" justifyContent="center">
          <Typography className="color"> Storage Room </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" spacing={5} className="btn-add">
          {/* Create Storage Room */}
          {
            dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createStorageRoom ?
              <Button onClick={handleOpen} startIcon={<AddIcon />}>
                  <Typography className="style-add"> Add </Typography>
              </Button>
            :
              null
          }
          
          {/* <Modal open={open}> */}
            <ModalCreateStorageRoom
              open={open}
              handleClose={handleClose}
              btnTitle={"Create"}
              checkStatus={"create"}
              setAlert={setAlert}
              setMessage={setMessage}
              checkMessage={checkMessage}
              setCheckMessage={setCheckMessage}
              setRefetch={refetch}
            />
          {/* </Modal> */}
          {/* End Storage Room */}
        </Stack>
      </Stack>


    {
        dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getStorageRoomWithPagination ?

        <>
        {
          loading ?
            <Box
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" , mt:10}}
            >
                <CircularProgress />
            </Box>
          :
              <Box className="container">
                <TableContainer>
                  <Table className="table" aria-label="simple table">
                    {dataStorageRoom?.map(
                      (row, index) => (
                        <TableBody component={Paper} className="body">
                          <TableRow className="body-row">
                            <TableCell
                                onClick={()=>
                                  row.type === "Products" ? 
                                    navigate(`/storage-room/roomdetail?storageId=${row._id}&name=${row.name}`) 
                                  : 
                                    navigate(`/storage-room/purchase?storageId=${row._id}&name=${row.name}`) 
                                }                        
                                className="body-title"
                                width="3%"
                            >
                              {index + 1}-
                            </TableCell>
                            <TableCell
                              onClick={()=>
                                row.type === "Products" ? 
                                  navigate(`/storage-room/roomdetail?storageId=${row._id}&name=${row.name}`) 
                                : 
                                navigate(`/storage-room/purchase?storageId=${row._id}&name=${row.name}`)
                              } 
                              className="body-title"
                              width="20%"
                            >
                              Name: {row.name} 
                            </TableCell>
                            <TableCell
                              onClick={()=>
                                row.type === "Products" ? 
                                  navigate(`/storage-room/roomdetail?storageId=${row._id}&name=${row.name}`) 
                                : 
                                navigate(`/storage-room/purchase?storageId=${row._id}&name=${row.name}`)
                              } 
                              className="body-title"
                              width="30%"
                            >
                              Location: {row.address}
                            </TableCell>
                            <TableCell
                              onClick={()=>
                                row.type === "Products" ? 
                                navigate(`/storage-room/roomdetail?storageId=${row._id}&name=${row.name}`) 
                                : 
                                navigate(`/storage-room/purchase?storageId=${row._id}&name=${row.name}`)
                              } 
                              className="body-title"
                              align="left"
                              width="15%"
                            >
                              Type: {row.type}
                            </TableCell>
                            <TableCell
                              onClick={()=>
                                row.type === "Products" ? 
                                navigate(`/storage-room/roomdetail?storageId=${row._id}&name=${row.name}`)  
                                : 
                                navigate(`/storage-room/purchase?storageId=${row._id}&name=${row.name}`)
                              } 
                              className="body-title"
                              align="left"                      
                            >
                              Remark: {row.remark}
                            </TableCell>
                            <TableCell className="body-title" align="right">
                              <StorageRoomAction
                                  dataUserLogin={dataUserLogin}
                                  row={row}
                                  setRefetch={refetch}
                                  setAlert={setAlert}
                                  setMessage={setMessage}
                                  setCheckMessage={setCheckMessage}                        
                              />
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )
                    )}
                  </Table>
                  <Stack direction="row" justifyContent="right" spacing={2}>
                    <IconButton
                      disabled={ data?.getStorageRoomWithPagination?.paginator?.prev === null ? true  : false }
                      onClick={() =>
                        setPage(data?.getStorageRoomWithPagination?.paginator?.prev)
                      }
                    >
                      <ArrowBackIosNewIcon sx={{ ":hover": { color: "#0969A0" } }} />
                    </IconButton>

                    <Stack direction="column" justifyContent="center" spacing={2}>
                      <Pagination
                        page={pageShow}
                        component="div"
                        hideNextButton="true"
                        hidePrevButton="true"
                        count={
                          data?.getStorageRoomWithPagination?.paginator?.totalPages
                        }
                        variant="outlined"
                        color="primary" 
                        shape="circle"
                        onChange={(event) =>
                          setPage(parseInt(event?.target?.textContent))
                        }
                      />
                    </Stack>
                    <IconButton
                      disabled={
                        data?.getStorageRoomWithPagination?.paginator?.prev === null
                          ? true
                          : false
                      }
                      onClick={() =>
                        setPage(data?.getStorageRoomWithPagination?.paginator?.next)
                      }
                    >
                      <ArrowForwardIosIcon sx={{ ":hover": { color: "#0969A0" } }} />
                    </IconButton>
                  </Stack>
                </TableContainer>
              </Box>
          
        }
        </>
      :
        <PermissionContent />

    }
    
    

      

      <AlertMessage
        alert={alert}
        message={message}
        setAlert={setAlert}
        setMessage={setMessage}
        checkMessage={checkMessage}
        setCheckMessage={setCheckMessage}
      />
    </div>
  );
}
