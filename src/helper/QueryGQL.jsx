import { gql } from "@apollo/client";

export const QUERY_SIGNUP = gql`
  mutation MyMutation($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`;

export const QUERY_LOGIN = gql`
  query MyQuery($username: String!, $password: String!) {
    users(
      where: {
        _and: {}
        username: { _eq: $username }
        password: { _eq: $password }
      }
    ) {
      id
    }
  }
`;
