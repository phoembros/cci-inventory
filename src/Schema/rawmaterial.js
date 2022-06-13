import { gql } from "@apollo/client";

export const GET_RAW_MATERIAL_UNIT = gql`
  query Query {
    getRawMaterialsUnits
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
query GetRawMaterialPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
    getRawMaterialPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
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

export const CREATE_PURCHASE_RAW_MATERIAL = gql`
  mutation CreatePurchaseRawMaterial($newPurchaseRawMaterial: PurchaseRawMaterialInput) {
    createPurchaseRawMaterial(newPurchaseRawMaterial: $newPurchaseRawMaterial) {
      success
      message
    }
  }
`

export const UPDATE_PURCHASE_RAW_MATERIAL = gql`
  mutation UpdatePurchaseRawMaterial($id: ID!, $purchaseRawMaterialEdit: PurchaseRawMaterialInput) {
    updatePurchaseRawMaterial(_id: $id, PurchaseRawMaterialEdit: $purchaseRawMaterialEdit) {
      success
      message
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