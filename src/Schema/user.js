import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUsers {
    getUsers {
      _id
      first_name
      last_name
      gender
      email
      password
      phone_umber
      image_name
      image_src
      birthOfDate
      role_and_permission {
        _id
        role
        Permissions {
          createUser
          deleteUser
          disableUser
          updateUser
        }
      }
      create_at
      update_at
      status
    }
  }
`;
export const GET_USER_PAGINATION = gql`
  query GetUsersPagination(
    $page: Int
    $limit: Int
    $keyword: String
    $pagination: Boolean
  ) {
    getUsersPagination(
      page: $page
      limit: $limit
      keyword: $keyword
      pagination: $pagination
    ) {
      users {
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
        role_and_permission {
          _id
          role
          Permissions {
            createUser
            deleteUser
            disableUser
            updateUser
          }
        }
        create_at
        update_at
        status
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
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(_id: $id) {
      success
      message      
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($newUser: createUserInput) {
    createUser(newUser: $newUser) {
      success
      message
    }
  }
`;
export const UPDATE_USER = gql`
  mutation Mutation($id: String!, $userUpdate: updateUserInput) {
    updateUser(_id: $id, userUpdate: $userUpdate) {
      success
      message
    }
  }
`;

export const GET_USER_LOGIN = gql`
  query getuserLogin {
    getuserLogin {
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
      role_and_permission {
        _id
        role
        Permissions {
          createUser
          deleteUser
          disableUser
          updateUser
        }
      }
      create_at
      update_at
      status
    }
  }
`;
