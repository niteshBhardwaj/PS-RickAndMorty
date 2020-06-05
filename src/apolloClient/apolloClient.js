import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { withClientState } from 'apollo-link-state';
import resolvers from './cacheResolvers';
import requestLink from './requestLink';
import errorHandler from './errorHandler';
import { ApolloLink } from 'apollo-link';
import {cache} from './cacheInstance';
import defaults from './defaultData'; 

const typeDefs = `
  type Message {
    open: Boolean
    variant: String
    key: Number
    message: String
  }

  type Query {
    messageInfo: Message
  }
`;

const clientState = {
    defaults,
    typeDefs,
    resolvers,
    cache    
}

const httpLinkConfig = {
  uri: '/graphql',
  //credentials: 'include'
}

export const client = new ApolloClient({
  connectToDevTools: true,
  link: ApolloLink.from([
    onError(errorHandler),
    requestLink(),
    withClientState(clientState), 
    new HttpLink(httpLinkConfig)
  ]),
  cache
});