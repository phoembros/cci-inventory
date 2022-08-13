import { gql } from "@apollo/client";

export const GET_RAW_MATERIAL_UNIT = gql`
  query Query {
    getRawMaterialsUnits
  }
`

export const GET_QUANTITY_ON_HAND = gql`
  query Query($storageRoomId: ID!, $rawMaterialId: ID!) {
    qtyOnHandRawMaterialByStorageRoom(storageRoomId: $storageRoomId, rawMaterialId: $rawMaterialId)
  }
`

export const GET_ADJUST_RAW_MATERIAL = gql`
  query GetAdjustRawMaterialById($rawMaterialId: ID!, $limit: Int!) {
    getAdjustRawMaterialById(rawMaterialId: $rawMaterialId, limit: $limit) {
      fistName
      lastName
      oldQtyValue
      newQtyValue
      remark
      createdAt
    }
  }
`

export const CREATE_RAW_CATEGORY = gql`
    mutation CreateRawMaterialCategory($newRawMaterialCategory: RawMaterialCategoryInput) {
        createRawMaterialCategory(newRawMaterialCategory: $newRawMaterialCategory) {
        success
        message
        data {
                _id
                categoryName
                remark
                updatedAt
                createdAt
            }
        }
    }
`


export const GET_RAW_GETEGORY_PAGINATION = gql`
query GetRawMaterialCategoryPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
    getRawMaterialCategoryPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
      rawMaterialCategory {
        _id
        categoryName
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

export const GET_RAW_MATERAIL_PAGINATION = gql`
query GetRawMaterialPagination($storageId: ID, $page: Int, $limit: Int, $keyword: String, $pagination: Boolean ,$sortField: [SortField] ) {
    getRawMaterialPagination(storageId: $storageId, page: $page, limit: $limit, keyword: $keyword, pagination: $pagination , sortField: $sortField ) {
      rawMaterial {
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
        unit
        unitPrice
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
export const UPDATE_RAW_CATEGORY = gql`
    mutation UpdateRawMaterialCategory($id: ID!, $rawMaterialCategoryEdit: RawMaterialCategoryInput) {
        updateRawMaterialCategory(_id: $id, rawMaterialCategoryEdit: $rawMaterialCategoryEdit) {
            success
            message
        }
    }
`

export const DELETE_CATEGORY = gql`
    mutation DeleteRawMaterialCategory($id: ID!) {
        deleteRawMaterialCategory(_id: $id) {
        success
        message
        }
    }
`
export const  CREATE_RAW_MATERAIL_CATEGORY = gql`
    mutation Mutation($newRawMaterialCategory: RawMaterialCategoryInput) {
        createRawMaterialCategory(newRawMaterialCategory: $newRawMaterialCategory) {
        success
        message
        }
    }
`
export const CREATE_RAW_MATERAIL =gql`
    mutation CreateRawMaterial($newRawMaterial: RawMaterialInput) {
        createRawMaterial(newRawMaterial: $newRawMaterial) {
        success
        message
        }
    }
`
export const UPDATE_RAW_MATERAIL = gql`
    mutation Mutation($id: ID!, $rawMaterialEdit: RawMaterialInput) {
        updateRawMaterial(_id: $id, rawMaterialEdit: $rawMaterialEdit) {
        success
        message
        }
    }
`
export const DELETE_RAW_MATERAIL = gql`
    mutation Mutation($id: ID!) {
        deleteRawMaterial(_id: $id) {
        success
        message
        }
    }
`

export const GET_PO_NUMBER = gql`
  query Query {
    getPOId
  }
`

export const GET_PO_NUMBER_CHANGE = gql`
  query Query($poId: String!) {
    checkExistingPoId(PoId: $poId)
  }
`


export const CREATE_PURCHASE_RAW_MATERIAL = gql`
  mutation CreatePurchaseRawMaterial($newPurchaseRawMaterial: PurchaseRawMaterialInput) {
    createPurchaseRawMaterial(newPurchaseRawMaterial: $newPurchaseRawMaterial) {
      success
      message      
      data {
        _id
        purchaseId
        PurchaseProduct
        purchaseDate
        purchaseBy {
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
          create_at
          update_at
          status
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
          type
        }
        supplierID {
          _id
          name
          email
        }
        productsItems {
          rawMaterialId {
            _id
            materialName
            unit
            unitPrice
            totalStockAmount
            usedStockAmount
          }
          newQty
          unitPrice
          rawName
          suppliersId {
            _id
            name
            email
            phoneNumber
            address
          }
          suppliersName
        }
        totalPayment
        paymentStatus
        paidAmount
        remark
        updatedAt
        createdAt
      }
    }
  }
`

export const UPDATE_PURCHASE_RAW_MATERIAL = gql`
  mutation UpdatePurchaseRawMaterial($id: ID!, $purchaseRawMaterialEdit: PurchaseRawMaterialInput) {
    updatePurchaseRawMaterial(_id: $id, PurchaseRawMaterialEdit: $purchaseRawMaterialEdit) {
      success
      message
      data {
        _id
        purchaseId
        PurchaseProduct
        purchaseDate
        purchaseBy {
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
          create_at
          update_at
          status
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
          type
        }
        supplierID {
          _id
          name
          email
        }
        productsItems {
          rawMaterialId {
            _id
            materialName
            unit
            unitPrice
            totalStockAmount
            usedStockAmount
          }
          newQty
          unitPrice
          rawName
          suppliersId {
            _id
            name
            email
            phoneNumber
            address
          }
          suppliersName
        }
        totalPayment
        paymentStatus
        paidAmount
        remark
        updatedAt
        createdAt
      }
    }
  }
`

export const DELETE_PURCHASE_RAW_MATERIAL = gql`
  mutation DeletePurchaseRawMaterial($id: ID!) {
    deletePurchaseRawMaterial(_id: $id) {
      success
      message
    }
  }
`

export const APPROVE_PURCHASE = gql`
  mutation ApprovePurchaseRawMaterial($id: ID!, $approveInput: ApproveRawMaterialInput) {
    approvePurchaseRawMaterial(_id: $id, approveInput: $approveInput) {
      success
      message
    }
  }
`

export const COMPLETE_PURCHASE = gql`
  mutation CompletePurchaseRawMaterial($id: ID!, $completedInput: CompletedRawMaterialInput) {
    completePurchaseRawMaterial(_id: $id, completedInput: $completedInput) {
      success
      message
    }
  }
`

export const ADJUST_QTY_RAW_MATERIAL = gql`
  mutation AdjustQtyRawMaterial($rawMaterialId: ID!, $qtyAdjust: Float , $remark: String , $storageRoomId: ID!) {
    adjustQtyRawMaterial(rawMaterialId: $rawMaterialId, qtyAdjust: $qtyAdjust , remark: $remark, storageRoomId: $storageRoomId) {
      success
      message    
    }
  }
`

export const GET_PURCHASE_RAW_MATERIAL_PAGINATION = gql`
  query GetPurchaseRawMaterialPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean, $priority: String, $status: String, $paymentStatus: [String]) {
    getPurchaseRawMaterialPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination, priority: $priority, status: $status, paymentStatus: $paymentStatus) {
      purchaseRawMaterial {
        _id
        purchaseId
        PurchaseProduct
        purchaseDate
        purchaseBy {
          _id
          first_name
          last_name
        }
        approveBy {
          _id
          first_name
          last_name
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
          type
          remark
        }
        supplierID {
          _id
          name
          email
          phoneNumber
        }
        productsItems {
          rawMaterialId {
            _id
            materialName
            category {
              _id
              categoryName
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
            address
          }
          suppliersName
          key
        }
        totalPayment
        paymentStatus
        paidAmount
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