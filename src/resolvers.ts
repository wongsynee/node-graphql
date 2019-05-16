// Accepts several types
// Resolvers are server side handlers.
// Implementation with Resolvers is specific to Apollo
export const movieResolvers = {
  // Query is get something
  Query: {
    movies: (obj, params, context) =>
      context.dbClient
        // Movies is a collection in the db (like a table)
        .collection("movies")
        .get()
        .then(x => x.docs.map(d => d.data())),
    // First param: Parent
    // Second param: E.g: ID
    // Third param: Global context definition
    movie: async (obj, { id }, context) => {
      // Wait for the movie data to return
      // NOTE: .get() is a function that returns a promise
      const movieData = await context.dbClient
        .collection("movies")
        .doc(id)
        .get();
      return movieData.data();
    }
  },
  Movie: {
    // Movie is the parent object
    keywords: async (movie, params, context) => {
      const keywordsData = await context.dbClient
        .collection("keywords")
        .doc(movie.id)
        .get();
      return keywordsData.data().keywords;
    }
  }
};

export const ratingResolver = {
  Mutation: {
    setRating: (obj, { setRatingInput }, context) => {
      const { userId, movieId, score } = setRatingInput;
      const docName = userId + ":" + movieId;
      return context.dbClient
        .collection("ratings")
        .doc(docName)
        .set({
          movieId,
          score
        })
        .then(() => {
          return {
            message: "Success!"
          };
        })
        .catch(err => {
          return {
            message: err.message
          };
        });
    }
  }
};
