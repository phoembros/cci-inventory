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

                       
                    <Grid item xs={12} sx={{mt:5, width: "100%"}}>
                        <Box width="100%">
                            {/* <TableContainer className="table" > */}
                                <table 
                                    className="table" 
                                    style={{
                                        width: "100%" ,                        
                                        whiteSpace: "nowrap" , 
                                        borderCollapse: "collapse",
                                        borderSpacing: "0px 8px",
                                    }}
                                >
                                    
                                    {/* <TableBody className='header'> */}
                                        <tr 
                                            className="header-row" 
                                            style={{backgroundColor: "#d0e3ed"}}
                                        >
                                            <th  
                                                align="left" className="cell-item" width="8%" 
                                                style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item ID</Typography>
                                            </th>

                                            <th 
                                                align="left" className="cell-item" width="15%"
                                                style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item Description</Typography>
                                            </th>         

                                            <th 
                                                align="center" width="10%"
                                                className="cell-item"
                                                style={{border: "none" , color: "#007654"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">Qty on Hand</Typography>
                                            </th>  

                                            <th 
                                                align="center" width="10%"
                                                className="cell-item"
                                                style={{border: "none" , color: "#007654"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Unit Price</Typography>
                                            </th>                                               
                                            <th 
                                                align="center"  width="10%"
                                                className="cell-item"
                                                style={{ border: "none" , color: "#007654"  , padding: "8px" }}
                                            >
                                                <Typography variant="body2" className="text">
                                                        Units Sold                                                         
                                                </Typography>                                              
                                            </th> 
                                                                                             
                                        </tr>                                                                  
                                    {/* </TableBody>    */}
                                        
                        {
                            dataReport?.map( (item,index) => (        
                            <>                               
                                   
                                    <tr  key={index}  className="body-row">
                                        <td  
                                            className="cell-item-subtitle"
                                            style={{ border: "1px solid #f4f4f4",  color: "#0969A0", padding: "8px"}}
                                        >
                                            <Typography variant="body2" sx={{fontWeight: "bold"}} className="text">{item?.itemId}</Typography>
                                        </td>
                                        <td 
                                            className="cell-item-subtitle"
                                            style={{ border: "1px solid #f4f4f4" , color: "#0969A0", padding: "8px"}}
                                        >
                                            <Typography variant="body2" sx={{fontWeight: "bold"}} className="text">{item?.itemDescription}</Typography>
                                        </td>         

                                        <td 
                                            align="center"
                                            className="cell-item-subtitle"
                                            style={{ border: "1px solid #f4f4f4" , color: "#0969A0", padding: "8px"}}
                                        > 
                                            <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                        </td>  

                                        <td 
                                            align="center" 
                                            className="cell-item-subtitle"
                                            style={{ border: "1px solid #f4f4f4"  , color: "#0969A0",   padding: "8px"}}
                                        >
                                            <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                        </td>   
                                        <td 
                                            align="center" 
                                            className="cell-item-subtitle"
                                            style={{ border: "1px solid #f4f4f4"  , color: "#0969A0", padding: "8px"}}
                                        >
                                            <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"></Typography>
                                        </td>      
                                                                                                                                            
                                    </tr>                                                                  
                                                                  

                                {
                                    item?.productGroup?.map( (row,index) => (                                        
                                       
                                        <tr key={index} className="body-row">
                                            <td  
                                                className="cell-item"
                                                style={{ border: "1px solid #f4f4f4" , padding: "8px"}}
                                            >                                                  
                                            </td>
                                            <td 
                                                className="cell-item"
                                                style={{ border: "1px solid #f4f4f4" , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text" sx={{color:"black" , ml: 3}}>{row?.itemDescription}</Typography>
                                            </td>         

                                            <td 
                                                align="center"
                                                className="cell-item"
                                                style={{ border: "1px solid #f4f4f4" , padding: "8px"}}
                                            > 
                                                
                                                <Stack direction="row" justifyContent="center" spacing={1}>
                                                    <Box  width="50%" display="flex" justifyContent="right">
                                                        <Typography variant="body2">{(row?.qtyStockIn-row?.qtySold)?.toFixed(4)}</Typography>
                                                    </Box>
                                                    <Typography variant="body2"> - </Typography>
                                                    <Box  width="50%" display="flex" justifyContent="left">
                                                        <Typography variant="body2">{row?.unit}</Typography>
                                                    </Box>
                                                </Stack>                                                                
                                                
                                            </td>  

                                            <td 
                                                align="center"
                                                className="cell-item"
                                                style={{ border: "1px solid #f4f4f4" ,   padding: "8px"}}
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
                                            </td>   
                                        
                                            <td 
                                                align="center"
                                                className="cell-item"
                                                style={{ border: "1px solid #f4f4f4" , padding: "8px"}}
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
                                                
                                            </td>                                                                                                      
                                        </tr>                                                                 
                                                                                   
                                    ))
                                }
                            </>
                            ))
                        }                                                     
                                 
                                    </table>
                            {/* </TableContainer> */}
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