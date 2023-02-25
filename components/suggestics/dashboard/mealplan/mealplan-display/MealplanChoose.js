import React from "react";
import { Typography } from "@material-ui/core";
import { useAppSelector } from "../../../../../store/store";
import { MealplanList } from "./mealplan-list/MealplanList";

export const MealplanChoose = () => {
  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );

  return (
    <div className="MealplanDisplay" style={{ paddingTop: 10 }}>
      {currentMealplan?.map((mealPlanDay) => {
        return (
          <div key={mealPlanDay.date}>
            <div>
              <p className="current_plan">Current Plan:</p>
              <Typography
                variant="h5"
                color="text.secondary"
                fontWeight="bold"
                textAlign="left"
              >
                DAY {mealPlanDay.day}
                {/*{dayjs(mealPlanDay.date).format("dddd, MMM D")}*/}
              </Typography>
            </div>
            <div>
              <MealplanList meals={mealPlanDay.meals} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
