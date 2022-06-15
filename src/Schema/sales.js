import {gql} from '@apollo/client';

export const CREATE_SET_UP_CUSTOMER = gql`
    mutation Mutation($newCustomer: CustomerInput) {
        createCustomer(newCustomer: $newCustomer) {
        success
        message
        }
    }
`
export const GET_CUSTOMER = gql`
    query Query {
        getCustomers {
        _id
        name
        phoneNumber
        email
        address
        }
    }
`
export const UPDATE_SETUP_CUSTOMER = gql`
    mutation Mutation($id: ID!, $customerEdit: CustomerInput) {
        updateCustomer(_id: $id, CustomerEdit: $customerEdit) {
        success
        message
        }
    }
`

export const DELETE_SETUP_CUSTOMER = gql`
    mutation DeleteCustomer($id: ID!) {
        deleteCustomer(_id: $id) {
        success
        message
        }
    }
`
export const CREATE_SALE = gql`
    mutation CreateSale($newSale: SaleInput) {
        createSale(newSale: $newSale) {
        success
        message
        }
    }
`
export const GET_CUSTOMER_PAGINATION =  gql`
    query Query($page: Int, $limit: Int, $keyword: String, $pagination: Boolean) {
        getCustomerPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination) {
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
        customers {
            _id
            name
            phoneNumber
            email
            address
        }
        }
    }
`

export const GET_SALE_WITH_PAGINATION = gql`
query GetSaleWithPagination( $status: String, $page: Int, $keyword: String, $limit: Int, $pagination: Boolean ) {
  getSaleWithPagination(status: $status, page: $page, keyword: $keyword, limit: $limit, pagination: $pagination ) {
    sales {
      _id
      invoiceNo
      tin
      date
      createdAt
      status
      billTo {
        label
        customerId {
          _id
          name
          phoneNumber
        }
      }
      vat
      totalAmount
      paidAmount
      items {
        itemName
        productId {
          category {
            _id
            categoryName
          }
          _id
          productName
          unit
          unitPrice
          durationProduce
          totalStockAmount
          usedStockAmount
        }
        qty
        unitPrice
        amount
        key
      }
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

export const DELETE_SALE = gql`
  mutation DeleteSale($id: ID!) {
    deleteSale(_id: $id) {
      success
      message
    }
  }
`

export const UPDATE_SALE = gql`
  mutation UpdateSale($id: ID!, $saleEdit: SaleInput) {
    updateSale(_id: $id, SaleEdit: $saleEdit) {
      success
      message
    }
  }
`