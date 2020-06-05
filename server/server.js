import db from './db/mongoose';
import express from 'express';
import compression from 'compression';
import seedCharacters from './seed/character.seed'
import path from 'path';
import ApolloServer from './ApolloServer';
import {ssrHandler} from './ssr'

const app = express();

app.use(compression());

// access origin policy 
app.use(function(req, res, next) {
  //if(!isProd) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
  //}
  next();
});

ApolloServer.applyMiddleware({ app });

app.get('/', ssrHandler);
// // Serve built files with static files middleware
app.use(express.static('./build'));
// // Serve requests with our ssrHandler function
app.get('*', ssrHandler);

// This `listen` method launches a web-server.  Existing apps
db().then(() => {
  app.listen({ port: process.env.PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}`)
  );
  seedCharacters();
})