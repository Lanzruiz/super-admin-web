import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query User {
    user {
      id
      fullName
      email
      phoneNumber
      address
      driverLicense
      status
      password
      token
      createdAt
      updatedAt
      vehicles {
        id
        userId
        identificationType
        vehicleType
        vehicleCode
        color
        model
        brand
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_OFFICERS = gql`
  query Officers {
    officers {
      id
      fullName
      email
      phoneNumber
      address
      trafficEnforcerLevel
      unit
      createdAt
      updatedAt
    }
  }
`;

export const LOGIN_OFFICER = gql`
  mutation LoginOfficer($input: LoginOfficer!) {
    loginOfficer(input: $input) {
      ... on InvalidError {
        code
        message
      }
      ... on Unauthorized {
        code
        message
      }
      ... on Officer {
        id
        fullName
        email
        password
        token
        phoneNumber
        address
        trafficEnforcerLevel
        unit
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_VIOLATIONS = gql`
  query Violations {
    violations {
      id
      vehicleId
      violationName
      violationType {
        description
      }
      status
      violationTypeId
      plateNumber
      officerId

      createdAt
    }
  }
`;

export const GET_VEHICLE = gql`
  query Vehicle($vehicleId: ID!) {
    vehicle(id: $vehicleId) {
      id
      userId
      owner {
        fullName
      }
      identificationType
      vehicleType
      vehicleCode
      color
      model
      brand
      createdAt
      updatedAt
    }
  }
`;

export const GET_VIOLATION_TYPE = gql`
  query GetViolationTypeById($id: ID!) {
    getViolationTypeById(ID: $id) {
      id
      violationName
      description
    }
  }
`;

export const GET_ROLES = gql`
  query Role {
    role {
      id
      roleName
    }
  }
`;

export const GET_WEB_USERS = gql`
  query GetWebUsers {
    getWebUsers {
      id
      fullName
      email
      phoneNumber
      role {
        id
        roleName
      }
    }
  }
`;

export const GET_PARKING_LOTS = gql`
  query ParkingLots {
    parkingLots {
      id
      parkingLotName
      initialZoom
      location
      longitude
      latitude
      totalSlots
      parkingSlots {
        parkingSlotName
      }
      parkingRates {
        id
        vehicleType
        parkingRateName
        firstXHours
        firstXHoursRate
        succeedingHoursRate
      }
    }
  }
`;

export const GET_PARKING_LOT_SLOTS = gql`
  query ParkingLotSlots($parkingLotId: ID!) {
    parkingLotSlots(parkingLotId: $parkingLotId) {
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

export const GET_PARKING_RATES = gql`
  query ParkingRates {
    parkingRates {
      id
      parkingRateName
      firstXHours
      firstXHoursRate
      succeedingHoursRate
      vehicleType
    }
  }
`;
