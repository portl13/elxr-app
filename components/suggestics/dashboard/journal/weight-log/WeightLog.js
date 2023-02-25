import React, { memo, useEffect } from "react";

import { useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { WEIGHT_TRACKER } from "../../../../../graphql/suggestic-queries";
import {
  setCurrentWeight,
  setWeeklyWeightData,
} from "../../../../../store/features/journal/journal-slice";
import { LogWeightButton } from "./update-button/LogWeightButton";
import WeightGraph from "./weight-graph/WeightGraph";

function WeightLog(props) {
  const dispatch = useAppDispatch();
  const { currentWeight, weeklyWeightData } = useAppSelector(
    (state) => state.journal
  );

  const { error, data, refetch /* loading, networkStatus */ } = useQuery(
    WEIGHT_TRACKER,
    {
      variables: {
        endDate: props.dateString,
        startDate: props.dateString,
      },
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
      dispatch(
        setCurrentWeight(
          data.weightTracker?.entries[0]?.value
            ? (data.weightTracker?.entries[0]?.value).toString()
            : ""
        )
      );
      dispatch(setWeeklyWeightData(data?.weightTracker?.entries));
    }
  }, [data]);

  return (
    <div className="WeightLog">
      <div className="log_top">
        <div className="log_heading">
          <img src="/img/notepad.svg" alt="ELXR" />
          <h3>CURRENT WEIGHT</h3>
        </div>
      </div>

      <div className="graphBox">
        <WeightGraph isWeek={false} />
        <div
          style={{ width: "100%", marginLeft: "auto", marginRight: "auto" }}
        />
      </div>

      <div className="weightText">
        <strong>Keep logging your weight daily</strong>
        <p>
          Last logged:{" "}
          {weeklyWeightData &&
            weeklyWeightData.length > 0 &&
            weeklyWeightData[weeklyWeightData.length - 1] &&
            weeklyWeightData[weeklyWeightData.length - 1].value &&
            weeklyWeightData[weeklyWeightData.length - 1].value}{" "}
          lbs
        </p>
        <LogWeightButton dateString={props.dateString} />
      </div>
    </div>
  );
}

export default memo(WeightLog);
