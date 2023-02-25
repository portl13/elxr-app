import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { Typography } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../../../../graphql/suggestic-mutatons";
import { setUserProfile } from "../../../../store/features/user-profile/user-profile-slice";
import { setFailureDialog } from "../../../../store/features/dialog/dialog-slice";

export const ToggleImperialMetric = () => {
  const userProfile = useAppSelector((state) => state.userProfile.profile);

  const dispatch = useAppDispatch();

  const [updateProfile /*{data, loading, error}*/] =
    useMutation(UPDATE_PROFILE);

  const handleChange = (event, newValue) => {
    updateProfile({
      variables: {
        isImperial: newValue,
      },
    }).then((value) => {
      if (value.data?.updateProfile?.success) {
        dispatch(
          setUserProfile({
            ...userProfile,
            isImperial: newValue,
          })
        );
      } else {
        dispatch(
          setFailureDialog(
            "An error occurred while changing between metric and imperial..."
          )
        );
      }
    });
  };

  return (
    <div className="ToggleImperialMetric">
      <ToggleButtonGroup
        aria-label="Imperial vs. Metric Toggle Button"
        color="secondary"
        value={userProfile.isImperial}
        exclusive
        fullWidth
        onChange={handleChange}
      >
        <ToggleButton value={true}>
          <Typography>Imperial</Typography>
        </ToggleButton>
        <ToggleButton value={false}>
          <Typography>Metric</Typography>
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};
