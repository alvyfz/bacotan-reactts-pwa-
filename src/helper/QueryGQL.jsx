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

export const QUERY_JOIN_ROOM = gql`
  mutation MyMutation($room_id: uuid = String, $user_id: uuid = String) {
    insert_room_users_one(object: { room_id: $room_id, user_id: $user_id }) {
      room_id
      user_id
    }
  }
`;

export const QUERY_CREATE_ROOM = gql`
  mutation MyMutation($name: String!) {
    insert_room_one(object: { name: $name }) {
      id
    }
  }
`;
