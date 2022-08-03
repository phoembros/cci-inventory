import { Avatar, Box, Button, IconButton, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import "./user.scss";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import CircularProgress from "@mui/material/CircularProgress";
//component
import TableUser from "../Component/User/TableUser";
import ModalUserAdd from "../Component/User/ModalUserAdd";

// Aleret Message
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { useQuery } from "@apollo/client";
import { GET_USER_LOGIN, GET_USER_PAGINATION } from "../Schema/user";
import PermissionContent from "../Component/Permission/PermissionContent";
import UserAction from "../Component/User/UserAction";

import moment from "moment";
import ViewUser from "../Component/User/ViewUser";

export default function User() {    


    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
        pollInterval: 10000,
    })
    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)
    const [UserData, setUserData] = React.useState(null);

    const [loading,setLoading] = React.useState(true);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //Alert message
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [checkMessage, setCheckMessage]= React.useState('')


    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = (row) => {
        setUserData(row);
        setOpenView(true);
    };
    const handleCloseView = () => setOpenView(false);

    //get Pagegination
    const [pageShow, setPageShow] = React.useState(null)
    const [page, setPage] = React.useState(1);
    const [limit, setLimit] = React.useState(8);
    const [keyword, setKeyword] = React.useState("");

    const { data, refetch } = useQuery( GET_USER_PAGINATION, {
        variables:{
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
        },
        onCompleted: () => {
            setLoading(false)
        },
        pollInterval: 10000,
        fetchPolicy: 'network-only'
    });

    React.useEffect(()=>{
        refetch();
        setPageShow(page);
    }, [page,keyword])

    

  return (
    <div className="user-page">
        <Stack direction="row" spacing={2}>
            
            <Box className="slash" />
            <Stack direction="column" justifyContent="center">
                <Typography className="color"> User </Typography>
            </Stack>

            <Box sx={{flexGrow: 1}} />
            <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>   

            {
                dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createUser ?
                    <Button onClick={handleOpen} startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text"> Add </Typography>
                    </Button>
                : null
            }         
                
            {/* <Modal open={open}> */}
                <ModalUserAdd 
                    setRefech={refetch}
                    open={open}
                    setAlert={setAlert} 
                    setMessage={setMessage}
                    setCheckMessage={setCheckMessage} 
                    handleClose={handleClose}
                    setLoading={setLoading}
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
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.getUsersPagination ?
                        <>
                            <Box className="container">    
                                <TableContainer>
                                <Table sx={{ minWidth: 450 }} className='table-head'>
                                    <TableHead >
                                    <TableRow className='table-row'>
                                        <TableCell className="header-title" width="30%" colSpan={2}>
                                            Name
                                        </TableCell>
                                        <TableCell className="header-title" width="10%">
                                            Gender
                                        </TableCell>
                                        <TableCell className="header-title" width="10%">
                                            Date Of Birth
                                        </TableCell>
                                        <TableCell className="header-title" width="30%">
                                            Email
                                        </TableCell>
                                        <TableCell className="header-title" width="5%"></TableCell>
                                        <TableCell className="header-title" width="5%"></TableCell>
                                    </TableRow>
                                    </TableHead>
                                    
                                    {data?.getUsersPagination?.users?.map((row, index) => (
                                        <TableBody  key={index} className='body'>
                                            <TableRow className='body-row'>
                                                <TableCell className='body-title' width="5%"> {index+1}- </TableCell>
                                                <TableCell onClick={handleOpenView} className='body-title'>
                                                    <Stack direction="row"  spacing={2}> 
                                                        <Avatar src= {row?.image_src} alt={row?.name}/>
                                                        <Stack direction="column" justifyContent="center">
                                                            <Typography>{row?.first_name+" "+row?.last_name}</Typography>
                                                        </Stack>                    
                                                    </Stack>
                                                </TableCell>
                                                <TableCell onClick={()=>{ handleOpenView(row) }} className='body-title' width="20%">{row?.gender}</TableCell>
                                                <TableCell onClick={()=>{ handleOpenView(row) }} className='body-title' width="20%">{moment(row?.birthOfDate).format('DD/MM/YYYY')}</TableCell>
                                                <TableCell onClick={()=>{ handleOpenView(row) }} className='body-title' width="20%">{row?.email}</TableCell>
                                                <TableCell onClick={()=>{ handleOpenView(row) }} className='body-title' width="30%">{row?.phone_umber}</TableCell>

                                                <TableCell className='body-title'>
                                                    <UserAction            
                                                        dataUserLogin={dataUserLogin}                                                                                
                                                        DataUser={row}
                                                        setRefech={refetch}
                                                        setAlert={setAlert}
                                                        setMessage={setMessage}
                                                        checkMessage={checkMessage} 
                                                        setCheckMessage={setCheckMessage}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>                
                                    ))}
                                </Table>
                                </TableContainer>

                                <Stack direction="row" justifyContent="right" spacing={2} sx={{mt:2}} >
                                    <IconButton 
                                        disabled={ data?.getUsersPagination?.paginator?.prev === null ? true : false }
                                        onClick={() => setPage(data?.getUsersPagination?.paginator?.prev)}
                                    >
                                            <ArrowBackIosNewIcon sx={{":hover" : {color:"#0969A0"}}}/>
                                    </IconButton>
                                    <Stack direction="column" justifyContent="center" spacing={2} >
                                        <Pagination
                                            page={pageShow}
                                            component="div"
                                            hideNextButton={true}
                                            hidePrevButton={true}
                                            count={data?.getUsersPagination?.paginator?.totalPages}
                                            variant="outlined"
                                            color="primary"                                            
                                            onChange={(event)=> setPage(parseInt(event?.target?.textContent))}
                                        />
                                    </Stack>
                                    <IconButton disabled ={ data?.getUsersPagination?.paginator?.next === null ? true : false}
                                        onClick={()=>setPage(data?.getUsersPagination?.paginator?.next )}
                                            >
                                            <ArrowForwardIosIcon sx={{":hover" : {color:"#0969A0"}}}/>
                                    </IconButton>
                                </Stack>     

                            </Box>
                        </>
                    :
                        <PermissionContent />
                }
            </>
    }        

        {/* <Modal open={openView} > */}
            <ViewUser open={openView} handleCloseView={handleCloseView} data={UserData}/>
        {/* </Modal> */}

        <AlertMessage alert={alert} setAlert={setAlert} message={message} setMessage={setMessage} checkMessage={checkMessage} />
    
    </div>
  );
}
