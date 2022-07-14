import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import { UPDATE_ROLE } from "../../Schema/role";
import { useMutation } from "@apollo/client";

export default function SalesRole({dataRole , setRefetch}) {

    // console.log(dataRole)

    const[getSalePagination, setGetSalePagination] = React.useState(dataRole?.permissions?.getSalePagination)
    const[getSaleById, setGetSaleById] = React.useState(dataRole?.permissions?.getSaleById)    
    const[createSale, setCreateSale] = React.useState(dataRole?.permissions?.createSale)
    const[updateSale, setUpdateSale] = React.useState(dataRole?.permissions?.updateSale)
    const[deleteSale, setDeleteSale] = React.useState(dataRole?.permissions?.deleteSale)
    const[voidInvoice, setVoidInvoice] = React.useState(dataRole?.permissions?.voidInvoice)

    // Update Function
    const [updateRole] = useMutation(UPDATE_ROLE, {
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
                        getSalePagination: getSalePagination,
                        getSaleById: getSaleById,

                        getSale: dataRole?.permissions?.getSale,

                        createSale: createSale,
                        updateSale: updateSale,
                        deleteSale: deleteSale,
                        voidInvoice: voidInvoice,
                        
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
    }, [getSalePagination, 
        getSaleById,   
        createSale,
        updateSale,
        deleteSale,
        voidInvoice,
    ]);


    return(
        <TableBody>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Sale Invoice</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={getSalePagination ? true : false}
                                onChange={() => setGetSalePagination(!getSalePagination) }
                            />
                        }
                        label={getSalePagination ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Print Details Invoice </TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={getSaleById ? true : false}
                                onChange={() => setGetSaleById(!getSaleById) }
                            />
                        }
                        label={getSaleById ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Invoice</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={createSale ? true : false}
                                onChange={() => setCreateSale(!createSale) }
                            />
                        }
                        label={createSale ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            {/* <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Invoice</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ deleteSale ? true : false}
                                onChange={() => setDeleteSale(!deleteSale) }
                            />
                        }
                        label={deleteSale ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow> */}

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Make Payment Invoice</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ updateSale ? true : false}
                                onChange={() => setUpdateSale(!updateSale) }
                            />
                        }
                        label={updateSale ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Void Invoice</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                            <Switch
                                checked={ voidInvoice ? true : false}
                                onChange={() => setVoidInvoice(!voidInvoice) }
                            />
                        }
                        label={voidInvoice ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>
            

        </TableBody>
    );
}