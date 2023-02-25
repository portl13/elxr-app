import React from "react";

// import "./LogMealButton.scss"

import { useMutation } from "@apollo/client";
import { MealTrackStatus } from "@suggestic/sdk/dist/__generated_sdk";
import { CREATE_MEAL_ENTRY } from "../../../../../../../graphql/suggestic-mutatons";
import Button from "@material-ui/core/Button";
import { setMealTracker } from "../../../../../../../store/features/journal/journal-slice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../../store/store";

export const LogMealButton = (props) => {
  const mealTrackerArray = useAppSelector((state) => state.journal.mealTracker);

  const dispatch = useAppDispatch();

  const [createMealEntry /*{ data, loading, error }*/] =
    useMutation(CREATE_MEAL_ENTRY);

  const handleClick = () => {
    createMealEntry({
      variables: {
        mealId: props.mealId,
        value: props.buttonValue,
      },
    }).then((value) => {
      if (value?.data?.createMealEntry?.success) {
        const newMealTrackerArray = [
          ...[...mealTrackerArray].filter(
            (mealTrack) => mealTrack.mealId !== props.mealId
          ),
          {
            meal: {
              id: props.mealId,
              __typename: "Meal",
            },
            mealId: props.mealId,
            value: props.buttonValue,
            __typename: "MealTrack",
          },
        ];

        dispatch(setMealTracker(newMealTrackerArray));
      }
    });
  };

  return (
    <div className="LogMealButton">
      <Button
        size={props.size}
        type="submit"
        variant={
          mealTrackerArray.find((item) => item.mealId === props.mealId)
            ?.value === props.buttonValue
            ? "primary"
            : "secondary"
        }
        disabled={
          mealTrackerArray.find((item) => item.mealId === props.mealId)
            ?.value === props.buttonValue
        }
        onClick={handleClick}
      >
        {props.buttonValue === MealTrackStatus.Ate ? "Ate It" : "Skipped"}
      </Button>
    </div>
  );
};
