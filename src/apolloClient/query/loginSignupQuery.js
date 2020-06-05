import gql from "graphql-tag";

export const LOGIN_QUERY = gql `
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP_QUERY = gql `
  mutation Signup($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password)
  }
`;
