import React, { useState } from "react";

//import { MealTrackStatus } from "@suggestic/sdk/dist/__generated_sdk";
import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { RecipeIcon } from "../../../recipes/recipe-icon/RecipeIcon";
import { LogMealButton } from "./log-meal-button/LogMealButton";
import { CREATE_MEAL_ENTRY } from "../../../../../../graphql/suggestic-mutatons";
import { useMutation } from "@apollo/client";
import { setMealTracker } from "../../../../../../store/features/journal/journal-slice";
import { useAppDispatch, useAppSelector } from "../../../../../../store/store";

export const TrackedMeal = (props) => {
  const [createMealEntry /*{ data, loading, error }*/] =
    useMutation(CREATE_MEAL_ENTRY);
  const mealTrackerArray = useAppSelector((state) => state.journal.mealTracker);
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState("");
  const [isSkipped, setIsSkipped] = useState([]);

  const handleClick = (buttonValue) => {
    createMealEntry({
      variables: {
        mealId: props.meal?.id,
        value: buttonValue,
      },
    }).then((value) => {
      if (value?.data?.createMealEntry?.success) {
        const newMealTrackerArray = [
          ...[...mealTrackerArray].filter(
            (mealTrack) => mealTrack.mealId !== props.meal.id
          ),
          {
            meal: {
              id: props.meal.id,
              __typename: "Meal",
            },
            mealId: props.meal.id,
            value: buttonValue,
            __typename: "MealTrack",
          },
        ];

        dispatch(setMealTracker(newMealTrackerArray));
        if (buttonValue == "ATE") {
          setIsChecked(props.meal?.id);
          setIsSkipped("");
        } else {
          setIsChecked("");
          setIsSkipped([...isSkipped, props.meal?.id]);
        }
      }
    });
  };
  return (
    // <div className="TrackedMeal">

    //         <CardContent>
    //             <RecipeIcon
    //                 mealId={props.meal?.id}
    //                 imageSource={props.meal?.recipe?.mainImage}
    //                 showEatenStatus={true}
    //             />
    //             <Typography variant="body2" color="text.secondary" textAlign="left" fontWeight={"bold"}>
    //                 {props.meal?.meal?.toUpperCase()}
    //             </Typography>
    //             <Typography gutterBottom variant="h6" component="div" textAlign="left">
    //                 {props.meal?.recipe?.name}
    //             </Typography>
    //         </CardContent>
    //         <CardActions>
    //             <LogMealButton mealId={props.meal?.id} buttonValue={MealTrackStatus.Ate} currentStatus={props.meal?.value}
    //                 size="sm" type="submit"
    //             />
    //             <Divider orientation="vertical" flexItem />
    //             <LogMealButton mealId={props.meal?.id} buttonValue={MealTrackStatus.Skipped} currentStatus={props.meal?.value}
    //                 size="sm" type="submit"
    //             />
    //         </CardActions>

    // </div>

    <ul
      className={`list-unstyled mealList ${
        isChecked == props.meal?.id ? "strike" : ""
      } `}
    >
      <li
        className={
          isSkipped == props.meal?.id || isChecked == props.meal?.id
            ? "meal-selected"
            : ""
        }
      >
        <div className="logBox">
          <label
            className={`check_box ${isSkipped == props.meal?.id && "remove"}`}
          >
            <input
              type="checkbox"
              checked={isChecked == props.meal?.id}
              className="check"
            />
            <span className="checkmark"></span>
          </label>
          <figure>
            <img src={props.meal?.recipe?.mainImage} alt="ELXR" />
          </figure>
          <div className="logContent">
            <div className="foodBox">
              <span className="foodType">
                {" "}
                {props.meal?.meal?.toUpperCase()}
              </span>
              <span className="foodName">{props.meal?.recipe?.name}</span>
            </div>
          </div>
        </div>

        {isSkipped == props.meal?.id || isChecked == props.meal?.id ? null : (
          <aside className="hoverBox">
            <a
              onClick={() => {
                handleClick("SKIPPED");
              }}
              className="shadowButton"
            >
              Skipped
            </a>
            <a
              onClick={() => {
                handleClick("ATE");
              }}
              className="gredientButton"
            >
              Done
            </a>
          </aside>
        )}
      </li>
    </ul>
  );
};
