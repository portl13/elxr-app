import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";
import dayjs from "dayjs";
import { v4 as uuid5 } from "uuid";
import { DATE_FORMAT } from "../../../../../CommonConstants";
import { STREAKS } from "../../../../../graphql/suggestic-queries";
import { useAppSelector } from "../../../../../store/store";

export function ProgressChartNew() {
  // const presentDay = new Date().getDay();
  // const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const weeklyMealTracker = useAppSelector(
    (state) => state.journal.weeklyMealTracker
  );

  const weeklyWaterIntake = useAppSelector(
    (state) => state.journal.weeklyWaterIntake
  );
  const weeklyWeightData = useAppSelector(
    (state) => state.journal.weeklyWeightData
  );

  const today = dayjs();
  const week = [
    today.subtract(6, "day"),
    today.subtract(5, "day"),
    today.subtract(4, "day"),
    today.subtract(3, "day"),
    today.subtract(2, "day"),
    today.subtract(1, "day"),
    today,
  ];

  function areAllMealsRecorded(date) {
    const matches = weeklyMealTracker.filter((day) => day.date === date);
    return matches && matches.length >= 4;
  }

  function isWaterRecorded(date) {
    return !!weeklyWaterIntake?.find((day) => day.date === date);
  }

  function isWeightRecorded(date) {
    return !!weeklyWeightData?.find((day) => day.date === date);
  }

  const rowHeaders = [
    "Today's Meals",
    "Water Intake",
    //     TODO: add daily recap row
    //     "Daily Recap",
    "Weight Tracking",
  ];

  // const dispatch = useAppDispatch();

  const { error, data /* refetch, loading, networkStatus */ } = useQuery(
    STREAKS,
    {
      variables: {
        endDate: today.format(DATE_FORMAT),
        startDate: week[0]?.format(DATE_FORMAT),
      },
      // pollInterval: 1000,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [data]);

  function getElement(rowHeader, index) {
    switch (rowHeader) {
      case "Today's Meals":
        return areAllMealsRecorded(week[index].format(DATE_FORMAT));
      case "Water Intake":
        return isWaterRecorded(week[index].format(DATE_FORMAT));
      case "Weight Tracking":
        return isWeightRecorded(week[index].format(DATE_FORMAT));
      default:
        return null;
    }
  }

  return (
    <div className="ProgressChartNew">
      <div className="trckingTable">
        <table className="table table-borderless">
          <thead>
            <tr>
              <th />
              {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                <th key={day}>
                  {/* <th key={day} className={today.format("ddd") === week[day].format("ddd") && "today"}> */}
                  {week[day].format("ddd")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowHeaders.map((item) => (
              <tr key={uuid5()}>
                <th>{item}</th>
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                  <td key={uuid5()}>
                    <label>
                      <strong>{week[day].format("dd").substring(0, 1)}</strong>{" "}
                      <input
                        type="radio"
                        name={uuid5()}
                        checked={getElement(item, day)}
                        readOnly
                      />{" "}
                      <span className="checkmark" />
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
