import fs from 'fs';
import fetch from 'node-fetch';
import React from 'react'
import { ApolloProvider } from '@apollo/react-common';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router';
import { InMemoryCache } from "apollo-cache-inmemory";
import { ServerStyleSheets } from '@material-ui/core/styles';
import { getDataFromTree } from "@apollo/react-ssr";
import AppWrapper from '../../src/AppWrapper';
import UserSettingProvider from '../../src/components/common/UserSettingProvider'
import { HelmetProvider } from "react-helmet-async";
import requestLink from '../../src/apolloClient/requestLink';
import errorHandler from '../../src/apolloClient/errorHandler';

const getApolloClient = (token) => new ApolloClient({
   ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: 'http://localhost:5000/graphql',
      credentials: 'same-origin',
      fetch: fetch,
      requestLink: requestLink(token),
      onError: errorHandler
    }),
    cache: new InMemoryCache(),
  });

export const ssrHandler = (req, res) => {
    let token = '';
    fs.readFile('./build/index.html', 'utf8', function (err, data) {
        if (err) throw err;
        
          const context = {};
          const sheets = new ServerStyleSheets();
          const client = getApolloClient(token);
          const helmetContext = {};
          // The client-side App will instead use <BrowserRouter>
          const App = (
            <StaticRouter location={req.url} context={context}>
              <ApolloProvider client={client}>
              <UserSettingProvider authCheck={() => !!token}>
                  <HelmetProvider context={helmetContext}>
                    <AppWrapper />
                  </HelmetProvider>
              </UserSettingProvider>
              </ApolloProvider>
            </StaticRouter>
          );
          getDataFromTree(sheets.collect(App)).then((content) => {
            const css = sheets.toString();  
            const initialState = client.extract();
            res.send(Html(data, {
              content, 
              css, 
              initialState, 
              helmet: helmetContext.helmet
            }));
          })

    });
}


let Html = (data, {css, content, initialState, isDesktop, helmet}) => {
  return (
    data
       .replace(/<\s*title[^>]*>(.*?)<\s*\/\s*title>/, 
        `${helmet.meta.toString()}
         ${helmet.title.toString()}`)
       .replace('<link rel="stylesheet"/>', `<style id="jss-server-side">${css}</style>`)
       .replace('<div id="root"></div>', `<div id="root">${content}</div>`)
        .replace(
          '<script></script>',
          `<script>
              window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(/</g, '\\u003c')};
            </script>`
        )
  )

}