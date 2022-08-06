import { Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import * as React from "react";
import "./productgrouplist.scss";
import { GET_PRODUCT_GROUP_BYPRODUCT_ID } from "../../Schema/product";
import { useQuery } from "@apollo/client";

export default function ProductGroupList({productId}) {

    const {data , refetch } = useQuery(GET_PRODUCT_GROUP_BYPRODUCT_ID, {
        variables: {
            productId: productId,
        }
    })

    React.useEffect( () => {
        refetch()
    },[productId])

    // console.log(data?.getProductGroupByProductId)

    return (
        <Box className="product-group-list">  
            <TableContainer >
                <Table className="table">
                    <TableHead >
                        <TableRow className="header-row">
                            <TableCell className="header-title">
                                <Typography className="title">Name </Typography>
                            </TableCell>       
                            <TableCell className="header-title">
                                <Typography className="title">Qty On Hand</Typography>
                            </TableCell>                        
                            <TableCell className="header-title">
                                <Typography className="title">Unit Price </Typography>
                            </TableCell>                           
                        </TableRow>

                        {
                            data?.getProductGroupByProductId?.map( (row,index) => (
                                <TableRow key={index} className="body-row">
                                    
                                    <TableCell className="body-title">
                                        <Typography className="title" >{row?.name} </Typography>
                                    </TableCell>                                     
                                    
                                    <TableCell className="body-title">
                                        <Typography className="title" > {row?.totalStockAmount-row?.totalSold} - U/M</Typography>
                                    </TableCell> 

                                    <TableCell className="body-title">
                                        <Typography className="title" >${row?.unitPrice} </Typography>
                                    </TableCell>                                                                
                                                                
                                </TableRow>
                            ))
                        }

                    </TableHead>
                </Table>
            </TableContainer>
        </Box>
    )
}