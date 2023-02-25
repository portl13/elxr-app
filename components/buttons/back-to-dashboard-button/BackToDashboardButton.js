import React from "react";

import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import { NavigateBefore } from "@material-ui/icons";
// import {useNavigate} from "react-router-dom";
import { setMealToSwap } from "../../../store/features/mealplan/mealplan-slice";
import { useAppDispatch } from "../../../store/store";
import {
  setChosenProgramId,
  setChosenRestrictions,
} from "../../../store/features/onboarding-prefs/onboarding-prefs-slice";
import { setSelectedRecipe } from "../../../store/features/recipes/recipes-slice";
// import {RoutePath} from "../../../RouteList";

export const BackToDashboardButton = (props) => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const handleClick = () => {
    dispatch(setMealToSwap({}));
    dispatch(setSelectedRecipe({}));
    // needed here until account creation includes program and restrictions
    dispatch(setChosenProgramId(""));
    dispatch(setChosenRestrictions([]));
    // navigate(RoutePath.Dashboard);
  };

  return (
    <div className="BackToDashboardButton">
      <Tooltip title="Go back">
        <span>
          {props.textLabel ? (
            <Button
              aria-label="Go Back"
              color="default"
              className="back-btn"
              size="large"
              startIcon={<NavigateBefore />}
              onClick={handleClick}
              sx={{ marginBottom: "10px" }}
            >
              <Typography>{props.textLabel}</Typography>
            </Button>
          ) : (
            <IconButton
              color="secondary"
              aria-label="Go Back"
              component="span"
              onClick={handleClick}
            >
              <NavigateBefore sx={{ height: 48, width: 48 }} />
            </IconButton>
          )}
        </span>
      </Tooltip>
    </div>
  );
};
