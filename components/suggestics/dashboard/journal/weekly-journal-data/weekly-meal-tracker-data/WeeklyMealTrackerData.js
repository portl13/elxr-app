import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useQuery } from "@apollo/client";
import { MEAL_TRACKER_SIMPLEST } from "../../../../../../graphql/suggestic-queries";
import { setWeeklyMealTracker } from "../../../../../../store/features/journal/journal-slice";

export const WeeklyMealTrackerData = (props) => {
  const mealTrackerArray = useAppSelector((state) => state.journal.mealTracker);

  const dispatch = useAppDispatch();

  const { error, data, refetch /*loading, networkStatus*/ } = useQuery(
    MEAL_TRACKER_SIMPLEST,
    {
      variables: {
        startDate: props.start,
        endDate: props.end,
      },
      // pollInterval: 1000,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      dispatch(setWeeklyMealTracker(data.mealTracker));
    }
  }, [data]);

  useEffect(() => {
    refetch().then((value) => {
      if (value.data?.mealTracker) {
        // console.log("update progress chart for meal tracking");
        dispatch(setWeeklyMealTracker(value.data?.mealTracker));
      }
    }); // makes sure updates show up in chart when user makes changes
  }, [mealTrackerArray]);

  return <div className="WeeklyMealTrackerData"></div>;
};
