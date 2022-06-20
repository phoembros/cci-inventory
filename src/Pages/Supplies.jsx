import * as React from "react";
import { Box ,Paper, Button, Stack ,IconButton,Typography, Modal, Pagination} from "@mui/material";
import {Table,  TableBody,TableCell, TableContainer, TableHead , TableRow} from '@mui/material';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from '@mui/icons-material/Add';
import './supplies.scss';
import SuppliesAction from '../Component/Suppliers/SuppliesAction';
import SuppliesAdd from '../Component/Suppliers/SuppliesAdd';
import ViewSupplies from "../Component/Suppliers/ViewSupplies";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
// query supplies
import {GET_SUPPLIERS_BY_PAGINATION} from "../Schema/supplies";
import {useQuery} from "@apollo/client";

export default function Supplies() {

    // create
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    //view 
    const [openView, setOpenView] = React.useState(false);
    const handleOpenView = () => setOpenView(true);
    const handleCloseView = () => setOpenView(false);

    //Alert message
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [checkMessage, setCheckMessage]= React.useState('')

    //each data supplyies
    const [rowSupplies,setRowSupplies] = React.useState([]);

    //pagination 
    const [pageShow, setPageShow] = React.useState()
    const [page, setPage] = React.useState(1)
    const [limit, setLimit] = React.useState(8)
    const [keyword, setKeyword] = React.useState('')

    //usequery
    const {data, refetch } = useQuery(GET_SUPPLIERS_BY_PAGINATION, {
      variables: {
        page: page,
        limit:limit,
        keyword: keyword,
        pagination: true,
      },
    });

    React.useEffect(()=>{
        refetch()
        setPageShow(page)
    }, [keyword, page])

    return (
      <div className="supplies-page">
        <Stack direction="row" spacing={2}>
          <Box className="slash" />
          <Stack direction="column" justifyContent="center">
            <Typography className="color">Supplies</Typography>
          </Stack>
          <Box sx={{ flexGrow: 1 }} />
          <Stack
            direction="row"
            className="stack-btn"
            justifyContent="right"
            spacing={1}
          >
            <Button
              onClick={handleOpen}
              startIcon={<AddIcon />}
              className="btn-add"
            >
              <Typography className="btn-text">Add</Typography>
            </Button>
            <Modal open={open}>
              <SuppliesAdd
                handleClose={handleClose}
                alert={alert}
                message={message}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                setRefetch={refetch}
              />
            </Modal>
          </Stack>
        </Stack>

        <Box className="container">
          <TableContainer>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow className="header-row">
                  <TableCell className="header-title" colSpan={2}>
                    Name
                  </TableCell>
                  <TableCell className="header-title">Email</TableCell>
                  <TableCell className="header-title">Phone Number</TableCell>
                  <TableCell className="header-title">Address</TableCell>
                  <TableCell
                    className="header-title"
                    align="center"
                  ></TableCell>
                </TableRow>
              </TableHead>
              {data?.getSuppliersPagination?.suppliers?.map((item, index) => (
                <TableBody
                      component={Paper}
                      className={index % 2 === 0 ? "body" : "body-odd"}
                    >
                  <TableRow className="body-row">
                    <TableCell onClick={() => { handleOpenView();setRowSupplies(item);}} className="body-title" component="th"scope="row"width="3%">
                      {index + 1}-{" "}
                    </TableCell>
                    <TableCell onClick={() => { handleOpenView();setRowSupplies(item);}} className="body-title" component="th"scope="row" width="25%">{item?.name}</TableCell>
                    <TableCell onClick={() => { handleOpenView();setRowSupplies(item);}}className="body-title" >{item?.email}</TableCell>
                    <TableCell onClick={() => { handleOpenView();setRowSupplies(item);}}className="body-title" > {item?.phoneNumber}</TableCell>
                    <TableCell onClick={() => { handleOpenView();setRowSupplies(item);}}className="body-title" >{item?.address}</TableCell>
                    
                    <TableCell className="body-title" align="right">
                        <SuppliesAction
                            setRefetch={refetch}
                            newData={item}
                            alert={alert}
                            message={message}
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
        </Box>
        
        <Stack direction="row" justifyContent="right" spacing={2}>
                <IconButton
                    disabled={ data?.getSuppliersPagination?.paginator?.prev === null ? true: false}
                    onClick={() =>setPage(data?.getSuppliersPagination?.paginator?.prev)}
                >
                  <ArrowBackIosNewIcon sx={{":hover" :{color:'primary'}}}/>
                </IconButton>
                <Stack direction="column" justifyContent="center">
                  <Pagination
                    page={pageShow}
                    hideNextButton="true"
                    hidePrevButton="true"
                    variant="outlined"
                    color="primary"
                    count={data?.getSuppliersPagination?.paginator?.totalPages}
                    onChange={(event) =>
                      setPage(parseInt(event?.target?.textContent))
                    }
                  />
                </Stack>
                <IconButton
                      disabled={data?.getSuppliersPagination?.paginator?.next === null ? true: false}
                      onClick={() =>setPage(data?.getSuppliersPagination?.paginator?.next)}
                >
                  <ArrowForwardIosIcon sx={{":hover" :{color:'primary'}}}/>
                </IconButton>
            </Stack>
        <Modal open={openView}>
          <ViewSupplies
            handleCloseView={handleCloseView}
            rowSupplies={rowSupplies}
          />
        </Modal>
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