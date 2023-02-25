import React from "react";

import { Typography } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { setByAisleMode } from "../../../../../store/features/shopping-list/shopping-list-slice";
import { setLoaderStatus } from "../../../../../store/features/loader/loader-slice";

export const ToggleByAisleRecipe = () => {
  const byAisleMode = useAppSelector((state) => state.shoppingList.byAisleMode);

  const dispatch = useAppDispatch();

  const handleChange = (event, newValue) => {
    dispatch(setLoaderStatus(true));
    dispatch(setByAisleMode(newValue));
  };

  return (
    <div className="ToggleByAisleRecipe">
      <ToggleButtonGroup
        aria-label="By Aisle vs. By Recipe Toggle Button"
        color="secondary"
        value={byAisleMode}
        exclusive
        fullWidth
        onChange={handleChange}
        sx={{ marginBottom: 4 }}
      >
        <ToggleButton value={true}>
          <Typography>By Aisle</Typography>
        </ToggleButton>
        <ToggleButton value={false}>
          <Typography>By Recipe</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
