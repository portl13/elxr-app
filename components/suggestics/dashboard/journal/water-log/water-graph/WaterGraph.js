import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
// import { Chart } from "react-google-charts";
import dayjs from "dayjs";
import {
  ELXR_DARK_PURPLE,
  ELXR_LIGHT_PURPLE,
  ELXR_PURPLE,
} from "../../../../../../colors";
import {
  setWaterChartData,
  setWaterIntake,
} from "../../../../../../store/features/journal/journal-slice";
import { DATE_FORMAT } from "../../../../../../CommonConstants";
import {
  ReferenceLine,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
} from "recharts";

export const WaterGraph = ({ dateString, isWeek }) => {
  const waterChartData = useAppSelector(
    (state) => state.journal.waterChartData
  );
  const weeklyWaterIntake = useAppSelector(
    (state) => state.journal.weeklyWaterIntake
  );
  const GOAL = 8;
  const dispatch = useAppDispatch();
  const today = dayjs();
  const todayString = dayjs().format(DATE_FORMAT);
  const startDate = today.subtract(6, "day");
  const startDateString = startDate.format(DATE_FORMAT);

  const dates = [
    startDateString,
    today.subtract(5, "day").format(DATE_FORMAT),
    today.subtract(4, "day").format(DATE_FORMAT),
    today.subtract(3, "day").format(DATE_FORMAT),
    today.subtract(2, "day").format(DATE_FORMAT),
    today.subtract(1, "day").format(DATE_FORMAT),
    todayString,
  ];

  useEffect(() => {
    let newChartData = [];
    dates.map((date) => {
      let quantity = 0;
      if (weeklyWaterIntake.length > 0) {
        quantity = weeklyWaterIntake?.find(
          (entry) => date === entry.date
        )?.quantity;
      }
      newChartData.push({
        date: date === todayString ? "Today" : dayjs(date).format("ddd"),
        cups: quantity ? quantity : 0,
      });
    });
    dispatch(setWaterChartData(newChartData));
    const currentQuantity = weeklyWaterIntake.find(
      (entry) => entry.date === dateString
    )?.quantity;
    dispatch(setWaterIntake(currentQuantity ? currentQuantity : 0));
  }, [dateString, weeklyWaterIntake]);

  return (
    <div className="WeightGraph">
      <ResponsiveContainer width="100%" height={isWeek ? 130 : 178}>
        <LineChart
          width={"100%"}
          height={isWeek ? 130 : 178}
          data={waterChartData}
          margin={{ top: 10, right: 30, bottom: 10, left: 20 }}
        >
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="cups"
            stroke={"#2166e3"}
            strokeWidth={2}
            dot={false}
          />
          <XAxis dy={10} dataKey="date" strokeWidth={0.2} />

          {waterChartData.map(
            (i, index) =>
              index === 6 && (
                <ReferenceDot
                  key={index}
                  r={6}
                  fill={"#2166e3"}
                  y={i.cups}
                  x={i.date}
                  stroke={"#2166e3"}
                />
              )
          )}
          <Tooltip />
          <ReferenceLine
            y={GOAL}
            stroke={isWeek ? "black" : "grey"}
            strokeDasharray="4 4"
            strokeWidth={0.5}
          />
          {waterChartData.map((i, index) => (
            <ReferenceLine
              key={index}
              stroke="#A8B4B4"
              strokeWidth={0.3}
              segment={[
                {
                  x: i.date,
                  y: 0,
                },
                {
                  x: i.date,
                  y: GOAL,
                },
              ]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <br />
    </div>
  );
};
