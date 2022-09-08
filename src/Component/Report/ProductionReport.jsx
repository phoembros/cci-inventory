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
                        <Stack direction="row" display="flex" justifyContent="center" spacing={1} width="400px" sx={{position: "absolute" , zIndex: "1"}}>
                            <img src={logo} alt="logo" width="60%" style={{marginLeft:"15px"}}/>
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
                            <TableContainer className="table">
                                <Table sx={{ width:"100%" }}>
                                    <TableBody className='header'>
                                        <TableRow 
                                            className="header-row" 
                                            sx={{backgroundColor: "#d0e3ed"}}
                                        >
                                            <TableCell  
                                                className="cell-item" width="8%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Date</Typography>
                                            </TableCell>

                                            <TableCell 
                                                className="cell-item" width="15%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Customer Name</Typography>
                                            </TableCell>         

                                            <TableCell 
                                                width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">Batch Card Number</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item ID</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item Description</Typography>
                                            </TableCell> 

                                            <TableCell 
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Target production</Typography>
                                            </TableCell> 

                                            <TableCell 
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Actual Production</Typography>
                                            </TableCell>

                                            <TableCell 
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Cost of Production</Typography>
                                            </TableCell>

                                            <TableCell 
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Working Hours</Typography>
                                            </TableCell> 
                                                                                             
                                        </TableRow>                                                                  
                                    </TableBody>                      
                                </Table>
                            </TableContainer>

                        {
                            dataReport?.map( (item,index) => (
                                <TableContainer key={index} className="table">
                                    <Table sx={{ width:"100%" }}>
                                        <TableBody className='body'>
                                            <TableRow className="body-row">

                                                <TableCell  
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {moment(item?.date).format("DD/MMM/YY")}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell 
                                                    className="cell-item" width="15%"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {item?.customerName}
                                                    </Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {moment(item?.date).format("YYMM")}-{item?.batchCardNumber}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,    padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {item?.itemID}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {item?.itemDescription}
                                                    </Typography>
                                                </TableCell> 

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {item?.targetProduction}-{item?.unitVM}
                                                    </Typography>
                                                </TableCell> 

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {/* {item?.actualProduction}-{item?.unitUM} */}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        ${item?.costOfProduction?.toFixed(3)}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,color: "#0969A0" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>
                                                        {item?.workingHours}
                                                    </Typography>
                                                </TableCell>                                                  

                                            </TableRow>    

                                        {
                                            item?.actualProduction?.map( (row,index) => (

                                            <TableRow key={index} className="body-row">

                                                <TableCell  
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {/* {moment(item?.date).format("DD/MMM/YY")} */}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell 
                                                    className="cell-item" width="15%"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {item?.customerName} */}
                                                    </Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {moment(item?.date).format("YYMM")}-{item?.batchCardNumber} */}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,    padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {item?.itemID} */}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {row?.productGroupId?.name}
                                                    </Typography>
                                                </TableCell> 

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        ---
                                                    </Typography>
                                                </TableCell> 

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color:"black"}}>
                                                        <Stack direction="row" justifyContent="center">
                                                            <Box  width="50%" display="flex" justifyContent="right">
                                                                <Typography variant="body2">{(row?.qtyOfUM)?.toFixed(4)} </Typography>
                                                            </Box>
                                                            <Typography variant="body2">-</Typography>
                                                            <Box  width="50%" display="flex" justifyContent="left">
                                                                <Typography variant="body2"><Unit unitId={row?.productGroupId?.unit?._id}/></Typography>
                                                            </Box>
                                                        </Stack>                                                        
                                                    </Typography>
                                                </TableCell>

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        ${(row?.qtyOfUM*row?.unitQtyGroup*(item?.costOfProduction/item?.targetProduction))?.toFixed(3)}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {/* {item?.workingHours} */}
                                                    </Typography>
                                                </TableCell>                                                  

                                            </TableRow>  

                                            ))
                                        }

                                        </TableBody>                      
                                    </Table>
                                </TableContainer>
                            ))
                        }   
                                 
                            
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
                    pageStyle={'@media print { body { -webkit-print-color-adjust: exact; } @page { size: landscape; margin: 12mm 5mm 10mm 5mm  !important; }}'} 
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