import { Box, Button , FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import './report.scss';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LicenseInfo } from '@mui/x-license-pro';
import InventoryReport from "../Component/Report/InventoryReport";
import ProductionReport from "../Component/Report/ProductionReport";
import SaleReport from "../Component/Report/SaleReport";

export default function Report() {

    const [value, setValue] = React.useState([null, null]);   
    React.useMemo( () => {
        LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');
    },[])
    
    const [typeReport,setTypeReport] = React.useState("default");
    const [fromDate,setFromDate] = React.useState(null);
    const [toDate,setToDate] = React.useState(null);

    console.log(fromDate, toDate);

    return(
        <div className="report-page">

            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Typography className="color">Report</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />                
            </Stack>

            <Box className="container">   
                                         
                {/* <Stack direction="row" spacing={1}>                    
                    <Stack direction="column" justifyContent="center" sx={{width:"200px"}}>
                        <Typography className="title-filter" variant="body1">Storage Room :</Typography>
                    </Stack>                    
                    <FormControl size="small" fullWidth >                       
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"  
                            defaultValue={10}                    
                        >
                            <MenuItem value={10}>Storage Room A</MenuItem>
                            <MenuItem value={20}>Storage Room B</MenuItem>
                            <MenuItem value={30}>Storage Room C</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>             */}

                
                <Box sx={{flexGrow:1}}/>

                <Stack direction="row" spacing={1} width="300px">
                    <Stack direction="column" justifyContent="center" sx={{width:"80px"}}>
                        <Typography className="title-filter" variant="body1">Type :</Typography>
                    </Stack>                    
                    <FormControl size="small" fullWidth >                       
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"  
                            defaultValue={"default"}     
                            onChange={(e) => setTypeReport(e.target.value)}  
                        >
                            <MenuItem value="default">Choose Type</MenuItem>
                            <MenuItem value="sale_report">Sale Report</MenuItem>
                            <MenuItem value="inventory_report">Inventory Report</MenuItem>
                            <MenuItem value="production_report">Production Report</MenuItem>                            
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={1} width="300px" ml={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker 
                            startText="mm/dd/yyyy"
                            endText="mm/dd/yyyy"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue) 
                                setFromDate(newValue[0]);
                                setToDate(newValue[1])                              
                            }}
                            renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                    <TextField {...startProps} size="small"/>
                                    <Box sx={{ mx: 2 }}> to </Box>
                                    <TextField {...endProps} size="small"/>
                                </React.Fragment>
                            )}
                        />
                    </LocalizationProvider>                   
                </Stack>

                {/* <Stack direction="row" spacing={1} ml={4}>
                    <Button variant="contained" sx={{fontWeight:"bold"}}> Report</Button>
                </Stack>                 */}
            </Box>
            
            {/* Inventory Report */}

            {
                typeReport === "sale_report" ?
                    <SaleReport 
                        FromData={fromDate}
                        ToData={toDate}
                    />
                :
                    null  
            }

            {
                typeReport === "inventory_report" ?
                    <InventoryReport 
                        FromData={fromDate}
                        ToData={toDate}
                    />
                :
                    null  
            }

            {
                typeReport === "production_report" ?
                    <ProductionReport 
                        FromData={fromDate}
                        ToData={toDate}
                    />
                :
                    null  
            }



            
            
            




        </div>
    );
}