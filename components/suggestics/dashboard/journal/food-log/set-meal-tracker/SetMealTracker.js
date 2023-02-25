import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import { setMealTracker } from "../../../../../../store/features/journal/journal-slice";
import { useAppDispatch } from "../../../../../../store/store";
import { MEAL_TRACKER_SIMPLEST } from "../../../../../../graphql/suggestic-queries";

export const SetMealTracker = (props) => {
  const dispatch = useAppDispatch();

  // const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const { error, data /*refetch, loading, networkStatus*/ } = useQuery(
    MEAL_TRACKER_SIMPLEST,
    {
      variables: {
        endDate: props.dateString,
        startDate: props.dateString,
      },
      pollInterval: 1000, // TODO remove polling
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    // refetch(); // makes sure updates show up when using arrow keys
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      dispatch(setMealTracker(data.mealTracker));
    }
  }, [data]);

  return <div className="SetMealTracker" />;
};
