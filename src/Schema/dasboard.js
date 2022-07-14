import { gql } from "@apollo/client";

export const GET_BAR_CHART = gql`
    query GetBarChart {
        getBarChart {
        categories
        seriesRevenue
        seriesExpense
        }
    }
`

export const GET_SAL_UNPAITOWE = gql`
  query Query {
    getInvoiceOweAndUnpaid
  }
`

export const GET_TOP_MATERIAL = gql`
  query GetTopRawMaterial {
    getTopRawMaterial {
      label
      value
    }
  }
`