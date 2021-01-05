export const movies = (state = [], action) => {

  switch (action.type) {
    case 'GET_MOVIES':
      return action.movies
    case 'GET_MOVIES_WITH_RATING':
      return action.userRatings.map(rating => {
        return action.movies.find(movie => {
          return movie.id === rating.movie_id;
        });
      });
    default:
      return state;
  }
}
