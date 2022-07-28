import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

export default function LoadingPage () {
    return (
        <>
            <Stack direction="row" justifyContent="center" height={320} >
                <Stack direction="column" justifyContent="center">  
                    <Box  sx={{ display: "flex", flexDirection: "column"}}>
                        <CircularProgress />
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}