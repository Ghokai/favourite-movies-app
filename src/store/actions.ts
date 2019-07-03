import { fetchMovies } from "../api";

export const LOAD_MOVIES_ACTION = "LOAD_MOVIES";
export const RATE_MOVIE_BY_ID_ACTION = "RATE_MOVIE_BY_ID";
export const RATE_MOVIE_BY_INDEX_ACTION = "RATE_MOVIE_BY_INDEX";
export const SET_RANDOM_RATING_ACTION = "SET_RANDOM_RATING";
export const SET_SEARCH_TERM_ACTON = "SET_SEARCH_TERM";

export const fetchMoviesAction = () => (dispatch: any) => {
  fetchMovies()
    .then(movies => dispatch({ type: LOAD_MOVIES_ACTION, payload: movies }))
    .catch(err => console.log(err));
};

export const startRandomRatingAction = () => (dispatch: any, getState: any) => {
  dispatch({
    type: SET_RANDOM_RATING_ACTION,
    payload: true
  });

  rateItemRandomly(dispatch, getState);
};

const rateItemRandomly = (dispatch: any, getState: any) => {
  const randomTimeMS = getRandomValue(5000, 1000);

  setTimeout(() => {
    const state = getState();
    const randomItemIndex = getRandomValue(state.movies.movieList.length, 0);
    const randomRateValue = getRandomValue(10, 1);
    /*
    console.log("index: " + randomItemIndex);
    console.log("rate: " + randomRateValue);
    console.log("time: " + randomTimeMS);
    */
    if (state.movies.israndomRatingActive) {
      dispatch({
        type: RATE_MOVIE_BY_INDEX_ACTION,
        payload: { randomIndex: randomItemIndex, randomRating: randomRateValue }
      });
      rateItemRandomly(dispatch, getState);
    }
  }, randomTimeMS);
};

const getRandomValue = (range: number, baseValue: number) =>
  Math.round(Math.random() * (range - 1)) + baseValue;
