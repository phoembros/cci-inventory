import * as React from "react";
import { GET_QUANTITY_ON_HAND } from "../../Schema/rawmaterial";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";

export default function QtyOnHand({ refetchQty, setRefetchQty , storageRoomId, rawMaterialId , unit }) {

    const { data , refetch } = useQuery(GET_QUANTITY_ON_HAND, {
        variables: {
            storageRoomId: storageRoomId,
            rawMaterialId: rawMaterialId,
        },
        onCompleted: ({qtyOnHandRawMaterialByStorageRoom}) => {
            console.log(qtyOnHandRawMaterialByStorageRoom)
            setRefetchQty(false)
        },
        onError: (error) => {
            console.log(error?.message)
        }
    })


    React.useEffect( () => {
        refetch()
        console.log(refetchQty)
    },[storageRoomId, rawMaterialId , refetchQty])

    return(
        <>
            <Typography>{data?.qtyOnHandRawMaterialByStorageRoom} - {unit}</Typography>
        </>
    )

}