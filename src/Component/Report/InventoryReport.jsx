import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './inventoryreport.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import logo from "../../Assets/logo.svg";
import { GET_SALE_BYID } from "../../Schema/sales";
import { GET_INVENTORY_REPORT } from "../../Schema/report";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ComponentToPrint = ({ FromData , ToData } ) => {

    // get Data
    const [dataReport,setDataReport] = React.useState([]);

    const { data , error } = useQuery(GET_INVENTORY_REPORT , {
        variables: {
            fromDate:  FromData,
            toDate: ToData,
        },
        onCompleted: ({getInventoryStockReport}) => {
            setDataReport(getInventoryStockReport)
        },
    })

    
    return (
        <Box  width="100%" height="800px" display="flex" flexDirection="column" justifyContent="center" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%" >
                <Grid container>
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Stack direction="column" justifyContent="center">
                            <Stack direction="row" justifyContent="center">
                                <Typography variant="body1" sx={{fontWeight: "bold"}}>CCS CAMBODIA</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="center">
                                <Typography variant="body1" sx={{fontWeight: "bold"}}>Inventory Stock Status Report</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="center">
                                <Typography variant="body1" sx={{fontWeight: "bold"}}>From Sep 01, 2020 to Sep 30, 2020</Typography>
                            </Stack>
                        </Stack>
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
                                                className="cell-item" width="7%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item ID</Typography>
                                            </TableCell>
                                            <TableCell 
                                                className="cell-item" width="15%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item Description</Typography>
                                            </TableCell>         

                                            <TableCell 
                                                align="center" width="8%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">Qty on Hand</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                align="center" width="8%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Last Unit Cost</Typography>
                                            </TableCell>   
                                            <TableCell 
                                                align="center" width="8%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Stocking U/M</Typography>
                                            </TableCell>      
                                            <TableCell 
                                                align="center" width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">
                                                        Units Sold                                                         
                                                </Typography>
                                                <Typography variant="body2" className="text">                                                        
                                                        {moment(FromData).format("MM/DD/YY")}-{moment(ToData).format("MM/DD/YY")}
                                                </Typography>
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
                                                    className="cell-item" width="7%"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">{item?.itemId}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item" width="15%"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">{item?.itemDescription}</Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    align="center" width="8%"
                                                    className="cell-item"
                                                    sx={{border: "none" , padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text">{item?.qtyOnHand}</Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="8%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,   padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">${item?.unitCost}</Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    align="center" width="8%"
                                                    className="cell-item"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">{item?.unit}</Typography>
                                                </TableCell>      
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">{item?.qtySold}-{item?.unit}</Typography>
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

export default function InventoryReport({ FromData , ToData }) {

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