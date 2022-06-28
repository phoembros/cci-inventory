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
        qtySold
        }
    }
`