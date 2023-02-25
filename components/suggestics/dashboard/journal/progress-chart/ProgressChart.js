import React, { useEffect } from "react";

import { useAppSelector } from "../../../../../store/store";
import { useQuery } from "@apollo/client";
import { STREAKS } from "../../../../../graphql/suggestic-queries";
import {
  Typography,
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {
  Check,
  CircleOutlined,
  Opacity,
  Restaurant,
  Scale,
} from "@material-ui/icons";
import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT } from "../../../../../CommonConstants";

export const ProgressChart = () => {
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
    return weeklyWaterIntake.find((day) => day.date === date);
  }

  function isWeightRecorded(date) {
    return weeklyWeightData.find((day) => day.date === date);
  }

  const rows = [
    [
      "Today's Meals",
      ...week.map((day) => areAllMealsRecorded(day.format(DATE_FORMAT))),
    ],
    [
      "Water Intake",
      ...week.map((day) => isWaterRecorded(day.format(DATE_FORMAT))),
    ],
    // [
    //     TODO: add daily recap row
    //     "Daily Recap",
    // ],
    [
      "Weight Tracking",
      ...week.map((day) => isWeightRecorded(day.format(DATE_FORMAT))),
    ],
  ];

  // const dispatch = useAppDispatch();

  const { error, data /*refetch, loading, networkStatus*/ } = useQuery(
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
    if (data) {
      // console.log(data)
      // dispatch();
    }
  }, [data]);

  function getIcon(rowElement) {
    switch (rowElement) {
      case "Today's Meals":
        return <Restaurant color={"secondary"} fontSize="small" />;
      case "Water Intake":
        return <Opacity color={"secondary"} fontSize="small" />;
      case "Weight Tracking":
        return <Scale color={"secondary"} fontSize="small" />;
      default:
        return null;
    }
  }

  return (
    <div className="ProgressChart">
      {/*TODO fix cropping on mobile*/}
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table size="small" sx={{ width: "100%" }} aria-label="progress table">
          <TableHead>
            <TableRow>
              <TableCell>
                {/*<Typography variant="body2" color="text.secondary" textAlign="left" fontWeight={"bold"}>*/}
                {/*    ACTIVITIES*/}
                {/*</Typography>*/}
              </TableCell>
              {week.map((day, index) => {
                return (
                  <TableCell align={"center"} key={`cell-${index}`}>
                    <Typography
                      variant="body2"
                      // fontWeight={index === 6 ? "bold" : "normal"}
                      // color={index === 6 ? ELXR_DARK_PURPLE : "text.primary"}
                    >
                      {day.format("dd")}
                    </Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row[0].toString()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={{ margin: -4 }} component="th" scope="row">
                  {/*{row[0]}*/}
                  {getIcon(row[0].toString())}
                </TableCell>
                {row.slice(1).map((isLogged, index) => {
                  return (
                    <TableCell
                      sx={{ margin: -4 }}
                      align={"center"}
                      key={`${row[0]}-${index}`}
                    >
                      {isLogged ? (
                        <Check color={"secondary"} fontSize={"small"} />
                      ) : (
                        <CircleOutlined
                          color={"disabled"}
                          sx={{ fontSize: 15 }}
                        />
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
