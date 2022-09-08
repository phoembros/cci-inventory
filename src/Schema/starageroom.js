import {gql} from "@apollo/client";

export const GET_STORAGE_ROOM = gql`
  query Query {
    getStorageRoom {
      _id
      name
      address
      type
      remark
      updatedAt
      createdAt
    }
  }
`

export const GET_STORAGE_ROOM_PAGINATION = gql`
  query GetStorageRoomWithPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
    getStorageRoomWithPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
      storageRoom {
        _id
        name
        address
        type
        remark
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

export const GET_PURCHASE_RAW_MATERAIL_PAGINATION = gql`
query GetPurchaseRawMaterialPagination($storageId: ID!, $page: Int, $limit: Int, $keyword: String , $pagination: Boolean , $priority: String, $status: String , $paymentStatus: [String] ) {
  getPurchaseRawMaterialPagination(storageId: $storageId, page: $page, limit: $limit, keyword: $keyword, pagination: $pagination , priority: $priority, status: $status , paymentStatus: $paymentStatus ) {
    purchaseRawMaterial {
      _id
      purchaseId
      PurchaseProduct
      purchaseDate
      supplierID {
        _id
        name
        email
        phoneNumber
        address
        updatedAt
        createdAt
      }
      createdAt
      purchaseBy {
        _id
        first_name
        last_name
        gender
      }
      approveBy {
        _id
        first_name
        last_name
        gender
      }
      completedBy {
        _id
        first_name
        last_name
      }
      status
      priority
      storageRoom {
        _id
        name
        address
      }
      productsItems {
        rawMaterialId {
          _id
          materialName
          category {
            _id
            categoryName
            remark
          }
          totalStockAmount
          usedStockAmount
          unit
          unitPrice
          remark
        }
        newQty
        unitPrice
        rawName
        suppliersId {
          _id
          name
          email
          phoneNumber
        }
        suppliersName
        key
      }
      remark
      totalPayment
      paymentStatus
      paidAmount
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
export const GET_PRODUCT_STORAGE_ROOM_BY = gql`
  query GetProductByStorageRoomId($storageRoomId: ID) {
    getProductByStorageRoomId(storageRoomId: $storageRoomId) {
      _id
      category {
        categoryName
        remark
      }
      unit
      completedUnit
      unitPrice
      durationProduce
      totalQtyUM
      totalQtyUMSold
      totalStockAmount
      usedStockAmount
      ingredients {
        rawName
        rawMaterialId {
          _id
          materialName
          category {
            _id
            categoryName
            remark
            updatedAt
            createdAt
          }
          totalStockAmount
          usedStockAmount
          unit {
            _id
            unitName
          }
          unitPrice
          remark
          updatedAt
          createdAt
        }
        amount
        key
      }
      remark
      updatedAt
      createdAt
      productName
    }
  }
`
export const CREATE_STORAGE_ROOM = gql`
  mutation Mutation($newStorage: StorageRoomInput) {
    createStorageRoom(newStorage: $newStorage) {
      success
      message
    }
  }

`
export const UPDATE_STORAGE_ROOM = gql`
  mutation Mutation($id: ID!, $storageEdit: StorageRoomInput) {
    updateStorageRoom(_id: $id, storageEdit: $storageEdit) {
      success
      message
    }
  }
`
export const DELETE_STORAGE_ROOM = gql`
  mutation DeleteStorageRoom($id: ID!) {
    deleteStorageRoom(_id: $id) {
      success
      message
    }
  }
`

export const GET_STORAGE_ROOM_PRODUCT = gql`
  query GetStorageRoomProducts {
    getStorageRoomProducts {
      _id
      name
      address
      type
      remark
      updatedAt
      createdAt
    }
  }
`