import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { useQuery } from "@apollo/client";
import { DAILY_RECAP_QUESTIONS } from "../../../../../graphql/suggestic-queries";
import { Typography } from "@material-ui/core";

export const DailyRecap = (props) => {
  const dailyRecapQuestions = useAppSelector(
    (state) => state.journal.dailyRecapQuestions
  );

  const dispatch = useAppDispatch();

  const { error, data, refetch /*loading, networkStatus*/ } = useQuery(
    DAILY_RECAP_QUESTIONS,
    {
      variables: {},
      // pollInterval: 1000,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    refetch(); // makes sure updates show up when using arrow keys
    if (error) {
      console.log(error);
    }
    if (data) {
      // console.log(data)
      // dispatch(setDailyRecapQuestions(data.dailyRecapQuestions));
    }
  }, [data]);

  return (
    <div className="DailyRecap">
      <Typography variant="h4" gutterBottom component="div" textAlign="left">
        Daily Recap
      </Typography>
    </div>
  );
};
