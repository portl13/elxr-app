import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useQuery } from "@apollo/client";
import { WEIGHT_TRACKER } from "../../../../../../graphql/suggestic-queries";
import { setWeeklyWeightData } from "../../../../../../store/features/journal/journal-slice";

export const WeeklyWeightData = (props) => {
  const weightData = useAppSelector((state) => state.journal.weightData);

  const dispatch = useAppDispatch();

  const { error, data, refetch /*loading, networkStatus*/ } = useQuery(
    WEIGHT_TRACKER,
    {
      variables: {
        startDate: props.start,
        endDate: props.end,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    refetch().then((value) => {
      if (value.data?.weightTracker?.entries) {
        // console.log("update progress chart for weight");
        dispatch(setWeeklyWeightData(value.data.weightTracker?.entries));
      }
    }); // makes sure updates show up in chart when user makes changes
  }, [weightData]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      dispatch(setWeeklyWeightData(data.weightTracker?.entries));
    }
  }, [data]);

  return <div className="WeeklyWeightData"></div>;
};
