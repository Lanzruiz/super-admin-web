import { gql } from '@apollo/client';

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
