import React, { useEffect } from "react";
import {
  Line,
  CartesianGrid,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  setWaterChartData,
  setWaterIntake,
} from "../../store/features/journal/journal-slice";
import { DATE_FORMAT } from "../../CommonConstants";

function CaloriesConsumed({ dateString, isWeek }) {
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
    // startDateString,
    today.subtract(5, "day").format(DATE_FORMAT),
    today.subtract(4, "day").format(DATE_FORMAT),
    today.subtract(3, "day").format(DATE_FORMAT),
    today.subtract(2, "day").format(DATE_FORMAT),
    today.subtract(1, "day").format(DATE_FORMAT),
    // todayString,
  ];

  useEffect(() => {
    let newChartData = [];
    dates.map((date, k) => {
      let quantity = 0;
      if (weeklyWaterIntake.length > 0) {
        quantity = weeklyWaterIntake?.find(
          (entry) => date === entry.date
        )?.quantity;
      }
      newChartData.push({
        name: `${dates.length - k}d`,
        cups: quantity ? quantity : 0,
      });
    });
    console.log("newChartData", newChartData);
    console.log("dates", dates);
    dispatch(setWaterChartData(newChartData));
    const currentQuantity = weeklyWaterIntake.find(
      (entry) => entry.date === dateString
    )?.quantity;
    dispatch(setWaterIntake(currentQuantity ? currentQuantity : 0));
  }, [dateString, weeklyWaterIntake]);

  // const data = [
  //   { name: "5d", Calories: 200 },
  //   { name: "4d", Calories: 250 },
  //   { name: "3d", Calories: 230 },
  //   { name: "2d", Calories: 300 },
  //   { name: "1d", Calories: 400 },
  // ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // console.log("active, payload, label", active, payload, label);
      return (
        <div
          className="custom-tooltip"
          style={{ backgroundColor: "#ffffff", padding: 10 }}
        >
          <div className="label">{`${label}`}</div>
          {/* <p className="intro">{getIntroOfPage(label)}</p> */}
          <p className="desc">{`Calories: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="80%" height={196}>
      <ComposedChart width={730} height={250} data={waterChartData}>
        <XAxis dataKey="name" />
        <YAxis tick={false} />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid stroke="#f5f5f5" />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#14D8FC" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#14D8FC" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="cups"
          stroke="#14D8FC"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="cups"
          stroke="#14D8FC"
          dot={{ stroke: "#44c0ff", strokeWidth: 4, r: 2, fill: "blue" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default CaloriesConsumed;
