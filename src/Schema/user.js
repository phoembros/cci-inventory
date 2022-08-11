import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUsers {
    getUsers {
      _id
      first_name
      last_name
      gender
      email
      password
      phone_umber
      image_name
      image_src
      birthOfDate
      role_and_permission {
        _id
        role
        Permissions {
          createUser
          deleteUser
          disableUser
          updateUser
        }
      }
      create_at
      update_at
      status
    }
  }
`;

export const GET_USER_PAGINATION = gql`
query GetUsersPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
  getUsersPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
    users {
      _id
      first_name
      last_name
      gender
      email
      password
      phone_number
      image_name
      image_src
      birthOfDate
      role_and_permission {
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
          getUsersPagination
          getCustomerPagination
          getOweCustomer
          createCustomer
          updateCustomer
          deleteCustomer
          getProductPagination
          getProductById
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
          adjustQtyRawMaterial
          getProductGroupById
          getProductGroupPagination
          getProductGroupByProductId
          createProductGroup
          updateProductGroup
          deleteProductGroup
          adjustQtyProductGroup
          getRawMaterialReport
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
      create_at
      update_at
      status
    }
    paginator {
      slNo
      prev
      next
      perPage
      totalPosts
      totalPages
      currentPage
      hasPrevPage
      hasNextPage
      totalDocs
    }
  }
}
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(_id: $id) {
      success
      message      
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($newUser: createUserInput) {
    createUser(newUser: $newUser) {
      success
      message
    }
  }
`;
export const UPDATE_USER = gql`
  mutation Mutation($id: String!, $userUpdate: updateUserInput) {
    updateUser(_id: $id, userUpdate: $userUpdate) {
      success
      message
    }
  }
`;

export const GET_USER_LOGIN = gql`
query GetuserLogin {
  getuserLogin {
    _id
    first_name
    last_name
    gender
    email
    password
    phone_number
    image_name
    image_src
    birthOfDate
    role_and_permission {
      _id
      role
      permissions {
        getTopRawMaterial
        getInvoiceOweAndUnpaid
        getBarChart
        getUsersPagination
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
        adjustQtyRawMaterial
        getProductGroupById
        getProductGroupPagination
        getProductGroupByProductId
        createProductGroup
        updateProductGroup
        deleteProductGroup
        adjustQtyProductGroup
        getRawMaterialReport
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
    create_at
    update_at
    status
  }
}
`;

export const GET_USER_BYID = gql`
query GetUserById($id: ID!) {
  getUserById(_id: $id) {
    _id
    first_name
    last_name
    gender
    email
    password
    phone_number
    image_name
    image_src
    birthOfDate
    status
  }
}
`

export const GET_USER_ACTION = gql`
query GetUserActionWithPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean , $sortField: [SortField] , $dateFilter: Date ) {
  getUserActionWithPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination, sortField: $sortField , dateFilter: $dateFilter ) {
    userAction {
      _id
      createdBy {
        _id
        first_name
        last_name
        gender
        email
        password
        phone_number
        image_name
        image_src
        birthOfDate
        role_and_permission {
          _id
          role
          permissions {
            getTopRawMaterial
            getInvoiceOweAndUnpaid
            getBarChart
            getUsersPagination
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
            createProduct
            updateProduct
            deleteProduct
            getProductCategoryPagination
            createProductCategory
            updateProductCategory
            deleteProductCategory
            getProductGroupById
            getProductGroupPagination
            getProductGroupByProductId
            createProductGroup
            updateProductGroup
            deleteProductGroup
            adjustQtyProductGroup
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
            adjustQtyRawMaterial
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
            getRawMaterialReport
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
        status
        update_at
        create_at
      }
      action
      actionType
      actionOn
      updatedAt
      createdAt
    }
    paginator {
      slNo
      prev
      next
      perPage
      totalPosts
      totalPages
      currentPage
      hasPrevPage
      hasNextPage
      totalDocs
    }
  }
}
`