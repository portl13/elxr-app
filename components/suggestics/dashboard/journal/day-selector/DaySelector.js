/* eslint-disable import/prefer-default-export */
import React from "react";

import { IconButton, Typography } from "@material-ui/core";
import dayjs from "dayjs";
import { NavigateBefore, NavigateNext } from "@material-ui/icons";
import { setDaysAgoIndex } from "../../../../../store/features/journal/journal-slice";
import { useAppDispatch, useAppSelector } from "../../../../../store/store";
import { DATE_FORMAT } from "../../../../../CommonConstants";

export function DaySelector() {
  const daysAgoIndex = useAppSelector((state) => state.journal.daysAgoIndex);

  const dispatch = useAppDispatch();

  const today = dayjs();
  const date = today.subtract(daysAgoIndex, "day");
  const dateString = date.format(DATE_FORMAT);
  const startDate = date.subtract(6, "day").format("MMM D");

  return (
    <div className="DaySelector">
      {/* <Tooltip title="Previous Day"> */}
      <span>
        <IconButton
          disabled={daysAgoIndex === 6}
          aria-label="Previous Day"
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setDaysAgoIndex(daysAgoIndex + 1));
          }}
        >
          <NavigateBefore sx={{ height: 38, width: 38 }} />
        </IconButton>
      </span>
      {/* </Tooltip> */}
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        textAlign="center"
        sx={{
          width: "100%",
        }}
      >
        {startDate} {" - "}
        {dateString === today.format(DATE_FORMAT)
          ? `${date.format("MMM D")}`
          : date.format("MMM D")}
      </Typography>
      {/* <Tooltip title="Next Day"> */}
      <span>
        <IconButton
          disabled={daysAgoIndex === 0}
          aria-label="Next Day"
          color="secondary"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setDaysAgoIndex(daysAgoIndex - 1));
          }}
        >
          <NavigateNext sx={{ height: 38, width: 38 }} />
        </IconButton>
      </span>
      {/* </Tooltip> */}
    </div>
  );
}
