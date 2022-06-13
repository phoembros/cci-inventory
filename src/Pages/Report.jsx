import { Box, Button , FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import * as React from "react";
import AddIcon from '@mui/icons-material/Add';
import './report.scss';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { LicenseInfo } from '@mui/x-license-pro';

export default function Report() {

    const [value, setValue] = React.useState([null, null]);

    React.useMemo( () => {
        LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');
    },[])
    

    return(
        <div className="report-page">
            <Stack direction="row" spacing={2}>
                <Box className="slash" />
                <Stack direction="column" justifyContent="center">
                    <Typography className="color">Report</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />
                <Stack direction="row" className="stack-btn"  justifyContent="right" spacing={1}>                      
                    <Button startIcon={<AddIcon/>} className="btn-add">
                        <Typography className="btn-text">Add</Typography>
                    </Button>
                </Stack>
            </Stack>

            <Box className="container">                                
                <Stack direction="row" spacing={1} width="25%">
                    <Stack direction="column" justifyContent="center" sx={{width:"50%"}}>
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
                </Stack>            
                
                <Box sx={{flexGrow:1}}/>

                <Stack direction="row" spacing={1} width="20%">
                    <Stack direction="column" justifyContent="center" sx={{width:"20%"}}>
                        <Typography className="title-filter" variant="body1">Type :</Typography>
                    </Stack>                    
                    <FormControl size="small" fullWidth >                       
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"  
                            defaultValue={30}       
                        >
                            <MenuItem value={10}>Stock In</MenuItem>
                            <MenuItem value={20}>Stock Out</MenuItem>
                            <MenuItem value={30}>Purchase Order</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
                <Stack direction="row" spacing={1} width="20%" ml={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateRangePicker 
                            startText="dd/mm/yyyy"
                            endText="dd/mm/yyyy"
                            value={value}
                            onChange={(newValue) => setValue(newValue) }
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

                <Stack direction="row" spacing={1} ml={4}>
                    <Button variant="contained" sx={{fontWeight:"bold"}}> Report</Button>
                </Stack>
            </Box>

        </div>
    );
}