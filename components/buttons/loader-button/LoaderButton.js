import React from "react";

import { Box, Button, CircularProgress } from "@material-ui/core";

export const LoaderButton = (props) => {
  return (
    <div className="LoaderButton">
      <Box justifyContent="center" justifyItems="center" justifySelf={"center"}>
        <Button
          sx={{ justifySelf: "center" }}
          disabled={props.disabled || props.isLoading}
          size={props.size}
          type={props.type}
          variant={props.variant ? props.variant : "contained"}
          onClick={props.onClick}
          className="outlinedGradientBtn"
          fullWidth={props.fullWidth}
        >
          {props.isLoading && (
            <CircularProgress size={17} /*color="secondary"*/ />
          )}
          {props.children}
        </Button>
      </Box>
    </div>
  );
};
