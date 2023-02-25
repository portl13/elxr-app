/* eslint-disable react/jsx-filename-extension */
import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import router from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GradientCircularProgress } from "react-circular-gradient-progress";
import { DATE_FORMAT } from "../../../../CommonConstants";
import { HYDRATION } from "../../../../graphql/suggestic-queries";
import { useAppSelector } from "../../../../store/store";

function DrinkWaterLog() {
  let today = dayjs();
  const todayDate = dayjs().format(DATE_FORMAT);
  const endDate = dayjs().format(DATE_FORMAT);
  const startDate = today.subtract(6, "day").format(DATE_FORMAT);

  const [intake, setIntake] = useState(0);
  const [goal, setGoal] = useState(0);

  const { data, data: { hydration = [] } = {} } = useQuery(HYDRATION, {
    variables: {
      startDate,
      endDate,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    let currentQuantity = data?.hydration?.find(
      (entry) => entry.date === todayDate
    );
    setIntake(currentQuantity?.quantity || 0);
    setGoal(
      currentQuantity?.goal ||
        data?.hydration[data?.hydration.length - 1]?.goal ||
        8
    );
  }, [data]);

  return (
    <div className="dashboard-card">
      <div
        className="card-enter-btn"
        onClick={() => router.push("/my_dashboard/waterTracker")}
      >
        <img src="/img/card-arrow.svg" alt="img" />
      </div>
      <div className="d-flex">
        <div className="water-log-description">
          <div className="dashboard-card-title">Drink water</div>
          <div className="dashboard-card-description">
            Today your hydration goal is <span>{goal}</span> glasses.
            <br></br>
            Stay hydrated!
          </div>
        </div>
        <div className="water-log-wrap">
          <div className="water-log-bar">
            <GradientCircularProgress
              progress={(intake / goal) * 100} // use this to show progress
              strokeWidth={2}
              size={80}
              emptyColor="#c8dbf12e"
              startColor="#00e0fc"
              middleColor="#ff73f8"
              endColor="#f5d1b5"
            />
            <img src="/img/water-glass.svg" alt="img" />
          </div>

          <div className="water-log-value">
            {intake}/{goal}
          </div>
          <div className="water-log-label">Glasses today</div>
        </div>
      </div>
    </div>
  );
}

export default DrinkWaterLog;
