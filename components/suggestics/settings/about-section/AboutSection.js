import React from "react";

import {
  AppBar,
  Button,
  Dialog,
  Paper,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { InfoOutlined, NavigateBefore, NavigateNext } from "@material-ui/icons";

export const AboutSection = () => {
  const [aboutSectionOpen, setAboutSectionOpen] = React.useState(false);

  const handleClose = () => {
    setAboutSectionOpen(false);
  };

  const handleOpen = () => {
    setAboutSectionOpen(true);
  };

  return (
    <div className="AboutSection">
      <Button
        variant="contained"
        sx={{ width: "100%" }}
        color={"secondary"}
        startIcon={<InfoOutlined />}
        endIcon={<NavigateNext />}
        onClick={handleOpen}
      >
        <Typography>About ELXR</Typography>
      </Button>
      <Dialog fullScreen open={aboutSectionOpen} onClose={handleClose}>
        <AppBar
          sx={{ position: "relative", marginBottom: 2 }}
          color="transparent"
        >
          <Toolbar>
            <Button
              variant="text"
              size={"large"}
              sx={{ width: "100%" }}
              color="warning"
              startIcon={<NavigateBefore />}
              onClick={handleClose}
            >
              <Typography alignSelf={"center"}>Back</Typography>
            </Button>
          </Toolbar>
        </AppBar>
        <Paper>
          <Typography variant="h5" textAlign="center">
            About ELXR
          </Typography>
          <Typography variant="body2" width="90%" align="justify">
            {"Elxr Life DAO is the first of its kind health & wellness platform," +
              " owned by its users and where everyone earns. Elxr is founded on the idea that" +
              " living a healthy life will make a better world."}
          </Typography>
          <Typography
            variant="body2"
            width="90%"
            align="justify"
            paddingBottom={2}
          >
            {
              "We are building a trusted community where health and wellness are rewarded and celebrated."
            }
          </Typography>
        </Paper>
      </Dialog>
    </div>
  );
};
