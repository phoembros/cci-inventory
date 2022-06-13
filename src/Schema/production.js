import { gql } from "@apollo/client";

export const CREATE_PRODUCTION = gql`
    mutation CreateProductions($newProductions: ProductionsInput) {
        createProductions(newProductions: $newProductions) {
        success
        message
        }
    }
`

export const GET_PRODUCTION_WITH_PAGINATION =  gql`
  query GetProductionsPagination($page: Int, $limit: Int, $keyword: String, $productId: ID, $pagination: Boolean) {
      getProductionsPagination(page: $page, limit: $limit, keyword: $keyword, productId: $productId, pagination: $pagination) {
        productions {
            _id
            productionsId
            startDate
            dueDate
          productionsBy {
            _id
            first_name
            last_name
            gender
          }
          approveOrRejectBy {
            _id
            first_name
            last_name
            gender
          }
          qualityCheck {
            _id
            first_name
            last_name
            gender
          }
          status
          priority
          progress
          production {
            productId {
              _id
              productName
              totalStockAmount
              unit
            }
            productName
            qtyOnHand
          }
          qty
          storageRoomId {
            _id
            name
          }
          comment
          updatedAt
          createdAt
          remark
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

export const UPDATE_PRODUCTION = gql`
  mutation UpdateProductions($id: ID!, $productionsEdit: ProductionsInput) {
    updateProductions(_id: $id, ProductionsEdit: $productionsEdit) {
      success
      message
    }
  }
`

export const DELETE_PRODUCTION = gql`
  mutation DeleteProductions($id: ID!) {
    deleteProductions(_id: $id) {
      success
      message
    }
  }
`