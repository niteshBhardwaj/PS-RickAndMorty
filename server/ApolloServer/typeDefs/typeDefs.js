import { gql } from 'apollo-server-express';
import characterTypeDefs from './characterTypeDefs';
import userTypeDefs from './userTypeDefs';

const typeDefs = gql`
directive @auth on FIELD_DEFINITION

scalar DateTime
scalar ObjectId

type LoginResp {
  token: String
}

# The "Query" type is the root of all GraphQL queries.
type Query {
  characterList(query: String, gender:[String], origin: [String], species:[String], sort: Int): [Character] @auth
  filterOptions: FilterOptions @auth
  userSetting: UserSettingResp @auth
}

type Mutation {
  login(email: String!, password: String!): LoginResp
  signup(name: String!, email: String!, password: String!): String
  savePreference(sort: Int): String
}
`;

export default [typeDefs, characterTypeDefs, userTypeDefs];