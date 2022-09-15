import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './inventoryreport.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import logo from "../../Assets/CCI_invoice.png";
import { GET_SALE_BYID } from "../../Schema/sales";
import { GET_INVENTORY_REPORT } from "../../Schema/report";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ComponentToPrint = ({ FromData , ToData } ) => {

    // get Data
    const [dataReport,setDataReport] = React.useState([]);

    const { data , error , refetch } = useQuery(GET_INVENTORY_REPORT , {
        variables: {
            fromDate:  FromData,
            toDate: ToData,
        },
        onCompleted: ({getInventoryStockReport}) => {
            // console.log(getInventoryStockReport)
            setDataReport(getInventoryStockReport)
        },
        onError: (error) => {
            console.log(error.message)
        }
    })

    // console.log(dataReport)
    React.useEffect( () => {
        refetch()
    },[])
    
    return (
        <Box  width="100%" height="fit-content" display="flex" flexDirection="column" justifyContent="center" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%" >
                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction="row" display="flex" spacing={1} width="350px" sx={{position: "absolute" , zIndex: "1"}}>
                            <img src={logo} alt="logo" width="60%"/>
                        </Stack>
                        <Stack direction="row" spacing={2}>                            
                            <Box sx={{display: "flex" , justifyContent: "center" , width: "100%"}}>
                                <Stack direction="column" justifyContent="center">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black"}}>CCS CAMBODIA</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black"}}>Inventory Report Summary</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black"}}>
                                            From {moment(FromData).format("MMM DD, YYYY")} to {moment(ToData).format("MMM DD, YYYY")}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Box>
                        </Stack>
                    </Grid>                    

                       
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
                                                className="cell-item" width="10%"
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
                                                align="center" width="15%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">Qty on Hand</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                align="center" width="20%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Unit Price</Typography>
                                            </TableCell>   
                                            {/* <TableCell 
                                                align="center" width="8%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Stocking U/M</Typography>
                                            </TableCell>       */}
                                            <TableCell 
                                                align="center" width="15%"
                                                className="cell-item"
                                                sx={{ border: "none" , color: "#0969A0"  , padding: "8px" }}
                                            >
                                                <Typography variant="body2" className="text">
                                                        Units Sold                                                         
                                                </Typography>
                                                {/* <Typography variant="body2" className="text">                                                        
                                                        {moment(FromData).format("MM/DD/YY")}-{moment(ToData).format("MM/DD/YY")}
                                                </Typography> */}
                                            </TableCell> 
                                                                                             
                                        </TableRow>                                                                  
                                    </TableBody>                      
                                </Table>
                            </TableContainer>

                                        
                        {
                            dataReport?.map( (item,index) => (    
    
                            <>
                                <TableContainer key={index} className="table">
                                    <Table sx={{ width:"100%" }}>
                                        <TableBody  className='body'>
                                            <TableRow  className="body-row">
                                                <TableCell  
                                                    className="cell-item-subtitle" width="10%"
                                                    sx={{border: "none", color: "#0969A0", padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text">{item?.itemId}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item-subtitle" width="15%"
                                                    sx={{border: "none", color: "#0969A0", padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text">{item?.itemDescription}</Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    align="center" width="15%"
                                                    className="cell-item-subtitle"
                                                    sx={{border: "none", color: "#0969A0", padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="20%"
                                                    className="cell-item-subtitle"
                                                    sx={{border: "none" , color: "#0969A0",   padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    align="center" width="8%"
                                                    className="cell-item-subtitle"
                                                    sx={{border: "none" , color: "#0969A0", padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                                </TableCell>      
                                                <TableCell 
                                                    align="center" width="15%"
                                                    className="cell-item-subtitle"
                                                    sx={{border: "none" , color: "#0969A0", padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                                </TableCell>                                                                                                      
                                            </TableRow>                                                                  
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {
                                    item?.productGroup?.map( (row,index) => (
                                        <TableContainer key={index} className="table">
                                            <Table sx={{ width:"100%" }}>
                                                <TableBody  className='body'>
                                                    <TableRow  className="body-row">
                                                        <TableCell  
                                                            className="cell-item" width="10%"
                                                            sx={{border: "none" , padding: "8px"}}
                                                        >
                                                            {/* <Typography variant="body2" className="text">{item?.itemId}</Typography> */}
                                                        </TableCell>
                                                        <TableCell 
                                                            className="cell-item" width="15%"
                                                            sx={{border: "none" , padding: "8px"}}
                                                        >
                                                            <Typography variant="body2" className="text" sx={{color:"black"}}>{row?.itemDescription}</Typography>
                                                        </TableCell>         

                                                        <TableCell 
                                                            align="center" width="15%"
                                                            className="cell-item"
                                                            sx={{border: "none" , padding: "8px"}}
                                                        > 
                                                           
                                                            <Stack direction="row" justifyContent="center">
                                                                <Box  width="50%" display="flex" justifyContent="right">
                                                                    <Typography variant="body2">{(row?.qtyStockIn-row?.qtySold)?.toFixed(4)}</Typography>
                                                                </Box>
                                                                <Typography variant="body2">-</Typography>
                                                                <Box  width="50%" display="flex" justifyContent="left">
                                                                    <Typography variant="body2">{row?.unit}</Typography>
                                                                </Box>
                                                            </Stack>                                                                
                                                            
                                                        </TableCell>  

                                                        <TableCell 
                                                            align="center" width="20%"
                                                            className="cell-item"
                                                            sx={{border: "none" ,   padding: "8px"}}
                                                        >
                                                            <Stack direction="row" justifyContent="center">
                                                                <Stack direction="row" justifyContent="center" width="50%">
                                                                    <Box  width="50%" display="flex" justifyContent="left">
                                                                        <Typography variant="body2">$</Typography>
                                                                    </Box>                                                               
                                                                    <Box  width="50%" display="flex" justifyContent="right">
                                                                        <Typography variant="body2">{row?.unitCost?.toFixed(2)}</Typography>
                                                                    </Box>
                                                                </Stack>
                                                            </Stack>
                                                            
                                                            {/* <Typography variant="body2" className="text" sx={{color:"black"}}>
                                                                ${row?.unitCost?.toFixed(2)}
                                                            </Typography> */}
                                                        </TableCell>   
                                                        {/* <TableCell 
                                                            align="center" width="8%"
                                                            className="cell-item"
                                                            sx={{border: "none" , padding: "8px"}}
                                                        >
                                                            <Typography variant="body2" className="text">{row?.quantityPerStockUM} per U/M</Typography>
                                                        </TableCell>       */}
                                                        <TableCell 
                                                            align="center" width="15%"
                                                            className="cell-item"
                                                            sx={{border: "none" , padding: "8px"}}
                                                        >
                                                            
                                                            <Stack direction="row" justifyContent="center">
                                                                <Stack direction="row" justifyContent="center" width="70%">
                                                                    <Box sx={{flexGrow:1}}></Box>
                                                                    <Box display="flex" justifyContent="right" >
                                                                        <Typography variant="body2" className="text" sx={{color:"black"}}>
                                                                          { row?.qtySold?.toFixed(2) }
                                                                        </Typography>
                                                                    </Box>
                                                                </Stack>
                                                            </Stack>
                                                            
                                                        </TableCell>                                                                                                      
                                                    </TableRow>                                                                  
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    ))
                                }
                            </>
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