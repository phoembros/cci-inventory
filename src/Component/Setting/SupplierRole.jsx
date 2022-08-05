import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import {UPDATE_ROLE} from "../../Schema/role";
import { useMutation } from "@apollo/client";

export default function SupplierRole({dataRole, setRefetch}) {

    // console.log(dataRole ,"supplies")

    // Supplier Hook
    const [getSuppliersPagination, setGetSuppliersPagination] = React.useState(dataRole?.permissions?.getSuppliersPagination)
    const [getOweSupplier, setGetOweSupplier] = React.useState(dataRole?.permissions?.getOweSupplier)
    const [createSupplier, setCreateSupplier] = React.useState(dataRole?.permissions?.createSupplier)
    const [updateSupplier, setUpdateSupplier] = React.useState(dataRole?.permissions?.updateSupplier)
    const [deleteSupplier, setDeleteSupplier] = React.useState(dataRole?.permissions?.deleteSupplier)

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
                        getStorageRoomRawMaterials:dataRole?.permissions?.getStorageRoomRawMaterials,
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
                        getSuppliersPagination: getSuppliersPagination,
                        getOweSupplier: getOweSupplier,
                        createSupplier: createSupplier,
                        updateSupplier: updateSupplier,
                        deleteSupplier: deleteSupplier,

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
    }, [
        getSuppliersPagination,
        getOweSupplier,
        createSupplier,
        updateSupplier,
        deleteSupplier,
     ]);




    return(
        <TableBody>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Supplier</TableCell>
                <TableCell align="center" className="body-title"> 
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getSuppliersPagination ? true : false}
                            onChange={() => setGetSuppliersPagination(!getSuppliersPagination)}
                        />
                        }
                        label={getSuppliersPagination ? "On" : "Off"}
                    />                                                                                                
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Owe Supplier</TableCell>
                <TableCell align="center" className="body-title">                                                
                <FormControlLabel
                            control={
                            <Switch
                                checked={getOweSupplier ? true : false}
                                onChange={() => setGetOweSupplier(!getOweSupplier)}
                            />
                            }
                            label={getOweSupplier ? "On" : "Off"}
                        />                                                         
                </TableCell>                                            
            </TableRow>
            
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Supplier</TableCell>
                <TableCell align="center" className="body-title">                                                
                <FormControlLabel
                            control={
                                <Switch
                                    checked={createSupplier ? true : false}
                                    onChange={() => setCreateSupplier(!createSupplier)}
                                />
                            }
                            label={createSupplier ? "On" : "Off"}
                        />                                                         
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Supplier</TableCell>
                <TableCell align="center" className="body-title">                                                
                <FormControlLabel
                            control={
                                <Switch
                                    checked={ updateSupplier ? true : false}
                                    onChange={() => setUpdateSupplier(!updateSupplier)}
                                />
                            }
                            label={ updateSupplier ? "On" : "Off"}
                        />                                                         
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Suppier</TableCell>
                <TableCell align="center" className="body-title">                                                
                <FormControlLabel
                            control={
                            <Switch
                                checked={deleteSupplier ? true : false}
                                onChange={() => setDeleteSupplier(!deleteSupplier)}
                            />
                            }
                            label={deleteSupplier ? "On" : "Off"}
                        />                                                         
                </TableCell>                                            
            </TableRow>
            
            
        </TableBody>
    );
}