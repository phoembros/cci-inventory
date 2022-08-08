import { gql } from "@apollo/client";

export const GET_INVENTORY_REPORT = gql`
  query GetInventoryStockReport($fromDate: Date!, $toDate: Date!) {
    getInventoryStockReport(fromDate: $fromDate, toDate: $toDate) {
      itemId
      itemDescription
      unit
      productGroup {
        itemDescription
        unitCost
        qtyStockIn
        qtySold
        quantityPerStockUM
      }
    }
  }
`

export const GET_RAWMATERIAL_REPORT = gql`
query GetRawMaterialReport($fromDate: Date!, $toDate: Date!) {
  getRawMaterialReport(fromDate: $fromDate, toDate: $toDate) {
    materialName
    unit
    unitPrice
    qtyStockIn
    qtyStockOut
  }
}
`

export const GET_PRODUCTION_REPORT = gql`
    query GetProductionReport($fromDate: Date, $toDate: Date) {
      getProductionReport(fromDate: $fromDate, toDate: $toDate) {
        date
        customerName
        batchCardNumber
        itemID
        itemDescription
        targetProduction
        unitVM          
        actualProduction {
          _id          
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
                }
                amount
                key
                unitRawMaterial
              }
              remark
              updatedAt
              createdAt
            }                   
            unitPrice
            totalStockAmount
            totalSold
            updatedAt
            createdAt
          }
          qtyOfUM
          key
          label
          unitQtyGroup
        }
        unitUM
        costOfProduction
        workingHours
        productGroup {
          _id
          name   
          quantityPerStockUM          
          unitPrice    
          totalSold
          totalStockAmount          
        } 
      }
    }
`

export const GET_SALE_REPORT = gql`
query GetSaleReport($fromDate: Date, $toDate: Date) {
    getSaleReport(fromDate: $fromDate, toDate: $toDate) {
      saleInfo {
        customerId
        name
        invoiceInfo {
          invoiceNumber
          date
          itemDescription
          qty
          salePrice
          amount
          costOfSales
          grossProfit
          grossMargin
        }
        totalQty
        totalSalePrice
        totalAmout
        totalCostOfSales
        totalGrossProfit
        totalGrossMargin
      }
      reportTotal {
        totalQty
        totalSalePrice
        totalAmount
        totalCostOfSales
        totalGrossProfit
        totalGrossMargin
      }
    }
  }
`