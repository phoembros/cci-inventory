import { Button, Checkbox, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom"
import { Box } from "@mui/system";
import * as React from "react";
import './printinvoice.scss';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import ReactToPrint from "react-to-print";
import logo from "../../Assets/CCI_invoice.png";
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

    const color= 'linear-gradient(to right bottom, #430089, #82ffa1)';
    console.log(dataSale)
    const item = [1,2,3]
    return (
        <Box  width="100%" sx={{backgroundColor:'#fff', padding: 3}}>
            <Box width="100%" display="flex" justifyContent="center">
                <Box width="1000px" height="1100px" display="flex" flexDirection="column">
                    <table width="100%" style={{ padding: "8px"}}>
                        <tr>
                            <th colSpan={4} style={{textAlign: "left" }}>                               
                                <img src={logo} alt="logo" width="50%"/>
                            </th>
                            <th colSpan={1} style={{ textAlign: "right"  , width: "100px" }}>
                                <Stack direction="row" justifyContent="right" spacing={2}>
                                    <Box sx={{ width: "2px", height: "170px" , backgroundColor: "#63ce9b"}}/>
                                    <Stack direction="column" justifyContent="center">
                                        <Box sx={{ textAlign: "left" }}>                                       
                                            <Typography variant="body1" sx={{fontWeight: "bold"}}>CCM Cambodia Co., LTD.</Typography>
                                            <Typography variant="body2">#310, Street 66</Typography>
                                            <Typography variant="body2">Siemreap, Siem Reap 17252 KH</Typography>
                                            <Typography variant="body2">+855 92599399</Typography>
                                            <Typography variant="body2">info@ahscambodia.com</Typography>
                                            <Typography variant="body2">www.ccscambodia.com</Typography>
                                        </Box>                                        
                                    </Stack>
                                </Stack>    
                            </th>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <Typography variant="h3" sx={{fontWeight: "bold" , color: "#007654" }}>INVOICE</Typography>
                            </td>                       
                        </tr>
                        <tr style={{background: "linear-gradient(120deg, rgba(0,118,84,1) 68%, rgba(99,206,155,1) 68%)" }}>
                            <td colSpan={5}><Box height="30px"></Box></td>                            
                        </tr>
                        <tr>
                            <td colSpan={5}><Box height="30px"></Box></td>                            
                        </tr>
                        <tr>
                            <td colSpan={4}>
                                <Typography variant="body1" sx={{ fontWeight: "bold" }}>BILL TO</Typography>
                                <Typography variant="body2">{dataSale?.billTo?.customerId?.name}</Typography> 
                                <Typography variant="body2">{dataSale?.billTo?.customerId?.address}</Typography>
                            </td>
                            <td  style={{ textAlign: "right" }}>
                                <Stack direction="row" justifyContent="right" spacing={2}>
                                    <Box sx={{ width: "2px", height: "90px" , backgroundColor: "#63ce9b"}}/>
                                    <Stack direction="column" justifyContent="center">
                                        <Box sx={{ textAlign: "left" , width: "208px"}}>                                       
                                            <Stack direction="row" justifyContent="center" spacing={1}>
                                                <Typography variant="body2" sx={{fontWeight: "bold" }}>INVOICE NO.</Typography>
                                                <Box sx={{flexGrow:1}}></Box>
                                                {/* <Typography variant="body2">CCI{moment(dataSale?.createdAt).format("YYYY")}-{dataSale?.invoiceNo?.padStart(4, '0')}</Typography> */}
                                                <Typography variant="body2">{dataSale?.invoiceNo}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="center" spacing={1}>
                                                <Typography variant="body2" sx={{fontWeight: "bold" }}>TIN</Typography>
                                                <Box sx={{flexGrow:1}}></Box>
                                                <Typography variant="body2">{dataSale?.tin}</Typography>
                                            </Stack>
                                            <Stack direction="row" justifyContent="center" spacing={1}>
                                                <Typography variant="body2" sx={{fontWeight: "bold" }}>DATE</Typography>
                                                <Box sx={{flexGrow:1}}></Box>
                                                <Typography variant="body2">{moment(dataSale?.date).format("DD/MM/YYYY")}</Typography>
                                            </Stack>                                          
                                        </Box>                                        
                                    </Stack>
                                </Stack>    
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}><Box height="30px"></Box></td>                            
                        </tr>
                        <tr style={{backgroundColor: "gray"}}>
                            <th style={{width: "130px"}}>
                                <Stack direction="column" justifyContent="center" height="40px">
                                    <Typography sx={{color:"#fff" , fontWeight: "bold"}} variant="body2" className="text-header"></Typography>
                                </Stack>
                            </th>
                            <th style={{width: "425px"}}>
                                <Typography sx={{color:"#fff" , fontWeight: "bold"}} variant="body2" className="text-header">DESCRIPTION</Typography>
                            </th>
                            <th style={{width: "100px"}}>
                                <Typography sx={{color:"#fff" , fontWeight: "bold"}} variant="body2" className="text-header">QTY</Typography>
                            </th>
                            <th style={{width: "100px"}}>
                                <Typography sx={{color:"#fff" , fontWeight: "bold"}} variant="body2" className="text-header">RATE</Typography>
                            </th>
                            <th style={{width: "98px"}}>
                                <Typography sx={{color:"#fff" , fontWeight: "bold"}} variant="body2" className="text-header">AMOUNT</Typography>
                            </th>                          
                        </tr>

                        {
                            dataSale?.items?.map( (item,index) => (
                        <tr key={index}>
                            <th>
                                <Stack direction="column" justifyContent="center" height="30px">
                                    <Typography variant="body2" className="text">
                                        {item?.productId?.groupBy?.productId}
                                    </Typography>
                                </Stack>
                            </th>
                            <th>
                                <Typography variant="body2" className="text">
                                    {item?.productId?.name}
                                </Typography>
                            </th>
                            <th>
                                <Typography variant="body2" className="text">
                                    {item?.qty}
                                </Typography>
                            </th>
                            <th>
                                <Typography variant="body2" className="text">
                                    {item?.unitPrice}
                                </Typography>
                            </th>
                            <th>
                                <Typography variant="body2" className="text">
                                    {item?.amount?.toFixed(2)}
                                </Typography>
                            </th>                          
                        </tr>
                            ))
                        }   
                        
                    </table>  
                    
                    <Grid container sx={{mb:5 , padding: "10px" }}>
                        <Grid item xs={12} sx={{mt:1}}>          
                            <Box sx={{display: "flex" , justifyContent: "right"}}>
                                <Box sx={{width: "300px" , height: "40px" , backgroundColor: "#007654" , display: "flex" , flexDirection: "column", justifyContent: "center"}}>
                                    <Stack spacing={2} direction="row" justifyContent="center" sx={{padding: "30px" , fontWeight: "bold", color: "#fff"}}>
                                        <Typography>VAT {dataSale?.vat}% :</Typography>                                             
                                        <Typography>${dataSale?.vatAmount?.toFixed(2)}</Typography>
                                    </Stack>                                   
                                </Box>                           
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{mt:1}}>          
                            <Box sx={{display: "flex" , justifyContent: "right"}}>
                                <Box sx={{width: "300px" , height: "40px" , backgroundColor: "#007654" , display: "flex" , flexDirection: "column", justifyContent: "center"}}>
                                    <Stack spacing={2} direction="row" justifyContent="center" sx={{padding: "30px" , fontWeight: "bold", color: "#fff"}}>
                                        <Typography>AMOUNT :</Typography>                                             
                                        <Typography>${dataSale?.totalAmount?.toFixed(2)}</Typography>
                                    </Stack>
                                </Box>                           
                            </Box>
                        </Grid>
                    </Grid>

                    <Box sx={{flexGrow:1}}/>

                    <Grid container sx={{mb:10}}>
                        <Grid item xs={12} sx={{mt:1}}>                      
                            <Typography variant="body2">1- Kindly pay by cheque to: Chemical Center Solution Cambodia</Typography>
                            <Typography variant="body2">2- Bank Name : ABA</Typography>
                            <Typography variant="body2">3- Account Number: 000090861</Typography>
                            <Typography variant="body2">4- Please process the payment when received (due date)</Typography>
                        </Grid>
                        {/* <Grid item xs={6} sx={{mt:1}}>                     
                            <Stack direction="row" sx={{padding:5}}>
                                <Box sx={{flexGrow:1}}></Box>
                                <Stack direction="column" justifyContent="center">
                                    <Typography variant="h6">BALANCE DUE</Typography>
                                </Stack>
                                <Box sx={{flexGrow:1}}></Box>                            
                                <Typography variant="h4" sx={{fontWeight: "bold"}}>
                                    ${dataSale?.totalAmount?.toFixed(2)}
                                </Typography>                           
                            </Stack>                        
                        </Grid> */}
                    </Grid>

                    <Grid container sx={{mb:15}}>
                        <Grid item xs={4} display="flex" justifyContent="center">    
                            <Stack direction="column" justifyContent="center">                   
                                <Typography variant="body2">___________________________</Typography>  
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body2" sx={{fontWeight: "bold" }}>Date</Typography>
                                </Stack>                        
                            </Stack>                                
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center">                     
                            <Stack direction="column" justifyContent="center">                   
                                <Typography variant="body2">___________________________</Typography>  
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body2" sx={{fontWeight: "bold" }}>Received By</Typography>
                                </Stack>                        
                            </Stack>                     
                        </Grid>
                        <Grid item xs={4} display="flex" justifyContent="center">                     
                            <Stack direction="column" justifyContent="center">                   
                                <Typography variant="body2">___________________________</Typography>  
                                <Stack direction="row" justifyContent="center">
                                    <Typography variant="body2" sx={{fontWeight: "bold" }}>Issued By</Typography>
                                </Stack>                        
                            </Stack>
                        </Grid>
                    </Grid>

                </Box>           
            </Box>
            
            

        </Box>
    )
}

export default function PrintInvoice() {

    const componentRef = React.useRef(null);
    
    return (
        <div className="invoice-pages">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />            
                <Stack direction="column" justifyContent="center" className="page-title">
                    <Stack direction="row" spacing={1}>
                        <Link to="/sales" style={{ textDecoration: "none" }}>
                            <Typography className="color">Sales</Typography>
                        </Link>
                        <Typography className="color">/ Sale Invoice</Typography>
                    </Stack>                
                </Stack>
                <Stack direction="column" justifyContent="center" className="page-title-mobile">
                    <Stack direction="row" spacing={1}>                      
                        <Typography className="color">Sale Invoice</Typography>
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