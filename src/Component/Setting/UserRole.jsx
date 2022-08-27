import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import {UPDATE_ROLE} from "../../Schema/role";
import { useMutation } from "@apollo/client";


export default function UserRole({dataRole, setRefetch}) {

    // User Hook
    const [getUsersPagination,setGetUsersPagination] = React.useState(dataRole?.permissions?.getUsersPagination)
    const [createUser,setCreateUser] = React.useState(dataRole?.permissions?.createUser)
    const [deleteUser,setDeleteUser] = React.useState(dataRole?.permissions?.deleteUser)
    const [disableUser,setDisableUser] = React.useState(dataRole?.permissions?.disableUser)
    const [updateUser,setUpdateUser] = React.useState(dataRole?.permissions?.updateUser)

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
                        getUsersPagination: getUsersPagination,
                        createUser: createUser,
                        deleteUser: deleteUser,
                        disableUser: disableUser,
                        updateUser: updateUser,

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
        getUsersPagination,
        createUser,
        deleteUser,
        disableUser,
        updateUser,
    ])



    return(

        <TableBody>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View User</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ getUsersPagination ? true : false}
                                onChange={() => setGetUsersPagination(!getUsersPagination)}
                            />
                        }
                        label={getUsersPagination ? "On" : "Off"}
                    />                                                       
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create User</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ createUser ? true : false}
                                onChange={() => setCreateUser(!createUser)}
                            />
                        }
                        label={createUser ? "On" : "Off"}
                    />                                                       
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete User</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ deleteUser ? true : false}
                                onChange={() => setDeleteUser(!deleteUser)}
                            />
                        }
                        label={deleteUser ? "On" : "Off"}
                    />                                                       
                </TableCell>                                            
            </TableRow>

            {/* <TableRow className="body-row">
                <TableCell align="center" className="body-title">Disable User</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={disableUser ? true : false}
                                onChange={() => setDisableUser(!disableUser)}
                            />
                        }
                        label={disableUser ? "On" : "Off"}
                    />                                                       
                </TableCell>                                            
            </TableRow> */}

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update User</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={updateUser ? true : false}
                                onChange={() => setUpdateUser(!updateUser)}
                            />
                        }
                        label={updateUser ? "On" : "Off"}
                    />                                                       
                </TableCell>                                            
            </TableRow>
            
        </TableBody>
    );
}