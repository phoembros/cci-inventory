import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import {UPDATE_ROLE} from "../../Schema/role";
import { useMutation } from "@apollo/client";
import {useEffect} from "react";

export default function CustomerRole({dataRole, setRefetch}) {


    // Customer Hook
    const [getCustomerPagination , setGetCustomerPagination] = React.useState(dataRole?.permissions?.getCustomerPagination)
    const [getOweCustomer , setGetOweCustomer] = React.useState(dataRole?.permissions?.getOweCustomer)
    const [createCustomer , setCreateCustomer] = React.useState(dataRole?.permissions?.createCustomer)
    const [updateCustomer, setUpdateCustomer] = React.useState(dataRole?.permissions?.updateCustomer)
    const [deleteCustomer, setDeleteCustomer] = React.useState(dataRole?.permissions?.deleteCustomer)

    // Update Function
    const [updateRole, error] = useMutation(UPDATE_ROLE, {
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
                         createUser: dataRole?.permissions?.createUser,
                         deleteUser: dataRole?.permissions?.deleteUser,
                         disableUser: dataRole?.permissions?.disableUser,
                         updateUser: dataRole?.permissions?.updateUser,
 
                         // Customer
                         getCustomerPagination: getCustomerPagination,
                         getOweCustomer: getOweCustomer,
                         createCustomer: createCustomer,
                         updateCustomer: updateCustomer,
                         deleteCustomer: deleteCustomer,
 
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

                    },
                },
            },
        });
    };

    React.useEffect(() => {
        handleUpdateRole();
    },  [
        getCustomerPagination,
        getOweCustomer,
        createCustomer,
        updateCustomer,
        deleteCustomer,    
    ])


    return(
        <TableBody>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Customer</TableCell>
                            <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                        control={
                                        <Switch
                                            checked={getCustomerPagination ? true : false}
                                            onChange={() => setGetCustomerPagination(!getCustomerPagination)}
                                        />
                                        }
                                        label={getCustomerPagination ? "On" : "Off"}
                                    />                                                         
                    </TableCell>                                                                                     
            </TableRow>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Owe Customer</TableCell>
                            <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                        control={
                                        <Switch
                                            checked={getOweCustomer ? true : false}
                                            onChange={() => setGetOweCustomer(!getOweCustomer)}
                                        />
                                        }
                                        label={getOweCustomer ? "On" : "Off"}
                                    />                                                         
                    </TableCell>                                                                                     
            </TableRow>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Customer</TableCell>
                            <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                        control={
                                        <Switch
                                            checked={createCustomer ? true : false}
                                            onChange={() => setCreateCustomer(!createCustomer)}
                                        />
                                        }
                                        label={createCustomer ? "On" : "Off"}
                                    />                                                         
                    </TableCell>                                                                                     
            </TableRow>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Customer</TableCell>
                            <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                        control={
                                        <Switch
                                            checked={updateCustomer ? true : false}
                                            onChange={() => setUpdateCustomer(!updateCustomer)}
                                        />
                                        }
                                        label={updateCustomer ? "On" : "Off"}
                                    />                                                         
                    </TableCell>                                                                                     
            </TableRow>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Customer</TableCell>
                            <TableCell align="center" className="body-title">                                                
                            <FormControlLabel
                                        control={
                                        <Switch
                                            checked={deleteCustomer ? true : false}
                                            onChange={() => setDeleteCustomer(!deleteCustomer)}
                                        />
                                        }
                                        label={deleteCustomer ? "On" : "Off"}
                                    />                                                         
                    </TableCell>                                                                                     
            </TableRow>
            
        </TableBody>
    );
}