import * as React from "react"
import { Typography } from "@mui/material";
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
            <Typography>${data?.getOweSupplier?.toFixed(2)}</Typography>
        </>
    )
}