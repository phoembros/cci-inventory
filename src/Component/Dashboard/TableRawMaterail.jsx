import React from "react";
import "./tableRawmaterail.scss";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Box, Typography, Divider } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { GET_SALE_WITH_PAGINATION } from "../../Schema/sales";
import { useQuery } from "@apollo/client";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import moment from "moment"

function TableRawMaterail() {
  const navigate = useNavigate();
  
  // Get Data Sell  
  const [dataSale,setDataSale] = React.useState([]);
  const [status,setStatus] = React.useState("");
  
  const { data , error , refetch } = useQuery(GET_SALE_WITH_PAGINATION , {
    variables: {
        page: 1,
        limit: 5,
        keyword: "",
        pagination: true,
        status: status,
    },    
  })

  React.useEffect( () => {
      refetch();
  },[status])

  React.useEffect( () => {
      setStatus("unpaid");      
  },[])

  React.useEffect( () => {
      if(data?.getSaleWithPagination?.sales)  {
          console.log(data?.getSaleWithPagination?.sales)
          setDataSale(data?.getSaleWithPagination?.sales)
      }
  },[data?.getSaleWithPagination?.sales])
  

  return (
    <Stack className="invoice-table" spacing={1} padding="2%">
      <Stack direction="row" spacing={2}>
        <Typography className="title-table"> Purchase Raw Materail </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction="row" justifyContent="center">
            <Typography className="title-table" variant="body2"> Unpaid: {dataSale?.length} </Typography>
        </Stack>
      </Stack>
      <Divider />
      <Box display="flex" flexDirection="column" justifyContent="center" height="100%">

      {dataSale?.map((row, index) => (
          <Stack direction="row" spacing={1} className="stack-map" sx={{bgcolor: index%2 === 0 ? "white" : "#d0e3ed"}}>
            <Stack
              key={index}
              direction="column"
              justifyContent="center"
              sx={{ width: "200px" }}
            >
              <Stack direction="row">
                <DescriptionOutlinedIcon className="stack-map-icons" />
                <Typography className="invoice-table-text">
                  CCI{moment(row?.createdAt).format("YYYY")}-{row?.invoiceNo.padStart(4, '0')}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              justifyContent="center"
              sx={{ width: "200px" }}
            >
              <Typography className="invoice-table-text">
                {row?.billTo?.customerId?.name}
              </Typography>
            </Stack>

            <Stack
              direction="column"
              justifyContent="center"
              sx={{ width: "90px" }}
            >
              <Typography className="invoice-table-text">
                ${row?.totalAmount?.toFixed(2)}
              </Typography>
            </Stack>

            <Stack direction="column" justifyContent="center">
              <Button className="btn-unpaid">
                <Stack direction="row" justifyContent="center" spacing={1}>
                  <Stack direction="column" justifyContent="center">
                    <Stack direction="row">
                      <Box className="text-unpaid-point"></Box>
                      <Typography className="text-unpaid">Unpaid</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Button>
            </Stack>
            <Box sx={{ flexGrow: 1 }}></Box>
            <Stack direction="column" justifyContent="center">
              <Button onClick={() => navigate(`/sales/print?invoice=${row?._id}`)} sx={{textTransform: "none"}}>
                <Stack direction="row" justifyContent="center" spacing={1} >
                    <LocalPrintshopOutlinedIcon sx={{ color: "blue" }} />
                    <Typography className="invoice-table-text">Print</Typography>
                </Stack>                  
              </Button>              
            </Stack>
          </Stack>
      ))}

        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction="row" justifyContent="center" sx={{mt:2}}>
            <Button className="btn-view" onClick={() => navigate("/sales")}>
              View All
            </Button>
        </Stack>
        </Box>
    </Stack>
  );
}

export default TableRawMaterail;
