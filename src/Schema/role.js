import { gql } from "@apollo/client";

export const CREATE_ROLE = gql`
    mutation CreateRole($newRole: RoleAndPermissionInput) {
        createRole(newRole: $newRole) {
        success
        message
        }
    }
`

export const GET_ROLE_PERMISSION = gql`
query GetRoleAndPermission {
  getRoleAndPermission {
    _id
    role
    permissions {
      getTopRawMaterial
      getInvoiceOweAndUnpaid
      getBarChart
      createUser
      deleteUser
      disableUser
      updateUser
      getCustomerPagination
      getOweCustomer
      createCustomer
      updateCustomer
      deleteCustomer
      getProductPagination
      getProductById
      getUsersPagination
      getProductByStorageRoomId
      createProduct
      updateProduct
      deleteProduct
      getProductCategoryPagination
      createProductCategory
      updateProductCategory
      deleteProductCategory
      getProductionsPagination
      createProductions
      updateProductions
      deleteProductions
      approveProductions
      completeProduction
      getPurchaseRawMaterialPagination
      createPurchaseRawMaterial
      updatePurchaseRawMaterial
      deletePurchaseRawMaterial
      approvePurchaseRawMaterial
      completePurchaseRawMaterial
      getRawMaterialPagination
      createRawMaterial
      updateRawMaterial
      deleteRawMaterial
      getRawMaterialCategoryPagination
      createRawMaterialCategory
      updateRawMaterialCategory
      deleteRawMaterialCategory
      getSalePagination
      getSaleById
      getSale
      createSale
      updateSale
      deleteSale
      voidInvoice
      getStorageRoomWithPagination
      getStorageRoomRawMaterials
      getStorageRoomProducts
      createStorageRoom
      updateStorageRoom
      deleteStorageRoom
      getSuppliersPagination
      getOweSupplier
      createSupplier
      updateSupplier
      deleteSupplier
      getRoleAndPermission
      getRoleAndPermissionById
      createRole
      updateRole
      deleteRole
      getSaleReport
      getProductionReport
      getInventoryStockReport
    }
    paths {
      user
      storageRoom
      storageRoom_purhcase
      rawMaterial
      rawMaterial_categories
      product
      product_categories
      sales
      sales_customer
      production
      supplies
      report
      system_setting
    }
  }
}
`

export const GET_ROLE_BYID = gql`
query GetRoleAndPermissionById($id: ID!) {
  getRoleAndPermissionById(_id: $id) {
    _id
    role
    permissions {
      getTopRawMaterial
      getInvoiceOweAndUnpaid
      getBarChart
      createUser
      deleteUser
      disableUser
      updateUser
      getCustomerPagination
      getOweCustomer
      createCustomer
      updateCustomer
      deleteCustomer
      getProductPagination
      getProductById
      getProductByStorageRoomId
      getUsersPagination
      createProduct
      updateProduct
      deleteProduct
      getProductCategoryPagination
      createProductCategory
      updateProductCategory
      deleteProductCategory
      getProductionsPagination
      createProductions
      updateProductions
      deleteProductions
      approveProductions
      completeProduction
      getPurchaseRawMaterialPagination
      createPurchaseRawMaterial
      updatePurchaseRawMaterial
      deletePurchaseRawMaterial
      approvePurchaseRawMaterial
      completePurchaseRawMaterial
      getRawMaterialPagination
      createRawMaterial
      updateRawMaterial
      deleteRawMaterial
      getRawMaterialCategoryPagination
      createRawMaterialCategory
      updateRawMaterialCategory
      deleteRawMaterialCategory
      getSalePagination
      getSaleById
      getSale
      createSale
      updateSale
      deleteSale
      voidInvoice
      getStorageRoomWithPagination
      getStorageRoomRawMaterials
      getStorageRoomProducts
      createStorageRoom
      updateStorageRoom
      deleteStorageRoom
      getSuppliersPagination
      getOweSupplier
      createSupplier
      updateSupplier
      deleteSupplier
      getRoleAndPermission
      getRoleAndPermissionById
      createRole
      updateRole
      deleteRole
      getSaleReport
      getProductionReport
      getInventoryStockReport
    }
    paths {
      user
      storageRoom
      storageRoom_purhcase
      rawMaterial
      rawMaterial_categories
      product
      product_categories
      sales
      sales_customer
      production
      supplies
      report
      system_setting
    }
  }
}
`

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $newRole: RoleAndPermissionInput) {
    updateRole(_id: $id, newRole: $newRole) {
      success
      message
    }
  }
`