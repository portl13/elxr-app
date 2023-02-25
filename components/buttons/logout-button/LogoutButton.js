import React from "react";

import { Button, Typography } from "@material-ui/core";
// import {Auth} from "aws-amplify";

export const LogoutButton = () => {
  async function handleLogout() {
    // await Auth.signOut();
  }

  return (
    <div className="LogoutButton">
      <Button
        color="secondary"
        aria-label="Logout"
        variant="outlined"
        sx={{ width: "100%" }}
        onClick={handleLogout}
      >
        <Typography>Logout</Typography>
      </Button>
    </div>
  );
};
