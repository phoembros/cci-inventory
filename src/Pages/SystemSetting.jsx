import { Box, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import './systemsetting.scss';
import SettingsIcon from '@mui/icons-material/Settings';
import { useTheme } from '@mui/material/styles';
import { Link } from "react-router-dom";
import AlertMessage from "../Component/AlertMessage/AlertMessage";
import { GET_USER_LOGIN } from "../Schema/user";
import { useQuery } from "@apollo/client";


export default function SystemSetting() {

    const theme = useTheme();

    //Alert message
    const [alert, setAlert] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [checkMessage, setCheckMessage]= React.useState('')

    const {data: dataUserLogin } = useQuery(GET_USER_LOGIN,{
        pollInterval: 10000,
    })
    // console.log(dataUserLogin?.getuserLogin?.role_and_permission?.permissions)

    return(
        <div className="system-page">
            <Stack direction="row" spacing={2}>
                <Box className={theme.palette.mode === 'dark' ? "slash-dark" : "slash"} />
                <Stack direction="column" justifyContent="center">
                    <Typography className={theme.palette.mode === 'dark' ? "color-dark" : "color" }>System Setting</Typography>
                </Stack>
                <Box sx={{flexGrow: 1}} />                
            </Stack>

            <Box sx={{mt:5 , mb:3}}>
                <Typography variant="body">Edit abilities of system can do.</Typography>
            </Box>
            <Grid container spacing={5} className="grid">              
                <Grid item xs={12} sm={12} md={6} lg={6}  className="grid-item">
                    <Box className={theme.palette.mode === 'dark' ? 'box-item-dark' : 'box-item' }>                        
                        <Stack direction="column" justifyContent="center" spacing={2} sx={{height:"100%"}}>
                            <Stack direction="row" spacing={2} sx={{ml:2}}>
                                <Stack direction="column" justifyContent="center" spacing={2}>
                                    <SettingsIcon className="icon"/>
                                </Stack>

                                {
                                    dataUserLogin?.getuserLogin?.role_and_permission?.permissions?.createRole ?
                                        <>
                                            <Stack direction="column" justifyContent="center" spacing={1}> 
                                                <Link to="/system-setting/role" style={{textDecoration: "none"}}>
                                                    <Typography className="text-title">Role & Permission</Typography>
                                                </Link>
                                                <Typography variant="body">Edit abilities of system can do to change.</Typography>                                    
                                            </Stack>
                                        </>
                                    :
                                        <>
                                            <Stack direction="column" justifyContent="center" spacing={1}>
                                                <Link to="/system-setting" style={{textDecoration: "none"}}>
                                                    <Typography className="text-title">Role & Permission</Typography> 
                                                </Link>                                            
                                                <Typography variant="body">Edit abilities of system can do to change.</Typography>                                    
                                            </Stack>
                                        </>
                                }
                                
                            </Stack>
                        </Stack>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6} className="grid-item">
                    <Box className={theme.palette.mode === 'dark' ? 'box-item-dark' : 'box-item' }>                        
                        <Stack direction="column" justifyContent="center" spacing={2} sx={{height:"100%"}}>
                            <Stack direction="row" spacing={2} sx={{ml:2}}>
                                <Stack direction="column" justifyContent="center" spacing={2}>
                                    <SettingsIcon className="icon"/>
                                </Stack>
                                <Stack direction="column" justifyContent="center" spacing={1}> 
                                    <Link to="/system-setting/unit" style={{textDecoration: "none"}}>
                                        <Typography className="text-title">Setup Unit</Typography>
                                    </Link>
                                    <Typography variant="body">Setup your unit to use in product and raw materail.</Typography>                                    
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Grid>

            </Grid>

            <AlertMessage alert={alert} setAlert={setAlert} message={message} setMessage={setMessage} checkMessage={checkMessage} />

        </div>
    );
}