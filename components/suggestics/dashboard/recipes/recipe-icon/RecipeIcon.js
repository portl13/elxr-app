import React from "react";

import { MealTrackStatus } from "@suggestic/sdk/dist/__generated_sdk";
import { Avatar, Badge } from "@material-ui/core";
import CheckBox from "@material-ui/core/Checkbox";

import { useAppSelector } from "../../../../../store/store";
import { SUGGESTIC_NO_IMAGE_URL } from "../recipe-view/recipe-main-info/RecipeMainInfo";

export function RecipeIcon(props) {
  const mealTrackerArray = useAppSelector((state) => state.journal.mealTracker);
  // const mealTrackerArray = useAppSelector((state) => state.journal.weeklyMealTracker);

  function renderAvatar() {
    return (
      <Avatar
        sx={{ width: 56, height: 56 }}
        variant="rounded"
        src={
          props.imageSource && props.imageSource !== SUGGESTIC_NO_IMAGE_URL
            ? props.imageSource
            : "/img/image_not_found_placeholder.png"
        }
      />
    );
  }

  function renderBadge() {
    if (props.showEatenStatus) {
      switch (
        mealTrackerArray.find((item) => item.mealId === props.mealId)?.value
      ) {
        case MealTrackStatus.Ate:
          return (
            <Badge
              overlap="rectangular"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              badgeContent={<CheckBox sx={{ color: "DarkGreen" }} />}
            >
              {renderAvatar()}
            </Badge>
          );
        case MealTrackStatus.Skipped:
          return (
            <>Skip</>
            // <Badge
            //     overlap="rectangular"
            //     anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            //     badgeContent={
            //         <DisabledByDefault sx={{color: "DarkRed"}}/>
            //     }
            // >
            //     {renderAvatar()}
            // </Badge>
          );
        default:
          return <div>{renderAvatar()}</div>;
      }
    } else {
      return <div>{renderAvatar()}</div>;
    }
  }

  return <div className="RecipeIcon">{renderBadge()}</div>;
}
