import {gql} from '@apollo/client';

export const GET_SUPPLIES = gql`
    query GetSuppliers {
        getSuppliers {
        _id
        name
        email
        phoneNumber
        address
        updatedAt
        createdAt
        }
    }
`
export const CREATE_NEW_SUPPLIES = gql`
    mutation CreateSupplier($newSupplier: SupplierInput) {
        createSupplier(newSupplier: $newSupplier) {
        success
        message
        }
    }
`
export const UPDATE_SUPPLIES = gql`
    mutation UpdateSupplier($id: ID!, $supplierEdit: SupplierInput) {
        updateSupplier(_id: $id, SupplierEdit: $supplierEdit) {
        success
        message
        }
    }
`
export const DELETE_SUPPLIES = gql`
    mutation DeleteSupplier($id: ID!) {
        deleteSupplier(_id: $id) {
        success
        message
        }
    }
`
export const GET_SUPPLIERS_BY_PAGINATION = gql`
    query GetSuppliersPagination($keyword: String, $pagination: Boolean, $page: Int, $limit: Int) {
        getSuppliersPagination(keyword: $keyword, pagination: $pagination, page: $page, limit: $limit) {
        suppliers {
            _id
            name
            email
            phoneNumber
            address
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