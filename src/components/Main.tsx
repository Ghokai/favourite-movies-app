import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchMoviesAction } from "../store/actions";
import MovieDeck from "./MovieDeck";
import Header from "./Header";
const Main: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesAction());
  }, [dispatch]);

  return (
    <div className="wrapper">
      <Header />
      <MovieDeck />
    </div>
  );
};
export default Main;
