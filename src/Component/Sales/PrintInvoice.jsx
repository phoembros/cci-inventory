import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './printinvoice.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import logo from "../../Assets/logo.svg";
import { GET_SALE_BYID } from "../../Schema/sales";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import moment from "moment";

const ComponentToPrint = () => {

    //get Storage Room ID by Url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const [id,setId] = React.useState(params.get("invoice"));

    React.useEffect( () => {
        setId(params.get("invoice")); 
    }, [location.search]);
    
    // get Sale Details
    const [dataSale,setDataSale] = React.useState([]);

    const { data , error } = useQuery(GET_SALE_BYID , {
        variables: {
            id: id,
        },
        onCompleted: ({getSaleById}) => {
            setDataSale(getSaleById)
        },
    })

    console.log(dataSale)
    const item = [1,2,3]
    return (
        <Box  width="100%" height="1100px" display="flex" flexDirection="column" justifyContent="center" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%" >
                <Grid container>
                    <Grid item xs={6}>
                        <Typography variant="body1" sx={{fontWeight: "bold"}}>CCM Cambodia Co., LTD.</Typography>
                        <Typography variant="body2">#310, Street 66</Typography>
                        <Typography variant="body2">Siemreap, Siem Reap 17252 KH</Typography>
                        <Typography variant="body2">+855 92599399</Typography>
                        <Typography variant="body2">info@ahscambodia.com</Typography>
                        <Typography variant="body2">www.ccscambodia.com</Typography>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="center">
                        <img src={logo} alt="logo" width="70%"/>
                    </Grid>

                    <Grid item xs={6} sx={{mt:3}}>
                        <Typography variant="h5" sx={{fontWeight: "bold" , color: "#0969A0" }}>INVOICE</Typography>
                        <Box sx={{mt:2}}>
                            <Typography variant="body2" sx={{fontWeight: "bold"}}>BILL TO</Typography>
                            <Typography variant="body2">{dataSale?.billTo?.customerId?.name}</Typography>     
                        </Box>
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="center">
                        <Stack direction="column" justifyContent="center">
                            <Stack direction="row" justifyContent="center" spacing={1}>
                                <Typography variant="body2" sx={{fontWeight: "bold" }}>INVOICE NO.</Typography>
                                <Typography variant="body2">CCI{moment(dataSale?.createdAt).format("YYYY")}-{dataSale?.invoiceNo?.padStart(4, '0')}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="center" spacing={1}>
                                <Typography variant="body2" sx={{fontWeight: "bold" }}>TIN</Typography>
                                <Typography variant="body2">{dataSale?.tin}</Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="center" spacing={1}>
                                <Typography variant="body2" sx={{fontWeight: "bold" }}>DATE</Typography>
                                <Typography variant="body2">{moment(dataSale?.date).format("DD/MM/YYYY")}</Typography>
                            </Stack>
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
                                                className="cell-item" width="13%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >

                                            </TableCell>
                                            <TableCell 
                                                className="cell-item" width="40%"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">DESCRIPTION</Typography>
                                            </TableCell>         

                                            <TableCell 
                                                align="center" width="13%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            > 
                                                <Typography variant="body2" className="text">QTY</Typography>
                                            </TableCell>  

                                            <TableCell 
                                                align="center" width="20%"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  ,   padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">RATE</Typography>
                                            </TableCell>   
                                            <TableCell 
                                                align="center"
                                                className="cell-item"
                                                sx={{border: "none" , color: "#0969A0"  , padding: "8px"}}
                                            >
                                                <Typography variant="body2" className="text">AMOUNT</Typography>
                                            </TableCell>                                                        
                                        </TableRow>                                                                  
                                    </TableBody>                      
                                </Table>
                            </TableContainer>

                        {
                            dataSale?.items?.map( (item,index) => (
                                <TableContainer key={index} className="table">
                                    <Table sx={{ width:"100%" }}>
                                        <TableBody className='body'>
                                            <TableRow className="body-row">
                                                <TableCell  
                                                    className="cell-item" width="13%"
                                                    sx={{border:"none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text"  sx={{fontWeight: "bold"}} >
                                                       {item?.productId?.productId}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell 
                                                    className="cell-item" width="40%"
                                                    sx={{border:"none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.productId?.productName}
                                                    </Typography>
                                                </TableCell>    

                                                <TableCell 
                                                    align="center" width="13%"
                                                    className="cell-item"
                                                    sx={{border:"none" , padding: "8px"}}
                                                > 
                                                    <Typography variant="body2" className="text">
                                                        {item?.qty}
                                                    </Typography>
                                                </TableCell>  

                                                <TableCell 
                                                    align="center"
                                                    className="cell-item"  width="20%"
                                                    sx={{border:"none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.unitPrice}
                                                    </Typography>
                                                </TableCell>   
                                                <TableCell 
                                                    align="center"
                                                    className="cell-item"
                                                    sx={{border:"none" , padding: "8px"}}
                                                >
                                                    <Typography variant="body2" className="text">
                                                        {item?.amount?.toFixed(2)}
                                                    </Typography>
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
                                            <TableCell  className="cell-item" width="13%" sx={{border:"none" , padding: "8px"}}></TableCell>
                                            <TableCell  className="cell-item" width="40%" sx={{border:"none" , padding: "8px"}}></TableCell>                          
                                            <TableCell  align="center"  width="13%" className="cell-item" sx={{border:"none" , padding: "8px"}}></TableCell>   
                                            <TableCell  align="center"  width="20%" className="cell-item" sx={{border:"none" , padding: "8px"}}>
                                                <Typography variant="body2" sx={{fontWeight: "bold" }} >
                                                     VAT {dataSale?.vat}%
                                                </Typography>
                                            </TableCell>   
                                            <TableCell  align="center" className="cell-item" sx={{border:"none" , padding: "8px"}}>
                                                <Typography variant="body2" className="text">
                                                    {dataSale?.vatAmount?.toFixed(2)}
                                                </Typography>
                                            </TableCell>                                                        
                                        </TableRow>                                                                  
                                    </TableBody>                      
                                </Table>
                            </TableContainer>       
                            <TableContainer className="table">
                                <Table sx={{ width:"100%" }}>
                                    <TableBody className='body'>
                                        <TableRow className="body-row">
                                            <TableCell  className="cell-item" width="13%" sx={{border:"none" , padding: "8px"}}></TableCell>
                                            <TableCell  className="cell-item" width="40%" sx={{border:"none" , padding: "8px"}}></TableCell>                          
                                            <TableCell  align="center"  width="13%" className="cell-item" sx={{border:"none" , padding: "8px"}}></TableCell>   
                                            <TableCell  align="center"  width="20%" className="cell-item" sx={{border:"none" , padding: "8px"}}>
                                                <Typography variant="body2" sx={{fontWeight: "bold" }} >
                                                     AMOUNT
                                                </Typography>
                                            </TableCell>   
                                            <TableCell  align="center" className="cell-item" sx={{border:"none" , padding: "8px"}}>
                                                <Typography variant="body2" className="text">
                                                    {dataSale?.totalAmount?.toFixed(2)}
                                                </Typography>
                                            </TableCell>                                                        
                                        </TableRow>                                                                  
                                    </TableBody>                      
                                </Table>
                            </TableContainer>

                        </Box>              
                    </Grid>

                    

                    <Grid item xs={12} sx={{mt:5}}>
                        <Divider sx={{border: "1px dashed gray"}}/>
                    </Grid>
                    <Grid item xs={6} sx={{mt:1}}>                      
                        <Typography variant="body2">1- Kindly pay by cheque to: Chemical Center Solution Cambodia</Typography>
                        <Typography variant="body2">2- Bank Name : ABA</Typography>
                        <Typography variant="body2">3- Account Number: 000090861</Typography>
                        <Typography variant="body2">4- Please process the payment when received (due date)</Typography>
                    </Grid>
                    <Grid item xs={6} sx={{mt:1}}>                     
                        <Stack direction="row" justifyContent="center" sx={{padding:5}}>
                            <Stack direction="column" justifyContent="center">
                                <Typography variant="h6">BALANCE DUE</Typography>
                            </Stack>
                            <Box sx={{flexGrow:1}}></Box>                            
                            <Typography variant="h4" sx={{fontWeight: "bold"}}>
                                ${dataSale?.totalAmount?.toFixed(2)}
                            </Typography>                           
                        </Stack>                        
                    </Grid>
                    
                    
                </Grid>
            </Box>
            
            <Box sx={{flexGrow:1}}/>

            <Grid container sx={{mb:10}}>
                <Grid item xs={6} display="flex" justifyContent="center">                      
                    <Typography variant="body2">Received By:</Typography>
                    <Typography variant="body2">___________________________</Typography>                        
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">                      
                    <Typography variant="body2">Issued By:</Typography>
                    <Typography variant="body2">___________________________</Typography>  
                </Grid>
            </Grid>

        </Box>
    )
}

export default function PrintInvoice() {

    const componentRef = React.useRef(null);
    
    return (
        <div className="invoice-pages">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />            
                <Stack direction="column" justifyContent="center">
                    <Stack direction="row" spacing={1}>
                        <Link to="/sales" style={{ textDecoration: "none" }}>
                            <Typography className="color">Sales</Typography>
                        </Link>
                        <Typography className="color">/ Sale Invoice</Typography>
                    </Stack>                
                </Stack>
                <Box sx={{ flexGrow: 1 }} />
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

                    <ComponentToPrint/>

                </Box>

                {/* <ReactToPrint  
                    content={() => componentRef.current}         
                    trigger={() => <Button variant="contained">Print</Button>}
                /> */}
                {/* End Print */}
            </Box>

        </div>
    )
}