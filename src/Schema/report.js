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
        unit
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
            unitPrice
            unit {
              _id
              unitName
            }  
            totalStockAmount
            totalSold            
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
          unit {
            _id
            unitName
          }                 
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