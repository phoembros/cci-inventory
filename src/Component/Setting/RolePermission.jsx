import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_ROLE } from "../../Schema/role";
import { useEffect } from "react";

export default function RolePermission({setRefetch , dataRole}) {

    console.log(dataRole)

    const [createRole,setCreateRole] = React.useState(dataRole?.permissions?.createRole)
    const [deleteRole,setDeleteRole] = React.useState(dataRole?.permissions?.deleteRole)
    const [updateRoles,setUpdateRoles] = React.useState(true)
    const [getRoleAndPermissionById,setGetRoleAndPermissionById] = React.useState(true)
    const [getRoleAndPermission,setGetRoleAndPermission] = React.useState(true)

    const [createUnit,setCreateUnit] = React.useState(dataRole?.permissions?.createUnit)
    const [updateUnit,setUpdateUnit] = React.useState(dataRole?.permissions?.updateUnit)
    const [deleteUnit,setDeleteUnit] = React.useState(dataRole?.permissions?.deleteUnit)

    // Update Function
    const [updateRole, error] = useMutation(UPDATE_ROLE, {
        onCompleted: ({ updateRole }) => {
            console.log(updateRole);
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
                        getProductPagination: dataRole?.permissions?.getProductPagination,
                        getProductById: dataRole?.permissions?.getProductById,
                        getProductByStorageRoomId: dataRole?.permissions?.getProductByStorageRoomId,
                        createProduct: dataRole?.permissions?.createProduct,
                        updateProduct: dataRole?.permissions?.updateProduct,
                        deleteProduct: dataRole?.permissions?.deleteProduct,
                        getProductCategoryPagination: dataRole?.permissions?.getProductCategoryPagination,
                        createProductCategory: dataRole?.permissions?.createProductCategory,
                        updateProductCategory: dataRole?.permissions?.updateProductCategory,
                        deleteProductCategory: dataRole?.permissions?.deleteProductCategory,

                        // Product Group
                        getProductGroupById: dataRole?.permissions?.getProductGroupById,
                        getProductGroupPagination: dataRole?.permissions?.getProductGroupPagination,
                        getProductGroupByProductId: dataRole?.permissions?.getProductGroupByProductId,
                        createProductGroup: dataRole?.permissions?.createProductGroup,
                        updateProductGroup: dataRole?.permissions?.updateProductGroup,
                        deleteProductGroup: dataRole?.permissions?.deleteProductGroup,
                        adjustQtyProductGroup: dataRole?.permissions?.adjustQtyProductGroup,


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
                        createRole: createRole,
                        deleteRole: deleteRole,
                        updateRole: updateRoles,
                        getRoleAndPermissionById: getRoleAndPermissionById,
                        getRoleAndPermission: getRoleAndPermission,

                        // report 
                        getSaleReport: dataRole?.permissions?.getSaleReport,
                        getProductionReport: dataRole?.permissions?.getProductionReport,
                        getInventoryStockReport: dataRole?.permissions?.getInventoryStockReport,
                        getRawMaterialReport: dataRole?.permissions?.getRawMaterialReport,

                        //unit
                        createUnit: createUnit,
                        updateUnit: updateUnit,
                        deleteUnit: deleteUnit,

                    },
                },
            },
        });
    };

    React.useEffect(() => {
        handleUpdateRole();
    }, [
        createRole,
        deleteRole, 
        updateRoles, 
        createUnit,
        updateUnit,
        deleteUnit,
    ])


    return (
        <>
            <TableBody>

                <TableRow className="body-row">
                    <TableCell align="center" className="body-title">Create Role</TableCell>
                    <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={createRole ? true : false}
                                    onChange={() => setCreateRole(!createRole)}
                                />
                                }
                                label={createRole ? "On" : "Off"}
                            />                                                 
                    </TableCell>                                            
                </TableRow>   

                <TableRow className="body-row">
                    <TableCell align="center" className="body-title">Delete Role</TableCell>
                    <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={deleteRole ? true : false}
                                    onChange={() => setDeleteRole(!deleteRole)}
                                />
                                }
                                label={deleteRole ? "On" : "Off"}
                            />                                                 
                    </TableCell>                                            
                </TableRow>   

                {/* <TableRow className="body-row">
                    <TableCell align="center" className="body-title">Update Role</TableCell>
                    <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={updateRoles ? true : false}
                                    onChange={() => setUpdateRoles(!updateRoles)}
                                />
                                }
                                label={updateRoles ? "On" : "Off"}
                            />                                                 
                    </TableCell>                                            
                </TableRow> */}


                <TableRow className="body-row">
                    <TableCell align="center" className="body-title">Create Unit </TableCell>
                    <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={createUnit ? true : false}
                                    onChange={() => setCreateUnit(!createUnit)}
                                />
                                }
                                label={createUnit ? "On" : "Off"}
                            />                                                 
                    </TableCell>                                            
                </TableRow> 

                <TableRow className="body-row">
                    <TableCell align="center" className="body-title">Update Unit </TableCell>
                    <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={updateUnit ? true : false}
                                    onChange={() => setUpdateUnit(!updateUnit)}
                                />
                                }
                                label={updateUnit ? "On" : "Off"}
                            />                                                 
                    </TableCell>                                            
                </TableRow> 

                <TableRow className="body-row">
                    <TableCell align="center" className="body-title">Delete Unit </TableCell>
                    <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                control={
                                <Switch
                                    checked={deleteUnit ? true : false}
                                    onChange={() => setDeleteUnit(!deleteUnit)}
                                />
                                }
                                label={deleteUnit ? "On" : "Off"}
                            />                                                 
                    </TableCell>                                            
                </TableRow> 
                

            </TableBody>
        </>
    )
}