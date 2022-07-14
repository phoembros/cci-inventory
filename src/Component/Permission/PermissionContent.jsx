import { IconButton, Stack, Typography } from "@mui/material";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

export default function PermissionContent() {
    return(
        <Stack direction="row" justifyContent="center" height={320} >
            <Stack direction="column" justifyContent="center">  
                <Stack direction="row" justifyContent="center" sx={{width: "100%"}}>
                    <IconButton>
                        <SentimentVeryDissatisfiedIcon sx={{color: "red" , fontSize: "60px"}}/>
                    </IconButton>
                </Stack>                  
                <Typography variant="body" sx={{color: "#0969A0"}}>You dont have permission to view the content</Typography>
            </Stack>
        </Stack>
    )
}