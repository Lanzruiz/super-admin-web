import { gql } from '@apollo/client';

export const CREATE_WEB_USER = gql`
  mutation CreateUser($userInput: UserInput) {
    createUser(userInput: $userInput) {
      id
      fullName
      email
      phoneNumber
      address
      role {
        id
        roleName
        screenAccess
      }
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($id: ID!, $userInput: UserInput, $isWebUser: Boolean) {
    editUser(ID: $id, userInput: $userInput, isWebUser: $isWebUser)
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!, $isWebUser: Boolean) {
    deleteUser(ID: $id, isWebUser: $isWebUser)
  }
`;
