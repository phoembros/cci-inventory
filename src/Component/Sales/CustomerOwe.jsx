import * as React from "react"
import { Typography } from "@mui/material";
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
            <Typography>${data?.getOweCustomer?.toFixed(2)}</Typography>
        </>
    )
}