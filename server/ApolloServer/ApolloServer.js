import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers';
import typeDefs from './typeDefs/typeDefs';
import tokenValidator from"../controllers/TokenValidator";
import schemaDirectives from"./schemaDirective"
import dataSources from './DataSource'

export default new ApolloServer({
   typeDefs,
   resolvers,
   context: tokenValidator,
   schemaDirectives,
   introspection: true,
   playground: true,
   dataSources,
 });