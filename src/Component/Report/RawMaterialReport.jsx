import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './inventoryreport.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import logo from "../../Assets/CCI_invoice.png";
import { GET_SALE_BYID } from "../../Schema/sales";
import { GET_RAWMATERIAL_REPORT } from "../../Schema/report";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ComponentToPrint = ({ FromData , ToData } ) => {

    // get Data
    const [dataReport,setDataReport] = React.useState([]);

    const { data , error , refetch } = useQuery(GET_RAWMATERIAL_REPORT , {
        variables: {
            fromDate:  FromData,
            toDate: ToData,
        },
        onCompleted: ({getRawMaterialReport}) => {
            // console.log(getRawMaterialReport)
            setDataReport(getRawMaterialReport)
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
                            <img src={logo} alt="logo" width="55%" style={{marginLeft:"5px"}}/>
                        </Stack>
                        <Stack direction="row" spacing={2}>                            
                            <Box sx={{display: "flex" , justifyContent: "center" , width: "100%"}}>
                                <Stack direction="column" justifyContent="center">
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black"}}>CCS CAMBODIA</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="center">
                                        <Typography variant="body1" sx={{fontWeight: "bold" , color: "black"}}>Raw Material Report Summary</Typography>
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
                                                className="cell-item" width="7%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item Description</Typography>
                                            </TableCell>
                                            <TableCell 
                                                className="cell-item" width="15%" align="center"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Qty Stock In</Typography>
                                            </TableCell>     

                                            <TableCell 
                                                className="cell-item" width="15%" align="center"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Qty Stock Out</Typography>
                                            </TableCell>
                                               
                                            <TableCell 
                                                align="center" width="15%" 
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
                                                <Typography variant="body2" className="text">Unit</Typography>
                                            </TableCell>   
                                            <TableCell 
                                                align="center" width="15%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Unit Price</Typography>
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
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{item?.materialName}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item" width="15%" align="center"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                    <Stack direction="row" justifyContent="center">
                                                        <Stack direction="row" justifyContent="center" width="90%">
                                                            <Box sx={{flexGrow:1}}> </Box>
                                                            <Box  width="50%" display="flex" justifyContent="right">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    {item?.qtyStockIn?.toFixed(2)}
                                                                </Typography>
                                                            </Box>                                                            
                                                            
                                                        </Stack> 
                                                    </Stack>                                                         
                                                </TableCell>  

                                                <TableCell 
                                                    className="cell-item" width="15%" align="center"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                     <Stack direction="row" justifyContent="center">
                                                        <Stack direction="row" justifyContent="center" width="90%">
                                                            <Box sx={{flexGrow:1}}> </Box>
                                                            <Box  width="50%" display="flex" justifyContent="right">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    {item?.qtyStockOut?.toFixed(2)}
                                                                </Typography>
                                                            </Box>                                                            
                                                            
                                                        </Stack> 
                                                    </Stack>                                                    
                                                </TableCell>       

                                                <TableCell 
                                                    align="center" width="15%" 
                                                    className="cell-item"
                                                    sx={{border: "none" , padding: "8px"}}
                                                > 
                                                    <Stack direction="row" justifyContent="center">
                                                        <Stack direction="row" justifyContent="center" width="90%">
                                                            <Box sx={{flexGrow:1}}> </Box>
                                                            <Box  width="50%" display="flex" justifyContent="right">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    { (item?.qtyStockIn-item?.qtyStockOut).toFixed(2)}
                                                                </Typography>
                                                            </Box>                                                            
                                                            
                                                        </Stack> 
                                                    </Stack>                                                    
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="8%"
                                                    className="cell-item"
                                                    sx={{border: "none" ,   padding: "8px"}}
                                                >
                                                    <Stack direction="row" justifyContent="center">
                                                        <Stack direction="row" justifyContent="center" width="80%">
                                                            <Box  width="50%" display="flex" justifyContent="left">
                                                                 <Typography variant="body2" className="text" sx={{color: "black"}}>{item?.unit}</Typography>
                                                            </Box>                                                            
                                                            <Box sx={{flexGrow:1}}>                                                                
                                                            </Box>
                                                        </Stack> 
                                                    </Stack>                                                    
                                                </TableCell>   

                                                <TableCell 
                                                    align="center" width="15%"
                                                    className="cell-item"
                                                    sx={{border: "none" , padding: "8px"}}
                                                >
                                                    <Stack direction="row" justifyContent="center">
                                                        <Stack direction="row" justifyContent="center" width="50%">
                                                            <Box  width="50%" display="flex" justifyContent="left">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    $
                                                                </Typography>
                                                            </Box>                                                            
                                                            <Box  width="50%" display="flex" justifyContent="right">
                                                                <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                                    {item?.unitPrice}
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

export default function RawMaterialReport({ FromData , ToData }) {

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
                    pageStyle={'@media print { body { -webkit-print-color-adjust: exact; } @page { size: A4; margin: 12mm 5mm 12mm 5mm  !important; }}'}
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