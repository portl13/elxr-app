import React from "react";

import { IconButton, Tooltip } from "@material-ui/core";
import { AccountCircleOutlined } from "@material-ui/icons";
// import {useNavigate} from "react-router-dom";
// import {RoutePath} from "../../../RouteList";

export const SettingsButton = () => {
  // const navigate = useNavigate();

  const handleClick = () => {
    // navigate(RoutePath.Settings);
  };

  return (
    <div className="SettingsButton">
      <Tooltip title="Settings">
        <span>
          <IconButton
            color="secondary"
            aria-label="Go to Settings"
            component="span"
            onClick={handleClick}
          >
            <AccountCircleOutlined sx={{ height: 30, width: 30 }} />
          </IconButton>
        </span>
      </Tooltip>
    </div>
  );
};
