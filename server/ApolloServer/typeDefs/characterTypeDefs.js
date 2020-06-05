import { gql } from 'apollo-server-express';

const characterTypeDefs = gql`

type Origin {
  name: String
}

type Location {
  name: String
}
type Character {
  id: Int
  name: String
  status: String
  species: String
  type: String   
  gender: String
  origin: Origin
  location: Location
  image: String
  created: DateTime
} 

type FilterOptions {
  species: [String]
  gender: [String]
  origin: [String]
}
`;

export default  characterTypeDefs;