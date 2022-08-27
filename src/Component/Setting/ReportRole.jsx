import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_ROLE } from "../../Schema/role";
import { useEffect } from "react";

export default function ReportRole({dataRole, setRefetch}) {

    // Report Hook
    const [getSaleReport, setGetSaleReport] = React.useState(dataRole?.permissions?.getSaleReport)
    const [getProductionReport, setGetProductionReport] = React.useState(dataRole?.permissions?.getProductionReport)
    const [getInventoryStockReport, setGetInventoryStockReport] = React.useState(dataRole?.permissions?.getInventoryStockReport)
    const [getRawMaterialReport,setGetRawMaterialReport] = React.useState(dataRole?.permissions?.getRawMaterialReport)

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
                        createRole: dataRole?.permissions?.createRole,
                        deleteRole: dataRole?.permissions?.deleteRole,
                        updateRole: dataRole?.permissions?.updateRole,
                        getRoleAndPermissionById: dataRole?.permissions?.getRoleAndPermissionById,
                        getRoleAndPermission: dataRole?.permissions?.getRoleAndPermission,

                        // report 
                        getSaleReport: getSaleReport,
                        getProductionReport: getProductionReport,
                        getInventoryStockReport:getInventoryStockReport ,
                        getRawMaterialReport: getRawMaterialReport,

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
        getSaleReport,
        getProductionReport,
        getInventoryStockReport,
        getRawMaterialReport,
    ])
    

    return(

        <>

        <TableBody>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Sale Report</TableCell>
                <TableCell align="center" className="body-title">                                                
                        <FormControlLabel
                            control={
                            <Switch
                                checked={getSaleReport ? true : false}
                                onChange={() => setGetSaleReport(!getSaleReport)}
                            />
                            }
                            label={getSaleReport ? "On" : "Off"}
                        />                                                 
                </TableCell>                                            
            </TableRow>            
        </TableBody>

        <TableBody>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Raw Material Report</TableCell>
                <TableCell align="center" className="body-title">                                                
                        <FormControlLabel
                            control={
                            <Switch
                                checked={getRawMaterialReport ? true : false}
                                onChange={() => setGetRawMaterialReport(!getRawMaterialReport)}
                            />
                            }
                            label={getRawMaterialReport ? "On" : "Off"}
                        />                                                 
                </TableCell>                                            
            </TableRow>            
        </TableBody>


        <TableBody>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Production Report</TableCell>
                <TableCell align="center" className="body-title">                                                
                <FormControlLabel
                            control={
                            <Switch
                                checked={getProductionReport ? true : false}
                                onChange={() => setGetProductionReport(!getProductionReport)}
                            />
                            }
                            label={getProductionReport ? "On" : "Off"}
                        />                                                        
                </TableCell>                                            
            </TableRow>            
        </TableBody>

        <TableBody>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Inventory Stock</TableCell>
                <TableCell align="center" className="body-title">                                                
                <FormControlLabel
                            control={
                            <Switch
                                checked={getInventoryStockReport ? true : false}
                                onChange={() => setGetInventoryStockReport(!getInventoryStockReport)}
                            />
                            }
                            label={getInventoryStockReport ? "On" : "Off"}
                        />                                                        
                </TableCell>                                            
            </TableRow>
            
        </TableBody>

        </>
        
    );
}