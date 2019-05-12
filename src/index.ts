import { ApolloServer } from "apollo-server";
import { useMockDB } from 'workshop-graphql-data-uploader';

import {
  baseTypes,
  movieTypes,
  movieResolvers,
  ratingTypes,
  ratingResolver,
} from './config'

useMockDB().then(async dbClient => {
  // Create server
  // Example hardcoded data
  // movies: (obj, params, context) => [
    // {
    //   id: '1',
    //   title: 'Terminator'
    // },
    // {
    //   id: '2',
    //   title: 'Saving Private Ryan'
    // }
  // ]
  const apolloServer = new ApolloServer({
    typeDefs: [
      baseTypes,
      movieTypes,
      ratingTypes,
    ],
    context: {
      dbClient,
    },
    // Object assign is a shallow merge of two objects (the top layer)
    resolvers: Object.assign(movieResolvers, ratingResolver)
  })

  // Run the server
  apolloServer.listen()
});



// STEP 1:
// Create baseTypes
// Create empty resolver
// Create ApolloServer

// STEP 2:
// Create movieTypes { id, title }
// - Query movies, and resolve movies
// - Type Movie { id, title }
// - movies Query resolver
// - define ApolloServer `movieService` context 
// - add type definitions for all properties

// STEP 3:
// Run app and check GraphiQL playground

// STEP 4:
// Add movie Query to movieTypes
// - Query movie by Id
// - Check in playground

// STEP 5:
// Add keywords to Movie type
// - define Type Keywords, and add keywords to Movie Type
// - resolve keywords in Movie Type
// - Check in playground

// STEP 6:
// Add rating Mutation
// - define setRating Mutation and it's input and payload
// - Add resolver

// STEP 7:
// Add rating Query
// - define movieUserRating Query and it's input and payload
// - Add resolver

// STEP 8:
// Add dataLoader