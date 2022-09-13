import * as React from "react"
import { Stack, Typography,Box } from "@mui/material";
import { useQuery } from "@apollo/client";
import { GET_OWE_SUPPLIER } from "../../Schema/supplies";

export default function SupplierOwe({dataOwe}) {

    const { data , refetch } = useQuery(GET_OWE_SUPPLIER, {
        variables: {
            id: dataOwe,
        }
    })

    React.useEffect( () => {
        refetch()
    },[dataOwe])

    return(
        <>
            <Stack direction="row" justifyContent="center" >
                <Stack direction="row" justifyContent="center" width="100%">
                    <Box width="50%" display="flex" justifyContent="left">
                        <Typography>$</Typography>
                    </Box>
                    <Box width="50%" display="flex" justifyContent="right">
                        <Typography>{data?.getOweSupplier?.toFixed(2)}</Typography>
                    </Box>
                </Stack>
            </Stack>
         
        </>
    )
}