import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './inventoryreport.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import { GET_SALE_BYID } from "../../Schema/sales";
import { GET_PRODUCTION_REPORT } from "../../Schema/report";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import logo from "../../Assets/CCI_invoice.png";
import moment from "moment";

const ComponentToPrint = ({FromData , ToData}) => {

    // get Data
    const [dataReport,setDataReport] = React.useState([]);

    const { data , error } = useQuery(GET_PRODUCTION_REPORT , {
        variables: {
            fromDate:  FromData,
            toDate: ToData,
        },
        onCompleted: ({getProductionReport}) => {
            console.log(getProductionReport)
            setDataReport(getProductionReport)
        },
    })


    return (
        <Box  width="100%" height="800px" display="flex" flexDirection="column" justifyContent="center" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%" >
                <Grid container >
                    <Grid item xs={12}>
                        <Stack direction="row" display="flex" justifyContent="center" spacing={1} width="400px" sx={{position: "absolute" , zIndex: "1"}}>
                            <img src={logo} alt="logo" width="60%"/>
                        </Stack>
                        <Stack direction="row" spacing={2}>                            
                            <Box sx={{display: "flex" , justifyContent: "center" , width: "100%"}}>
                                <Stack direction="column" justifyContent="center">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold"}}>CCS CAMBODIA</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold"}}>Production Report Summary</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold"}}>
                                                From {moment(FromData).format("MMM DD, YYYY")} to {moment(ToData).format("MMM DD, YYYY")}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>                    

                                   
                    <Grid item xs={12} sx={{mt:5}}>
                        <Divider sx={{border: "1px solid #0969A0"}}/>
                    </Grid>
        
                    <Grid item xs={12} sx={{mt:6}}>
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
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">Batch Card Number</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item ID</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                align="center" width="10%"
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
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {moment(item?.date).format("DD/MMM/YY")}
                                                    </Typography>
                                                </TableCell>

                                                <TableCell 
                                                    className="cell-item" width="15%"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.customerName}
                                                    </Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text">
                                                        {moment(item?.date).format("YYMM")}-{item?.batchCardNumber}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,    padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.itemID}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.itemDescription}
                                                    </Typography>
                                                </TableCell> 

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.targetProduction}
                                                    </Typography>
                                                </TableCell> 

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.actualProduction}-{item?.unitUM}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        ${item?.costOfProduction.toFixed(2)}
                                                    </Typography>
                                                </TableCell>
                                                
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,  padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.workingHours}
                                                    </Typography>
                                                </TableCell>                                                  

                                            </TableRow>                                                                  
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

            <Grid container sx={{mb:5}}>
                <Grid item xs={12}>
                    <Divider sx={{border: "1px solid #0969A0"}}/>
                </Grid>
                {/* <Grid item xs={6} display="flex" justifyContent="center">                      
                    <Typography variant="body2">Received By:</Typography>
                    <Typography variant="body2">___________________________</Typography>                        
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">                      
                    <Typography variant="body2">Issued By:</Typography>
                    <Typography variant="body2">___________________________</Typography>  
                </Grid> */}
            </Grid>

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
            <Stack direction="row" >
                <Box sx={{flexGrow:1}}></Box>
                <ReactToPrint  
                    content={() => componentRef.current}         
                    trigger={() => (
                        <Stack direction="row" spacing={2} className="btn">           
                            <Button className="btn-add-style" startIcon={<LocalPrintshopOutlinedIcon />}>
                                <Typography className="style-add"> Print invoice </Typography>
                            </Button>               
                        </Stack> 
                    )}
                />
            </Stack>
            
            

        </div>
    )
}