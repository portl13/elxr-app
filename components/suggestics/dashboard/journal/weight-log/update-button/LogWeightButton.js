import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../../../../store/store";
import { useMutation } from "@apollo/client";
import { TextField, Tooltip, Typography } from "@material-ui/core";
import {
  setCurrentWeight,
  setWeightData,
} from "../../../../../../store/features/journal/journal-slice";
import { CREATE_WEIGHT_ENTRY } from "../../../../../../graphql/suggestic-mutatons";
import { LoaderButton } from "../../../../../../components/buttons/loader-button/LoaderButton";
import { TIMEOUT } from "../../../../../../utils/constant";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import Loader from "../../../../../loader/index";

export const LogWeightButton = (props) => {
  const currentWeight = useAppSelector((state) => state.journal.currentWeight);
  const weightData = useAppSelector((state) => state.journal.weightData);
  const [weightInput, setWeightInput] = useState(currentWeight);
  const [loader, setLoader] = useState();
  const alert = useAlert();
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();

  const [createWeightEntry, { loading /*data, error */ }] =
    useMutation(CREATE_WEIGHT_ENTRY);

  const handleClick = () => {
    setLoader(true);
    createWeightEntry({
      variables: {
        date: props.dateString,
        value: +currentWeight,
      },
    }).then((value) => {
      setLoader(false);
      if (value.data?.createWeightEntry?.success) {
        dispatch(
          setWeightData([
            ...weightData.filter((item) => item[0] !== props.dateString),
            [props.dateString, +currentWeight],
          ])
        );
      }
      if (weightInput == "") {
        alert.error("Please log weights before save", TIMEOUT);
      }
    });
    setWeightInput("");
  };

  const handleWeightChange = (e) => {
    let { value } = e.target;
    setWeightInput(value.replace(/[^\d.-]/g, ""));
    dispatch(setCurrentWeight(value.replace(/[^\d.-]/g, "")));
  };

  useEffect(() => {
    return setWeightInput("");
  }, []);

  return (
    <div className="LogWeightButton">
      <TextField
        variant="outlined"
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        color="secondary"
        value={weightInput}
        onChange={handleWeightChange}
        sx={{ width: "100%" }}
        placeholder={
          pathname === "/my_dashboard/journal"
            ? "Log Weight (lbs)"
            : "Weight (lbs)"
        }
      />
      <Tooltip title={"Log Weight"}>
        <LoaderButton
          color="secondary"
          aria-label="Log Weight"
          variant="contained"
          size="large"
          fullWidth
          disabled={
            currentWeight === "" || isNaN(+currentWeight) || currentWeight <= 0
          }
          onClick={handleClick}
          isLoading={loading}
        >
          Save
        </LoaderButton>
      </Tooltip>
    </div>
  );
};
