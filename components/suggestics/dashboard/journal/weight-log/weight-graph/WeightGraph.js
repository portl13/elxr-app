import React, { memo, PureComponent, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { WEIGHT_TRACKER } from "../../../../../../graphql/suggestic-queries";
import dayjs from "dayjs";
import { ELXR_DARK_PURPLE, ELXR_PURPLE } from "../../../../../../colors";
import { Typography } from "@material-ui/core";
import { DATE_FORMAT } from "../../../../../../CommonConstants";
import { setWeightData } from "../../../../../../store/features/journal/journal-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import {
  Label,
  ReferenceLine,
  YAxis,
  ReferenceDot,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  ReferenceArea,
  Legend,
  LabelList,
} from "recharts";

class CustomTick extends PureComponent {
  render() {
    let {
      payload: { value },
    } = this.props;
    console.log(value);
    return value;
  }
}

const WeightGraph = ({ isWeek }) => {
  const weightData = useAppSelector((state) => state.journal.weightData);
  const weeklyWeightData = useAppSelector(
    (state) => state.journal.weeklyWeightData
  );

  const [weeklyData, setWeeklyWeightData] = useState([]);
  const [referenceArea, setReferenceArea] = useState(0);
  const GOAL = 50;

  const dispatch = useAppDispatch();
  const today = dayjs();
  const todayString = dayjs().format(DATE_FORMAT);
  const endString = today.subtract(3, "month").format(DATE_FORMAT);
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

  let { data, refetch /*loading, refetch, networkStatus*/ } = useQuery(
    WEIGHT_TRACKER,
    {
      variables: {
        endDate: todayString,
        startDate: endString,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    let newChartData = [];
    dates.map((date) => {
      let value = 0;
      if (weeklyWeightData && weeklyWeightData.length > 0) {
        value = weeklyWeightData?.find((entry) => date === entry.date)?.value;
      }
      newChartData.push({
        date: date === todayString ? "Today" : dayjs(date).format("ddd"),
        weight: value ? value : 0,
      });
    });
    dispatch(setWeightData(newChartData));
  }, [weeklyWeightData]);

  useEffect(() => {
    if (data) {
      refetch().then(() => {
        let { weightTracker: { entries = [] } = {} } = data;
        let week = 0;
        let arr = [];
        for (let i = 1; i < entries.length; i++) {
          let temp = entries[0];
          if (dayjs(entries[i]?.date).diff(dayjs(temp?.date), "week") == 1) {
            temp = entries[i];
            week++;
            arr.push({
              ...entries[i],
              weight: entries[i]?.value,
              date: `week${week}`,
            });
          }
        }
        if (arr.length === 0) {
          arr.push({
            weight: entries[entries.length - 1]?.value,
            date: `week1`,
          });
        }
        for (let i = arr.length + 1; i < 5; i++) {
          arr.push({ weight: null, date: `week${i}` });
        }
        if (isWeek) setWeeklyWeightData(arr);
        let val = dayjs(entries[entries.length - 1]?.date).diff(
          dayjs(entries[0]?.date),
          "week"
        );
        setReferenceArea(val < 2 ? 2 : val);
      });
    }
  }, [data, weeklyWeightData]);

  return (
    <div className="WeightGraph">
      {(isWeek && weeklyData.length > 0) ||
      (!isWeek && weightData.length > 0) ? (
        <ResponsiveContainer width="100%" height={isWeek ? 178 : 196}>
          <LineChart
            width={"100%"}
            height={isWeek ? 178 : 196}
            data={isWeek ? weeklyData : weightData}
            margin={{ top: 10, right: 30, bottom: 10, left: isWeek ? 30 : 30 }}
          >
            <Line
              isAnimationActive={false}
              type="monotone"
              dataKey="weight"
              stroke={"#2166e3"}
              strokeWidth={2}
              dot={false}
            />
            <XAxis dy={10} dataKey="date" strokeWidth={0.2} dy={10} />

            {data?.weightTracker?.entries.length > 0 && (
              <ReferenceArea
                x1={"week1"}
                x2={`week${referenceArea > 4 ? 4 : referenceArea}`}
                fill={"#f0f7ff"}
              />
            )}
            {isWeek
              ? weeklyData.map(
                  (i, index) =>
                    i?.weight && (
                      <ReferenceDot
                        r={6}
                        fill={"#2166e3"}
                        y={i.weight}
                        x={i.date}
                      />
                    )
                )
              : weightData.map(
                  (i, index) =>
                    index == 6 && (
                      <ReferenceDot
                        r={6}
                        fill={"#2166e3"}
                        y={i.weight}
                        x={i.date}
                        stroke={ELXR_DARK_PURPLE}
                      />
                    )
                )}
            <Tooltip />

            <ReferenceLine
              y={GOAL}
              stroke="grey"
              strokeDasharray="4 4"
              strokeWidth={0.3}
            />

            {!isWeek &&
              weightData.map((i) => (
                <ReferenceLine
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
      ) : (
        <Typography variant="body1" justifyContent="center" marginBottom={2}>
          {/* Please start by entering current weight below */}
        </Typography>
      )}
    </div>
  );
};

export default memo(WeightGraph);
