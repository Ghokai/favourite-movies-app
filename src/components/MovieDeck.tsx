import React from "react";
import { useSelector } from "react-redux";
import MovieItem from "./MovieItem";
import { Movie } from "../types";
const MovieDeck: React.FC = () => {
  const { movieList, searchTerm } = useSelector((state: any) => ({
    movieList: state.movies.movieList,
    searchTerm: state.movies.searchTerm
  }));

  const Movies = movieList
    .filter(
      (movie: Movie) =>
        searchTerm === "" ||
        movie.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((movie: Movie) => {
      return <MovieItem key={movie.id} {...movie} />;
    });

  return <div className="movie-deck">{Movies}</div>;
};

export default React.memo(MovieDeck);
