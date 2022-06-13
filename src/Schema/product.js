import {gql} from "@apollo/client";

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

export const GET_PRODUCT_WITH_PAGINATION = gql`
  query GetProductPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
      getProductPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
        products {
          _id
          productName
          category {
            _id
            categoryName
            remark
            updatedAt
            createdAt
          }
          unit
          unitPrice
          durationProduce
          totalStockAmount
          usedStockAmount
          ingredients {
            rawMaterialId {
              _id
              materialName
              unit
              unitPrice
            }
            amount
            key
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
      category {
        _id
        categoryName
        remark
        updatedAt
        createdAt
      }
      unit
      unitPrice
      durationProduce
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
          unit
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
    }
  }
`

