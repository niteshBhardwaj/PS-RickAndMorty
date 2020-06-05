import { gql } from 'apollo-server-express';

const userTypeDefs = gql`

type User {
  _id: ObjectId
  name: String
  photo: String
  email: String   
} 

type Preference {
  sort: Int
}

type UserSettingResp {
  user: User,
  preference: Preference
}

`;

export default userTypeDefs;