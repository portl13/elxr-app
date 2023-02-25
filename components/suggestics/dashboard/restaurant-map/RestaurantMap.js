import React from "react";

// import "./RestaurantMap.scss"

import { CircularProgress } from "@material-ui/core";

export const RestaurantMap = () => {
  function renderPage(loading) {
    if (loading) {
      return <CircularProgress color="secondary" />;
    } else {
      return <div>Map of restaurants goes here</div>;
    }
  }

  return <div className="RestaurantMap">{renderPage(false)}</div>;
};
