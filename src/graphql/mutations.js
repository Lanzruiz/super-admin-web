import { gql } from "@apollo/client";

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

export const EDIT_PARKING_LOT = gql`
  mutation UpdateParkingLot(
    $updateParkingLotId: ID!
    $parkingLotInput: ParkingLotInput
  ) {
    updateParkingLot(id: $updateParkingLotId, parkingLotInput: $parkingLotInput)
  }
`;

export const DELETE_PARKING_LOT = gql`
  mutation DeleteParkingLot($deleteParkingLotId: ID!) {
    deleteParkingLot(id: $deleteParkingLotId)
  }
`;

export const CREATE_PARKING_SLOT = gql`
  mutation CreateParkingSlot($parkingSlotInput: ParkingSlotInput) {
    createParkingSlot(parkingSlotInput: $parkingSlotInput) {
      id
      parkingLotId
      parkingSlotName
      status
      slotType
      lastStatusChange
      longitude {
        top_left
        top_right
        bottom_left
        bottom_right
      }
      latitude {
        top_left
        top_right
        bottom_left
        bottom_right
      }
    }
  }
`;

export const EDIT_PARKING_SLOT = gql`
  mutation UpdateParkingSlot(
    $updateParkingSlotId: ID!
    $parkingSlotInput: ParkingSlotInput
  ) {
    updateParkingSlot(
      id: $updateParkingSlotId
      parkingSlotInput: $parkingSlotInput
    )
  }
`;

export const DELETE_PARKING_SLOT = gql`
  mutation DeleteParkingSlot($deleteParkingSlotId: ID!) {
    deleteParkingSlot(id: $deleteParkingSlotId)
  }
`;
