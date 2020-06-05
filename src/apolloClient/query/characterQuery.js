import gql from "graphql-tag";

export const CHARACTER_LIST_QUERY = gql`
     query CharacterList($query: String, $gender:[String], $origin: [String], $species:[String], $sort: Int) {
        characterList(query: $query, gender: $gender, origin: $origin, species: $species, sort: $sort) {
            id
            name
            status
            species
            type
            gender
            origin {
                name
            }
            location {
                name
            }
            image
            created
        }
    }   
 `

export const FILTER_OPTIONS_QUERY = gql`
query FilterOptions {
   filterOptions {
       species
       origin
       gender
   }
}   
`