import * as React from "react"
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_OWE_CUSTOMER } from "../../Schema/sales";

export default function CustomerOwe({dataOwe}) {

    const { data , refetch } = useQuery(GET_OWE_CUSTOMER, {
        variables: {
            id: dataOwe,
        }
    })

    React.useEffect( () => {
        refetch()
    },[dataOwe])

    return(
        <>
            <Stack direction="row" justifyContent="center">
                <Stack direction="row" justifyContent="center" spacing={1} width="100%">
                    <Box  width="50%" display="flex" justifyContent="center">
                        <Typography>$</Typography>
                    </Box>                                            
                    <Box  width="50%" display="flex" justifyContent="right">
                        <Typography> {data?.getOweCustomer?.toFixed(2)} </Typography>
                    </Box>
                </Stack>       
            </Stack>
        </>
    )
}