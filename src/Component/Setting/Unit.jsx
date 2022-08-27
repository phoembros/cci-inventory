import * as React from "react";
import { Box, Button, IconButton, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import CreateUnit from "./CreateUnit";
import AlertMessage from "../AlertMessage/AlertMessage";
import UnitAction from "./UnitAction"
import { GET_UNIT_PAGINATION } from "../../Schema/unit"; 
import { useQuery } from "@apollo/client";
import { GET_USER_LOGIN } from "../../Schema/user";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function Unit() {

    const theme = useTheme();

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
        pollInterval: 10000,
    })

    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    const [pageShow, setPageShow] = React.useState(null)

    // Dialog
    const [openCreateUnit, setOpenCreateUnit] = React.useState(false);
    const handleOpenCreateUnit = () => setOpenCreateUnit(true);
    const handleCloseCreateUnit = () => setOpenCreateUnit(false);

    // Get Data 
    const [page,setPage] = React.useState(1)
    const [limit,setLimit] = React.useState(8)
    const [keyword,setKeyword] = React.useState("")

    const [dataUnit,setDataUnit] = React.useState([]);

    const { data, refetch} = useQuery(GET_UNIT_PAGINATION, {
        variables: {
            page: page,
            limit: limit,
            keyword: keyword,
            pagination: true,
            sortField: [{}],
        }
    })

    React.useEffect( () => {
        if(data?.getUnitPagination) {
            setDataUnit(data?.getUnitPagination?.units)
        }
    },[data?.getUnitPagination])

    const handleOpenView = () => {
        console.log("view")
    }

    React.useEffect(()=>{
        refetch();
        setPageShow(page);
    }, [page,keyword])


    return (        
        <div className="system-page-role">
            <Stack direction="row" spacing={2}>
                <Box  className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
                <Stack direction="row" spacing={1} className="page-title">
                    <Stack direction="column" justifyContent="center">
                        <Link to="/system-setting" style={{ textDecoration: "none"}}>
                            <Typography  className={theme.palette.mode === 'dark' ? "color-dark" : "color" } >System Setting</Typography>
                        </Link>
                    </Stack>
                    <Stack direction="column" justifyContent="center">
                        <Typography  className={theme.palette.mode === 'dark' ? "color-dark" : "color" }>/ Unit</Typography>
                    </Stack>
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title-mobile">
                    <Typography  className={theme.palette.mode === 'dark' ? "color-dark" : "color" }> Unit</Typography>
                </Stack>

                <Box sx={{flexGrow: 1}} />  

                {                   
                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createUnit ?
                        <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                       
                            <Button onClick={handleOpenCreateUnit} startIcon={<AddIcon/>} className="btn-add">
                                <Typography className="btn-text">ADD</Typography>
                            </Button>                    
                            <CreateUnit  
                                open={openCreateUnit}
                                handleClose={handleCloseCreateUnit} 
                                btnTitle={"Create"}
                                setAlert={setAlert}
                                setMessage={setMessage}
                                setCheckMessage={setCheckMessage}
                                setRefetch={refetch}
                            />                     
                        </Stack>
                    : null
                }
                
                
            </Stack>


            <Box className="container">    
                    <TableContainer>
                        <Table sx={{ minWidth: 450 }} className='table-head'>
                            <TableHead >
                                <TableRow className='table-row'>
                                    <TableCell className="header-title" width="5%">
                                        No
                                    </TableCell>
                                    <TableCell className="header-title" width="10%">
                                        Name
                                    </TableCell>
                                    <TableCell className="header-title" width="10%">
                                        Remark
                                    </TableCell>  
                                    <TableCell className="header-title" > </TableCell>                                
                                </TableRow>
                            </TableHead> 


                            {dataUnit?.map((row, index) => (
                                <TableBody  key={index} component={Paper}  className={index % 2 === 0 || theme.palette.mode === 'dark' ? "body" : "body-odd"} >
                                    <TableRow className='body-row'>
                                        <TableCell className='body-title' width="5%"> {index+1}- </TableCell>                                        
                                        <TableCell onClick={()=>{ handleOpenView(row) }} className='body-title' width="20%">{row?.unitName}</TableCell>
                                        <TableCell onClick={()=>{ handleOpenView(row) }} className='body-title' width="30%">{row?.remark}</TableCell>

                                        <TableCell className='body-title' align="right">
                                            <UnitAction            
                                                dataUserLogin={dataUserLogin}                                                                                
                                                DataUnit={row}
                                                setRefetch={refetch}
                                                setAlert={setAlert}
                                                setMessage={setMessage}                                                
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
                            disabled={ data?.getUnitPagination?.paginator?.prev === null ? true : false }
                            onClick={() => setPage(data?.getUnitPagination?.paginator?.prev)}
                        >
                                <ArrowBackIosNewIcon sx={{":hover" : {color:"#0969A0"}}}/>
                        </IconButton>
                        <Stack direction="column" justifyContent="center" spacing={2} >
                            <Pagination
                                page={pageShow}
                                component="div"
                                hideNextButton={true}
                                hidePrevButton={true}
                                count={data?.getUnitPagination?.paginator?.totalPages}
                                variant="outlined"
                                color="primary"                                            
                                onChange={(event)=> setPage(parseInt(event?.target?.textContent))}
                            />
                        </Stack>
                        <IconButton disabled ={ data?.getUnitPagination?.paginator?.next === null ? true : false}
                            onClick={()=>setPage(data?.getUnitPagination?.paginator?.next )}
                                >
                                <ArrowForwardIosIcon sx={{":hover" : {color:"#0969A0"}}}/>
                        </IconButton>
                    </Stack>
            </Box>




            <AlertMessage alert={alert} setAlert={setAlert} message={message} checkMessage={checkMessage}/>
        </div>
    )
}