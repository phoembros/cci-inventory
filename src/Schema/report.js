import { gql } from "@apollo/client";

export const GET_INVENTORY_REPORT = gql`
    query GetInventoryStockReport($fromDate: Date!, $toDate: Date!) {
        getInventoryStockReport(fromDate: $fromDate, toDate: $toDate) {
        _id
        itemId
        itemDescription
        qtyOnHand
        unitCost
        unit
        completedUnit
        qtySold
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
        actualProduction
        unitUM
        costOfProduction
        workingHours
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