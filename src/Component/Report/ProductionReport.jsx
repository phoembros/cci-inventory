import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './inventoryreport.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import Unit from "./Unit";
import ReactToPrint from "react-to-print";
import { GET_SALE_BYID } from "../../Schema/sales";
import { GET_PRODUCTION_REPORT } from "../../Schema/report";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import logo from "../../Assets/CCI_invoice.png";
import moment from "moment";

const ComponentToPrint = ({FromData , ToData}) => {

    console.log(
        FromData , ToData
    )
    // get Data
    const [dataReport,setDataReport] = React.useState([]);

    const { data , error ,refetch } = useQuery(GET_PRODUCTION_REPORT , {
        variables: {
            fromDate:  FromData,
            toDate: ToData,
        },
        onCompleted: ({getProductionReport}) => {
            console.log(getProductionReport)
            setDataReport(getProductionReport)
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    React.useEffect( () => {
        refetch()
    },[])

    return (
        <Box  width="100%" height="fit-content" display="flex" flexDirection="column" justifyContent="center" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%">
                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction="row" display="flex"  spacing={1} width="400px" sx={{position: "absolute" , zIndex: "1"}}>
                            <img src={logo} alt="logo" width="55%" style={{marginLeft:"15px"}}/>
                        </Stack>
                        <Stack direction="row" spacing={2}>                            
                            <Box sx={{display: "flex" , justifyContent: "center" , width: "100%"}}>
                                <Stack direction="column" justifyContent="center">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black" }}>CCS CAMBODIA</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black" }}>Production Report Summary</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black" }}>
                                                From {moment(FromData).format("MMM DD, YYYY")} to {moment(ToData).format("MMM DD, YYYY")}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>                    
                                   
                    {/* <Grid item xs={12} sx={{mt:5}}>
                        <Divider sx={{border: "1px solid #0969A0"}}/>
                    </Grid> */}
        
                    <Grid item xs={12} sx={{mt:5}}>                        
                        <Box width="100%">                           
                                <table 
                                    className="table" 
                                    style={{
                                        width: "100%" ,                        
                                        whiteSpace: "nowrap" , 
                                        borderCollapse: "collapse",
                                        borderSpacing: "0px 8px",
                                    }}
                                >
                                
                                    <tr 
                                        className="header-row" 
                                        style={{ backgroundColor: "#d0e3ed" }}
                                    >
                                        <th  
                                            className="cell-item" width="8%"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Date</Typography>
                                        </th>

                                        <th 
                                            className="cell-item" width="15%"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Customer Name</Typography>
                                        </th>         

                                        <th 
                                            width="10%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        > 
                                            <Typography variant="body2" className="text">Batch Card Number</Typography>
                                        </th>  

                                        <th 
                                            width="10%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  ,   padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Item ID</Typography>
                                        </th>  

                                        <th 
                                            width="10%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Item Description</Typography>
                                        </th> 

                                        <th 
                                            align="center" width="10%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Target production</Typography>
                                        </th> 

                                        <th 
                                            align="center" width="15%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Actual Production</Typography>
                                        </th>

                                        <th 
                                            align="center" width="10%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Cost of Production</Typography>
                                        </th>

                                        <th 
                                            align="center" width="10%"
                                            className="cell-item"
                                            style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                        >
                                            <Typography variant="body2" className="text">Working Hours</Typography>
                                        </th> 
                                                                                            
                                    </tr>                                                                
                                          
                        {
                            dataReport?.map( (item,index) => (                             
                                <>
                                        <tr className="body-row">

                                            <td  
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {moment(item?.date).format("DD/MMM/YY")}
                                                </Typography>
                                            </td>

                                            <td 
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {item?.customerName}
                                                </Typography>
                                            </td>         

                                            <td                                                    
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            > 
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {moment(item?.date).format("YYMM")}-{item?.batchCardNumber}
                                                </Typography>
                                            </td>  

                                            <td                                                   
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,    padding: "8px"}}
                                            >
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {item?.itemID}
                                                </Typography>
                                            </td>  

                                            <td                                                     
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {item?.itemDescription}
                                                </Typography>
                                            </td> 

                                            <td 
                                                align="center" 
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >
                                                <Stack direction="row" justifyContent="center">
                                                    <Stack direction="row" justifyContent="center" width="100%" spacing={1}>
                                                        <Box width="50%" display="flex" justifyContent="right">
                                                            <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                                {item?.targetProduction}
                                                            </Typography>
                                                        </Box>
                                                        <Box  width="50%" display="flex" justifyContent="left">
                                                            <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                                {item?.unitVM}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Stack>
                                            </td> 

                                            <td 
                                                align="center"
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {/* {item?.actualProduction}-{item?.unitUM} */}
                                                </Typography>
                                            </td>
                                            <td 
                                                align="center" 
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >

                                                <Stack direction="row" justifyContent="center">
                                                    <Stack direction="row" justifyContent="center" width="100%" spacing={1}>
                                                        <Box width="50%" display="flex" justifyContent="left">
                                                            <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                                $
                                                            </Typography>
                                                        </Box>

                                                        <Box  width="50%" display="flex" justifyContent="right">
                                                            <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                                {item?.costOfProduction?.toFixed(3)}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Stack>                                                   
                                            </td>
                                            
                                            <td 
                                                align="center"
                                                className="cell-item"
                                                style={{border: "1px solid #f4f4f4"  ,color: "#0969A0" ,  padding: "8px"}}
                                            >
                                                <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                    {item?.workingHours}
                                                </Typography>
                                            </td>                                                  

                                        </tr>    

                                        {
                                            item?.actualProduction?.map( (row,index) => (
                                            <>
                                            <tr key={index} className="body-row">

                                                <td  
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {/* {moment(item?.date).format("DD/MMM/YY")} */}
                                                    </Typography>
                                                </td>

                                                <td 
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {item?.customerName} */}
                                                    </Typography>
                                                </td>         

                                                <td 
                                                    align="center"
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {moment(item?.date).format("YYMM")}-{item?.batchCardNumber} */}
                                                    </Typography>
                                                </td>  

                                                <td 
                                                    align="center"
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,    padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {item?.itemID} */}
                                                    </Typography>
                                                </td>  

                                                <td                                                    
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {row?.productGroupId?.name}
                                                    </Typography>
                                                </td> 

                                                <td 
                                                    align="center"
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        
                                                    </Typography>
                                                </td> 

                                                <td 
                                                    align="center"
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >
                                                    
                                                        <Stack direction="row" justifyContent="center" spacing={1}>
                                                            <Box  width="60%" display="flex" justifyContent="right">
                                                                <Typography variant="body2" className="text" sx={{color:"black"}}>
                                                                    {(row?.qtyOfUM)?.toFixed(4)} 
                                                                </Typography>
                                                            </Box>
                                                            <Typography variant="body2">-</Typography>
                                                            <Box  width="40%" display="flex" justifyContent="left">
                                                                <Typography variant="body2" className="text" sx={{color:"black"}}>
                                                                    <Unit unitId={row?.productGroupId?.unit?._id}/>
                                                                </Typography>
                                                            </Box>
                                                        </Stack>                                                       
                                                   
                                                </td>

                                                <td 
                                                    align="center"
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >

                                                    <Stack direction="row" justifyContent="center">
                                                        <Stack direction="row" justifyContent="center" width="100%" spacing={1}>
                                                            <Box width="50%" display="flex" justifyContent="left">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    $
                                                                </Typography>
                                                            </Box>

                                                            <Box  width="50%" display="flex" justifyContent="right">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    {(row?.qtyOfUM*row?.unitQtyGroup*(item?.costOfProduction/item?.targetProduction))?.toFixed(3)}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Stack>                                                   
                                                </td>
                                                
                                                <td 
                                                    align="center"
                                                    className="cell-item"
                                                    style={{border: "1px solid #f4f4f4"  ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>                                                        
                                                    </Typography>
                                                </td>                                                  

                                            </tr>  
                                            </>
                                            ))
                                        }
                                                            
                                </>    
                            ))
                        }   
                                 </table>                           
                            
                        </Box>              
                    </Grid>

                                        
                    
                </Grid>
            </Box>
            
            <Box sx={{flexGrow:1}}/>

            {/* <Grid container sx={{mb:5}}>
                <Grid item xs={12}>
                    <Divider sx={{border: "1px solid #0969A0" , mt:5}}/>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">                      
                    <Typography variant="body2">Received By:</Typography>
                    <Typography variant="body2">___________________________</Typography>                        
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">                      
                    <Typography variant="body2">Issued By:</Typography>
                    <Typography variant="body2">___________________________</Typography>  
                </Grid>
            </Grid> */}

        </Box>
    )
}

export default function ProductionReport({FromData , ToData}) {

    const componentRef = React.useRef(null);
    
    return (
        <div className="inventory-report-pages">
            
            <Box className="container">
                {/* print */}
                <Box
                    ref={componentRef}
                    component="span"
                    sx={{
                        width:"100%",
                        display: "flex",
                        justifyContent: "center",                            
                    }}
                >
                    <ComponentToPrint 
                        FromData={FromData}
                        ToData={ToData}
                    />

                </Box>                                
            </Box>
            <Stack direction="row" sx={{mt:2}}>
                <Box sx={{flexGrow:1}}></Box>
                <ReactToPrint 
                    pageStyle={'@media print { body { -webkit-print-color-adjust: exact; } @page { margin: 12mm 5mm 12mm 5mm  !important; }}'}
                    content={() => componentRef.current}         
                    trigger={() => (
                        <Stack direction="row" spacing={2} className="btn">           
                            <Button className="btn-add-style" startIcon={<LocalPrintshopOutlinedIcon />}>
                                <Typography className="style-add"> Print Report </Typography>
                            </Button>               
                        </Stack> 
                    )}
                />
            </Stack>
            
            

        </div>
    )
}