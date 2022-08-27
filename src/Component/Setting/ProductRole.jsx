import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import { UPDATE_ROLE } from "../../Schema/role";
import { useMutation } from "@apollo/client";

export default function ProductRole({dataRole , setRefetch}) {

    // console.log(dataRole)

    const[getProductPagination,setGetProductPagination] = React.useState(dataRole?.permissions?.getProductPagination)
    const[getProductById,setGetProductById] = React.useState(dataRole?.permissions?.getProductById)
    const[createProduct,setCreateProduct] = React.useState(dataRole?.permissions?.createProduct)
    const[updateProduct,setUpdateProduct] = React.useState(dataRole?.permissions?.updateProduct)
    const[deleteProduct,setDeleteProduct] = React.useState(dataRole?.permissions?.deleteProduct)
    const[getProductCategoryPagination,setGetProductCategoryPagination] = React.useState(dataRole?.permissions?.getProductCategoryPagination)
    const[createProductCategory,setCreateProductCategory] = React.useState(dataRole?.permissions?.createProductCategory)
    const[updateProductCategory,setUpdateProductCategory] = React.useState(dataRole?.permissions?.updateProductCategory)
    const[deleteProductCategory,setDeleteProductCategory] = React.useState(dataRole?.permissions?.deleteProductCategory)

    const [getProductGroupById,setGetProductGroupById] = React.useState(dataRole?.permissions?.getProductGroupById)
    const [getProductGroupPagination,setGetProductGroupPagination] = React.useState(dataRole?.permissions?.getProductGroupPagination)
    const [getProductGroupByProductId,setGetProductGroupByProductId] = React.useState(dataRole?.permissions?.getProductGroupByProductId)
    const [createProductGroup,setCreateProductGroup] = React.useState(dataRole?.permissions?.createProductGroup)
    const [updateProductGroup,setUpdateProductGroup] = React.useState(dataRole?.permissions?.updateProductGroup)
    const [deleteProductGroup,setDeleteProductGroup] = React.useState(dataRole?.permissions?.deleteProductGroup)
    const [adjustQtyProductGroup,setAdjustQtyProductGroup] = React.useState(dataRole?.permissions?.adjustQtyProductGroup)


    // Update Function
    const [updateRole] = useMutation(UPDATE_ROLE , {
        onCompleted: ({ updateRole }) => {
            // console.log(updateRole);
            setRefetch()
        },
        onError: (error) => {
            console.log(error?.message);
        },
    });


    // funciton update
    const handleUpdateRole = () => {
        updateRole({
            variables: {
                id: dataRole?._id,
                newRole: {
                    permissions: {

                        // StorageRoom
                        createStorageRoom: dataRole?.permissions?.createStorageRoom,
                        updateStorageRoom: dataRole?.permissions?.updateStorageRoom,
                        deleteStorageRoom: dataRole?.permissions?.deleteStorageRoom,
                        getStorageRoomWithPagination: dataRole?.permissions?.getStorageRoomWithPagination,
                        getStorageRoomRawMaterials: dataRole?.permissions?.getStorageRoomRawMaterials,
                        getStorageRoomProducts: dataRole?.permissions?.getStorageRoomProducts,           
                        
                        // Dashboard
                        getTopRawMaterial: dataRole?.permissions?.getTopRawMaterial,
                        getInvoiceOweAndUnpaid: dataRole?.permissions?.getInvoiceOweAndUnpaid,
                        getBarChart: dataRole?.permissions?.getBarChart,

                        // User
                        getUsersPagination: dataRole?.permissions?.getUsersPagination,
                        createUser: dataRole?.permissions?.createUser,
                        deleteUser: dataRole?.permissions?.deleteUser,
                        disableUser: dataRole?.permissions?.disableUser,
                        updateUser: dataRole?.permissions?.updateUser,

                        // Customer
                        getCustomerPagination: dataRole?.permissions?.getCustomerPagination,
                        getOweCustomer: dataRole?.permissions?.getOweCustomer,
                        createCustomer: dataRole?.permissions?.createCustomer,
                        updateCustomer: dataRole?.permissions?.updateCustomer,
                        deleteCustomer: dataRole?.permissions?.deleteCustomer,

                        // Product
                        getProductPagination: getProductPagination,
                        getProductById: getProductById,
                        getProductByStorageRoomId: dataRole?.permissions?.getProductByStorageRoomId,
                        createProduct: createProduct,
                        updateProduct: updateProduct,
                        deleteProduct: deleteProduct,
                        getProductCategoryPagination: getProductCategoryPagination,
                        createProductCategory: createProductCategory,
                        updateProductCategory: updateProductCategory,
                        deleteProductCategory: deleteProductCategory,

                        // Product Group
                        getProductGroupById: getProductGroupById,
                        getProductGroupPagination: getProductGroupPagination,
                        getProductGroupByProductId: getProductGroupByProductId,
                        createProductGroup: createProductGroup,
                        updateProductGroup: updateProductGroup,
                        deleteProductGroup: deleteProductGroup,
                        adjustQtyProductGroup: adjustQtyProductGroup,


                        // Production 
                        getProductionsPagination: dataRole?.permissions?.getProductionsPagination,
                        createProductions: dataRole?.permissions?.createProductions,
                        updateProductions: dataRole?.permissions?.updateProductions,
                        deleteProductions: dataRole?.permissions?.deleteProductions,
                        approveProductions: dataRole?.permissions?.approveProductions,
                        completeProduction: dataRole?.permissions?.completeProduction,

                        // Purchase Rawmaterial 
                        getPurchaseRawMaterialPagination: dataRole?.permissions?.getPurchaseRawMaterialPagination,
                        createPurchaseRawMaterial: dataRole?.permissions?.createPurchaseRawMaterial,
                        updatePurchaseRawMaterial: dataRole?.permissions?.updatePurchaseRawMaterial,
                        deletePurchaseRawMaterial: dataRole?.permissions?.deletePurchaseRawMaterial,
                        approvePurchaseRawMaterial: dataRole?.permissions?.approvePurchaseRawMaterial,
                        completePurchaseRawMaterial: dataRole?.permissions?.completePurchaseRawMaterial,

                        // RawMaterial
                        getRawMaterialPagination: dataRole?.permissions?.getRawMaterialPagination,
                        createRawMaterial: dataRole?.permissions?.createRawMaterial,
                        updateRawMaterial: dataRole?.permissions?.updateRawMaterial,
                        deleteRawMaterial: dataRole?.permissions?.deleteRawMaterial,
                        getRawMaterialCategoryPagination: dataRole?.permissions?.getRawMaterialCategoryPagination,
                        createRawMaterialCategory: dataRole?.permissions?.createRawMaterialCategory,
                        updateRawMaterialCategory: dataRole?.permissions?.updateRawMaterialCategory,
                        deleteRawMaterialCategory: dataRole?.permissions?.deleteRawMaterialCategory,
                        adjustQtyRawMaterial: dataRole?.permissions?.adjustQtyRawMaterial,

                        // sale 
                        getSalePagination: dataRole?.permissions?.getSalePagination,
                        getSaleById: dataRole?.permissions?.getSaleById,
                        getSale: dataRole?.permissions?.getSale,
                        createSale: dataRole?.permissions?.createSale,
                        updateSale: dataRole?.permissions?.updateSale,
                        deleteSale: dataRole?.permissions?.deleteSale,
                        voidInvoice: dataRole?.permissions?.voidInvoice,
                        
                        // Supplier            
                        getSuppliersPagination: dataRole?.permissions?.getSuppliersPagination,
                        getOweSupplier: dataRole?.permissions?.getOweSupplier,
                        createSupplier: dataRole?.permissions?.createSupplier,
                        updateSupplier: dataRole?.permissions?.updateSupplier,
                        deleteSupplier: dataRole?.permissions?.deleteSupplier,

                        // role
                        createRole: dataRole?.permissions?.createRole,
                        deleteRole: dataRole?.permissions?.deleteRole,
                        updateRole: dataRole?.permissions?.updateRole,
                        getRoleAndPermissionById: dataRole?.permissions?.getRoleAndPermissionById,
                        getRoleAndPermission: dataRole?.permissions?.getRoleAndPermission,

                        // report 
                        getSaleReport: dataRole?.permissions?.getSaleReport,
                        getProductionReport: dataRole?.permissions?.getProductionReport,
                        getInventoryStockReport: dataRole?.permissions?.getInventoryStockReport,
                        getRawMaterialReport: dataRole?.permissions?.getRawMaterialReport,

                         //unit
                         createUnit: dataRole?.permissions?.createUnit,
                         updateUnit: dataRole?.permissions?.updateUnit,
                         deleteUnit: dataRole?.permissions?.deleteUnit,

                    },
                },
            },
        });
    };


    React.useEffect(() => {
        handleUpdateRole();
    }, [
        getProductPagination,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductCategoryPagination,
        createProductCategory,
        updateProductCategory,
        deleteProductCategory,
        getProductGroupById,
        getProductGroupPagination,
        getProductGroupByProductId,
        createProductGroup,
        updateProductGroup,
        deleteProductGroup,
        adjustQtyProductGroup,
    ]);


    return(
        <TableBody>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getProductPagination ? true : false}
                            onChange={() => setGetProductPagination(!getProductPagination)}
                        />
                        }
                        label={getProductPagination ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Product Detials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getProductById ? true : false}
                            onChange={() => setGetProductById(!getProductById)}
                        />
                        }
                        label={getProductById ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={createProduct ? true : false}
                            onChange={() =>  setCreateProduct(!createProduct)}
                        />
                        }
                        label={createProduct ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={updateProduct ? true : false}
                            onChange={() =>  setUpdateProduct(!updateProduct)}
                        />
                        }
                        label={updateProduct ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>


            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={deleteProduct ? true : false}
                            onChange={() =>  setDeleteProduct(!deleteProduct)}
                        />
                        }
                        label={deleteProduct ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Category Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getProductCategoryPagination ? true : false}
                            onChange={() =>  setGetProductCategoryPagination(!getProductCategoryPagination)}
                        />
                        }
                        label={getProductCategoryPagination ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Category Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={createProductCategory ? true : false}
                            onChange={() =>  setCreateProductCategory(!createProductCategory)}
                        />
                        }
                        label={createProductCategory ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Category Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={updateProductCategory ? true : false}
                            onChange={() =>  setUpdateProductCategory(!updateProductCategory)}
                        />
                        }
                        label={updateProductCategory ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Category Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={deleteProductCategory ? true : false}
                            onChange={() =>  setDeleteProductCategory(!deleteProductCategory)}
                        />
                        }
                        label={deleteProductCategory ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            {/* 
                getProductGroupById           
            */}
            
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View ALL Group Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getProductGroupPagination ? true : false}
                            onChange={() => setGetProductGroupPagination(!getProductGroupPagination) }
                        />
                        }
                        label={getProductGroupPagination ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>


            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Group Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getProductGroupByProductId ? true : false}
                            onChange={() => setGetProductGroupByProductId(!getProductGroupByProductId) }
                        />
                        }
                        label={getProductGroupByProductId ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Adjust Qauntity Group Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={ adjustQtyProductGroup ? true : false}
                            onChange={() =>  setAdjustQtyProductGroup(!adjustQtyProductGroup)}
                        />
                        }
                        label={adjustQtyProductGroup ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Group Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={createProductGroup ? true : false}
                            onChange={() =>  setCreateProductGroup(!createProductGroup)}
                        />
                        }
                        label={createProductGroup ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Group Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={updateProductGroup ? true : false}
                            onChange={() =>  setUpdateProductGroup(!updateProductGroup)}
                        />
                        }
                        label={updateProductGroup ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Group Product</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={deleteProductGroup ? true : false}
                            onChange={() =>  setDeleteProductGroup(!deleteProductGroup)}
                        />
                        }
                        label={deleteProductGroup ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>


            
        </TableBody>
        
    );
}