import { gql } from "@apollo/client";

export const CREATE_VIOLATION_WEB_USER = gql`
  mutation CreateViolationWebUser(
    $violationWebUserInput: ViolationWebUserInput
  ) {
    createViolationWebUser(violationWebUserInput: $violationWebUserInput) {
      id
      firstName
      lastName
      fullName
      email
      phoneNumber
      address
      status
      roleId
      role {
        id
        roleName
      }
      password
      token
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

export const EDIT_VIOLATION_WEB_USER = gql`
  mutation EditViolationWebUser(
    $id: ID!
    $violationWebUserInput: ViolationWebUserInput
  ) {
    editViolationWebUser(ID: $id, violationWebUserInput: $violationWebUserInput)
  }
`;
export const DELETE_VIOLATION_WEB_USER = gql`
  mutation DeleteViolationWebUser($id: ID!) {
    deleteViolationWebUser(ID: $id)
  }
`;

export const CREATE_PARKING_SITE_WEB_USER = gql`
  mutation CreateParkingsiteWeUser(
    $parkingsiteWebUserInput: ParkingsiteWebUserInput
  ) {
    createParkingsiteWeUser(parkingsiteWebUserInput: $parkingsiteWebUserInput) {
      id
      firstName
      lastName
      fullName
      email
      phoneNumber
      address
      status
      roleId
      role {
        id
        roleName
      }
      parkingLotId
      assignedParkingLot {
        id
        parkingLotName
      }
      password
      token
      createdAt
      updatedAt
      createdBy
      updatedBy
    }
  }
`;

export const EDIT_PARKING_SITE_WEB_USER = gql`
  mutation EditParkingsiteWeUser(
    $id: ID!
    $parkingsiteWebUserInput: ParkingsiteWebUserInput
  ) {
    editParkingsiteWeUser(
      ID: $id
      parkingsiteWebUserInput: $parkingsiteWebUserInput
    )
  }
`;

export const DELETE_PARKING_SITE_WEB_USER = gql`
  mutation DeleteParkingsiteWeUser($id: ID!) {
    deleteParkingsiteWeUser(ID: $id)
  }
`;

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

export const CREATE_PARKING_RATE = gql`
  mutation CreateParkingRate($parkingRateInput: ParkingRateInput) {
    createParkingRate(parkingRateInput: $parkingRateInput) {
      id
      parkingLotId
      parkingRateName
      vehicleType
      firstXHours
      firstXHoursRate
      succeedingHoursRate
      createdAt
      updatedAt
    }
  }
`;

export const EDIT_PARKING_RATE = gql`
  mutation UpdateParkingRate($id: ID!, $parkingRateInput: ParkingRateInput) {
    updateParkingRate(ID: $id, parkingRateInput: $parkingRateInput)
  }
`;

export const DELETE_PARKING_RATE = gql`
  mutation DeleteParkingRate($id: ID!) {
    deleteParkingRate(ID: $id)
  }
`;
