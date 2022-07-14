import * as React from "react";
import {
  FormControlLabel,
  Switch,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { UPDATE_ROLE } from "../../Schema/role";
import { useMutation } from "@apollo/client";

export default function StorageRoomRole({ dataRole , setRefetch }) {

    console.log(dataRole)

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


    // hook
    const [getStorageRoomWithPagination,setGetStorageRoomWithPagination] = React.useState(dataRole?.permissions?.getStorageRoomWithPagination)
    const [createStorageRoom, setCreateStorageRoom] = React.useState(dataRole?.permissions?.createStorageRoom);
    const [updateStorageRoom, setUpdateStorageRoom] = React.useState(dataRole?.permissions?.updateStorageRoom);
    const [deleteStorageRoom, setDeleteStorageRoom] = React.useState(dataRole?.permissions?.deleteStorageRoom);
    const [getStorageRoomRawMaterials, setGetStorageRoomRawMaterials] = React.useState(dataRole?.permissions?.getStorageRoomRawMaterials);
    const [getStorageRoomProducts,setGetStorageRoomProducts] = React.useState(dataRole?.permissions?.getStorageRoomProducts)

    const [getProductByStorageRoomId,setGetProductByStorageRoomId] = React.useState(dataRole?.permissions?.getProductByStorageRoomId)
   
    const [getPurchaseRawMaterialPagination,setGetPurchaseRawMaterialPagination] = React.useState(dataRole?.permissions?.getPurchaseRawMaterialPagination)
    const [createPurchaseRawMaterial,setCreatePurchaseRawMaterial]  = React.useState(dataRole?.permissions?.createPurchaseRawMaterial)
    const [updatePurchaseRawMaterial,setUpdatePurchaseRawMaterial] = React.useState(dataRole?.permissions?.updatePurchaseRawMaterial)
    const [deletePurchaseRawMaterial,setDeletePurchaseRawMaterial] = React.useState(dataRole?.permissions?.deletePurchaseRawMaterial)
    const [approvePurchaseRawMaterial,setApprovePurchaseRawMaterial] = React.useState(dataRole?.permissions?.approvePurchaseRawMaterial)
    const [completePurchaseRawMaterial,setCompletePurchaseRawMaterial] = React.useState(dataRole?.permissions?.completePurchaseRawMaterial)


    console.log(getProductByStorageRoomId)
    // funciton update
    const handleUpdateRole = () => {
        updateRole({
            variables: {
                id: dataRole?._id,
                newRole: {
                    permissions: {

                        // StorageRoom
                        createStorageRoom: createStorageRoom,
                        updateStorageRoom: updateStorageRoom,
                        deleteStorageRoom: deleteStorageRoom,
                        getStorageRoomWithPagination: getStorageRoomWithPagination,
                        getStorageRoomRawMaterials: getStorageRoomRawMaterials,
                        getStorageRoomProducts: getStorageRoomProducts,           
                        
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

                        getProductByStorageRoomId: getProductByStorageRoomId,

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
                        getPurchaseRawMaterialPagination: getPurchaseRawMaterialPagination,
                        createPurchaseRawMaterial: createPurchaseRawMaterial,
                        updatePurchaseRawMaterial: updatePurchaseRawMaterial,
                        deletePurchaseRawMaterial: deletePurchaseRawMaterial,
                        approvePurchaseRawMaterial: approvePurchaseRawMaterial,
                        completePurchaseRawMaterial: completePurchaseRawMaterial,

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
    }, [createStorageRoom , 
        updateStorageRoom, 
        deleteStorageRoom , 
        getStorageRoomWithPagination , 
        getStorageRoomRawMaterials , 
        getStorageRoomProducts,
        getPurchaseRawMaterialPagination,
        getProductByStorageRoomId,
        createPurchaseRawMaterial,
        updatePurchaseRawMaterial,
        deletePurchaseRawMaterial,
        approvePurchaseRawMaterial,
        completePurchaseRawMaterial,
     ]);

   

    return (
        <TableBody>
        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Create Storage Room
            </TableCell>
            <TableCell align="center" className="body-title">
            <FormControlLabel
                control={
                <Switch
                    checked={createStorageRoom ? true : false}
                    onChange={() => setCreateStorageRoom(!createStorageRoom)}
                />
                }
                label={createStorageRoom ? "On" : "Off"}
            />
            </TableCell>
        </TableRow>

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Update Storage Room
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                    <Switch
                        checked={ updateStorageRoom ? true : false}
                        onChange={() => setUpdateStorageRoom(!updateStorageRoom)}
                    />
                    }
                    label={updateStorageRoom ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        
        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Delete Storage Room
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ deleteStorageRoom ? true : false}
                            onChange={() => setDeleteStorageRoom(!deleteStorageRoom)}
                        />
                    }
                    label={ deleteStorageRoom ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>
        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                View Storage Room
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ getStorageRoomWithPagination ? true : false}
                            onChange={() => setGetStorageRoomWithPagination(!getStorageRoomWithPagination)}
                        />
                    }
                    label={ getStorageRoomWithPagination ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>
        
        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                View Product in Storage Room
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ getProductByStorageRoomId ? true : false}
                            onChange={() => setGetProductByStorageRoomId(!getProductByStorageRoomId)}
                        />
                    }
                    label={ getProductByStorageRoomId ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                View Raw Material in Storage Room
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ getStorageRoomRawMaterials ? true : false}
                            onChange={() => setGetStorageRoomRawMaterials(!getStorageRoomRawMaterials)}
                        />
                    }
                    label={ getStorageRoomRawMaterials ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                View Storage Room In Production
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ getStorageRoomProducts ? true : false}
                            onChange={() => setGetStorageRoomProducts(!getStorageRoomProducts)}
                        />
                    }
                    label={ getStorageRoomProducts ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                View Purchase Raw Material
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ getPurchaseRawMaterialPagination ? true : false}
                            onChange={() => setGetPurchaseRawMaterialPagination(!getPurchaseRawMaterialPagination)}
                        />
                    }
                    label={ getPurchaseRawMaterialPagination ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        {/* Purchase */}

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Create Purchase Raw Material
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ createPurchaseRawMaterial ? true : false}
                            onChange={() => setCreatePurchaseRawMaterial(!createPurchaseRawMaterial)}
                        />
                    }
                    label={ createPurchaseRawMaterial ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Update Purchase Raw Material
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ updatePurchaseRawMaterial ? true : false}
                            onChange={() => setUpdatePurchaseRawMaterial(!updatePurchaseRawMaterial)}
                        />
                    }
                    label={ updatePurchaseRawMaterial ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Void Purchase Raw Material
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ deletePurchaseRawMaterial ? true : false}
                            onChange={() => setDeletePurchaseRawMaterial(!deletePurchaseRawMaterial)}
                        />
                    }
                    label={ deletePurchaseRawMaterial ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>

        
        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Approve Purchase Raw Material
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ approvePurchaseRawMaterial ? true : false}
                            onChange={() => setApprovePurchaseRawMaterial(!approvePurchaseRawMaterial)}
                        />
                    }
                    label={ approvePurchaseRawMaterial ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>
        
        <TableRow className="body-row">
            <TableCell align="center" className="body-title">
                Complete Purchase Raw Material
            </TableCell>
            <TableCell align="center" className="body-title">
                <FormControlLabel
                    control={
                        <Switch
                            checked={ completePurchaseRawMaterial ? true : false}
                            onChange={() => setCompletePurchaseRawMaterial(!completePurchaseRawMaterial)}
                        />
                    }
                    label={ completePurchaseRawMaterial ? "On" : "Off"}
                />
            </TableCell>
        </TableRow>
      

    </TableBody>
            
    );
}
