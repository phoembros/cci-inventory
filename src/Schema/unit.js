import { gql } from "@apollo/client";

export const GET_UNIT_PAGINATION = gql`
  query GetUnitPagination($page: Int, $limit: Int, $keyword: String, $pagination: Boolean, $sortField: [SortField]) {
      getUnitPagination(page: $page, limit: $limit, keyword: $keyword, pagination: $pagination, sortField: $sortField) {
        units {
          _id
          unitName
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

export const CREATE_UNIT = gql`
  mutation CreateUnit($newUnit: UnitsInput) {
    createUnit(newUnit: $newUnit) {
      success
      message
      data {
        unitName
        remark
      }
    }
  }
`

export const UPDATE_UNIT =  gql`
  mutation UpdateUnit($unitId: ID!, $newUnit: UnitsInput) {
    updateUnit(unitId: $unitId, newUnit: $newUnit) {
      success
      message
      data {
        unitName
        remark
      }
    }
  }
`

export const DELETE_UNIT = gql`
  mutation DeleteUnit($unitId: ID!) {
    deleteUnit(unitId: $unitId) {
      success
      message
      data {
        _id
        unitName
        remark
      }
    }
  }
`