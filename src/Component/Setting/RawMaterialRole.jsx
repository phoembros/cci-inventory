import * as React from "react";
import { FormControlLabel, Switch, TableBody, TableCell, TableRow } from "@mui/material";
import { UPDATE_ROLE } from "../../Schema/role";
import { useMutation } from "@apollo/client";


export default function RawMaterialRole({dataRole , setRefetch}) {

  
    const [getRawMaterialPagination,setGetRawMaterialPagination] = React.useState(dataRole?.permissions?.getRawMaterialPagination)
    const [createRawMaterial,setCreateRawMaterial] = React.useState(dataRole?.permissions?.createRawMaterial)
    const [updateRawMaterial,setUpdateRawMaterial] = React.useState(dataRole?.permissions?.updateRawMaterial)
    const [deleteRawMaterial,setDeleteRawMaterial] = React.useState(dataRole?.permissions?.deleteRawMaterial)
    const [getRawMaterialCategoryPagination,setGetRawMaterialCategoryPagination] = React.useState(dataRole?.permissions?.getRawMaterialCategoryPagination)
    const [createRawMaterialCategory,setCreateRawMaterialCategory] = React.useState(dataRole?.permissions?.createRawMaterialCategory)
    const [updateRawMaterialCategory,setUpdateRawMaterialCategory] = React.useState(dataRole?.permissions?.updateRawMaterialCategory)
    const [deleteRawMaterialCategory,setDeleteRawMaterialCategory] = React.useState(dataRole?.permissions?.deleteRawMaterialCategory)
    const [adjustQtyRawMaterial,setAdjustQtyRawMaterial] = React.useState(dataRole?.permissions?.adjustQtyRawMaterial)

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
                        getRawMaterialPagination: getRawMaterialPagination,
                        createRawMaterial: createRawMaterial,
                        updateRawMaterial: updateRawMaterial,
                        deleteRawMaterial: deleteRawMaterial,
                        getRawMaterialCategoryPagination: getRawMaterialCategoryPagination,
                        createRawMaterialCategory: createRawMaterialCategory,
                        updateRawMaterialCategory: updateRawMaterialCategory,
                        deleteRawMaterialCategory: deleteRawMaterialCategory,
                        adjustQtyRawMaterial: adjustQtyRawMaterial,

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
        getRawMaterialPagination,
        createRawMaterial,
        updateRawMaterial,
        deleteRawMaterial,
        getRawMaterialCategoryPagination,
        createRawMaterialCategory,
        updateRawMaterialCategory,
        deleteRawMaterialCategory,
        adjustQtyRawMaterial,
    ]);


    return(
        <TableBody>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getRawMaterialPagination ? true : false}
                            onChange={() => setGetRawMaterialPagination(!getRawMaterialPagination)}
                        />
                        }
                        label={getRawMaterialPagination ? "On" : "Off"}
                    />                                                  
                </TableCell>                                            
            </TableRow>
            
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={createRawMaterial ? true : false}
                            onChange={() => setCreateRawMaterial(!createRawMaterial)}
                        />
                        }
                        label={createRawMaterial ? "On" : "Off"}
                    />                                          
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={updateRawMaterial ? true : false}
                            onChange={() => setUpdateRawMaterial(!updateRawMaterial)}
                        />
                        }
                        label={updateRawMaterial ? "On" : "Off"}
                    />                                               
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={deleteRawMaterial ? true : false}
                            onChange={() => setDeleteRawMaterial(!deleteRawMaterial)}
                        />
                        }
                        label={deleteRawMaterial ? "On" : "Off"}
                    />                                                  
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">View Category Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={getRawMaterialCategoryPagination ? true : false}
                            onChange={() => setGetRawMaterialCategoryPagination(!getRawMaterialCategoryPagination)}
                        />
                        }
                        label={getRawMaterialCategoryPagination ? "On" : "Off"}
                    />                                                  
                </TableCell>                                            
            </TableRow>
            
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Create Category Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={createRawMaterialCategory ? true : false}
                            onChange={() => setCreateRawMaterialCategory(!createRawMaterialCategory)}
                        />
                        }
                        label={createRawMaterialCategory ? "On" : "Off"}
                    />                                                 
                </TableCell>                                            
            </TableRow>
            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Update Category Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={updateRawMaterialCategory ? true : false}
                            onChange={() => setUpdateRawMaterialCategory(!updateRawMaterialCategory)}
                        />
                        }
                        label={updateRawMaterialCategory ? "On" : "Off"}
                    />                                                
                </TableCell>                                        
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Delete Category Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={deleteRawMaterialCategory ? true : false}
                            onChange={() => setDeleteRawMaterialCategory(!deleteRawMaterialCategory)}
                        />
                        }
                        label={deleteRawMaterialCategory ? "On" : "Off"}
                    />                                         
                </TableCell>                                            
            </TableRow>

            <TableRow className="body-row">
                <TableCell align="center" className="body-title">Adjust Qauntity Raw Materials</TableCell>
                <TableCell align="center" className="body-title">                                                
                    <FormControlLabel
                        control={
                        <Switch
                            checked={adjustQtyRawMaterial ? true : false}
                            onChange={() => setAdjustQtyRawMaterial(!adjustQtyRawMaterial)}
                        />
                        }
                        label={adjustQtyRawMaterial ? "On" : "Off"}
                    />                                         
                </TableCell>                                            
            </TableRow>
            

        </TableBody>
    );
}