import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import { useMutation } from "@apollo/client";
import { UPDATE_ROLE } from "../../Schema/role";

export default function ProductionRole({dataRole , setRefetch}) {

    const[getProductionsPagination,setGetProductionsPagination] = React.useState(dataRole?.permissions?.getProductionsPagination)
    const[createProductions,setCreateProductions] = React.useState(dataRole?.permissions?.createProductions)
    const[updateProductions,setUpdateProductions] = React.useState(dataRole?.permissions?.updateProductions)
    const[deleteProductions,setDeleteProductions] = React.useState(dataRole?.permissions?.deleteProductions)
    const[approveProductions,setApproveProductions] = React.useState(dataRole?.permissions?.approveProductions)
    const[completeProduction,setCompleteProduction] = React.useState(dataRole?.permissions?.completeProduction)

    // Update Function
    const [updateRole] = useMutation(UPDATE_ROLE, {
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
                        getProductionsPagination: getProductionsPagination,
                        createProductions: createProductions,
                        updateProductions: updateProductions,
                        deleteProductions: deleteProductions,
                        approveProductions: approveProductions,
                        completeProduction: completeProduction,

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
        getProductionsPagination,
        createProductions,
        updateProductions,
        deleteProductions,
        approveProductions,
        completeProduction,
    ]);
    

    return(
        <TableBody>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Production</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getProductionsPagination ? true : false}
                            onChange={() => setGetProductionsPagination(!getProductionsPagination)}
                        />
                        }
                        label={getProductionsPagination ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Production</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={createProductions ? true : false}
                            onChange={() => setCreateProductions(!createProductions)}
                        />
                        }
                        label={createProductions ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Production</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={updateProductions ? true : false}
                            onChange={() => setUpdateProductions(!updateProductions)}
                        />
                        }
                        label={updateProductions ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>


            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Production</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={deleteProductions ? true : false}
                            onChange={() => setDeleteProductions(!deleteProductions)}
                        />
                        }
                        label={deleteProductions ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Approve Production</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={approveProductions ? true : false}
                            onChange={() => setApproveProductions(!approveProductions)}
                        />
                        }
                        label={approveProductions ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Complete Production</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={completeProduction ? true : false}
                            onChange={() => setCompleteProduction(!completeProduction)}
                        />
                        }
                        label={completeProduction ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>

            
        </TableBody>
    );
}