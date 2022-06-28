import * as React from 'react';
import './tableuser.scss';
import Pagination from '@mui/material/Pagination';
import {Stack, Avatar, Typography, Box,  Modal, IconButton} from '@mui/material';
import {Table,TableBody, TableCell,TableContainer,TableHead,TableRow, } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import moment from "moment";
import CircularProgress from "@mui/material/CircularProgress";
//useQuery 
import {GET_USER_PAGINATION} from "../../Schema/user";
import {useQuery} from "@apollo/client";

//Components
import UserAction from './UserAction';
import ViewUser from './ViewUser';

function TableUser({
  setAlert,
  setMessage,
  checkMessage,
  setCheckMessage,
  loading,
  setLoading,
}) {

  const [openView, setOpenView] = React.useState(false);
  const handleOpenView = () => setOpenView(true);
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
          pagination: true
      },
      onCompleted: () => {
          setLoading(false)
      }
  });
    // console.log(data?.getUsersPagination?.users, 'user')
    // console.log(data?.getUsersPagination?.paginator?.totalPages, 'a')

    React.useEffect(()=>{
        refetch()
        setPageShow(page)
    }, [page,keyword])

    const [UserData, setUserData] = React.useState([]);

    if(loading) {
      return(
          <Box  sx={{ display: "flex", flexDirection: "column", alignItems: "center" , mt:10}} >
              <CircularProgress />
          </Box>
      );
    }

    return (
      <Box  className="container-users">
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
            
              {data?.getUsersPagination?.users.map((row, index) => (
                <TableBody className='body'>
                    <TableRow key={index} className='body-row'>
                      <TableCell className='body-title' width="5%"> {index+1}- </TableCell>
                      <TableCell onClick={handleOpenView} className='body-title'>
                        <Stack direction="row"  spacing={2}> 
                          <Avatar src="static/images/avatar/2.jpg"  />
                          <Stack direction="column" justifyContent="center">
                              <Typography>{row.first_name+" "+row.last_name}</Typography>
                          </Stack>                    
                        </Stack>
                      </TableCell>
                      <TableCell onClick={()=>{ handleOpenView(); setUserData(row)}} className='body-title' width="20%">{row.gender}</TableCell>
                      <TableCell onClick={()=>{ handleOpenView(); setUserData(row)}} className='body-title' width="20%">{moment(row.birthOfDate).format('DD/MM/YYYY')}</TableCell>
                      <TableCell onClick={()=>{ handleOpenView(); setUserData(row)}} className='body-title' width="20%">{row.email}</TableCell>
                      <TableCell onClick={()=>{ handleOpenView(); setUserData(row)}} className='body-title' width="30%">{row.phone_umber}</TableCell>

                      <TableCell className='body-title'>
                        <UserAction
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
                    hideNextButton="true"
                    hidePrevButton="true"
                    count={data?.getUsersPagination?.paginator?.totalPages}
                    variant="outlined"
                    color="primary"
                    shape="circle"
                    onChange={(event)=> setPage(parseInt(event?.target?.textContent))}
                />
              </Stack>
              <IconButton disabled ={ data?.getUsersPagination?.paginator?.next === null ? true : false}
                  onClick={()=>setPage(data?.getUsersPagination?.paginator?.next )}
                    >
                    <ArrowForwardIosIcon sx={{":hover" : {color:"#0969A0"}}}/>
              </IconButton>
          </Stack>     

        <Modal open={openView} >
              <ViewUser handleCloseView={handleCloseView} UserData={UserData}/>
        </Modal>

      </Box>
    );
}

export default TableUser;

