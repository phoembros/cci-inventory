import * as React from "react";
import { GET_QUANTITY_ON_HAND } from "../../Schema/rawmaterial";
import { useQuery } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";

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
        <Stack direction="row" justifyContent="center" spacing={1} width="100%">
            <Box  width="50%" display="flex" justifyContent="right">
                <Typography>{(data?.qtyOnHandRawMaterialByStorageRoom)?.toFixed(4)}</Typography>
            </Box>
            <Typography>-</Typography>
            <Box  width="50%" display="flex" justifyContent="left">
                <Typography>{unit}</Typography>
            </Box>
        </Stack>        
    );

}