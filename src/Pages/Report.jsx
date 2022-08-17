import { Box, Button , FormControl, InputAdornment, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import './report.scss';

import { LocalizationProvider } from "@mui/x-date-pickers";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import DateRangeIcon from "@mui/icons-material/DateRange";

import InventoryReport from "../Component/Report/InventoryReport";
import ProductionReport from "../Component/Report/ProductionReport";
import RawMaterialReport from "../Component/Report/RawMaterialReport";
import SaleReport from "../Component/Report/SaleReport";

export default function Report() {

    const [value, setValue] = React.useState([null, null]);      
    
    const [typeReport,setTypeReport] = React.useState("sale_report");

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);    

    const [fromDate,setFromDate] = React.useState(new Date(now.getFullYear(), now.getMonth(), 1));
    const [toDate,setToDate] = React.useState(new Date(now.getFullYear(), now.getMonth() + 1, 0));

    // console.log(fromDate, toDate);

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
                <Box sx={{flexGrow:1}}/>
                <Stack direction="row" spacing={1} width="300px">
                    <Stack direction="column" justifyContent="center" sx={{width:"80px"}}>
                        <Typography className="title-filter" variant="body1">Type :</Typography>
                    </Stack>                    
                    <FormControl size="small" fullWidth >                       
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"  
                            defaultValue={"sale_report"}     
                            onChange={ (e) => setTypeReport(e.target.value) }  
                        >
                            {/* <MenuItem value="default">Choose Type</MenuItem> */}
                            <MenuItem value="sale_report">Sale Report</MenuItem>
                            <MenuItem value="inventory_report">Inventory Report</MenuItem>
                            <MenuItem value="production_report">Production Report</MenuItem>    
                            <MenuItem value="raw_material_report">Raw Material Report</MenuItem>                          
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={2} width="350px" ml={4}>
                    <LocalizationProvider  className="date-controll" dateAdapter={AdapterMoment} >
                        <MobileDatePicker
                            inputFormat="DD/MM/yyyy"
                            value={fromDate}
                            onChange={(e) => setFromDate(e)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                className="select-date"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <DateRangeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            )}
                        />
                    </LocalizationProvider>

                    <Stack direction="column" justifyContent="center">
                        <Typography variant="body">To</Typography>
                    </Stack>

                    <LocalizationProvider  className="date-controll" dateAdapter={AdapterMoment} >
                        <MobileDatePicker
                            inputFormat="DD/MM/yyyy"
                            value={toDate}
                            onChange={(e) => setToDate(e)}
                            renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                className="select-date"
                                fullWidth
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <DateRangeIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            )}
                        />
                    </LocalizationProvider>

                    {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
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
                    </LocalizationProvider>                    */}
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


            {
                typeReport === "raw_material_report" ?
                    <RawMaterialReport 
                        FromData={fromDate}
                        ToData={toDate}
                    />
                :
                    null  
            }

            
            
            




        </div>
    );
}