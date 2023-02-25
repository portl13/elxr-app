import React from "react";

import { Box, Button, CssBaseline, Paper, Typography } from "@material-ui/core";

export const FloatingButton = (props) => {
  const ref = React.useRef(null);

  return (
    <div className="FloatingButton">
      <Box sx={{ pb: 7 }} ref={ref}>
        <CssBaseline />
        <Paper
          sx={{
            position: "fixed",
            bottom: props.bottomPosition,
            left: 0,
            right: 0,
            width: "100%",
          }}
          elevation={3}
        >
          <Button
            variant={props.variant ? props.variant : "contained"}
            sx={{ width: "100%" }}
            color={"secondary"}
            onClick={props.onClick}
          >
            <Typography>{props.text}</Typography>
          </Button>
        </Paper>
      </Box>
    </div>
  );
};
