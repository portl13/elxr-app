import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useQuery } from "@apollo/client";
import { GET_CURRENT_MEALPLAN } from "../../../../../graphql/suggestic-queries";
import { Alert } from "@material-ui/lab";
import { setTrackedMealPlanDay } from "../../../../../store/features/journal/journal-slice";
import { TrackedMeal } from "./tracked-meal/TrackedMeal";
import { SetMealTracker } from "./set-meal-tracker/SetMealTracker";
import { Restaurant } from "@material-ui/icons";
import { LogHeader } from "../log-header/LogHeader";
import { setCurrentMealplan } from "../../../../../store/features/mealplan/mealplan-slice";
import dayjs from "dayjs";

export const FoodLog = (props) => {
  const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const trackedMealPlanDay = useAppSelector(
    (state) => state.journal.trackedMealPlanDay
  );

  const currentMealplan = useAppSelector(
    (state) => state.mealplan.currentMealplan
  );

  const dispatch = useAppDispatch();

  const { error, data, refetch } = useQuery(GET_CURRENT_MEALPLAN, {
    variables: {
      useDatetime: false,
    },
  });

  useEffect(() => {
    let list = [];
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      let list = [...data.mealPlan]
        ?.sort((item1, item2) => {
          if (item1 === item2) return 0;
          return dayjs(item1.date).isBefore(dayjs(item2.date)) ? -1 : 1;
        })
        .slice(-7);
      dispatch(setCurrentMealplan(list));
      if (data.mealPlan && data.mealPlan.length > 0) {
        const match = list.find((item) => item.date === props.dateString);
        dispatch(setTrackedMealPlanDay(match ? match : {}));
      }
    }
  }, [data]);

  useEffect(() => {
    refetch();
    if (currentMealplan.length > 0) {
      const match = currentMealplan.find(
        (item) => item.date === props.dateString
      );
      dispatch(setTrackedMealPlanDay(match ? match : {}));
    }
  }, [daysAgoIndex]);

  return (
    <div className="FoodLog">
      <div className="log_top">
        <div className="log_heading">
          <img src="/img/leaf.svg" alt="ELXR" />
          <h3>Food Log</h3>
        </div>
        <strong>Checklist for the day</strong>
        <p>Check off your accomplishments or mark as skipped.</p>
      </div>
      <div>
        {!trackedMealPlanDay.id ? (
          <Alert
            severity="info"
            sx={{ justifyContent: "center", alignContent: "center" }}
          >
            No Results found!
          </Alert>
        ) : (
          <>
            {[...trackedMealPlanDay.meals].map((meal, index) => {
              return (
                <TrackedMeal
                  dateString={props.dateString}
                  meal={meal}
                  key={`meal-${index}`}
                />
              );
            })}
            {/* <TrackedMeal /> */}
          </>
        )}
      </div>
    </div>
  );
};
