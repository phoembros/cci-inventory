import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './inventoryreport.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import logo from "../../Assets/CCI_invoice.png";
import { GET_SALE_BYID } from "../../Schema/sales";
import { GET_SALE_REPORT } from "../../Schema/report";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import moment from "moment";


const ComponentToPrint = ({FromData , ToData}) => {

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [id,setId] = React.useState(params.get("invoice"));

    React.useEffect( () => {
        setId(params.get("invoice")); 
    }, [location.search]);
    
    // get Sale Details
    const [ dataSale , setDataSale ] = React.useState([]);

    const { data , error , refetch } = useQuery(GET_SALE_REPORT , {
        variables: {
            fromDate: FromData,
            toDate:ToData,
        },
        onCompleted: ({getSaleReport}) => {
            setDataSale(getSaleReport)
        },
        onError: (error) => {
            console.log(error?.message)
        }
    })

    // console.log(dataSale , "dataSale")    
    React.useEffect( () => {
        refetch()
    },[])

    return (
        <Box  width="100%"  display="flex" height="fit-content" flexDirection="column" justifyContent="center" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%" >
                <Grid container>
                    <Grid item xs={12}>
                        <Stack direction="row" display="flex" justifyContent="center" spacing={1} width="400px" sx={{position: "absolute" , zIndex: "1"}}>
                            <img src={logo} alt="logo" width="60%"/>
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
                        <Box width="100%" display="flex" flexDirection="column" justifyContent="center" >
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
                                                <Typography variant="body2" className="text">Customer ID</Typography>
                                            </TableCell>
                                            <TableCell 
                                                className="cell-item" width="10%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Name</Typography>
                                            </TableCell>         

                                            <TableCell 
                                                width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">Invoice Number</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Date</Typography>
                                            </TableCell>   
                                            <TableCell 
                                                width="10%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Item Description</Typography>
                                            </TableCell>      
                                            <TableCell 
                                                align="right" width="6%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Qty</Typography>
                                            </TableCell> 
                                            <TableCell 
                                                align="right" width="6%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Sale Price</Typography>
                                            </TableCell>
                                            <TableCell 
                                                align="right" width="6%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Amount</Typography>
                                            </TableCell> 
                                            <TableCell 
                                                align="right" width="6%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Cost of Sales</Typography>
                                            </TableCell> 
                                            <TableCell 
                                                align="right" width="6%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Gross Profit</Typography>
                                            </TableCell>  
                                            <TableCell 
                                                align="right" width="6%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">Gross Margin</Typography>
                                            </TableCell>                                                  
                                        </TableRow>                                                                  
                                    </TableBody>                      
                                </Table>
                            </TableContainer>

                        {
                            dataSale?.saleInfo?.map( (item,index) => (
                                <TableContainer key={index} className="table">
                                    <Table sx={{ width:"100%" }}>
                                        <TableBody className='body'>
                                            <TableRow className="body-row">

                                                <TableCell  
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.customerId}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item" width="10%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.name}</Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}} className="text"> </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell>      
                                                <TableCell 
                                                    align="center" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="center" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell>
                                                <TableCell 
                                                    align="center" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="center" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="center" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell>  
                                                <TableCell 
                                                    align="center" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"> </Typography>
                                                </TableCell>   

                                            </TableRow>    

                                            {
                                                item?.invoiceInfo?.map((row,index) => (
                                            <TableRow key={index} className="body-row">

                                                <TableCell  
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item" width="10%"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.invoiceNumber}</Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none"   ,   padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{moment(row?.date).format("DD/MMM/YYYY")}</Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.itemDescription}</Typography>
                                                </TableCell>      
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.qty?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.salePrice?.toFixed(2)}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.amount?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.costOfSales?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>{row?.grossProfit?.toFixed(2)}</Typography>
                                                </TableCell>  
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"                
                                                    sx={{border: "none"   , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text" sx={{color: "black"}}>
                                                        {row?.grossMargin?.toFixed(2)}
                                                    </Typography>
                                                </TableCell>   

                                            </TableRow> 
                                                ))
                                            }         

                                            <TableRow className="body-row">
                                                <TableCell  
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="body-row">

                                                <TableCell  
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item" width="10%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>      
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.totalQty?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.totalSalePrice?.toFixed(2)}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.totalAmout?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.totalCostOfSales?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.totalGrossProfit?.toFixed(2)}</Typography>
                                                </TableCell>  
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight: "bold"}}>{item?.totalGrossMargin?.toFixed(2)}</Typography>
                                                </TableCell>   

                                            </TableRow> 

                                        </TableBody>                      
                                    </Table>
                                </TableContainer>
                            ))
                        }   

                                <TableContainer className="table">
                                    <Table sx={{ width:"100%" }}>
                                        <TableBody className='body'>
                                            <TableRow className="body-row">                        
                                                <TableCell  
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow className="body-row">
                        
                                                <TableCell  
                                                    colSpan={2}
                                                    className="cell-item" width="8%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}}>Report Totals</Typography>
                                                </TableCell>

                                                <TableCell 
                                                    className="cell-item" width="10%"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>         

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    align="center" width="10%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"></Typography>
                                                </TableCell>      
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}} >{dataSale?.reportTotal?.totalQty?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}} >{dataSale?.reportTotal?.totalSalePrice?.toFixed(2)}</Typography>
                                                </TableCell>
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}} >{dataSale?.reportTotal?.totalAmount?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}} >{dataSale?.reportTotal?.totalCostOfSales?.toFixed(2)}</Typography>
                                                </TableCell> 
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}} >{dataSale?.reportTotal?.totalGrossProfit?.toFixed(2)}</Typography>
                                                </TableCell>  
                                                <TableCell 
                                                    align="right" width="6%"
                                                    className="cell-item"
                                                    sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" sx={{fontWeight:"bold"}} >{dataSale?.reportTotal?.totalGrossMargin?.toFixed(2)}</Typography>
                                                </TableCell>  

                                            </TableRow> 
                                        </TableBody>                      
                                    </Table>
                                </TableContainer>
                        </Box>              
                    </Grid>

                                        
                    
                </Grid>
            </Box>
            
            <Box sx={{flexGrow:1}}/>

            {/* <Grid container sx={{mb:5}}>
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

export default function SaleReport({FromData , ToData}) {

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
                    pageStyle={'@media print { body { -webkit-print-color-adjust: exact; } @page { size: landscape; margin: 12mm 5mm 12mm 5mm  !important; }}'} 
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