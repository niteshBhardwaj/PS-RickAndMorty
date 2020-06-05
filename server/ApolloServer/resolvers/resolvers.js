import {GraphQLDateTime} from "graphql-iso-date"
import GraphQLObjectId from 'graphql-scalar-objectid'
import CharacterController from "../../controllers/CharacterController";
import SignupController from "../../controllers/SignupController";
import LoginController from "../../controllers/LoginController";
import UserController from "../../controllers/UserController";
// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve books from the "books" array above.
const resolvers = {
   Query: {
        characterList: CharacterController.characterList,
        filterOptions: CharacterController.filterOptions,
        userSetting: UserController.userSettingAndInfo
   },
   Mutation: {
        login: LoginController.login,
        signup: SignupController.createUser,
        savePreference: UserController.savePreference
    },
    DateTime: GraphQLDateTime,
    ObjectId: GraphQLObjectId,
};

export default resolvers;