import React from "react";

import { Typography } from "@material-ui/core";

export const LogHeader = (props) => {
  return (
    <div className="LogHeader">
      {props.icon}
      <Typography variant="h4" gutterBottom component="div" textAlign="left">
        {props.title}
      </Typography>
    </div>
  );
};
