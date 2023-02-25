import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useMutation } from "@apollo/client";
import { IconButton, Tooltip } from "@material-ui/core";
import { setWaterIntake } from "../../../../../../store/features/journal/journal-slice";
import { FiberManualRecordOutlined, RemoveCircle } from "@material-ui/icons";
import { UPDATE_HYDRATION } from "../../../../../../graphql/suggestic-mutatons";
import { Actiontype } from "@suggestic/sdk/dist/__generated_sdk";
import { useRouter } from "next/router";

export const IncreaseDecreaseButton = (props) => {
  const waterIntake = useAppSelector((state) => state.journal.waterIntake);

  const dispatch = useAppDispatch();

  const [loader, setLoader] = useState(false);

  const { pathname } = useRouter();

  const [updateHydration /*{ data, loading, error }*/] =
    useMutation(UPDATE_HYDRATION);

  const handleUpdate = () => {
    if (waterIntake <= 8) {
      console.log(waterIntake);
      setLoader(true);
      updateHydration({
        variables: {
          action: props.increase ? Actiontype.Increase : Actiontype.Decrease,
          date: props.dateString,
        },
      }).then((value) => {
        setLoader(false);
        if (value?.data?.updateHydration?.success) {
          // console.log(value);
          dispatch(
            setWaterIntake(
              waterIntake <= 8
                ? waterIntake + (props.increase ? 1 : -1)
                : waterIntake
            )
          );
        }
      });
    }
  };

  return (
    <div className="IncreaseDecreaseButton drinkWater">
      {/* <Tooltip title={props.increase ? "Increase Water Intake" : "Decrease Water Intake"}> */}
      <span>
        <IconButton
          color="secondary"
          aria-label={
            props.increase ? "increase water intake" : "decrease water intake"
          }
          disabled={
            loader ||
            (props.increase && waterIntake >= 8) ||
            (!props.increase && waterIntake <= 0)
          }
          onClick={() => handleUpdate()}
        >
          {props.increase ? (
            <FiberManualRecordOutlined sx={{ height: 48, width: 48 }} />
          ) : (
            <RemoveCircle sx={{ height: 48, width: 48 }} />
          )}
        </IconButton>
      </span>
      {/* </Tooltip> */}
    </div>
  );
};
