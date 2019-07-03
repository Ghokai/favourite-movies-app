import { Movie } from "../types";
import {
  LOAD_MOVIES_ACTION,
  SET_RANDOM_RATING_ACTION,
  RATE_MOVIE_BY_ID_ACTION,
  RATE_MOVIE_BY_INDEX_ACTION,
  SET_SEARCH_TERM_ACTON
} from "./actions";

interface MoviesState {
  movieList: Movie[];
  sortDirection: "asc" | "desc" | "";
  searchTerm: string;
  israndomRatingActive: boolean;
}

const initialState: MoviesState = {
  movieList: [],
  sortDirection: "",
  searchTerm: "",
  israndomRatingActive: false
};

export function moviesReducer(state: MoviesState = initialState, action: any) {
  switch (action.type) {
    case LOAD_MOVIES_ACTION:
      return {
        movieList: action.payload,
        sortDirection: "",
        searchTerm: "",
        israndomRatingActive: false
      } as MoviesState;
    case RATE_MOVIE_BY_ID_ACTION:
      let positionOfItem = -1;
      //get the position of rated item
      positionOfItem = state.movieList.findIndex(
        item => item.id === action.payload.id
      );

      //if not exist do nothing
      if (positionOfItem < 0) {
        return state;
      }

      const reorderedMovies = updateItemAndReorder(
        state.movieList,
        positionOfItem,
        action.payload.rating
      );

      return {
        ...state,
        movieList: [...reorderedMovies]
      } as MoviesState;
    case RATE_MOVIE_BY_INDEX_ACTION:
      const reorderedMoviesWithIndex = updateItemAndReorder(
        state.movieList,
        action.payload.randomIndex,
        action.payload.randomRating
      );
      return {
        ...state,
        movieList: [...reorderedMoviesWithIndex]
      } as MoviesState;
    case SET_SEARCH_TERM_ACTON:
      return { ...state, searchTerm: action.payload };
    case SET_RANDOM_RATING_ACTION:
      return { ...state, israndomRatingActive: action.payload };
    default:
      return state;
  }
}

// for performance efficiency concerns i am not sorting full array for each rate change
// just adding rated item to correct array index
// by this way we are keeping items are sorted
//because sorting whole array in each change may be some bad performance affects espically big sizes of data
const updateItemAndReorder = (
  items: Movie[],
  itemIndex: number,
  newRatingValue: number
): Movie[] => {
  // splice  rated item from list and set new rating value
  const ratedMovieItem = items.splice(itemIndex, 1)[0];
  ratedMovieItem.rating = newRatingValue;

  //find new position for rated item the position
  //find the first smaller or equal rated items position
  let newPositionOfItem = -1;
  newPositionOfItem = items.findIndex(
    item => item.rating <= ratedMovieItem.rating
  );

  //set item to this position.
  if (newPositionOfItem > -1) {
    items.splice(newPositionOfItem, 0, ratedMovieItem);
  } else {
    items.push(ratedMovieItem);
  }

  return items;
};
