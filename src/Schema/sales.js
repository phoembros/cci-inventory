import {gql} from '@apollo/client';

export const CREATE_SET_UP_CUSTOMER = gql`
    mutation Mutation($newCustomer: CustomerInput) {
        createCustomer(newCustomer: $newCustomer) {
        success
        message
        }
    }
`

export const GET_INVOICE_NO_CHANGE = gql`
  query Query($invoiceId: String!) {
    checkExistingInvoiceId(invoiceId: $invoiceId)
  }
`

export const GET_INVOICE_NO = gql`
  query Query {
    getInvoiceId
  }
`

export const GET_CUSTOMER = gql`
    query Query {
        getCustomers {
        _id
        cusId
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
    query Query($page: Int, $limit: Int, $keyword: String, $pagination: Boolean , $sortField: [SortField]) {
        getCustomerPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination , sortField: $sortField ) {
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
            cusId
            name
            phoneNumber
            email
            address
        }
        }
    }
`

export const GET_OWE_CUSTOMER = gql`
  query Query($id: ID!) {
    getOweCustomer(_id: $id)
  }
`

export const GET_SALE_WITH_PAGINATION = gql`
query GetSaleWithPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean, $status: String , $voidStatus: Boolean ) {
  getSaleWithPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination, status: $status , voidStatus: $voidStatus) {
    sales {
      _id
      invoiceNo
      voided
      tin
      date
      billTo {
        label
        customerId {
          _id
          name
          phoneNumber
          email
          address
        }
      }
      vat
      vatAmount
      totalAmount
      items {
        itemName
        productId {
          _id
          name
          quantityPerStockUM
          groupBy {
            _id
            productName
            productId
            category {
              _id
              categoryName
              remark
            }
            unit {
              _id
              unitName
            }
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
                }
                _id
                materialName
                totalStockAmount
                usedStockAmount
                unit {
                  _id
                  unitName
                }
                unitPrice
              }
              amount
              key
              unitRawMaterial
            }
            remark
          }
          unitPrice
          unit {
            _id
            unitName
          }
          totalStockAmount
          totalSold
          updatedAt
          createdAt
        }
        qty
        unitPrice
        amount
        key
      }
      paidAmount
      status
      remark
      createdAt
      updatedAt
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

export const VOID_INVOICE = gql`
  mutation VoidInvoice($id: ID!) {
    voidInvoice(_id: $id) {
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

export const GET_SALE_BYID = gql`
query GetSaleById($id: ID!) {
  getSaleById(_id: $id) {
    _id
    invoiceNo
    voided
    tin
    date
    billTo {
      label
      customerId {
        _id
        name
        phoneNumber
        email
        address
      }
    }
    vat
    vatAmount
    totalAmount
    items {
      itemName
      productId {
        _id
        name
        quantityPerStockUM
        groupBy {
          _id
          productName
          productId
          category {
            _id
            categoryName
            remark
          }
          unit {
            _id
            unitName
          }
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
              }
              _id
              materialName
              totalStockAmount
              usedStockAmount
              unit
              unitPrice
            }
            amount
            key
            unitRawMaterial
          }
          remark
        }
        unitPrice
        totalStockAmount
        totalSold
        updatedAt
        createdAt
      }
      qty
      unitPrice
      amount
      key
    }
    paidAmount
    status
    remark
    createdAt
    updatedAt
  }
}
`