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


export default function Customer() {

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
    
    //view
    const [DetailsData, setDetailsData] = React.useState([])

    const { data, refetch } = useQuery(GET_CUSTOMER_PAGINATION, {
      variables: {
        page: page,
        limit: limit,
        keyword: keyword,
        pagination: true,
      },
    });

    React.useEffect(()=>{
        refetch();
        setShowPage(page);
    },[page, keyword])

    return (
      <div className="customer-setup-page">
        <Stack direction="row" spacing={2}>
          <Box className="slash" />
          <Stack direction="column" justifyContent="center">
            <Stack direction="row" spacing={1}>
              <Link to="/sales" style={{ textDecoration: "none" }}>
                <Typography className="color">Sales</Typography>
              </Link>
              <Typography className="color">/ Customer Setup</Typography>
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
                placeholder="Search Dashboard"
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

            <Button
              onClick={handleOpen}
              startIcon={<AddIcon />}
              className="btn-add"
            >
              <Typography className="btn-text">Add</Typography>
            </Button>
            <Modal open={open}>
              <CustomerSetup
                setRefetch={refetch}
                setAlert={setAlert}
                setMessage={setMessage}
                setCheckMessage={setCheckMessage}
                handleClose={handleClose}
              />
            </Modal>
          </Stack>
        </Stack>

        <Box className="container">
          <TableContainer>
            <Table className="table" aria-label="simple table">
              <TableHead>
                <TableRow className="header-row">
                  <TableCell className="header-title">Name</TableCell>
                  <TableCell className="header-title">Phone Number</TableCell>
                  <TableCell className="header-title">Email</TableCell>
                  <TableCell className="header-title">Address</TableCell>
                  <TableCell
                    className="header-title"
                    align="center"
                  ></TableCell>
                </TableRow>
              </TableHead>
              {data?.getCustomerPagination?.customers.map((row, index) => (
                <TableBody
                  key={index}
                  component={Paper}
                  className={index % 2 === 0 ? "body" : "body-odd"}
                >
                  <TableRow className="body-row">
                    <TableCell
                      onClick={()=>{handleOpenView(); setDetailsData(row)}}
                      className="body-title"
                      component="th"
                      width="30%"
                    >
                      {index + 1}- {row.name}
                    </TableCell>
                    <TableCell
                      onClick={()=>{handleOpenView(); setDetailsData(row)}}
                      className="body-title"
                      component="th"
                      scope="row"
                      width="25%"
                    >
                     {row.phoneNumber}
                    </TableCell>
                    <TableCell
                      onClick={()=>{handleOpenView(); setDetailsData(row)}}
                      className="body-title"
                      component="th"
                      scope="row"
                      width="25%"
                    >
                      {row.email}
                    </TableCell>
                    <TableCell
                      onClick={()=>{handleOpenView(); setDetailsData(row)}}
                      className="body-title"
                      width="45%"
                    >
                      {row.address}
                    </TableCell>
                    <TableCell className="body-title" align="right">
                      <CustomerAction 
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

        <Modal open={openView}>
          <ViewCustomer handleCloseView={handleCloseView} DetailsData={DetailsData} />
        </Modal>

        <AlertMessage
          alert={alert}
          checkMessage={checkMessage}
          message={message}
          setAlert={setAlert}
        />
      </div>
    );
}
