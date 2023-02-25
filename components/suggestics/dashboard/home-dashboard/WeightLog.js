/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-filename-extension */
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { DATE_FORMAT } from "../../../../CommonConstants";
import {
  HYDRATION,
  WEIGHT_TRACKER,
} from "../../../../graphql/suggestic-queries";
import {
  setCurrentWeight,
  setWeeklyWeightData,
} from "../../../../store/features/journal/journal-slice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import WeightGraph from "../journal/weight-log/weight-graph/WeightGraph";

function WeightLog() {
  let today = dayjs();
  const startDate = today.subtract(6, "day").format(DATE_FORMAT);
  const endDate = dayjs().format(DATE_FORMAT);
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const {
    error,
    data,
    data: { weightTracker = {} } = {},
    refetch,
  } = useQuery(WEIGHT_TRACKER, {
    variables: {
      endDate: endDate,
      startDate: startDate,
    },
    notifyOnNetworkStatusChange: true,
  });
  // window.alert(JSON.stringify(data.weightTracker.entries));
  useEffect(() => {
    if (data) {
      dispatch(setWeeklyWeightData(data.weightTracker?.entries));
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="dashboard-card">
      <div
        className="card-enter-btn"
        onClick={() => router.push("/my_dashboard/weightTracker")}
      >
        <img src="/img/card-arrow.svg" alt="img" />
      </div>
      <div className="dashboard-card-subtitle">LOG, track &amp; compare</div>
      <div className="dashboard-card-title">Loose 31 lbs</div>
      <div className="weight-log-row">
        <div className="weight-log-col">
          <div className="weight-log-value">{weightTracker.start || 0} lbs</div>
          <div className="weight-log-label">Started at</div>
        </div>
        {/* <div className="weight-log-col">
          <div className="weight-log-value">65 lbs</div>
          <div className="weight-log-label">Goal</div>
        </div> */}
        <div className="weight-log-col">
          <div className="weight-log-value">4 Weeks</div>
          <div className="weight-log-label">Duration</div>
        </div>
      </div>
      {data?.weightTracker?.entries != 0 && (
        <div className="weight-goal-note">
          {loading ? null : (
            <div>
              <img src="/img/happy-smiley.png" alt="img" />
              <div className="note-text">
                Wow! You are taking your goal seriously. Good job!
              </div>
            </div>
          )}
        </div>
      )}
      <div className="weight-log-graph-wrap">
        <WeightGraph isWeek={true} />
      </div>
    </div>
  );
}

export default WeightLog;
