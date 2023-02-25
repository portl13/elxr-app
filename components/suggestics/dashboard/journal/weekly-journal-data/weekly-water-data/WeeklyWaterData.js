import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useQuery } from "@apollo/client";
import { HYDRATION } from "../../../../../../graphql/suggestic-queries";
import { setWeeklyWaterIntake } from "../../../../../../store/features/journal/journal-slice";

export const WeeklyWaterData = (props) => {
  const waterIntake = useAppSelector((state) => state.journal.waterIntake);
  const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const dispatch = useAppDispatch();

  const { error, data, refetch /*loading, networkStatus*/ } = useQuery(
    HYDRATION,
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
    refetch().then((value) => {
      if (value.data?.hydration) {
        // console.log("update progress chart for water");

        dispatch(setWeeklyWaterIntake(value.data.hydration));
      }
    }); // makes sure updates show up in chart when user makes changes
  }, [waterIntake, daysAgoIndex]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      dispatch(setWeeklyWaterIntake(data.hydration));
    }
  }, [data]);

  return <div className="WeeklyWaterData"></div>;
};
