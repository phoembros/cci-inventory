import * as React from "react"
import { useQuery } from "@apollo/client";
import { Stack, Typography , Box} from "@mui/material";
import { GET_QUATITY_ON_HAND_PRODUCT } from "../../Schema/product";


export default function QtyOnHandProduct({ storageRoomId, productGroupId, alert , rows }) {

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
        <Stack direction="row" justifyContent="center" spacing={1} width="100%">
            <Box  width="50%" display="flex" justifyContent="right">
                <Typography>{ dataQtyOnHand?.qtyOnHandProductByStorageRoom ? (dataQtyOnHand?.qtyOnHandProductByStorageRoom)?.toFixed(4) : 0 }</Typography>
            </Box>
            <Typography>-</Typography>
            <Box  width="50%" display="flex" justifyContent="left">
                <Typography> {rows?.unit} </Typography>
            </Box>
        </Stack>
    )
}