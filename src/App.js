import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks';
import {client} from "./apolloClient/apolloClient";
import AppWrapper from './AppWrapper';
import { HelmetProvider } from "react-helmet-async";
import UserSettingProvider from './components/common/UserSettingProvider'
import Auth from './ClientServices/AuthStorage'


export default function App() {
  return (<Router>
    <ApolloProvider client={client}>
    <UserSettingProvider authCheck={() => Auth.check()}>
      <HelmetProvider>
          <AppWrapper />
      </HelmetProvider>
      </UserSettingProvider>
    </ApolloProvider>
  </Router>)
}
