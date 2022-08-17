import * as React from "react"
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { GET_QUATITY_ON_HAND_PRODUCT } from "../../Schema/product";


export default function QtyOnHandProduct({ storageRoomId, productGroupId, alert}) {

    const { data: dataQtyOnHand , refetch } = useQuery(GET_QUATITY_ON_HAND_PRODUCT, {
        variables: {
            storageRoomId: storageRoomId ? storageRoomId : "",
            productGroupId: productGroupId ?  productGroupId : "",
        },
        onCompleted: ({qtyOnHandProductByStorageRoom}) => {
            // console.log(qtyOnHandProductByStorageRoom)            
        },
        onError: (error) => {
            // console.log(error.message);
        }
    });

    
    React.useState( () => {
        refetch();
    },[storageRoomId,productGroupId,alert])

    return (
        <>
            <Typography>{ dataQtyOnHand?.qtyOnHandProductByStorageRoom ? (dataQtyOnHand?.qtyOnHandProductByStorageRoom)?.toFixed(4) : 0 } - U/M </Typography>
        </>
    )
}