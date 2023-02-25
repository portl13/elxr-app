import React from "react";
import { useAlert } from "react-alert";
import dayjs from "dayjs";

import { useMutation } from "@apollo/client";
import { TIMEOUT } from "../../../../../../utils/constant";
import { START_OVER_MEALPLAN } from "../../../../../../graphql/suggestic-mutatons";
import { setCurrentMealplan } from "../../../../../../store/features/mealplan/mealplan-slice";
import { useAppDispatch } from "../../../../../../store/store";
import { LoaderButton } from "../../../../../../components/buttons/loader-button/LoaderButton";

export const RepeatMealplanButton = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert();

  const [startOverMealplan, { loading /*data, error */ }] =
    useMutation(START_OVER_MEALPLAN);

  const handleClick = () => {
    startOverMealplan({
      variables: {},
    }).then((value) => {
      if (
        value.data?.startOverMealplan?.success &&
        value.data?.startOverMealplan?.mealPlan
      ) {
        dispatch(
          setCurrentMealplan(
            [...value.data.startOverMealplan.mealPlan]
              .sort((item1, item2) => {
                if (item1 === item2) return 0;
                return dayjs(item1.date).isBefore(dayjs(item2.date)) ? -1 : 1;
              })
              .slice(-7)
          )
        );
        alert.success("Meal Plan is successfully restarted!", TIMEOUT);
      } else {
        alert.error(
          "An error occurred while restarting last Meal Plan...",
          TIMEOUT
        );
      }
    });
  };

  return (
    <div className="RepeatMealplanButton">
      <LoaderButton
        type="submit"
        fullWidth
        isLoading={loading}
        onClick={handleClick}
      >
        Repeat Last Plan
      </LoaderButton>
    </div>
  );
};
