import React from "react";
import "./tableRawmaterail.scss";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Box, Typography, Divider, IconButton, TableContainer, Table, TableBody, TableRow, TableCell, Paper } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { GET_SALE_WITH_PAGINATION } from "../../Schema/sales";
import { useQuery } from "@apollo/client";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import moment from "moment"
import { GET_PURCHASE_RAW_MATERAIL_PAGINATION } from "../../Schema/starageroom";
import DescriptionIcon from '@mui/icons-material/Description';
import PermissionContent from "../Permission/PermissionContent";
import LoadingPage from "../Permission/LoadingPage";


function TableRawMaterail({dataUserLogines}) {

  const [loading,setLoading] = React.useState(true);

  const navigate = useNavigate();
  
  const [dataPurchaseRawMaterial,setDataPurchaseRawMaterial] = React.useState([]);

  const [paymentStatus,setPaymentStatus] = React.useState([])

  const { data: dataPurchaseRaw , refetch : refetchPurchase } = useQuery(GET_PURCHASE_RAW_MATERAIL_PAGINATION, {
      variables: {
          storageId: "",       
          keyword: "",
          pagination: false,
          priority: "",
          status: "",     
          paymentStatus: paymentStatus,        
      },
      onCompleted: ({getPurchaseRawMaterialPagination}) => {
          // console.log(getPurchaseRawMaterialPagination?.purchaseRawMaterial,"data");    
          setDataPurchaseRawMaterial(getPurchaseRawMaterialPagination?.purchaseRawMaterial)        
      },
      onError: (error) => {
          console.log(error.message)            
      }
  });

  React.useEffect( () => {
    refetchPurchase();
  },[paymentStatus])

  React.useEffect( () => {
    setPaymentStatus(["unpaid" , "owe"]);      
  },[])

  // console.log(dataPurchaseRawMaterial)


  return (
    <Stack className="invoice-table" spacing={1} padding="15px">
      <Stack direction="row" spacing={2}>
        <Typography className="title-table"> Purchase Raw Materail </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction="row" justifyContent="center">
            <Typography className="title-table" variant="body2"> Unpaid&Owe: {dataPurchaseRawMaterial?.length} </Typography>
        </Stack>
      </Stack>
      <Divider />

      {
          dataUserLogines?.getuserLogin?.role_and_permission?.permissions?.getPurchaseRawMaterialPagination ?
          
            <Box display="flex" flexDirection="column" justifyContent="center">
                {
                  dataPurchaseRawMaterial?.length === 0 ? 
                    <Stack direction="row" justifyContent="center" height={320}>
                        <Stack direction="column" justifyContent="center">
                            <IconButton>
                                <DescriptionIcon sx={{color: "#d0e3ed"}}/>
                            </IconButton>
                            <Typography variant="body2" sx={{color: "#d0e3ed"}}>No Data</Typography>
                        </Stack>
                    </Stack>
                  :
                    null
                }

                <Box className="container">
                    <TableContainer className="table-container">
                        <Table className="table" aria-label="simple table">
                          {dataPurchaseRawMaterial?.map((row, index) => (
                              <TableBody key={index} component={Paper} className="body">
                                <TableRow className={index%2 === 0 ? "body-row" : "body-odd"}>
                                  <TableCell                    
                                      className="body-title"
                                      width="3%"
                                  >
                                      <Stack direction="row">
                                          <DescriptionOutlinedIcon className="stack-map-icons" />
                                          <Typography className="invoice-table-text">
                                              {moment(row?.createdAt).format('YYMM')}-{row?.purchaseId.padStart(2, '0')}
                                          </Typography>
                                      </Stack>
                                  </TableCell>
                                  <TableCell
                                    className="body-title"
                                    width="20%"
                                  >
                                    <Typography className="invoice-table-text">
                                        By: {row?.purchaseBy?.first_name+ " "+row?.purchaseBy?.last_name}
                                    </Typography>
                                  </TableCell>
                                  <TableCell
                                    className="body-title"
                                    width="30%"
                                  >
                                    <Typography className="invoice-table-text">
                                      Total Payment: ${row?.totalPayment?.toFixed(2)}
                                    </Typography>
                                  </TableCell>
                                  <TableCell 
                                    className="body-title"
                                    align="right"
                                    width="15%"
                                  >
                                    <Button className="btn-unpaid">
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Stack direction="column" justifyContent="center">
                                              <Stack direction="row">
                                                <Box className={`text-${row?.paymentStatus}-point`}></Box>
                                                <Typography className={`text-${row?.paymentStatus}`}>{row?.paymentStatus}</Typography>
                                              </Stack>
                                            </Stack>
                                        </Stack>
                                    </Button>
                                  </TableCell>     

                                  <TableCell 
                                    className="body-title"
                                    align="right"
                                    width="15%"
                                  >
                                    <Button className="btn-unpaid" 
                                        onClick={ () => navigate(`/storage-room/purchase?storageId=${row?.storageRoom?._id}&name=${row?.storageRoom?.name}`)}
                                    >
                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                            <Stack direction="column" justifyContent="center">
                                              <Stack direction="row">                                                 
                                                <Typography className="text-pay">GoPay</Typography>
                                              </Stack>
                                            </Stack>
                                        </Stack>
                                    </Button>
                                  </TableCell>


                                </TableRow>
                              </TableBody>
                            ))} 
                        </Table>
                      
                    </TableContainer>
                </Box>      
            </Box>
          :
            <>
              { loading ?
                  <LoadingPage />
                :
                  <PermissionContent />
              }
            </>            
               
      }
        
    </Stack>
  );
}

export default TableRawMaterail;
