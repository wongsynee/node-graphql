import { gql } from "apollo-server";

// Query type GraphQL specifications
// Gql function is part of Apollo
export const baseTypes = gql`
  type Query
`;

// This is necessary!
// Anti pattern GOT type?
// This is specific to MovieTypes
// ! means no nulls or undefined are allowed
// If server does return a null, it will break and throw you an error
// If there are nothing to return then put in colons
export const movieTypes = gql`
  extend type Query {
    movies: [Movie!]
    movie(id: ID!): Movie
  }

  type Movie {
    id: ID!
    title: String!
    keywords: [Keyword!]
  }

  type Keyword {
    id: ID!
    name: String!
  }
`;

export const ratingTypes = gql`
  type Mutation {
    setRating(setRatingInput: SetRatingInput): Message
  }

  input SetRatingInput {
    movieId: ID!
    userId: ID!
    score: Int!
  }

  type Message {
    message: String!
  }
`;
