import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Card, Rate } from "antd";
import { Movie } from "../types";
import { RATE_MOVIE_BY_ID_ACTION } from "../store/actions";

import { imagesFolderPath } from "../api";
const { Meta } = Card;
const desc = [
  "1/10",
  "2/10",
  "3/10",
  "4/10",
  "5/10",
  "6/10",
  "7/10",
  "8/10",
  "9/10",
  "10/10"
];

const MovieItem: React.FC<Movie> = (props: Movie) => {
  const dispatch = useDispatch();
  const rateMovie = useCallback(
    (value: number) => {
      dispatch({
        type: RATE_MOVIE_BY_ID_ACTION,
        payload: { id: props.id, rating: value }
      });
    },
    [props, dispatch]
  );

  return (
    <Card
      className="movie-item"
      hoverable
      style={{ width: 360 }}
      cover={<img alt={props.name} src={imagesFolderPath + props.image} />}
    >
      <Meta className="movie-item-title" title={props.name} />
      <div className="movie-item-rating">
        <Rate
          count={10}
          tooltips={desc}
          onChange={rateMovie}
          value={props.rating}
        />
      </div>
    </Card>
  );
};

export default React.memo(MovieItem);
