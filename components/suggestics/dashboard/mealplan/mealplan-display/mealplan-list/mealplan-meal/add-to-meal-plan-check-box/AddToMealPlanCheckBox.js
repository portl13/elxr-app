import React from "react";

import { FormControlLabel, Radio } from "@material-ui/core";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../../store/store";
import { setMealToSwap } from "../../../../../../../../store/features/mealplan/mealplan-slice";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

export const AddToMealPlanCheckBox = (props) => {
  const mealToSwap = useAppSelector((state) => state.mealplan.mealToSwap);

  const dispatch = useAppDispatch();

  const isRecipeSelected = (id) => {
    return mealToSwap.id === id;
  };

  const handleClick = () => {
    dispatch(setMealToSwap(props.meal));
  };

  return (
    <div className="AddToMealPlanCheckBox">
      <FormControlLabel
        label=""
        aria-label="Select meal time to swap recipe to"
        value={props.meal.id}
        control={
          <Radio
            color={"priamry"}
            checkedIcon={<img src="/img/checked-circle.png" alt="icon" />}
            checked={isRecipeSelected(props.meal.id)}
            onClick={handleClick}
          />
        }
      />
    </div>
  );
};
