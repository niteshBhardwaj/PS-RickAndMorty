import gql from "graphql-tag";

export const USER_SETTING_QUERY = gql`
     query UserSetting {
        userSetting {
            user {
                name,
                photo,
                _id
            },
            preference {
                sort
            }
        }
    }   
 `

export const SAVE_PREFERENCE_QUERY = gql`
    mutation SavePreference($sort: Int!) {
        savePreference(sort: $sort)
    }
`