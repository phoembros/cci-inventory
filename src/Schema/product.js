import {gql} from "@apollo/client";


export const GET_QUATITY_ON_HAND_PRODUCT = gql`
  query Query($storageRoomId: ID!, $productGroupId: ID!) {
    qtyOnHandProductByStorageRoom(storageRoomId: $storageRoomId, productGroupId: $productGroupId)
  }
`

export const GET_PRODUCT_CATEGORY = gql`
  query GetProductCategoryPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
    getProductCategoryPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
      ProductCategory {
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

export const CREATE_PRODUCT_CATEGORY = gql`
    mutation CreateProductCategory($newProductCategory: ProductCategoryInput) {
        createProductCategory(newProductCategory: $newProductCategory) {
        success
        message
        }
    }
`

export const UPDATE_PRODUCT_CATEGORY = gql`
    mutation UpdateProductCategory($id: ID!, $productCategoryEdit: ProductCategoryInput) {
        updateProductCategory(_id: $id, ProductCategoryEdit: $productCategoryEdit) {
        success
        message
        }
    }
`

export const DELETE_PRODUCT_CATEGORY = gql`
    mutation DeleteProductCategory($id: ID!) {
        deleteProductCategory(_id: $id) {
        success
        message
        }
    }
`

export const UPDATE_PRODUCT_GROUP = gql`
  mutation UpdateProductGroup($id: ID!, $productGroupEdit: ProductGroupInput) {
    updateProductGroup(_id: $id, ProductGroupEdit: $productGroupEdit) {
      success
      message
    }
  }
`

export const CREATE_PRODUCT_GROUP = gql`
  mutation CreateProductGroup($newProductGroup: ProductGroupInput) {
    createProductGroup(newProductGroup: $newProductGroup) {
      success
      message
    }
  }
`

export const DELETE_PRODUCT_GROUP = gql`
  mutation DeleteProductGroup($id: ID!) {
    deleteProductGroup(_id: $id) {
      success
      message
    }
  }
`

export const GET_PRODUCT_GROUP_PAGINATION = gql`
query CompletedQtyUM($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
  getProductGroupPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
    productGroups {
      _id
      name
      quantityPerStockUM
      unitPrice
      totalStockAmount
      totalSold
      updatedAt
      createdAt
      groupBy {
        _id
        productName
        productId
        category {
          _id
          categoryName
          remark
        }
        unit
        completedUnit
        unitPrice
        durationProduce
        totalStockAmount
        totalSoldAmount
        ingredients {
          rawName
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
          amount
          key
          unitRawMaterial
          percentage
        }
        remark
      }
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


export const GET_PRODUCT_GROUP_BYPRODUCT_ID = gql`
  query GetProductGroupByProductId($productId: ID!) {
    getProductGroupByProductId(ProductId: $productId) {
      _id
      quantityPerStockUM
      unitPrice
      name      
      totalSold
      totalStockAmount
      updatedAt
      createdAt
    }
  }
`


export const CREATE_PRODUCT = gql`
    mutation CreateProduct($newProduct: ProductInput) {
        createProduct(newProduct: $newProduct) {
        success
        message
        }
    }
`

export const GET_PRODUCT_UNIT =  gql`
    query Query {
        getProductsUnits
    }
`

export const GET_PRODUCTION_UNIT =  gql`
  query Query {
    getCompletedProductsUnits
  }
`

export const GET_PRODUCT_WITH_PAGINATION = gql`
query GetProductPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean , $sortField: [SortField] ) {
  getProductPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination , sortField: $sortField ) {
    products {
      _id
      productName
      productId
      category {
        _id
        categoryName
        remark
        updatedAt
        createdAt
      }
      unit
      completedUnit
      unitPrice
      durationProduce
      totalStockAmount
      totalSoldAmount
      ingredients {
        rawName
        rawMaterialId {
          _id
          materialName
          category {
            updatedAt
            _id
            categoryName
            remark
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
        amount
        key
        unitRawMaterial
        percentage
      }
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

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $productEdit: ProductInput) {
    updateProduct(_id: $id, ProductEdit: $productEdit) {
      success
      message
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(_id: $id) {
      success
      message
    }
  }
`


export const GET_PRODUCT_BYID = gql`
  query GetProductById($productId: ID!) {
    getProductById(ProductId: $productId) {
      _id
      productName
      productId
      category {
        _id
        categoryName
        remark
      }
      unit
      completedUnit
      unitPrice
      durationProduce
      totalStockAmount
      totalSoldAmount
      ingredients {
        rawName
        rawMaterialId {
          category {
            _id
            categoryName
            remark
          }
          _id
          materialName
          totalStockAmount
          usedStockAmount
          unit
          unitPrice
          remark
        }
        amount
        key
        unitRawMaterial
        percentage
      }
      remark
      updatedAt
      createdAt
    }
  }
`

export const ADJUST_QTY_PRODUCT_GROUP = gql`
  mutation AdjustQtyProductGroup($productGroupId: ID!, $qtyAdjust: Float, $remark: String , $storageRoomId: ID!) {
    adjustQtyProductGroup(productGroupId: $productGroupId, qtyAdjust: $qtyAdjust, remark: $remark , storageRoomId: $storageRoomId) {
      success
      message
    }
  }
`

export const GET_ADJUST_PRODUCT_GROUP = gql`
  query GetAdjustProductGroupById($productGroupId: ID!, $limit: Int!) {
    getAdjustProductGroupById(productGroupId: $productGroupId, limit: $limit) {
      fistName
      lastName
      oldQtyValue
      newQtyValue
      remark
      createdAt
    }
  }
`