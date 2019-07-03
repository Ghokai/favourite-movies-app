import React from "react";
import { PageHeader, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_SEARCH_TERM_ACTON,
  SET_RANDOM_RATING_ACTION
} from "../store/actions";
import { startRandomRatingAction } from "../store/actions";
const Header: React.FC = () => {
  const { searchTerm, israndomRatingActive } = useSelector((state: any) => ({
    israndomRatingActive: state.movies.israndomRatingActive,
    searchTerm: state.movies.searchTerm
  }));
  const dispatch = useDispatch();

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: SET_SEARCH_TERM_ACTON, payload: event.target.value });
  };

  const onRandomRateClick = () => {
    //
    if (israndomRatingActive) {
      dispatch({
        type: SET_RANDOM_RATING_ACTION,
        payload: false
      });
    } else {
      dispatch(startRandomRatingAction());
    }
  };

  return (
    <PageHeader className="page-header" title="My Favourite Movies App">
      <div className="header-content">
        <Button
          className="random-button"
          onClick={() => onRandomRateClick()}
          type={israndomRatingActive ? "danger" : "primary"}
        >
          {israndomRatingActive ? "Stop Random Rating" : "Start Random Rating"}
        </Button>
        <Input
          className="search-input"
          onChange={onSearch}
          value={searchTerm}
          size="default"
          placeholder="Search..."
        />
      </div>
    </PageHeader>
  );
};

export default Header;
