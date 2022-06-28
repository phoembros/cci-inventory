import React from "react";
import "./purchaseproduct.scss";
import { useNavigate } from "react-router-dom";
import { Stack, Button, Box, Typography, Divider } from "@mui/material";
import { GET_PRODUCTION_WITH_PAGINATION } from "../../Schema/production";
import { useQuery } from "@apollo/client";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// icon priority
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


function PurchaseProduct() {
    const navigate = useNavigate();
    const row = [1, 2, 3, 4, 5];

    // get Production 
    const [productionData,setProductionData] = React.useState([]);  
    const [status,setStatus] = React.useState("")

    const { data , error , refetch } = useQuery(GET_PRODUCTION_WITH_PAGINATION , {
        variables: {
            productId: "",
            page: 1,
            limit: 4,
            keyword: "",
            pagination: true,
            status: status,
            priority: "",
            progress: "",
        },       
    })

    React.useEffect( () => {
        refetch()
    },[status])

    React.useEffect( () => {
        setStatus("pending");
    },[])

    React.useEffect( () => {
        if(data?.getProductionsPagination?.productions){
            setProductionData(data?.getProductionsPagination?.productions)
        }
    },[data?.getProductionsPagination?.productions])
    
  

  return (
    <Stack className="purchase" spacing={1} padding="2%">
      <Stack direction="row" spacing={2}>
        <Typography className="title"> Production </Typography>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction="row" justifyContent="center">
            <Typography className="title" variant="body2"> Pending: {productionData?.length} </Typography>
        </Stack>
      </Stack>
      <Divider />

      <Box display="flex" flexDirection="column" justifyContent="center" height="100%">

      {productionData?.map((row, index) => (
        <Stack
            key={index}
            direction="row"
            spacing={2}
            sx={{
                padding: 2,
                borderRadius: "10px",
                height: 58,
                backgroundColor: "white",
                bgcolor: index%2 === 0 ? "white" : "#d0e3ed"
            }}
        >
          <Stack direction="column"  justifyContent="center" sx={{ width: "200px" }} >
              <Typography> {row?.production?.productId?.productName}</Typography>
          </Stack>
          <Stack direction="column" justifyContent="center" sx={{ width: "120px" }}>

                {
                    row.priority === "urgent" ?                                        
                        <Stack direction="row" spacing={1}>
                            <NotificationsActiveIcon sx={{color:"red", width:"17px"}} />
                            <Stack direction="column" justifyContent="center">
                                <Typography variant="body2">Urgent</Typography>
                            </Stack>
                        </Stack>
                    : null
                }

                {
                    row.priority === "important" ?                                          
                        <Stack direction="row" spacing={1}>
                            <PriorityHighIcon sx={{color:"red", width:"17px"}} />
                            <Stack direction="column" justifyContent="center">
                                <Typography variant="body2">Important</Typography>
                            </Stack>
                        </Stack>    
                    : null                                        
                }

                {
                    row.priority === "medium" ? 
                        <Stack direction="row" spacing={1}>
                            <FiberManualRecordIcon sx={{color:"green", width:"17px"}} />
                            <Stack direction="column" justifyContent="center">
                                <Typography variant="body2">Medium</Typography>
                            </Stack>
                        </Stack>
                    : null                                        
                }

                {
                    row.priority === "low" ? 
                        <Stack direction="row" spacing={1}>
                            <ArrowDownwardIcon sx={{color:"blue", width:"17px"}} />
                            <Stack direction="column" justifyContent="center">
                                <Typography variant="body2">Low</Typography>
                            </Stack>
                        </Stack>
                    : null
                }
          </Stack>
          <Stack direction="column" justifyContent="center" sx={{ width: "50px" }}>
              <Typography sx={{fontWeight: "bold", color: "orange" }}> {row?.status} </Typography>
          </Stack>
          
          <Box sx={{ flexGrow: 1 }}></Box>
          <Stack direction="column" justifyContent="center">
              <Button sx={{textTransform: "none"}}>
                  <Stack direction="row" justifyContent="center" spacing={1}>
                      <RemoveRedEyeIcon sx={{ color: "blue" }} />
                      <Typography className="invoice-table-text">View</Typography>
                  </Stack>                  
              </Button>  
          </Stack>
        </Stack>
      ))}
        <Box sx={{ flexGrow: 1 }}></Box>
        <Stack direction="row" justifyContent="center" sx={{mt:2}}>
            <Button className="left-make" onClick={() => navigate("/production")}>
                View All
            </Button>
        </Stack>
        </Box>
    </Stack>
  );
}

export default PurchaseProduct;
