import { gql } from "@apollo/client";

export const ESTIMATE_PRODUCTION = gql`
  mutation EstimateProduction($productId: ID!) {
    estimateProduction(productId: $productId)
  }
`

export const CREATE_PRODUCTION = gql`
  mutation CreateProductions($newProductions: ProductionsInput) {
    createProductions(newProductions: $newProductions) {
      success
      message
      data {
        _id
        productionsId
        startDate
        dueDate
        workOrders
        customerId {
          _id
          cusId
          name
          phoneNumber
          email
          address
        }
        productionsBy {
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
        approveOrRejectBy {
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
        qualityCheck {
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
        status
        priority
        progress
        production {
          productId {
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
            remark
            updatedAt
            createdAt
          }
          productName
          qtyOnHand
        }
        qty
        completedQtyUM {
          productGroupId {
            _id
            name
            quantityPerStockUM
            groupBy {
              _id
              productName
              productId
              unit {
                _id
                unitName
              }
              completedUnit
              unitPrice
              durationProduce
            }
            updatedAt
          }
          qtyOfUM      
        }
        completedRemark
        storageRoomId {
          _id
          name
          address
          type
          remark
          updatedAt
        }
        comment
        remark
        warning
        remarkWarning
        updatedAt
        createdAt
      }
    }
  }
`

export const GET_PRODUCTION_WITH_PAGINATION =  gql`
  query GetProductionsPagination($page: Int, $limit: Int, $keyword: String, $productId: ID, $pagination: Boolean, $status: String, $priority: String, $progress: String) {
    getProductionsPagination(page: $page, limit: $limit, keyword: $keyword, productId: $productId, pagination: $pagination, status: $status, priority: $priority, progress: $progress) {
      productions {
        _id
        productionsId
        startDate
        dueDate
        workOrders
        customerId {
          _id
          cusId
          name
          phoneNumber
          email
          address
        }
        productionsBy {
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
        approveOrRejectBy {
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
        qualityCheck {
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
        status
        priority
        progress
        production {
          productId {
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
                updatedAt
                createdAt
              }
              amount
              key
              unitRawMaterial
            }
            remark
            updatedAt
            createdAt
          }
          productName
          qtyOnHand
        }
        qty
        completedQtyUM {
          productGroupId {
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
            }
            updatedAt
            createdAt
          }
          qtyOfUM
          unitQtyGroup
          label
          key
        }
        completedRemark
        storageRoomId {
          _id
          name
          address
          type
          remark
        }
        comment
        remark
        warning
        remarkWarning
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

export const UPDATE_PRODUCTION = gql`
mutation UpdateProductions($id: ID!, $productionsEdit: ProductionsInput) {
  updateProductions(_id: $id, ProductionsEdit: $productionsEdit) {
    success
    message
    data {
      _id
      productionsId
      startDate
      dueDate
      workOrders
      customerId {
        _id
        cusId
        name
        phoneNumber
        email
        address
      }
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
          productName
          productId
          _id
          category {
            _id
            categoryName
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
              materialName
              _id
            }
            amount
            key
            unitRawMaterial
          }
        }
        productName
        qtyOnHand
      }
      qty
      completedQtyUM {
        productGroupId {
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
            }
            unit {
              _id
              unitName
            }
            completedUnit
            unitPrice
          }
          updatedAt
          createdAt
        }
        qtyOfUM
        label
        key
        unitQtyGroup
      }
      completedRemark
      storageRoomId {
        _id
        name
        address
        type
        remark
        updatedAt
      }
      comment
      remark
      warning
      remarkWarning
      updatedAt
      createdAt
    }
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

export const APPROVE_PRODUCTION = gql`
  mutation ApproveProductions($id: ID!, $approveInput: ApproveInput) {
    approveProductions(_id: $id, approveInput: $approveInput) {
      success
      message
    }
  }
`

export const COMPLETE_PRODUCTION = gql`
  mutation CompleteProduction($id: ID!, $completedInput: CompletedInput) {
    completeProduction(_id: $id, completedInput: $completedInput) {
      success
      message
    }
  }
`
