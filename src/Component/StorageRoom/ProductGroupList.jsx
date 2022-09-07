import { Box, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import * as React from "react";
import "./productgrouplist.scss";
import { GET_PRODUCT_GROUP_BYPRODUCT_ID } from "../../Schema/product";
import { useQuery } from "@apollo/client";
import QtyOnHandProduct from "./QtyOnHandProduct";
import StorageRoomProductGroupAction from "../Product/StorageRoomProductGroupAction";
import AlertMessage from "../AlertMessage/AlertMessage";
import ViewAdjustProductGroup from "../Product/ViewAdjustProductGroup";
import LoadingPage from "../Permission/LoadingPage";

export default function ProductGroupList({productId, storageRoomId, dataUserLogin}) {

    const [loadingQty,setLoadingQty] = React.useState(true);
    // Open View 
    const [productGroupView,setProductGroupView] = React.useState(null)
    const [openView,setOpenView] = React.useState(false);
    const handleOpenView = (e) => {
        setProductGroupView(e);
        setOpenView(true);
    }
    const handleCloseView = () => setOpenView(false);

   
    // Alert Message
    const [alert,setAlert] = React.useState(false);
    const [message,setMessage] = React.useState("");
    const [checkMessage,setCheckMessage] = React.useState("");

    // Get Data Product Group
    const {data , refetch } = useQuery(GET_PRODUCT_GROUP_BYPRODUCT_ID, {
        variables: {
            productId: productId,
        },
        onCompleted: () => setLoadingQty(false),
    })

    React.useEffect( () => {
        refetch()
    },[productId,loadingQty])

    // console.log(data?.getProductGroupByProductId)
    console.log(alert)

    return (
        <Box className="product-group-list">  
            <TableContainer >
                <Table className="table">
                    <TableHead >
                        <TableRow className="header-row">
                            <TableCell className="header-title" width="30%">
                                <Typography className="title">Name</Typography>
                            </TableCell>       
                            <TableCell className="header-title" width="35%" align="center" >
                                <Typography className="title" >Qty On Hand</Typography>
                            </TableCell>                        
                            <TableCell className="header-title">
                                <Typography className="title">Unit Price </Typography>
                            </TableCell>                           
                        </TableRow>



                    {
                        loadingQty ? 
                            <TableRow className="body-row">
                                <TableCell className="body-title" colSpan={4}>
                                    <LoadingPage /> 
                                </TableCell>
                            </TableRow>
                        :
                        <> 
                        {
                            data?.getProductGroupByProductId?.map( (row,index) => (
                                <TableRow key={index} className={ index%2 === 0 ? "body-row" : "odd-body-row" }>
                                    
                                    <TableCell className="body-title" onClick={ () => handleOpenView(row)}>
                                        <Typography className="title" >{row?.name} </Typography>
                                    </TableCell>                                     
                                    
                                    <TableCell className="body-title" align="center"  onClick={ () => handleOpenView(row)}>
                                        <Typography className="title" >                                            
                                            <QtyOnHandProduct  
                                                alert={alert}                                                                                               
                                                storageRoomId={storageRoomId} 
                                                productGroupId={row?._id} 
                                                rows={row}
                                            />
                                        </Typography>
                                    </TableCell> 

                                    <TableCell className="body-title" onClick={ () => handleOpenView(row)}>
                                        <Typography className="title" >${row?.unitPrice} </Typography>
                                    </TableCell>   

                                    <TableCell className="body-title" align="right">
                                        
                                        <StorageRoomProductGroupAction 
                                            setAlert={setAlert}
                                            setMessage={setMessage}
                                            setCheckMessage={setCheckMessage}  
                                            setRefetch={refetch}
                                            editData={row}   
                                            setLoadingQty={setLoadingQty} 
                                            storageRoomId={storageRoomId}                                         
                                            dataRole={dataUserLogin?.getuserLogin?.role_and_permission?.permissions}                                             
                                        />
                                        
                                    </TableCell>                                                              
                                                                
                                </TableRow>
                            ))
                        }
                        </>                    
                    }

                    </TableHead>
                </Table>
            </TableContainer>



            <ViewAdjustProductGroup handleClose={handleCloseView} open={openView} productGroupView={productGroupView}/>

            <AlertMessage
                alert={alert}
                checkMessage={checkMessage}
                message={message}
                setAlert={setAlert}
            />

        </Box>
    )
}